﻿using Microsoft.AspNetCore.Mvc;
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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Huerbog.Controllers.API_Controller
{
    [Route("api/[controller]")]
    [ApiController]
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
        public IActionResult viewUser(int id)
        {
            UserListModel userInfo = new UserListModel();

            var user = db.Usuarios.Where(x => x.IdusuarioReg == id).FirstOrDefault();

            var userTablaHuerta = db.TablaHuerta.Where(x => x.IdUsuario == user.IdusuarioReg).FirstOrDefault();

            var userForo = db.Foros.Where(x => x.IdUsuario == user.IdusuarioReg).ToList();

            userInfo.Nombre = user.Nombre;
            userInfo.Apellido = user.Apellido;
            userInfo.Correo = user.Correo;
            userInfo.CantPublicacion = user.CantPublicacion;
            userInfo.Reputacion = user.Reputacion;
            userInfo.CantSolicitudes = user.CantSolicitudes;
            userInfo.Red = user.Red;
            userInfo.Telefono = user.Telefono;
            userInfo.IdHuerta = userTablaHuerta.IdHuerta;
            userInfo.UbicacionHuerta = userTablaHuerta.UbicacionHuerta;
            userInfo.DescHuerta = userTablaHuerta.DescHuerta;
            userInfo.AreaCultivo = userTablaHuerta.AreaCultivo;
            userInfo.IdUsuario = user.IdusuarioReg;
            //userInfo.foro = userForo;

            return Ok(userInfo);
        }

        [HttpDelete]
        [Route("deleteUser/{id}")]
        public IActionResult deleteUser(int id)
        {
            var idUsuario = new SqlParameter("@idUsuario", id);

            db.Database.ExecuteSqlRaw("exec EliminarUsuario @idUsuario", new[] {idUsuario});

            db.SaveChangesAsync();

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

    }
}
