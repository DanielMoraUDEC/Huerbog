using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Huerbog.Models.Request;
using Huerbog.Models;
using Huerbog.Utils;
using System.Text;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Net.Mail;
using System.Net;
using Huerbog.Models.UserList;
using Huerbog.Models.ForoList;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Huerbog.Controllers.API_Controller
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminController : ControllerBase
    {
        HUERBOGContext db = new HUERBOGContext();

        //Manejo de usuarios
        [HttpGet]
        [Route("getUsers")]
        public IActionResult getUsers()
        {
            return Ok(db.Usuarios.ToList<Usuario>().Where(x => x.Roles == 2));
        }

        [HttpGet]
        [Route("viewUser/{id}")]
        public ActionResult<UserForoModel> viewUser(int id)
        {
            var user = db.Usuarios.Where(x => x.IdusuarioReg == id).FirstOrDefault();

            var userHuerta = db.TablaHuerta.Where(x => x.IdUsuario == user.IdusuarioReg).FirstOrDefault();

            var model = new UserForoModel
            {
                user = new Usuario
                {
                    IdusuarioReg = user.IdusuarioReg,
                    Nombre = user.Nombre,
                    Apellido = user.Apellido,
                    Correo = user.Correo,
                    CantPublicacion = user.CantPublicacion,
                    Reputacion = user.Reputacion,
                    CantSolicitudes = user.CantSolicitudes,
                    Red = user.Red,
                    Telefono = user.Telefono
                },

                userHuerta = new TablaHuertum
                {
                    IdUsuario = user.IdusuarioReg,
                    IdHuerta = userHuerta.IdHuerta,
                    UbicacionHuerta = userHuerta.UbicacionHuerta,
                    AreaCultivo = userHuerta.AreaCultivo,
                    DescHuerta = userHuerta.DescHuerta,
                    DirHuerta = userHuerta.DirHuerta
                },

                userForo = db.Foros.Select(s => new Foro()
                    {
                        IdUsuario = s.IdUsuario,
                        IdPost = s.IdPost,
                        TituloPost = s.TituloPost,
                        DescPost = s.DescPost,
                        FechaPublicacion = s.FechaPublicacion,
                        IdCatPublFk = s.IdCatPublFk
                    }
                ).Where(x=>x.IdUsuario == user.IdusuarioReg).ToList<Foro>(),
                
            };
            //userInfo.userForo = userForo;

            return Ok(model);
        }

        [HttpDelete]
        [Route("deleteUser/{id}")]
        public async Task<IActionResult> deleteUser(int id)
        {
            var idUsuario = new SqlParameter("@idUsuario", id);

            db.Database.ExecuteSqlRaw("exec EliminarUsuario @idUsuario", new[] {idUsuario});

            await db.SaveChangesAsync();

            return Ok();
        }

        //manejo publicaciones reportadas
        [HttpGet]
        [Route("getReportedPost")]
        public IActionResult getReportedPost()
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
                Reportes = s.Reportes,
                usuario = db.Usuarios.Where(x => x.IdusuarioReg == s.IdUsuario && x.Roles == 2).FirstOrDefault()
            }
            ).Where(x=>x.Reportes > 0).ToList<ForoListModel>();

            return Ok(foroList);
        }

        [HttpDelete]
        [Route("deletePost/{id}")]
        public async Task<IActionResult> deletePost(int id)
        {
            var idPublicacion = new SqlParameter("@idPublicacion", id);

            db.Database.ExecuteSqlRaw("exec EliminarPubicacion @idPublicacion", new[] { idPublicacion });

            await db.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("viewDirHuerta")]
        public IActionResult viewDirHuerta()
        {
            IList<UserHuertaListModel> userInfo = null;

            userInfo = db.Usuarios.Select(s => new UserHuertaListModel()
                {
                    IdusuarioReg = s.IdusuarioReg,
                    Nombre = s.Nombre,
                    Apellido = s.Apellido,
                    Correo = s.Correo,
                    Roles = s.Roles,
                    userHuerta = db.TablaHuerta.Where(x=>x.IdUsuario == s.IdusuarioReg).FirstOrDefault()
                }
            ).Where(x =>x.Roles == 2).ToList<UserHuertaListModel>();

            return Ok(userInfo);
        }
    }
}
