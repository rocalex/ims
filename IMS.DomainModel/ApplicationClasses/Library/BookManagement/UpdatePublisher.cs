using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Library.BookManagement
{
    public class UpdatePublisher
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Contract { get; set; }

        public string Address { get; set; }
    }
}
