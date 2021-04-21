using Huerbog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
//using Huerbog.Models;
using Huerbog.Models.ForoList;
using System.Net.Http;
using Huerbog.Models.ForoView;
using Newtonsoft.Json;
using System.Net.Mail;
using System.Net;

namespace Huerbog.Controllers.MVC_Controller
{
    public class ForoControllerMVC : Controller
    {
        HUERBOGContext db = new HUERBOGContext();

        private readonly ILogger<ForoControllerMVC> _logger;

        public ForoControllerMVC(ILogger<ForoControllerMVC> logger)
        {
            _logger = logger;
        }

        //página principal de la aplicación, muestra la lista de publicaciones hechas
        [HttpGet]
        public IActionResult IndexForoList()
        {
            IEnumerable<ForoListModel> foroList = null;

            using(var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro");

                var responseTask = client.GetAsync("Foro/foroList");

                responseTask.Wait();

                var result = responseTask.Result;
                if(result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<ForoListModel>>();
                    readTask.Wait();

                    foroList = readTask.Result;
                }
                else
                {
                    foroList = Enumerable.Empty<ForoListModel>();

                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return View(foroList);
        }

        //lo mismo que el anterior, pero solo cuando el usuario se logea
        [HttpGet]
        public IActionResult IndexForoListUserLog()
        {
            IEnumerable<ForoListModel> foroList = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro");

                var responseTask = client.GetAsync("Foro/foroList");

                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<ForoListModel>>();
                    readTask.Wait();

                    foroList = readTask.Result;
                }
                else
                {
                    foroList = Enumerable.Empty<ForoListModel>();

                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return View(foroList);
        }

        //para ver las publicaciones hechas
        [HttpGet]
        public async Task<IActionResult> verPost(int Id)
        {
            ContentForoModel foroModel = new ContentForoModel();

            using(var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro");

                var responseTask = client.GetAsync("Foro/verPost/" + Id);

                responseTask.Wait();

                var result = responseTask.Result;

                if(result.IsSuccessStatusCode)
                {
                    //var readTask = result.Content.ReadAsAsync<ContentForoModel>();
                    //readTask.Wait();

                    var apiResp = await result.Content.ReadAsStringAsync();

                    //foroModel = readTask.Result;

                    foroModel = JsonConvert.DeserializeObject<ContentForoModel>(apiResp);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return View(foroModel);
        }

        [HttpGet]
        public async Task<IActionResult> verPostUserLog(int Id)
        {
            ContentForoModel foroModel = new ContentForoModel();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro");

                var responseTask = client.GetAsync("Foro/verPost/" + Id);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    //var readTask = result.Content.ReadAsAsync<ContentForoModel>();
                    //readTask.Wait();

                    var apiResp = await result.Content.ReadAsStringAsync();

                    //foroModel = readTask.Result;

                    foroModel = JsonConvert.DeserializeObject<ContentForoModel>(apiResp);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return View(foroModel);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        [HttpGet]
        public ActionResult Contactarse(){
            return View();
        }

        [HttpPost]
        public ActionResult btnContactarse(object sender, EventArgs e, string nombre, string apellido, string correo, string telefono, string mensaje)
        {
            
            
            string body = "<body>" +
                
                "<h1>Mensaje Huertbog / Titulo del post</h1>" +
                "<h2>Datos del usuario</h2>"+
                "<p>Nombre: "+nombre+"</p></n>"+
                "<p>Apellido: " + apellido + "</p></n>" +
                "<p>telefono: " + telefono + "</p></n>" +
                "<p>correo: " + correo + "</p></n>" +
                "<h2>Mensaje:</h2>" +
                 mensaje + "</n>" +
                "<p>Sí presenta algún inconveniente con el mensaje dejanoslo saber al siguiente correo: Huertbog@gmail.com</P>" +
                "</body>";

            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential("huertbog@gmail.com", "udechuertbog");
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(correo, "Huertbog");
            mail.To.Add(new MailAddress("danielmora_99@hotmail.com"));
            mail.Subject = "Mensaje de un usuario Huertbog";
            mail.IsBodyHtml = true;
            mail.Body = body;

            smtp.Send(mail);

            return RedirectToAction("IndexForoList", "ForoControllerMVC");
        }




    }
}