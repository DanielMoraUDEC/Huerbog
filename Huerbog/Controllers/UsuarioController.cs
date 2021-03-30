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
        public ActionResult get()
        {

            using (Models.HUERBOGContext u = new Models.HUERBOGContext())
            {
                return Ok(u.Usuarios.ToList());
            }
        }
        [HttpPost]
        public ActionResult post([FromBody] Models.Request.CrudUsuario model)
        {
            using (Models.HUERBOGContext u = new Models.HUERBOGContext())
            {
                Models.Usuario oUsuar = new Models.Usuario();
                oUsuar.Nombre = model.Nombre;
                oUsuar.Correo = model.Correo;
                oUsuar.Apellido = model.Apellido;
                oUsuar.Contraseña = model.Contraseña;
                u.Usuarios.Add(oUsuar);
                u.SaveChanges();
            }
            return Ok();
        }

        [HttpPut]
        public ActionResult put([FromBody] Models.Usuario model)
        {
            using (Models.HUERBOGContext u = new Models.HUERBOGContext())
            {
                Models.Usuario oUsuar = new Models.Usuario();
                oUsuar.Nombre = model.Nombre;
                oUsuar.Correo = model.Correo;
                oUsuar.Apellido = model.Apellido;
                oUsuar.Contraseña = model.Contraseña;
                u.Usuarios.Add(oUsuar);
                u.SaveChanges();
            }
            return Ok();
        }

        
    }
}
