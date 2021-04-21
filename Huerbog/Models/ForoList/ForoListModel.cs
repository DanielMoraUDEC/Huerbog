using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models.ForoList
{
    public class ForoListModel
    {
        public int IdUser { get; set; }
        [Key]
        public int? IdPost { get; set; }
        public DateTime? FechaPublicacion { get; set; }
        public string DescPost { get; set; }
        public string TituloPost { get; set; }
        public int? IdCatPublFk { get; set; }
        public Usuario usuario { get; set; }




    }
}