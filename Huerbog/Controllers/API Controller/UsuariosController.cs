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
using Huerbog.Models.Request;
using Huerbog.Models;
using Newtonsoft.Json;
using Huerbog.Utils;
using System.Text;

namespace Huerbog.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        [EnableCors("Permitir")]
        public class UsuariosController : ControllerBase
        {
            [HttpGet]
            public IActionResult get()
            {
                using (HUERBOGContext db = new HUERBOGContext())
                {
                    IList<Usuario> u = null;

                    //var userHuertaList = db.Usuarios.FromSqlRaw("Exec UserAndHuertaSelect");

                    u = db.Usuarios.ToList<Models.Usuario>();
                    return Ok(u);
                }
            }

            [HttpPost]
            public IActionResult post([FromBody] UserHuertaModel model)
            {
                    using (HUERBOGContext db = new HUERBOGContext())
                    {
                        if (!(db.Usuarios.Any(x => x.Correo.Equals(model.Correo)) || db.Usuarios.Any(x => x.Telefono.Equals(model.Telefono))
                        || db.TablaHuerta.Any(x => x.UbicacionHuerta.Equals(model.UbicacionHuerta))))
                        {
                            Usuario oUsuar = new Usuario();

                            TablaHuertum tHuerta = new TablaHuertum();

                            oUsuar.Nombre = model.Nombre;
                            oUsuar.Correo = model.Correo;
                            oUsuar.Apellido = model.Apellido;
                           oUsuar.Salt = Convert.ToBase64String(common.GetRandomSalt(16));
                            oUsuar.Contraseña = Convert.ToBase64String(common.SaltHashPassword(Encoding.ASCII.GetBytes(model.Contraseña),
                                                                Convert.FromBase64String(oUsuar.Salt)));
                            oUsuar.Red = model.Red;
                            oUsuar.Telefono = model.Telefono;
                            tHuerta.UbicacionHuerta = model.UbicacionHuerta;
                            tHuerta.DescHuerta = model.DescHuerta;
                            tHuerta.AreaCultivo = model.AreaCultivo;

                            var uNombre = new SqlParameter("@nombre", oUsuar.Nombre);
                            var uApellido = new SqlParameter("@apellido", oUsuar.Apellido);
                            var uCorreo = new SqlParameter("@correo", oUsuar.Correo);
                            var uSalt = new SqlParameter("@salt", oUsuar.Salt);
                            var uContraseña = new SqlParameter("@contraseña", oUsuar.Contraseña);
                            var uRed = new SqlParameter("@red", oUsuar.Red);
                            var uTelefono = new SqlParameter("@telefono", oUsuar.Telefono);
                            var hUbicacionHuerta = new SqlParameter("@ubicacionHuerta", tHuerta.UbicacionHuerta);
                            var hDescHuerta = new SqlParameter("@descHuerta", tHuerta.DescHuerta);
                            var hAreaCultivo = new SqlParameter("@areaCultivo", tHuerta.AreaCultivo);

                            db.Database.ExecuteSqlRaw("Exec UserAndHuertaInsert @nombre, @apellido, @correo, @salt, @contraseña, @red, @telefono," +
                                "@ubicacionHuerta, @descHuerta, @areaCultivo",
                            new[] { uNombre, uApellido, uCorreo, uSalt, uContraseña, uRed, uTelefono, hUbicacionHuerta, hDescHuerta, hAreaCultivo });


                            //solo brayan
                            /*db.Database.ExecuteSqlRaw("Exec UserAndHuertaInsert @nombre, @apellido, @correo, @salt, @contraseña, " +
                            "@ubicacionHuerta, @descHuerta, @areaCultivo, @red, @telefono",
                                new[] { uNombre, uApellido, uCorreo, uSalt, uContraseña, hUbicacionHuerta, hDescHuerta, hAreaCultivo, uRed, uTelefono });*/

                    db.SaveChanges();
                        }
                        else
                        {
                            return Ok("Ubicación de huerta, correo o teléfono ya existente");
                        }
                    }
                return Ok();
            }

            [HttpPut]
            public ActionResult put([FromBody]Usuario model)
            {
                using (HUERBOGContext db = new HUERBOGContext())
                {
                    Usuario oUsuar = db.Usuarios.Find(model.IdusuarioReg);

                    if (model.Correo == oUsuar.Correo || model.Telefono == oUsuar.Telefono)
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
            public ActionResult DeleteUser([FromBody] Usuario user)
            {
                using (HUERBOGContext db = new HUERBOGContext())
                {
                    var User = db.Usuarios.Find(user.IdusuarioReg);
                    var userHuerta = db.TablaHuerta.Find(user.IdusuarioReg);

                    db.TablaHuerta.Remove(userHuerta);
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
                using (HUERBOGContext db = new HUERBOGContext())
                {
                    var check = db.Usuarios.Where(x => x.Correo == correo).FirstOrDefault();

                    return check != null;
                }
            }

            public bool check_tel_number(string telefono)
            {
                using (HUERBOGContext db = new HUERBOGContext())
                {
                    var check = db.Usuarios.Where(x => x.Telefono == telefono).FirstOrDefault();

                    return check != null;
                }
            }

            public bool check_ubicacionHuerta(string ubicacionHuerta)
            {
                using (HUERBOGContext db = new HUERBOGContext())
                {
                    var check = db.TablaHuerta.Where(x => x.UbicacionHuerta == ubicacionHuerta).FirstOrDefault();

                    return check != null;
                }
            }
    }
}
