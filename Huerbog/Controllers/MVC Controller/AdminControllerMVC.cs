using Huerbog.Models.Request;
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

namespace Huerbog.Controllers.MVC_Controller
{
    public class AdminControllerMVC : Controller
    {
        private readonly ILogger<AdminControllerMVC> _logger;

        public AdminControllerMVC(ILogger<AdminControllerMVC> logger)
        {
            _logger = logger;
        }

        HUERBOGContext db = new HUERBOGContext();

        [HttpGet]
        public IActionResult indexAdmin()
        {
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
            UserListModel userInfo = new UserListModel();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Admin");

                var responseTask = client.GetAsync("Admin/viewUser/" + id);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var apiResp = await result.Content.ReadAsStringAsync();

                    userInfo = JsonConvert.DeserializeObject<UserListModel>(apiResp);
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Error del servidor");
                }
            }

            return View(userInfo);
        }

        [HttpGet]
        public async Task<IActionResult> deleteUser(int id)
        {
            UserListModel userInfo = new UserListModel();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Admin");

                var responseTask = client.DeleteAsync("Admin/deleteUser/" + id);

                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var apiResp = await result.Content.ReadAsStringAsync();

                    userInfo = JsonConvert.DeserializeObject<UserListModel>(apiResp);

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
    }
}
