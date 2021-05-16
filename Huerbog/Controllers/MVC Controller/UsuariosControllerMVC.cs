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
using Huerbog.Models.Login;
using Huerbog.Models.UserList;
using Huerbog.Models.Reacciones;
using Huerbog.Models.ForoView;

namespace Huerbog.Controllers
{
    [Authorize]
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
        [AllowAnonymous]
        public IActionResult post()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult post(UserHuertaModel model)
        {
            if(ModelState.IsValid)
            {
                HttpClient hc = new HttpClient();
                hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                var insertrec = hc.PostAsJsonAsync<UserHuertaModel>("post", model);

                insertrec.Wait();

                if(insertrec.Status.ToString() == "BadRequest")
                {
                    TempData["alert"] = "El correo, teléfono o ubicación de la huerta ya se encuentra registrado";
                    return View();
                }

                ModelState.Clear();

                return RedirectToAction("IndexForoList", "ForoControllerMVC");
            }
            else
            {
                return View();
            }

        }

        //login de usuarios
        [HttpGet]
        [AllowAnonymous]
        public IActionResult login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> login(Usuario model)
        {
            if(ModelState.IsValid)
            {
                HttpClient hc = new HttpClient();
                hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                var login = await hc.PostAsJsonAsync<Usuario>("login", model);

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

                var jsonString = await login.Content.ReadAsStringAsync();

                var userobject = JsonConvert.DeserializeObject<UserLogin>(jsonString);

                if(userobject.Token == null)
                {
                    TempData["alert"] = "Los datos son incorrectos";
                    return View();
                }

                //if(userobject.Correo == "")
                //{
                //    var identity2 = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                //    identity2.AddClaim(new Claim(ClaimTypes.Name, userobject.Correo));

                //    var principal2 = new ClaimsPrincipal(identity2);

                //    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal2);

                //    HttpContext.Session.SetString("JWToken", userobject.Token);

                //    //hc.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", login.ToString());

                //    return RedirectToAction("indexAdmin", "AdminControllerMVC");
                //}

                var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                identity.AddClaim(new Claim(ClaimTypes.Name, userobject.Roles));

                var principal = new ClaimsPrincipal(identity);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

                HttpContext.Session.SetString("JWToken", userobject.Token);

                //hc.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", userobject.Token);

                var token = HttpContext.Session.GetString("JWToken");
                //model.Token = token;

                hc.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var checkAdmin = await hc.GetAsync("checkAdmin");

                if(checkAdmin.IsSuccessStatusCode)
                {
                    return RedirectToAction("IndexForoList", "ForoControllerMVC");
                }

                if(checkAdmin.StatusCode.ToString() == "BadRequest")
                {
                    return RedirectToAction("indexAdmin", "AdminControllerMVC");
                }
                
            }
            else
            {
                return View();
            }

            return View();
        }

        //cerrar sesión
        public async Task<IActionResult> logout()
        {
            await HttpContext.SignOutAsync();
            HttpContext.Session.SetString("JWToken", "");
            return RedirectToAction("IndexForoList", "ForoControllerMVC");
        }

