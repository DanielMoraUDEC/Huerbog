using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models.UserList
{
    public class UserListModel
    {
        public UserListModel()
        {
            Foros = new HashSet<Foro>();
            Solicitudes = new HashSet<Solicitude>();
            TablaHuerta = new HashSet<TablaHuertum>();
            DirHuerta = new HashSet<DirHuertum>();
        }

        [Key]
        public int IdusuarioReg { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public string Contraseña { get; set; }
        public int? CantPublicacion { get; set; }
        public double? Reputacion { get; set; }
        public int? CantSolicitudes { get; set; }
        public int? Roles { get; set; }
        public string Red { get; set; }
        public string Telefono { get; set; }
        public string Salt { get; set; }
        public bool? IsMailConfirmed { get; set; }
        public Guid? ActivationCode { get; set; }

        public int IdHuerta { get; set; }
        public string UbicacionHuerta { get; set; }
        public string DescHuerta { get; set; }
        public double? AreaCultivo { get; set; }
        public int? IdUsuario { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<DirHuertum> DirHuerta { get; set; }

        public virtual Role RolesNavigation { get; set; }
        public virtual ICollection<Foro> Foros { get; set; }
        public virtual ICollection<Solicitude> Solicitudes { get; set; }
        public virtual ICollection<TablaHuertum> TablaHuerta { get; set; }
    }
}
