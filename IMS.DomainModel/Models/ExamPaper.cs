using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class ExamPaper
    {
        public int Id { get; set; }
        
        [Required]
        public int MappingId { get; set; }
        [ForeignKey("MappingId")]
        public virtual InstituteClassSubjectMapping Mapping { get; set; }

        [Required]
        public int AcademicYearId { get; set; }
        [ForeignKey("AcademicYearId")]
        public virtual InstituteAcademicYear AcademicYear { get; set; }

        [Required]
        public int Pages { get; set; }

        [Required]
        public string PublisherName { get; set; }

        public string Description { get; set; }

        [Required]
        public int InstituteId { get; set; }
    }
}
