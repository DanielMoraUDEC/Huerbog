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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Huerbog.Controllers
{
    public class UsuariosControllerMVC : Controller
    {
        //obtiene una lista de los usuarios registrados - no funciona
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

        //registro de usuarios
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

        //login de usuarios
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

            login.Wait();

            if(login.Result.IsSuccessStatusCode == true)
            {
                return RedirectToAction("IndexForoListUserLog", "ForoControllerMVC");
            }
            else
            {
                return View();
            }
            
        }

        //muestra la vista con el mensaje de usuario verificado
        [HttpGet]
        public IActionResult userVerification(string id)
        {
            Usuario u = new Usuario();

            using(var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios");

                var responseTask = client.GetAsync("Usuarios/userVerification/" + id);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<Usuario>();
                    readTask.Wait();

                    u = readTask.Result;
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return View(u);
        }

        //creación de publicaciones
        //[Authorize]
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