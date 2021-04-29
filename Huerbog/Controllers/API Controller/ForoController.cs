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

namespace Huerbog.Controllers.API_Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ForoController : ControllerBase
    {
        HUERBOGContext db = new HUERBOGContext();

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

        [HttpGet]
        [Route("btnLike/{id}")]
        public async Task<IActionResult> btnLike(int id)
        {
           
            var userForo = db.Foros.Where(x => x.IdPost == id).FirstOrDefault();

            userForo.ReaccionLike += 1;

            db.Update(userForo);

            await db.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("btnDislike/{id}")]
        public async Task<IActionResult> btnDislike(int id)
        {

            var userForo = db.Foros.Where(x => x.IdPost == id).FirstOrDefault();

            userForo.ReaccionDisLike += 1;

            db.Update(userForo);

            await db.SaveChangesAsync();

            return Ok();
        }

    }
}