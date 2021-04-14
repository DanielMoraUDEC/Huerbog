using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Huerbog.Models.Request;
using Huerbog.Models;


namespace Huerbog.Controllers
{
    public class UsuariosControllerMVC : Controller
    {
        [HttpGet]
        public ActionResult get()
        {
            //IEnumerable<Models.Usuario> u = null;

            Usuario u = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios");

                var responseTask = client.GetAsync("get");

                responseTask.Wait();

                var result = responseTask.Result;

                if(result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<Usuario>();
                    
                    readTask.Wait();

                    u = readTask.Result;
                }
                else //web api sent error response 
                {
                    //log response status here..

                    //u = (Models.Usuario)Enumerable.Empty<Models.Usuario>();

                    ModelState.AddModelError(string.Empty, "Server error. Please contact administrator.");
                }
            }
            return View(u);
        }

        [HttpGet]
        public IActionResult post()
        {
            return View();
        }

        [HttpPost]
        public IActionResult post(UserHuertaModel model)
        {
            HttpClient hc = new HttpClient();
            hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios");

            var insertrec = hc.PostAsJsonAsync<UserHuertaModel>("Usuarios/post", model);

            insertrec.Wait();

            ModelState.Clear();

            return RedirectToAction("IndexForoList", "ForoControllerMVC");

        }

        [HttpGet]
        public IActionResult login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult login(Usuario model)
        {
            HttpClient hc = new HttpClient();
            hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios");

            var login = hc.PostAsJsonAsync<Usuario>("Usuarios/login", model);

            var userId = hc.GetFromJsonAsync<Usuario>("Usuarios/getId");

            login.Wait();

            ViewBag.Id = userId;

            return RedirectToAction("IndexForoListUserLog", "ForoControllerMVC");
        }

        [HttpGet]
        public IActionResult createPost()
        {
            return View();
        }

        [HttpPost]
        public IActionResult createPost(ForoTemaModel model)
        {
            HttpClient hc = new HttpClient();
            hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios");

            var userPost = hc.PostAsJsonAsync<ForoTemaModel>("Usuarios/createPost", model);

            userPost.Wait();
            //metodo
            return RedirectToAction("IndexForoListUserLog", "ForoControllerMVC");
        }

    }
}