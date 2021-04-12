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
                IdCatPublFk = s.IdCatPublFk
            }
            ).ToList<ForoListModel>();

            return Ok(foroList);
        }

        //ver publicación seleccionada
        [HttpGet]
        [Route("verPost/{idPost}")]
        public IActionResult verPost(int idPost)
        {
            ForoTemaModel foro = new ForoTemaModel();

            var foroInfo = db.Foros.Where(x=>x.IdPost == idPost).FirstOrDefault();

            foro.Idtema = foroInfo.IdPost;

            foro.IdPost = foroInfo.IdPost;

            var foroContent = db.Temas.Where(x=>x.IdForo == foro.Idtema).FirstOrDefault();

            foro.TituloPost = foroInfo.TituloPost;

            foro.DescPost = foroInfo.DescPost;

            foro.FechaPublicacion = foroInfo.FechaPublicacion;

            foro.Contenido = foroContent.Contenido;

            return Ok(foro);
        }
    }
}
