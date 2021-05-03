using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Huerbog.Models.UserList
{
    [Keyless]
    public class UserForoModel
    {
        
        public Usuario user { get; set; }
        public TablaHuertum userHuerta { get; set; }
        public IList<Foro> userForo { get; set; }

    }
}
