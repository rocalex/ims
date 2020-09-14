using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class InstituteClassSubjectMapping : BaseModel
    {
        [Required]
        public int ClassId { get; set; }

        [Required]
        public int SubjectId { get; set; }

        [Required]
        public int FacultyId { get; set; }

        [Required]
        public int AlternateFacultyId { get; set; }

        #region Navigational properties

        [ForeignKey("ClassId")]
        public virtual InstituteClass InstituteClass { get; set; }

        [ForeignKey("SubjectId")]
        public virtual InstituteSubject InstituteSubject { get; set; }

        [ForeignKey("FacultyId")]
        public virtual StaffBasicPersonalInformation Faculty { get; set; }

        [ForeignKey("AlternateFacultyId")]
        public virtual StaffBasicPersonalInformation AlternateFaculty { get; set; }

        #endregion
    }
}
