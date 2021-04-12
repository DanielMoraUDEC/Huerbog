using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models.Request
{
    public class CrudUsuario
    {
        public CrudUsuario()
        {
            Foros = new HashSet<Foro>();
            Solicitudes = new HashSet<Solicitude>();
            TablaHuerta = new HashSet<TablaHuertum>();
        }

        public int IdusuarioReg { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public string Contraseña { get; set; }
        public int? TokenRecuperacion { get; set; }
        public int? CantPublicacion { get; set; }
        public double? Reputacion { get; set; }
        public int? CantSolicitudes { get; set; }
        public int? Roles { get; set; }
        public string Red { get; set; }
        public string Telefono { get; set; }

        public virtual Role RolesNavigation { get; set; }
        public virtual ICollection<Foro> Foros { get; set; }
        public virtual ICollection<Solicitude> Solicitudes { get; set; }
        public virtual ICollection<TablaHuertum> TablaHuerta { get; set; }
    }
}
