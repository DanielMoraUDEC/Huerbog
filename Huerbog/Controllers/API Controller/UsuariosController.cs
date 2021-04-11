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
using System.Net.Mail;
using System.Net;
using System.IO;
using Microsoft.AspNetCore.Mvc.Rendering;
using Huerbog.Models.Login;


//Scaffold-DBContext "Server=DESKTOP-3GPQMK0;Database=HUERBOG;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force

namespace Huerbog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Permitir")]
    public class UsuariosController : ControllerBase
    {
        HUERBOGContext db = new HUERBOGContext();

        UserLogin u = new UserLogin();

        [HttpGet]
        [Route("get")]
        public IActionResult get()
        {
            using (HUERBOGContext db = new HUERBOGContext())
            {
                return Ok(db.Usuarios.ToList<Usuario>());
            }
        }

        [HttpPost]
        [Route("post")]
        public IActionResult post([FromBody] UserHuertaModel model)
        {
            var message = "";

            #region generar código de activación
            model.ActivationCode = Guid.NewGuid();
            #endregion

            #region
            model.IsMailConfirmed = false;
            #endregion

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
                    oUsuar.ActivationCode = model.ActivationCode;
                    oUsuar.IsMailConfirmed = model.IsMailConfirmed;
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
                    var uIsMailConfirmed = new SqlParameter("@IsMailConfirmed", model.IsMailConfirmed);
                    var uActivationCode = new SqlParameter("@ActivationCode", oUsuar.ActivationCode);
                    var hUbicacionHuerta = new SqlParameter("@ubicacionHuerta", tHuerta.UbicacionHuerta);
                    var hDescHuerta = new SqlParameter("@descHuerta", tHuerta.DescHuerta);
                    var hAreaCultivo = new SqlParameter("@areaCultivo", tHuerta.AreaCultivo);



                    db.Database.ExecuteSqlRaw("Exec UserAndHuertaInsert @nombre, @apellido, @correo, @salt, @contraseña, @red, @telefono," +
                        "@IsMailConfirmed, @ActivationCode, @ubicacionHuerta, @descHuerta, @areaCultivo",
                    new[] { uNombre, uApellido, uCorreo, uSalt, uContraseña, uRed, uTelefono, uIsMailConfirmed, uActivationCode, hUbicacionHuerta, hDescHuerta, hAreaCultivo });


                    //solo brayan
                    /*db.Database.ExecuteSqlRaw("Exec UserAndHuertaInsert @nombre, @apellido, @correo, @salt, @contraseña, " +
                    "@ubicacionHuerta, @descHuerta, @areaCultivo, @red, @telefono",
                        new[] { uNombre, uApellido, uCorreo, uSalt, uContraseña, hUbicacionHuerta, hDescHuerta, hAreaCultivo, uRed, uTelefono })*/

                    db.SaveChanges();

                    SendVerificationLinkEmail(model.Correo, model.ActivationCode.ToString());

                    message = "Registro completado satisfactoriamente, el link de activación ha sido enviado a su correo" + model.Correo;

                    var id = db.Usuarios.Where(x => x.Correo == model.Correo).FirstOrDefault();

                    HttpContext.Session.SetInt32("User", id.IdusuarioReg);

                }
                else
                {
                    return Ok("Ubicación de huerta, correo o teléfono ya existente");
                }
            }
            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public IActionResult login([FromBody] Usuario model)
        {
            if (db.Usuarios.Any(x => x.Correo.Equals(model.Correo)))
            {
                Usuario user = db.Usuarios.Where(x => x.Correo.Equals(model.Correo)).FirstOrDefault();
                //calcula la el hash de la contraseña de los datos del cliente y lo compara con la contraseña
                //hash en el servidor con SALT
                var client_post_hash_password = Convert.ToBase64String(common.SaltHashPassword(Encoding.ASCII.GetBytes(
                                                                         model.Contraseña), Convert.FromBase64String(user.Salt)));
                if (client_post_hash_password.Equals(user.Contraseña))
                {
                    HttpContext.Session.SetInt32("User", user.IdusuarioReg);

                    var idLogTemp = db.Usuarios.Where(x => x.Correo == user.Correo).FirstOrDefault();

                    u.idLog = idLogTemp.IdusuarioReg;

                    return Ok(user);
                }
                else
                {
                    return Ok("Contreseña incorrecta");
                }

            }
            else
            {
                return Ok("Usuario no encontrado, puede registrarse");
            }
        }

        [HttpPut]
        public ActionResult put([FromBody] Usuario model)
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

        //Métodos referentes a publicaciones

        [HttpGet]
        [Route("getForo")]
        public IActionResult getForo()
        {
            using (HUERBOGContext db = new HUERBOGContext())
            {
                return Ok(db.Foros.ToList<Foro>());
            }
        }

        [HttpPost]
        [Route("createPost")]
        public IActionResult createPost([FromBody] ForoTemaModel model)
        {
            var userId = HttpContext.Session.GetInt32("User");

            Foro foro = new Foro();

            Tema tema = new Tema(); 

            foro.DescPost = model.DescPost;
            foro.TituloPost = model.TituloPost;
            foro.UrlImg = "~\\Images" + "\\" + model.UrlImg;
            foro.IdUsuario = 1;
            foro.IdCatPublFk = model.IdCatPublFk;
            tema.Contenido = model.Contenido;

            var descPost = new SqlParameter("@descPost", foro.DescPost);
            var tituloPost = new SqlParameter("@tituloPost", foro.TituloPost);
            var urlImg = new SqlParameter("@urlImg", foro.UrlImg);
            var idUsuario = new SqlParameter("@idUsuario", foro.IdUsuario);
            var contenido = new SqlParameter("@contenido", tema.Contenido);
            var idCatPublFK = new SqlParameter("@idCatPublFK", foro.IdCatPublFk);

            db.Database.ExecuteSqlRaw("Exec CreacionPublicaciones @descPost, @tituloPost, @urlImg, @idUsuario," +
                "@contenido, @idCatPublFK", new[] { descPost, tituloPost, urlImg, idUsuario, contenido, idCatPublFK });

            db.SaveChanges();

            return Ok();
        }

        //métodos para verificar la existencia de un correo o núm. de teléfono, devuelve un bool

        [NonAction]
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

        public void SendVerificationLinkEmail(string emailID, string ActivationCode)
        {
            var verifyUrl = "/Usuarios/VerifyAccount/" + ActivationCode;
            var link = Request.Host + verifyUrl;

            var fromEmail = new MailAddress("pepgrillo420@gmail.com");
            var fromEmailPass = "Bareta420";
            var toEmail = new MailAddress(emailID);
            string subject = "Su cuenta ha sido exitosamente activada";

            string body = "<br/><br/>Gracias por registrarse en la página, ahora tiene acceso a más funciones" +
                " como publicar información general o publicar información con respecto a solicitudes u ofrecimientos" +
                " de servicios o productos, recuerde publicar contenido con respecto a las huertas y mantenerse apegado" +
                "a las normas de la comunidad. Por favor haga click en el link de abajo para terminar de verificar su cuenta " +
                "<br/><br/><a href='https//" + link + "'>" + link + "</a>";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPass)
            };

            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })

                smtp.Send(message);
        }

    }
}
