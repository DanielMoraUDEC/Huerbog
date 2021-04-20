﻿using Microsoft.AspNetCore.Http;
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

namespace Huerbog.Controllers.API_Controller
{
    [Route("api/[controller]")]
    [ApiController]
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
            ).ToList<ForoListModel>();

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

            //DATOS CONTENIDO DE PUBLICACIÓN
            foro.Idtema = foroContent.Idtema;
            foro.Contenido = foroContent.Contenido;
            foro.IdForo = foroContent.IdForo;
            foro.ContentFile = foroContent.ContentFile;

            return Ok(foro);
        }

        [HttpPost]
        protected ActionResult btnCorreo_Click(object sender, EventArgs e)
        {
            string body = "<body>" +
                "<h1>titulo</h1>" +
                "<p> mensaje del usuario con sus datos </p>" +
                "<p> mensaje enviado desde Huertbog.com" +
                "</body>";

            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential("danielmora_99@hotmail.com", "alexandra2209");
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("danielmora_99@hotmail.com", "Huertbog mensaje");
            mail.To.Add(new MailAddress("danifeel99@gmail.com"));
            mail.Subject = "Mensaje de un usuario Huertbog";
            mail.IsBodyHtml = true;
            mail.Body = body;

            smtp.Send(mail);

            return Ok();
        }

    }
}