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
using System.Net.Http.Headers;
using Huerbog.Models.UserList;
using Huerbog.Models.Reacciones;
using Huerbog.Models.ForoView;



//Scaffold-DBContext "Server=DESKTOP-NQEHQCM ;Database=HUERBOG;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force

//comando bd en la nube (sirve para todos)
//Scaffold-DBContext "Server=tcp:jimmyrueda.database.windows.net,1433;Initial Catalog=HUERBOG;Persist Security Info=False;User ID=administrador;Password=JimmyR1070G ;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Force

/*
nombre del servidor:  jimmyrueda.database.windows.net   
inicio de secion:   administrador
contraseña:   JimmyR1070G
*/
namespace Huerbog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Permitir")]
    [Authorize]
    public class UsuariosController : ControllerBase
    {
        HUERBOGContext db = new HUERBOGContext();

        private readonly IConfiguration config;

        public UsuariosController(IConfiguration _config)
        {
            config = _config;
        }

        //registro de usuarios
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
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

                    if (model.UbicacionHuerta == null && model.DescHuerta == null && model.AreaCultivo == null)
                    {
                        tHuerta.UbicacionHuerta = "NO APLICA";
                        tHuerta.DescHuerta = "NO APLICA";
                        tHuerta.AreaCultivo = 0;
                        tHuerta.Latitud = "0";
                        tHuerta.Longitud = "0";
                    }

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
        public IActionResult login([FromBody] Usuario model)
        {
            if (ModelState.IsValid)
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
                        var claims = new[]
                            {
                                new Claim(ClaimTypes.NameIdentifier, user.IdusuarioReg.ToString()),
                                new Claim(ClaimTypes.Name, user.Roles.ToString())
                            };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

                        var credenciales = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(claims),
                            Expires = DateTime.Now.AddDays(1),
                            SigningCredentials = credenciales
                        };

                        var tokenHandler = new JwtSecurityTokenHandler();
                        var token = tokenHandler.CreateToken(tokenDescriptor);

                        Request.Headers.Add("Authorization", "Bearer " + token);

                        return Ok(new
                        {
                            Roles = claims[1].Value.ToString(),
                            Token = tokenHandler.WriteToken(token)
                        });
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

        [AllowAnonymous]
        [HttpGet]
        [Route("checkAdmin")]
        public IActionResult checkAdmin()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var SecretKey = config.GetValue<string>("AppSettings:Token");
            var key = Encoding.ASCII.GetBytes(SecretKey);
            var token = HttpContext.Request.Headers["Authorization"];

            var realtoken = token.ToString().Substring(7);

            tokenHandler.ValidateToken(realtoken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "unique_name").Value);

            if(userId == 2)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        //ver perfil de usuario logeado
        [AllowAnonymous]
        [HttpGet]
        [Route("viewPerfil")]
        public ActionResult<UserForoModel> viewPerfil()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var SecretKey = config.GetValue<string>("AppSettings:Token");
            var key = Encoding.ASCII.GetBytes(SecretKey);
            var token = HttpContext.Request.Headers["Authorization"];

            var realtoken = token.ToString().Substring(7);

            tokenHandler.ValidateToken(realtoken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "nameid").Value);

            var user = db.Usuarios.Where(x => x.IdusuarioReg == userId).FirstOrDefault();

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
                ).Where(x => x.IdUsuario == user.IdusuarioReg).ToList<Foro>(),
            };

            return Ok(model);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("updatePerfil")]
        public async Task<ActionResult> updatePerfil([FromBody] UserForoModel model)
        {
            var userInfo = db.Usuarios.Where(x => x.IdusuarioReg == model.user.IdusuarioReg).FirstOrDefault();

            //var userHuerta = db.TablaHuerta.Where(x => x.IdUsuario == userInfo.IdusuarioReg).FirstOrDefault();

            userInfo.Nombre = model.user.Nombre;
            userInfo.Apellido = model.user.Apellido;
            userInfo.Correo = userInfo.Correo;
            userInfo.Red = model.user.Red;
            userInfo.Telefono = model.user.Telefono;
            //userHuerta.UbicacionHuerta = model.userHuerta.UbicacionHuerta;
            //userHuerta.DescHuerta = model.userHuerta.DescHuerta;
            //userHuerta.AreaCultivo = model.userHuerta.AreaCultivo;

            db.Update(userInfo);

            //db.Update(userHuerta);

            await db.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("viewPerfilPubl/{id}")]
        [AllowAnonymous]
        public ActionResult<UserForoModel> viewPerfilPubl(int id)
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
                    Telefono = user.Telefono,
                    Roles = user.Roles
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
                ).Where(x => x.IdUsuario == user.IdusuarioReg).ToList<Foro>(),
            };

            return Ok(model);
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
        [AllowAnonymous]
        [HttpGet]
        [Route("userVerification/{id}")]
        public ActionResult userVerification(string id)
        {
            var v = db.Usuarios.Where(a => a.ActivationCode == new Guid(id)).FirstOrDefault();

            if (v != null)
            {
                v.IsMailConfirmed = true;
                db.SaveChanges();
            }

            return Ok();
        }

        //busca usuarios por red
        [AllowAnonymous]
        [HttpGet]
        [Route("searchUser/{Buscar}")]
        public IActionResult searchUser(string Buscar)
        {
            var user = db.Usuarios.Where(x => x.Nombre.ToLower().Contains(Buscar.ToLower()) || x.Apellido.ToLower() == Buscar.ToLower() || x.Red.ToLower() == Buscar.ToLower()).ToList();

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }

        //Métodos referentes a publicaciones

        //crea una publicación
        [AllowAnonymous]
        [HttpPost]
        [Route("createPost")]
        public async Task<IActionResult> createPost([FromForm] ForoTemaModel model)
        {
            //var u = model.Token;

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

            //instancia el modelo de la tabla foro y tema
            Foro foro = new Foro();

            Tema tema = new Tema();

            //convierte el archivo (img, doc, etc) a un arreglo de bytes
            using (var target = new MemoryStream())
            {
                await model.ContentFile.CopyToAsync(target);
                tema.ContentFile = target.ToArray();
            }

            //asigna los valores a los campos de cada modelo
            foro.DescPost = model.DescPost;
            foro.TituloPost = model.TituloPost;
            foro.IdUsuario = userId;
            foro.IdCatPublFk = (int)model.IdCatPublFk;
            tema.FileName = model.FileName;
            tema.FileType = model.FileType;
            tema.Contenido = model.Contenido;

            //convierte los valores de los campos a parámetros SQL para la SP
            var descPost = new SqlParameter("@descPost", foro.DescPost);
            var tituloPost = new SqlParameter("@tituloPost", foro.TituloPost);
            var idUsuario = new SqlParameter("@idUsuario", foro.IdUsuario);
            var contenido = new SqlParameter("@contenido", tema.Contenido);
            var idCatPublFK = new SqlParameter("@idCatPublFK", foro.IdCatPublFk);
            var content_file = new SqlParameter("@content_file", tema.ContentFile);
            var file_name_ = new SqlParameter("@file_name_", tema.FileName);
            var FileType = new SqlParameter("@FileType", tema.FileType);

            //try catch que en realidad no sirve de mucho, lo dejo porque se ve profesional
            try
            {
                db.Database.ExecuteSqlRaw("Exec CreacionPublicaciones @descPost, @tituloPost, @idUsuario," +
                "@contenido, @idCatPublFK, @content_file, @FileType, @file_name_", new[] { descPost,
                    tituloPost, idUsuario, contenido, idCatPublFK, content_file, FileType, file_name_ });

                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //REPORTA PUBLICACIONES
        [AllowAnonymous]
        [Route("reportPost")]
        public async Task<IActionResult> reportPost([FromBody] UserReaccionesModel user)
        {
            VerificacionReporte usuarioReporte = new VerificacionReporte();

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
            var userReporte = db.VerificacionReportes.Where(x => x.IdForo == user.idForo && x.IdUsuario == userId).FirstOrDefault();

            if (userReporte == null)
            {
                userForo.Reportes += 1;

                usuarioReporte.IdForo = userForo.IdPost;
                usuarioReporte.IdUsuario = userId;
                usuarioReporte.Reporte = true;

                db.Update(userForo);
                db.VerificacionReportes.Add(usuarioReporte);
                await db.SaveChangesAsync();

                return Ok();
            }
            else
            {
                userForo.Reportes -= 1;
                db.VerificacionReportes.Remove(userReporte);
                db.Update(userForo);
                await db.SaveChangesAsync();
                return Ok();
            }
        }

        //edita publicaciones
        [AllowAnonymous]
        [HttpGet]
        [Route("editPost/{id}")]
        public async Task<ActionResult> editPost(int id)
        {
            ForoTemaModel foro = new ForoTemaModel();

            var foroInfo = db.Foros.Where(x => x.IdPost == id).FirstOrDefault();

            var foroContent = db.Temas.Where(x => x.IdForo == id).FirstOrDefault();

            var foroUser = db.Usuarios.Where(x => x.IdusuarioReg == foroInfo.IdUsuario).FirstOrDefault();

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
            foro.FileName = foroContent.FileName;
            foro.FileType = foroContent.FileType;
            foro.img = foroContent.ContentFile;

            return Ok(foro);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("editPost")]
        public async Task<ActionResult> editPost([FromForm] ForoTemaModel model)
        {
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

            //instancia el modelo de la tabla foro y tema

            var foroUpdt = db.Foros.Where(x => x.IdPost == model.IdPost).FirstOrDefault();

            var temaUpdt = db.Temas.Where(x => x.IdForo == foroUpdt.IdPost).FirstOrDefault();

            if(model.ContentFile != null)
            {
                //convierte el archivo (img, doc, etc) a un arreglo de bytes
                using (var target = new MemoryStream())
                {
                    await model.ContentFile.CopyToAsync(target);
                    temaUpdt.ContentFile = target.ToArray();
                }

                foroUpdt.DescPost = model.DescPost;
                foroUpdt.TituloPost = model.TituloPost;
                foroUpdt.IdUsuario = userId;
                foroUpdt.IdCatPublFk = (int)model.IdCatPublFk;
                foroUpdt.FechaActualizacion = DateTime.UtcNow;
                temaUpdt.FileName = model.FileName;
                temaUpdt.FileType = model.FileType;
                temaUpdt.Contenido = model.Contenido;

                db.Update(foroUpdt);

                db.Update(temaUpdt);

                await db.SaveChangesAsync();

                return Ok();
            }
            else
            {
                foroUpdt.DescPost = model.DescPost;
                foroUpdt.TituloPost = model.TituloPost;
                foroUpdt.IdUsuario = userId;
                foroUpdt.IdCatPublFk = (int)model.IdCatPublFk;
                foroUpdt.FechaActualizacion = DateTime.UtcNow;

                db.Update(foroUpdt);

                await db.SaveChangesAsync();

                return Ok();
            }

            //asigna los valores a los campos de cada modelo
            
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getPrevImg/{id}")]
        public async Task<IActionResult> getPrevImg(int id)
        {
            ForoTemaModel prevImg = new ForoTemaModel();

            var tema = db.Temas.Where(x => x.IdForo == id).FirstOrDefault();

            var img = Convert.ToBase64String(tema.ContentFile);
            
            return Ok();
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

            string body = "<br/><h1>HuertBog</h1><br/>Gracias por registrarse en la página, ahora tiene acceso a más funciones" +
                " como publicar información general o publicar información con respecto a solicitudes u ofrecimientos" +
                " de servicios o productos, recuerde publicar contenido con respecto a las huertas y mantenerse apegado" +
                "a las normas de la comunidad. Por favor haga click en el link de abajo para terminar de verificar su cuenta " +
                "<br/><br/><a href='https://" + link + "'>" + link + "</a>";

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