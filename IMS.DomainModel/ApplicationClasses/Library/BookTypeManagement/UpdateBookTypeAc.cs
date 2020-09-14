using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Library.BookTypeManagement
{
    public class UpdateBookTypeAc
    {
        [Required]
        public string Name { get; set; }

        public int Id { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
