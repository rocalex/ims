using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Library.ExamPaperManagement
{
    public class AddExam
    {
        [Required]
        public int MappingId { get; set; }

        [Required]
        public int AcademicYearId { get; set; }

        [Required]
        public int Pages { get; set; }

        [Required]
        public string PublisherName { get; set; }

        public string Description { get; set; }
        [Required]
        public int InstituteId { get; set; }
    }
}
