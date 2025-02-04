﻿using Huerbog.Models.Request;
using Huerbog.Models.UserList;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Huerbog.Models;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Huerbog.Models.ForoList;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace Huerbog.Controllers.MVC_Controller
{
    [Authorize]
    public class AdminControllerMVC : Controller
    {
        private readonly ILogger<AdminControllerMVC> _logger;

        public AdminControllerMVC(ILogger<AdminControllerMVC> logger)
        {
            _logger = logger;
        }

        HUERBOGContext db = new HUERBOGContext();

        [HttpGet]
        public async Task<IActionResult> indexAdminAsync()
        {
            HttpClient hc = new HttpClient();

            var token = HttpContext.Session.GetString("JWToken");

            hc.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

            hc.BaseAddress = new Uri("https://localhost:44325/api/Usuarios/");

            var checkAdmin = await hc.GetAsync("checkAdmin");

            if (checkAdmin.IsSuccessStatusCode)
            {
                return RedirectToAction("IndexForoList", "ForoControllerMVC");
            }

            if (checkAdmin.StatusCode.ToString() == "BadRequest")
            {
                return View();
            }


            return View();
        }

        [HttpGet]
        public IActionResult listUsers()
        {
            IEnumerable<UserListModel> userInfo = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Admin/");

                var responseTask = client.GetAsync("getUsers");

                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<UserListModel>>();
                    readTask.Wait();

                    userInfo = readTask.Result;
                }
                else
                {
                    userInfo = Enumerable.Empty<UserListModel>();

                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return View(userInfo);

        }

        [HttpGet]
        public async Task<IActionResult> viewUser(int id)
        {
            using (var client = new HttpClient())
            {
                var baseAddress = "https://localhost:44325";

                client.BaseAddress = new Uri(baseAddress);

                var responseTask = await client.GetAsync(baseAddress + "/api/Admin/viewUser/" + id);

                if (responseTask.IsSuccessStatusCode)
                {
                    var apiResp = await responseTask.Content.ReadAsStringAsync();

                    var userInfo = JsonConvert.DeserializeObject<UserForoModel>(apiResp);

                    return View(userInfo);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return View();
                }
            }

            
        }

        [HttpGet]
        public IActionResult deleteUser(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Admin");

                var responseTask = client.DeleteAsync("Admin/deleteUser/" + id);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    ViewBag.message = "Eliminación de usuario correcta";
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return RedirectToAction("listUsers");
        }

        [HttpGet]
        public IActionResult getReportedPost()
        {
            IEnumerable<ForoListModel> foroList = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Admin/");

                var responseTask = client.GetAsync("getReportedPost");

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

            return RedirectToAction("getReportedPost");
        }

        [HttpGet]
        public IActionResult viewDirHuertas()
        {
            IEnumerable<UserHuertaListModel> userInfo = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Admin/");

                var responseTask = client.GetAsync("viewDirHuerta");

                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<IList<UserHuertaListModel>>();
                    readTask.Wait();

                    userInfo = readTask.Result;
                }
                else
                {
                    userInfo = Enumerable.Empty<UserHuertaListModel>();

                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return View(userInfo);

        }

        public IActionResult hacerAdmin(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Admin/");

                var responseTask = client.PostAsJsonAsync<int>("hacerAdmin", id);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    ViewBag.message = "Acceso de administrador concedido";

                    return RedirectToAction("listUsers");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");

                    return RedirectToAction("listUsers");
                }
            }
        }
    }
}
