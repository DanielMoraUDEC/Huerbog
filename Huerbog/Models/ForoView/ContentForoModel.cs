using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models.ForoView
{
    public class ContentForoModel
    {
        public ContentForoModel()
        {
            Foros = new HashSet<Foro>();
            Solicitudes = new HashSet<Solicitude>();
            TablaHuerta = new HashSet<TablaHuertum>();
            Temas = new HashSet<Tema>();
        }

        //tabla usuario
        public int IdusuarioReg { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Correo { get; set; }
        public double? Reputacion { get; set; }
        public string Red { get; set; }

        //tabla foro
        [Key]
        public int IdPost { get; set; }
        public DateTime? FechaPublicacion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
        public string DescPost { get; set; }
        public string TituloPost { get; set; }
        public bool? EliminarPost { get; set; }
        public string UrlImg { get; set; }
        public int? Reacciones { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdCatPublFk { get; set; }

        //tabla temas
        public int Idtema { get; set; }
        public string Contenido { get; set; }
        public int? IdForo { get; set; }

        //tabla temas
        public virtual Foro IdForoNavigation { get; set; }

        //tabla foro
        public virtual CategoriaPublicacione IdCatPublFkNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Tema> Temas { get; set; }

        //tabla usuario
        public virtual Role RolesNavigation { get; set; }
        public virtual ICollection<Foro> Foros { get; set; }
        public virtual ICollection<Solicitude> Solicitudes { get; set; }
        public virtual ICollection<TablaHuertum> TablaHuerta { get; set; }
    }
}