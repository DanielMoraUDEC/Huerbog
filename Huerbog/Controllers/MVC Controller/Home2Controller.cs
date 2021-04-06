using Huerbog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Controllers.MVC_Controller
{
    public class Home2Controller : Controller
    {

        private readonly ILogger<Home2Controller> _logger;

        public Home2Controller(ILogger<Home2Controller> logger)
        {
            _logger = logger;
        }

        public IActionResult IndexRegistrado()
        {
            return View();
        }

        public IActionResult Privacy()
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