        //muestra la vista con el mensaje de usuario verificado
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> userVerification(string id)
        {
            Usuario u = new Usuario();

            using(var client = new HttpClient())
            {
                var baseAddress = "https://localhost:44325";

                client.BaseAddress = new Uri(baseAddress);

                var responseTask = await client.GetAsync(baseAddress + "/api/Usuarios/userVerification/" + id);

                if (responseTask.IsSuccessStatusCode)
                {
                    var readTask = responseTask.Content.ReadAsAsync<Usuario>();
                    
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
        [HttpGet]
        public IActionResult createPost()
        {
            return View();
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> createPost(ForoTemaModel model)
        {
            HttpClient hc = new HttpClient();

            var formContent = new MultipartFormDataContent();

            if (model.ContentFile == null)
            {
                formContent.Add(new StringContent(model.IdPost.ToString()), "IdPost");
                formContent.Add(new StringContent(model.TituloPost), "TituloPost");
                formContent.Add(new StringContent(model.DescPost), "DescPost");
                formContent.Add(new StringContent(model.Contenido), "Contenido");
                formContent.Add(new StringContent(model.IdCatPublFk.ToString()), "IdCatPublFk");
            }
            else
            {
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

            }

            var token = HttpContext.Session.GetString("JWToken");

            hc.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

            var userPost = await hc.PostAsync("createPost", formContent);

            if(userPost.IsSuccessStatusCode == true)
            {
                return RedirectToAction("IndexForoList", "ForoControllerMVC");
            }
            else
            {
                ViewBag.Message = "La cantidad de publicaciones ha alcanzado el límite";
                ViewBag.Status = true;

                return View();
            }
        }

        //reportar publicación
        [AllowAnonymous]
        public IActionResult reportPost(int id)
        {
            UserReaccionesModel user = new UserReaccionesModel();

            using (var client = new HttpClient())
            {
                var token = HttpContext.Session.GetString("JWToken");

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                user.idForo = id;

                var responseTask = client.PostAsJsonAsync<UserReaccionesModel>("reportPost", user);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("verPost", "ForoControllerMVC", new { id });
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View(ModelState);
                }


            }
        }

        //ver perfil de usuario logeado
        [HttpGet]
        public async Task<IActionResult> viewPerfil()
        {
            UserForoModel userInfo = new UserForoModel(); 

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                var token = HttpContext.Session.GetString("JWToken");

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var responseTask = await client.GetAsync("viewPerfil");

                if (responseTask.IsSuccessStatusCode)
                {
                    var apiResp = await responseTask.Content.ReadAsStringAsync();

                    userInfo = JsonConvert.DeserializeObject<UserForoModel>(apiResp);

                    return View(userInfo);
                }
                else
                {
                    return RedirectToAction("IndexForoList", "ForoControllerMVC");
                }
            }
        }

        //actualizar la información del usuario logeado
        [HttpPost]
        public IActionResult viewPerfil(UserForoModel model)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                var responseTask = client.PostAsJsonAsync<UserForoModel>("updatePerfil", model);

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

        //perfil público para cada usuario
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> viewPerfilPubl(int id)
        {
            UserForoModel userInfo = new UserForoModel();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                var responseTask = await client.GetAsync("viewPerfilPubl/" + id);

                if (responseTask.IsSuccessStatusCode)
                {
                    var apiResp = await responseTask.Content.ReadAsStringAsync();

                    userInfo = JsonConvert.DeserializeObject<UserForoModel>(apiResp);

                    return View(userInfo);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View(ModelState);
                }
            }
        }
        
        //trae la info de la publicación
        [HttpGet]
        public async Task<IActionResult> editPost(int id)
        {
            ForoTemaModel userForo = new ForoTemaModel();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

                var token = HttpContext.Session.GetString("JWToken");

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

                var responseTask = await client.GetAsync("editPost/" + id);

                if (responseTask.IsSuccessStatusCode)
                {
                    var apiResp = await responseTask.Content.ReadAsStringAsync();

                    userForo = JsonConvert.DeserializeObject<ForoTemaModel>(apiResp);

                    return View(userForo);
                }
                else
                {
                    return RedirectToAction("IndexForoList", "ForoControllerMVC");
                }
            }
        }

        //actualiza la info de la publicación
        [HttpPost]
        public async Task<IActionResult> editPost(ForoTemaModel model)
        {
            HttpClient hc = new HttpClient();

            var formContent = new MultipartFormDataContent();
            
            if(model.ContentFile == null)
            {
                formContent.Add(new StringContent(model.IdPost.ToString()), "IdPost");
                formContent.Add(new StringContent(model.TituloPost), "TituloPost");
                formContent.Add(new StringContent(model.DescPost), "DescPost");
                formContent.Add(new StringContent(model.Contenido), "Contenido");
                formContent.Add(new StringContent(model.IdCatPublFk.ToString()), "IdCatPublFk");
            }
            else
            {
                var fileName = Path.GetFileName(model.ContentFile.FileName);
                var fileExt = Path.GetExtension(fileName);
                var newFileName = String.Concat(Convert.ToString(Guid.NewGuid()), fileExt);

                formContent.Add(new StringContent(model.IdPost.ToString()), "IdPost");
                formContent.Add(new StringContent(model.TituloPost), "TituloPost");
                formContent.Add(new StringContent(model.DescPost), "DescPost");
                formContent.Add(new StringContent(model.Contenido), "Contenido");
                formContent.Add(new StringContent(model.IdCatPublFk.ToString()), "IdCatPublFk");
                formContent.Add(new StringContent(newFileName), "FileName");
                formContent.Add(new StringContent(fileExt), "FileType");

                formContent.Add(new StreamContent(model.ContentFile.OpenReadStream()), "ContentFile", Path.GetFileName(model.ContentFile.FileName));
            }


            var token = HttpContext.Session.GetString("JWToken");

            hc.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

            var userPost = await hc.PostAsync("editPost", formContent);

            if (userPost.IsSuccessStatusCode == true)
            {
                var id = model.IdPost;
                return RedirectToAction("verPost", "ForoControllerMVC", new {id});
            }
            else
            {
                return View();
            }
        }

        //elimina el post
        [HttpGet]
        public IActionResult deletePost(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Admin/");

                var responseTask = client.DeleteAsync("deletePost/" + id);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    ViewBag.message = "Eliminación de post correcta";
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return RedirectToAction("viewPerfil");
        }

    }
}