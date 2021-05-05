using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Huerbog.Models.ForoList;
using Huerbog.Models;
using Huerbog.Models.Request;
using Huerbog.Models.ForoView;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Huerbog.Models.Reacciones;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Huerbog.Controllers.API_Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ForoController : ControllerBase
    {
        HUERBOGContext db = new HUERBOGContext();

        private readonly IConfiguration config;

        public ForoController(IConfiguration _config)
        {
            config = _config;
        }

        //obtener los registros de la tabla FORO y convertirla en lista
        [HttpGet]
        [Route("foroList")]
        public IActionResult foroList()
        {
            IList<ForoListModel> foroList = null;

            foroList = db.Foros.Select(s => new ForoListModel()
            {
                IdUser = (int)s.IdUsuario,
                IdPost = s.IdPost,
                FechaPublicacion = s.FechaPublicacion,
                DescPost = s.DescPost,
                TituloPost = s.TituloPost,
                IdCatPublFk = s.IdCatPublFk,
                usuario = db.Usuarios.Where(x => x.IdusuarioReg == s.IdUsuario).FirstOrDefault()
            }
            ).OrderByDescending(x=>x.IdPost).ToList<ForoListModel>();

            return Ok(foroList);
        }

        [HttpGet]
        [Route("foroListComerce")]
        public IActionResult foroListComerce()
        {
            IList<ForoListModel> foroList = null;

            foroList = db.Foros.Select(s => new ForoListModel()
            {
                IdUser = (int)s.IdUsuario,
                IdPost = s.IdPost,
                FechaPublicacion = s.FechaPublicacion,
                DescPost = s.DescPost,
                TituloPost = s.TituloPost,
                IdCatPublFk = s.IdCatPublFk,
                usuario = db.Usuarios.Where(x => x.IdusuarioReg == s.IdUsuario).FirstOrDefault()
            }
            ).Where(x=>x.IdCatPublFk == 2).OrderByDescending(x=>x.IdPost).ToList<ForoListModel>();

            return Ok(foroList);
        }

        [HttpGet]
        [Route("foroListGeneral")]
        public IActionResult foroListGeneral()
        {
            IList<ForoListModel> foroList = null;

            foroList = db.Foros.Select(s => new ForoListModel()
            {
                IdUser = (int)s.IdUsuario,
                IdPost = s.IdPost,
                FechaPublicacion = s.FechaPublicacion,
                DescPost = s.DescPost,
                TituloPost = s.TituloPost,
                IdCatPublFk = s.IdCatPublFk,
                usuario = db.Usuarios.Where(x => x.IdusuarioReg == s.IdUsuario).FirstOrDefault()
            }
            ).Where(x => x.IdCatPublFk == 1).OrderByDescending(x=>x.IdPost).ToList<ForoListModel>();

            return Ok(foroList);
        }

        //ver búsqueda de publicaciones
        [HttpGet]
        [Route("foroListSearch/{Buscar}")]
        public IActionResult foroListSearch(string Buscar)
        {
            IList<ForoListModel> foroList = null;

            foroList = db.Foros.Select(s => new ForoListModel()
            {
                IdUser = (int)s.IdUsuario,
                IdPost = s.IdPost,
                FechaPublicacion = s.FechaPublicacion,
                DescPost = s.DescPost,
                TituloPost = s.TituloPost,
                IdCatPublFk = s.IdCatPublFk,
                usuario = db.Usuarios.Where(x => x.IdusuarioReg == s.IdUsuario).FirstOrDefault()
            }
            ).OrderByDescending(x => x.IdPost).Where(x => x.TituloPost.ToLower().Contains(Buscar.ToLower())
             || x.DescPost.ToLower().Contains(Buscar.ToLower())).ToList<ForoListModel>();

            return Ok(foroList);
        }

        //ver publicación seleccionada
        [HttpGet]
        [Route("verPost/{IdPost}")]
        public IActionResult verPost(int IdPost)
        {
            ContentForoModel foro = new ContentForoModel();

            var foroInfo = db.Foros.Where(x => x.IdPost == IdPost).FirstOrDefault();

            var foroContent = db.Temas.Where(x => x.IdForo == IdPost).FirstOrDefault();

            var foroUser = db.Usuarios.Where(x => x.IdusuarioReg == foroInfo.IdUsuario).FirstOrDefault();

            //DATOS USUARIO
            foro.IdusuarioReg = foroUser.IdusuarioReg;
            foro.Nombre = foroUser.Nombre;
            foro.Apellido = foroUser.Apellido;
            foro.Correo = foroUser.Correo;
            foro.Reputacion = foroUser.Reputacion;
            foro.Red = foroUser.Red;
            foro.Roles = foroUser.Roles;

            //DATOS PUBLICACIONES DE USUARIO
            foro.IdPost = foroInfo.IdPost;
            foro.FechaPublicacion = foroInfo.FechaPublicacion;
            foro.DescPost = foroInfo.DescPost;
            foro.TituloPost = foroInfo.TituloPost;
            foro.IdUsuario = foroInfo.IdUsuario;
            foro.IdCatPublFk = foroInfo.IdCatPublFk;
            foro.ReaccionLike = foroInfo.ReaccionLike;
            foro.ReaccionDisLike = foroInfo.ReaccionDisLike;

            //DATOS CONTENIDO DE PUBLICACIÓN
            foro.Idtema = foroContent.Idtema;
            foro.Contenido = foroContent.Contenido;
            foro.IdForo = foroContent.IdForo;
            foro.ContentFile = foroContent.ContentFile;
            foro.FileName = foroContent.FileName;
            foro.FileType = foroContent.FileType;

            return Ok(foro);
        }

        //envía solicitud
        [HttpPost]
        [Route("sendMail")]
        public async Task<IActionResult> sendMail([FromBody] Contactarse contact, int id)
        {
           
            var userPost = db.Foros.Where(x => x.IdPost == contact.IdPost).FirstOrDefault();

            var userData = db.Usuarios.Where(x => x.IdusuarioReg == userPost.IdUsuario).FirstOrDefault();

            string body = "<body>" +

                "<h1>Mensaje Huertbog</h1>" +
                "<h2>Datos del usuario</h2>" +
                "<p>Nombre: " + contact.nombre + "</p></n>" +
                "<p>Apellido: " + contact.apellido + "</p></n>" +
                "<p>telefono: " + contact.telefono + "</p></n>" +
                "<p>correo: " + contact.correo + "</p></n>" +
                "<h2>Mensaje:</h2>" +
                 contact.mensaje + "</n>" +
                "<p>Sí presenta algún inconveniente con el mensaje dejanoslo saber al siguiente correo: Huertbog@gmail.com</P>" +
                "</body>";

            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential("huertbog@gmail.com", "udechuertbog");
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(contact.correo, "Huertbog");
            mail.To.Add(new MailAddress(userData.Correo));
            mail.Subject = "Mensaje de un usuario Huertbog";
            mail.IsBodyHtml = true;
            mail.Body = body;

            smtp.Send(mail);

            return Ok();
        }

        //reacción like
        
        
        [Route("btnLike")]
        public async Task<IActionResult> btnLike([FromBody] UserReaccionesModel user)
        {

            VerificacionReaccion usuariolike = new VerificacionReaccion();
            
            //tokenizado
            var tokenHandler = new JwtSecurityTokenHandler();
            var SecretKey = config.GetValue<string>("AppSettings:Token");
            var key = Encoding.ASCII.GetBytes(SecretKey);
            var token = HttpContext.Request.Headers["Authorization"];

            //quita la palabra "Bearer" del token
            var realtoken = token.ToString().Substring(7);

            //valida el token
            tokenHandler.ValidateToken(realtoken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            //obtiene el valor del almacenado en el token
            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "nameid").Value);


            var userForo = db.Foros.Where(x => x.IdPost == user.idForo).FirstOrDefault();
            var userReaccion = db.VerificacionReaccions.Where(x => x.IdForo ==user.idForo && x.IdUsuario == userId).FirstOrDefault();


            if (userReaccion == null)
            {
                userForo.ReaccionLike += 1;

                usuariolike.IdForo = userForo.IdPost;
                usuariolike.IdUsuario = userId;
                usuariolike.ReaccionLike = true;
                usuariolike.ReaccionDislike = false;

                db.Update(userForo);
                db.VerificacionReaccions.Add(usuariolike);
                await db.SaveChangesAsync();

                return Ok();
            }
            else if (userReaccion.ReaccionDislike == true)
            {
                userForo.ReaccionLike += 1;
                userForo.ReaccionDisLike -= 1;

                userReaccion.ReaccionLike = true;
                userReaccion.ReaccionDislike = false;

                db.Update(userForo);
                db.Update(userReaccion);
                await db.SaveChangesAsync();

                return Ok();
            }
            else
            {
                userForo.ReaccionLike -= 1;
                db.VerificacionReaccions.Remove(userReaccion);
                db.Update(userForo);
                await db.SaveChangesAsync();
                return Ok();
            }
        }

        //reacción dislike
        [Route("btnDislike")]
        public async Task<IActionResult> btnDislike([FromBody] UserReaccionesModel user)
        {

            /*var userForo = db.Foros.Where(x => x.IdPost == id).FirstOrDefault();

            userForo.ReaccionDisLike += 1;

            db.Update(userForo);

            await db.SaveChangesAsync();

            return Ok();*/
            VerificacionReaccion usuariolike = new VerificacionReaccion();

            //tokenizado
            var tokenHandler = new JwtSecurityTokenHandler();
            var SecretKey = config.GetValue<string>("AppSettings:Token");
            var key = Encoding.ASCII.GetBytes(SecretKey);
            var token = HttpContext.Request.Headers["Authorization"];

            //quita la palabra "Bearer" del token
            var realtoken = token.ToString().Substring(7);

            //valida el token
            tokenHandler.ValidateToken(realtoken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            //obtiene el valor del almacenado en el token
            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "nameid").Value);


            var userForo = db.Foros.Where(x => x.IdPost == user.idForo).FirstOrDefault();
            var userReaccion = db.VerificacionReaccions.Where(x => x.IdForo == user.idForo && x.IdUsuario == userId).FirstOrDefault();


            if (userReaccion == null)
            {
                userForo.ReaccionDisLike += 1;

                usuariolike.IdForo = userForo.IdPost;
                usuariolike.IdUsuario = userId;
                usuariolike.ReaccionLike = false;
                usuariolike.ReaccionDislike = true;

                db.Update(userForo);
                db.VerificacionReaccions.Add(usuariolike);
                await db.SaveChangesAsync();

                return Ok();
            }
            else if (userReaccion.ReaccionDislike == false)
            {
                userForo.ReaccionLike -= 1;
                userForo.ReaccionDisLike += 1;

                userReaccion.ReaccionLike = false;
                userReaccion.ReaccionDislike = true;

                db.Update(userForo);
                db.Update(userReaccion);
                await db.SaveChangesAsync();

                return Ok();
            }
            else
            {
                userForo.ReaccionDisLike -= 1;
                db.VerificacionReaccions.Remove(userReaccion);
                db.Update(userForo);
                await db.SaveChangesAsync();
                return Ok();
            }
        }

        //ver mapa
        [HttpGet]
        [Route("mapaHuertas")]
        public async Task<IActionResult> mapaHuertas()
        {
            return Ok();
        }

    }
}