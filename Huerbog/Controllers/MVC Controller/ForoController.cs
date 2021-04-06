using Huerbog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Controllers.MVC_Controller
{
    public class ForoController : Controller
    {
        private readonly ILogger<ForoController> _logger;

        public ForoController(ILogger<ForoController> logger)
        {
            _logger = logger;
        }

        public IActionResult IndexRegistrado()
        {
            return View();
        }

        public IActionResult publicar()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
