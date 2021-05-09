using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models.Login
{
    public class UserLogin
    {
        public int IdusuarioReg { get; set; }
        public string Correo { get; set; }
        public string Contraseña { get; set; }
        public string Roles { get; set; }
        public string Token { get; set; }
    }
}