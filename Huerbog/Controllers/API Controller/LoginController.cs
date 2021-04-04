using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Huerbog.Models.Request;
using Huerbog.Models;
using Huerbog.Utils;
using System.Text;

namespace Huerbog.Controllers.API_Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Permitir")]
    public class LoginController : ControllerBase
    {
        HUERBOGContext db = new HUERBOGContext();

        [HttpPost]
        public IActionResult login([FromBody] Usuario model)
        {
            if (db.Usuarios.Any(x => x.Correo.Equals(model.Correo)))
            {
                Usuario user = db.Usuarios.Where(x => x.Correo.Equals(model.Correo)).FirstOrDefault();
                //calcula la el hash de la contraseña de los datos del cliente y lo compara con la contraseña
                //hash en el servidor con SALT
               var client_post_hash_password = Convert.ToBase64String(common.SaltHashPassword(Encoding.ASCII.GetBytes(
                                                                        model.Contraseña), Convert.FromBase64String(user.Salt)));
                if(client_post_hash_password.Equals(user.Contraseña))
                {
                    return Ok(user);
                }
                else
                {
                    return Ok("Contraseña incorrecta");
                }
            
            }
            else
            {
                return Ok("Usuario no encontrado");
            }
        }
    }
}
