using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models
{
    public class Contactarse
    {
        [Key]
        public int IdPost { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string correo { get; set; }
        public string telefono { get; set; }
        public string mensaje { get; set; }
        public string correoRemitente { get; set; }
    }
}
