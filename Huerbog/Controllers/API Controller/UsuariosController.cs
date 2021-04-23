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
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;


//Scaffold-DBContext "Server=DESKTOP-NQEHQCM\SQLEXPRESS;Database=HUERBOG;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force

namespace Huerbog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Permitir")]
    //[Authorize]
    public class UsuariosController : ControllerBase
    {
        HUERBOGContext db = new HUERBOGContext();

        private readonly IConfiguration config;

        public UsuariosController(IConfiguration _config)
        {
            config = _config;
        }

        //registro de usuarios
        [AllowAnonymous]
        [HttpPost]
        [Route("post")]
        public async Task<IActionResult> post([FromBody] UserHuertaModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var message = "";

            #region generar código de activación
            model.ActivationCode = Guid.NewGuid();
            #endregion

            #region
            model.IsMailConfirmed = false;
            #endregion

            Usuario oUsuar = new Usuario();

            using (HUERBOGContext db = new HUERBOGContext())
            {
                if (!(db.Usuarios.Any(x => x.Correo.Equals(model.Correo)) || db.Usuarios.Any(x => x.Telefono.Equals(model.Telefono))
                || db.TablaHuerta.Any(x => x.UbicacionHuerta.Equals(model.UbicacionHuerta))))
                {
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

                    await db.SaveChangesAsync();

                    SendVerificationLinkEmail(model.Correo, model.ActivationCode.ToString());

                    message = "Registro completado satisfactoriamente, el link de activación ha sido enviado a su correo" + model.Correo;

                }
                else
                {
                    return BadRequest();
                }
            }

            return Ok();
        }

        //logeo de usuarios
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login([FromBody] Usuario model)
        {
            if(ModelState.IsValid)
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
                        var SecretKey = config.GetValue<string>("SecretKey");
                        var key = Encoding.ASCII.GetBytes(SecretKey);

                        var claims = new ClaimsIdentity(new Claim[] 
                        {
                            new Claim(ClaimTypes.Name, user.Correo)
                        });
                        claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Correo));

                        var tokenDesc = new SecurityTokenDescriptor
                        {
                            Subject = claims,
                            Expires = DateTime.UtcNow.AddHours(4),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                        };

                        var tokenHandler = new JwtSecurityTokenHandler();
                        var createdToken = tokenHandler.CreateToken(tokenDesc);

                        string bearer_token = tokenHandler.WriteToken(createdToken);

                        using(var client = new HttpClient())
                        {
                            client.DefaultRequestHeaders.Add("Authorization", "Bearer" + bearer_token);
                        }

                        return Ok(bearer_token);
                    }
                    else
                    {
                        return Unauthorized();
                    }

                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return Ok(ModelState);
            }
        }

        //obtiene el token del usuario logeado actualmente
        [HttpGet]
        [Route("getCurrUser")]
        public IActionResult getCurrUser()
        {
            var r = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
            return Ok(r == null ? "" : r.Value);
        }

        //verifica el registro de un usuario
        [HttpGet]
        [Route("userVerification/{id}")]
        public IActionResult userVerification(string id)
        {
            var v = db.Usuarios.Where(a => a.ActivationCode == new Guid(id)).FirstOrDefault();

            if(v != null)
            {
                v.IsMailConfirmed = true;
                db.SaveChanges();
            }

            return Ok();
        }

        //Métodos referentes a publicaciones

        /*[HttpGet]
        [Route("getForo")]
        public IActionResult getForo()
        {
            using (HUERBOGContext db = new HUERBOGContext())
            {
                return Ok(db.Foros.ToList<Foro>());
            }
        }*/

        //crea una publicación
        [HttpPost]
        [Route("createPost")]
        public async Task<IActionResult> createPost([FromForm]ForoTemaModel model)
        {
            //var claimsIdentity = this.User.Identity as ClaimsIdentity;
            //var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;

            Foro foro = new Foro();

            Tema tema = new Tema();

            //var user = db.Usuarios.Where(x => x.Correo.Equals(userId)).FirstOrDefault();

            using(var target = new MemoryStream())
            {
                await model.ContentFile.CopyToAsync(target);
                tema.ContentFile = target.ToArray();
            }

            foro.DescPost = model.DescPost;
            foro.TituloPost = model.TituloPost;
            foro.IdUsuario = 1;
            foro.IdCatPublFk = (int) model.IdCatPublFk;
            tema.FileName = model.FileName;
            tema.FileType = model.FileType;
            tema.Contenido = model.Contenido;

            var descPost = new SqlParameter("@descPost", foro.DescPost); 
            var tituloPost = new SqlParameter("@tituloPost", foro.TituloPost);
            var idUsuario = new SqlParameter("@idUsuario", foro.IdUsuario);
            var contenido = new SqlParameter("@contenido", tema.Contenido);
            var idCatPublFK = new SqlParameter("@idCatPublFK", foro.IdCatPublFk);
            var content_file = new SqlParameter("@content_file", tema.ContentFile);
            var file_name_ = new SqlParameter("@file_name_", tema.FileName);
            var FileType = new SqlParameter("@FileType", tema.FileType);

            try
            {
                db.Database.ExecuteSqlRaw("Exec CreacionPublicaciones @descPost, @tituloPost, @idUsuario," +
                "@contenido, @idCatPublFK, @content_file, @FileType, @file_name_", new[] { descPost,
                    tituloPost, idUsuario, contenido, idCatPublFK, content_file, FileType, file_name_ });

                db.SaveChanges();

                return Ok();
            }catch(Exception ex)
            {
                throw ex;
            }
        }

      
        //métodos para uso único de la clase actual
        [NonAction]

        //envía el correo con un link de verificación de usuario
        public void SendVerificationLinkEmail(string emailID, string ActivationCode)
        {
            var verifyUrl = "/UsuariosControllerMVC/userVerification/" + ActivationCode;
            var link = Request.Host + verifyUrl;

            var fromEmail = new MailAddress("huertbog@gmail.com");
            var fromEmailPass = "udechuertbog";
            var toEmail = new MailAddress(emailID);
            string subject = "Su cuenta ha sido exitosamente activada";

            string body = "<br/><br/>Gracias por registrarse en la página, ahora tiene acceso a más funciones" +
                " como publicar información general o publicar información con respecto a solicitudes u ofrecimientos" +
                " de servicios o productos, recuerde publicar contenido con respecto a las huertas y mantenerse apegado" +
                "a las normas de la comunidad. Por favor haga click en el link de abajo para terminar de verificar su cuenta " +
                "<br/><br/><a href='https://"+link+"'>"+link+"</a>";

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