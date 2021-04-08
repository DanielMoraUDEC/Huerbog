using Huerbog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Huerbog.Controllers.API_Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForoController : ControllerBase
    {
        HUERBOGContext db = new HUERBOGContext();

        [HttpGet]
        public IActionResult get()
        {
            using (HUERBOGContext db = new HUERBOGContext())
            {
                IList<Foro> u = null;

                var userHuertaList = db.Foros.FromSqlRaw("Exec UserAndHuertaSelect");

                u = db.Foros.ToList<Models.Foro>();
                return Ok(u);
            }
        }

    }
}
