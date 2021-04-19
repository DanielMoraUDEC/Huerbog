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

            return Ok(foro);
        }
    }
}