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
        public IActionResult IndexForoList(string id)
        {
            IEnumerable<ForoListModel> foroList = null;

            if (id == "comerce")
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                    var responseTask = client.GetAsync("foroListComercio");

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

        [HttpGet]
        public async Task<IActionResult> downloadFile(int Id)
        {
            ContentForoModel foroModel = new ContentForoModel();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44325/api/Foro/");

                var responseTask = client.GetAsync("downloadFile/" + Id);

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
    }
}