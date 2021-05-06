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
using System.Net.Http.Json;
using Microsoft.AspNetCore.Authorization;
using Huerbog.Models.UserList;
using Huerbog.Models.Reacciones;

namespace Huerbog.Controllers.MVC_Controller
{
    [AllowAnonymous]
    public class ForoControllerMVC : Controller
    {
        HUERBOGContext db = new HUERBOGContext();

        private readonly ILogger<ForoControllerMVC> _logger;

        public ForoControllerMVC(ILogger<ForoControllerMVC> logger)
        {
            _logger = logger;
        }

        //página principal de la aplicación, muestra la lista de publicaciones hechas
        
        public IActionResult IndexForoList(string id, string Buscar)
        {
            IEnumerable<ForoListModel> foroList = null;

            if (Buscar != null)
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                    var responseTask = client.GetAsync("foroListSearch/" + Buscar);

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

            if (id == "comerce")
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                    var responseTask = client.GetAsync("foroListComerce");

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

            if (id == "all")
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                    var responseTask = client.GetAsync("foroList");

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

            if (id == "general")
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                    var responseTask = client.GetAsync("foroListGeneral");

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

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                var responseTask = client.GetAsync("foroList");

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

        //Contactarse no registrado

        [HttpGet]
        public ActionResult Contactarse(int id)
        {
            Contactarse contact = new Contactarse();

            contact.IdPost = id;

            return View(contact);
        }

        public ActionResult Contactarse(Contactarse contact)
        {
           // contact.IdPost = 1;
            HttpClient client = new HttpClient();
            

            client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

            var insertrec = client.PostAsJsonAsync<Contactarse>("sendMail", contact);

            insertrec.Wait();

            if (insertrec.Result.IsSuccessStatusCode==true)
            {
                return RedirectToAction("IndexForoList");
            }
            else
            {
                return View();
            }

        }

        //reacciones
        public IActionResult btnLike(int id)
        {
            UserReaccionesModel user = new UserReaccionesModel();

            using (var client = new HttpClient())
            {
                var token = HttpContext.Session.GetString("JWToken");

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                user.idForo = id;

                user.idUser = token;

                //var responseTask = client.GetAsync("btnLike/ " + id, (HttpCompletionOption)id);

                var responseTask = client.PostAsJsonAsync<UserReaccionesModel>("btnLike", user);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("verPost", new {id});
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View(ModelState);
                }
            }
        }

        [HttpPost]
        public ActionResult btnDislike(int id)
        {
            UserReaccionesModel user = new UserReaccionesModel();
            using (var client = new HttpClient())
            {
                var token = HttpContext.Session.GetString("JWToken");

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                user.idForo = id;

                user.idUser = token;

                var responseTask = client.PostAsJsonAsync<UserReaccionesModel>("btnDislike", user);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("verPost", new { id });
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View(ModelState);
                }
            }
        }

        //ver lista de huerteros por red de huerteros
        
        public ActionResult searchRed(string Buscar)
        {
            IEnumerable<Usuario> userInfo = null;

            using (var client = new HttpClient())
            {
                if(Buscar != null)
                {
                    client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                    var responseTask = client.GetAsync("searchUser/" + Buscar);

                    var result = responseTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<IList<Usuario>>();

                        readTask.Wait();

                        userInfo = readTask.Result;
                    }
                    else
                    {
                        TempData["alert"] = "Busqueda no encontrada";
                    }

                    return View(userInfo);
                }
                else
                {
                    client.BaseAddress = new Uri("https://localhost:44325/api/Admin/");

                    var responseTask = client.GetAsync("getUsers");

                    responseTask.Wait();

                    var result = responseTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<IList<Usuario>>();
                        readTask.Wait();

                        userInfo = readTask.Result;
                    }
                    else
                    {
                        userInfo = Enumerable.Empty<Usuario>();

                        ModelState.AddModelError(string.Empty, "Error del servidor");
                    }

                    return View(userInfo);
                }
            }
        }

        [HttpGet]
        public ActionResult mapaHuertas()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                var responseTask = client.GetAsync("mapaHuertas");

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    return View();
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View(ModelState);
                }
            }
        }

        [HttpGet]
        public async Task<IActionResult> pruebaGeolocation(int id)
        {
            TablaHuertum userHuerta = new TablaHuertum();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                var responseTask = await client.GetAsync("pruebaGeolocation/" + id);

                if (responseTask.IsSuccessStatusCode)
                {
                    var apiResp = await responseTask.Content.ReadAsStringAsync();

                    userHuerta = JsonConvert.DeserializeObject<TablaHuertum>(apiResp);

                    return View(userHuerta);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View(ModelState);
                }
            }
        }

        [HttpPost]
        public IActionResult pruebaGeolocation(TablaHuertum model)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                var responseTask = client.PostAsJsonAsync<TablaHuertum>("updateHuerta", model);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    
                    return RedirectToAction("viewPerfil", "UsuariosControllerMVC");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View(ModelState);
                }
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}