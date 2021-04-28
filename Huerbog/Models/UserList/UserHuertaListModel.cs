using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models.UserList
{
    public class UserHuertaListModel
    {
        [Key]
        public int IdusuarioReg { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public int? Roles { get; set; }
        public TablaHuertum userHuerta { get; set; }
    }
}
