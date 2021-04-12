using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models.Request
{
    public class ForoTemaModel
    {
        public ForoTemaModel()
        {
            Temas = new HashSet<Tema>();

        }

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
        public int? Idtema { get; set; }
        public string Contenido { get; set; }
        public int? IdForo { get; set; }

        public virtual Foro IdForoNavigation { get; set; }
        public virtual CategoriaPublicacione IdCatPublFkNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Tema> Temas { get; set; }

    }
}
