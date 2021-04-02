using Microsoft.AspNetCore.Cors;
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
    [EnableCors("Permitir")]

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
        public ActionResult post([FromBody] Models.Usuario model)
        {
            var existsMail = check_email(model.Correo);

            var existsTelNumber = check_tel_number(model.Telefono); 

            if (existsMail || existsTelNumber)
            {
                ModelState.AddModelError("existNumberOrMail", "El correo o el número de tel ya existe");

                return Ok("El correo o el número de tel ya existe");
            }

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
            using (Models.HUERBOGContext db = new Models.HUERBOGContext())
            {
                Models.Usuario oUsuar = db.Usuarios.Find(model.IdusuarioReg);

                if(model.Correo == oUsuar.Correo || model.Telefono == oUsuar.Telefono)
                {
                    
                    oUsuar.Nombre = model.Nombre;
                    oUsuar.Correo = model.Correo;
                    oUsuar.Apellido = model.Apellido;
                    oUsuar.Contraseña = model.Contraseña;
                    db.Entry(oUsuar).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                }
                else
                {
                    var existsMail = check_email(model.Correo);

                    var existsTelNumber = check_tel_number(model.Telefono);

                    if (existsMail || existsTelNumber)
                    {
                        ModelState.AddModelError("existNumberOrMail", "El correo o el número de tel ya existe");

                        return Ok("El correo o el número de tel ya existe");
                    }

                    oUsuar.Nombre = model.Nombre;
                    oUsuar.Correo = model.Correo;
                    oUsuar.Apellido = model.Apellido;
                    oUsuar.Contraseña = model.Contraseña;
                    db.Entry(oUsuar).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    db.SaveChanges();
                }
            }
            return Ok();
        }

        [HttpDelete]
        public ActionResult DeleteUser([FromBody] Models.Usuario user)
        {
            using(Models.HUERBOGContext db = new Models.HUERBOGContext())
            {
                var User = db.Usuarios.Find(user.IdusuarioReg);

                db.Usuarios.Remove(User);
                db.SaveChanges();
            }

            return Ok("Usuario eliminado");
        }

        //Creación publicaciones
        

        [NonAction]
        //métodos para verificar la existencia de un correo o núm. de teléfono, devuelve un bool
        public bool check_email(string correo)
        {
            using(Models.HUERBOGContext db = new Models.HUERBOGContext())
            {
                var check = db.Usuarios.Where(x=>x.Correo == correo).FirstOrDefault();

                return check != null;
            }
        }

        public bool check_tel_number(string telefono)
        {
            using (Models.HUERBOGContext db = new Models.HUERBOGContext())
            {
                var check = db.Usuarios.Where(x => x.Telefono == telefono).FirstOrDefault();

                return check != null;
            }
        }
    }
}
