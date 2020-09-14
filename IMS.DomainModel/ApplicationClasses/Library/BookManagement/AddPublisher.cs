using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.ApplicationClasses.Library.BookManagement
{
    public class AddPublisher
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Contract { get; set; }

        public string Address { get; set; }
    }
}
