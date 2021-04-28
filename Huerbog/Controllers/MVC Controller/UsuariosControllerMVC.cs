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
using System.IO;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> login(Usuario model)
        {
            if(ModelState.IsValid)
            {
                HttpClient hc = new HttpClient();
                hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios");

                var login = await hc.PostAsJsonAsync<Usuario>("Usuarios/login", model);

                if (login.StatusCode.ToString() == "Unauthorized")
                {
                    TempData["alert"] = "Los datos son incorrectos";
                    return View();
                }

                if(login.StatusCode.ToString() == "NotFound")
                {
                    TempData["alert"] = "Usuario no encontrado";
                    return View();
                }

                var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                identity.AddClaim(new Claim(ClaimTypes.Name, model.Correo));

                var principal = new ClaimsPrincipal(identity);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                HttpContext.Session.SetString("JWToken", login.ToString());
                TempData["alert"] = "Bienvenido" + model.Correo;
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
        public async Task<IActionResult> createPost(ForoTemaModel model)
        {
            var formContent = new MultipartFormDataContent();
            var fileName = Path.GetFileName(model.ContentFile.FileName);
            var fileExt = Path.GetExtension(fileName);
            var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExt);

            formContent.Add(new StringContent(model.TituloPost), "TituloPost");
            formContent.Add(new StringContent(model.DescPost), "DescPost");
            formContent.Add(new StringContent(model.Contenido), "Contenido");
            formContent.Add(new StringContent(model.IdCatPublFk.ToString()), "IdCatPublFk");
            formContent.Add(new StringContent(newFileName), "FileName");
            formContent.Add(new StringContent(fileExt), "FileType");

            formContent.Add(new StreamContent(model.ContentFile.OpenReadStream()), "ContentFile", Path.GetFileName(model.ContentFile.FileName));

            HttpClient hc = new HttpClient();
            hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

            //var userPost = hc.PostAsJsonAsync<ForoTemaModel>("Usuarios/createPost", model);

            var userPost = await hc.PostAsync("createPost", formContent);


            if(userPost.IsSuccessStatusCode == true)
            {
                return RedirectToAction("IndexForoListUserLog", "ForoControllerMVC");
            }
            else
            {
                return View();
            }
        }

        //reportar publicación
        public IActionResult reportPost(int id)
        { 
            using(var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                var responseTask = client.GetAsync("reportPost/" + id);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("IndexForoListUserLog", "ForoControllerMVC");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View(ModelState);
                }
            }
        }

    }
}