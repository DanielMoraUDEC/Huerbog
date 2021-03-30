using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace Huerbog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        
        [HttpGet]
        public IActionResult get()
        {
            
            using (Models.HUERBOGContext u = new Models.HUERBOGContext())
            {
                /*  var lst = (from d in u.Usuario
                             select d).ToList();
                      )
                  return Ok(lst);*/

                return Ok(u.Usuarios.ToList());
            }


            
        }
        
    }
}
