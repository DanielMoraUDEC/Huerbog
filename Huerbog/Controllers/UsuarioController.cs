using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/
/*NO USAR, NO LO BORRO POR SI ALGO, PARA LA API USAR EL QUE ESTÁ EN LA CARPETA API CONTROLLER*/

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
            using (Models.HUERBOGContext db = new Models.HUERBOGContext())
            {
                var userHuertaList = db.Usuarios.FromSqlRaw("Exec UserAndHuertaSelect");

                return Ok(db.Usuarios.FromSqlRaw("Exec UserAndHuertaSelect").ToList());
            }
        }

        [HttpPost]
        public ActionResult post([FromBody] Models.Request.UserHuertaModel model)
        {
           /* var existsMail = check_email(model.Correo);

            var existsTelNumber = check_tel_number(model.Telefono);

            //var existsUbicacion = check_ubicacionHuerta(model.UbicacionHuerta);

            if (existsMail || existsTelNumber)
            {
                ModelState.AddModelError("existNumberOrMail", "El correo, el número de tel o la ubicación de la huerta ya existe");

                return Ok("El correo, el número de tel o la ubicación de la huerta ya existe");
            }
           */
            using (Models.HUERBOGContext u = new Models.HUERBOGContext())

            using (Models.HUERBOGContext db = new Models.HUERBOGContext())
            {
                Models.Usuario oUsuar = new Models.Usuario();

                Models.TablaHuertum tHuerta = new Models.TablaHuertum();

                oUsuar.Nombre = model.Nombre;
                oUsuar.Correo = model.Correo;
                oUsuar.Apellido = model.Apellido;
                oUsuar.Contraseña = model.Contraseña;
                oUsuar.Red = model.Red;
                oUsuar.Telefono = model.Telefono;
                tHuerta.UbicacionHuerta = model.UbicacionHuerta;
                tHuerta.DescHuerta = model.DescHuerta;
                tHuerta.AreaCultivo = model.AreaCultivo;

                var uNombre = new SqlParameter("@nombre", oUsuar.Nombre);
                var uApellido = new SqlParameter("@apellido", oUsuar.Apellido);
                var uCorreo = new SqlParameter("@correo", oUsuar.Correo);
                var uContraseña = new SqlParameter("@contraseña", oUsuar.Contraseña);
                var uRed = new SqlParameter("@red", oUsuar.Red);
                var uTelefono = new SqlParameter("@telefono", oUsuar.Telefono);
                var hUbicacionHuerta = new SqlParameter("@ubicacionHuerta", tHuerta.UbicacionHuerta);
                var hDescHuerta = new SqlParameter("@descHuerta", tHuerta.DescHuerta);
                var hAreaCultivo = new SqlParameter("@areaCultivo", tHuerta.AreaCultivo);

                var idUserReg = db.Usuarios.FromSqlRaw("Exec UserAndHuertaInsert @nombre, @apellido, @correo, @contraseña, @red, @telefono," +
                    "@ubicacionHuerta, @descHuerta, @areaCultivo",
                    new[] { uNombre, uApellido, uCorreo, uContraseña, uRed, uTelefono, hUbicacionHuerta, hDescHuerta, hAreaCultivo });

                db.SaveChanges();

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

        public bool check_ubicacionHuerta(string ubicacion)
        {
            using (Models.HUERBOGContext db = new Models.HUERBOGContext())
            {
                var check = db.TablaHuerta.Where(x => x.UbicacionHuerta == ubicacion).FirstOrDefault();

                return check != null;
            }
        }
    }
}
