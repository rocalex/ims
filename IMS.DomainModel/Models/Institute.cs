using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Institute : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public string Address { get; set; }

        public string Location { get; set; }

        public virtual ICollection<InstituteRole> InstituteRoles { get; set; }

        public virtual ICollection<AdministrationCountry> AdministrationCountries { get; set; }

        public virtual ICollection<InstituteNationality> InstituteNationalities { get; set; }

        public virtual ICollection<AdministrationCurrency> AdministrationCurrencies { get; set; }

        public virtual ICollection<InstituteLanguageMaster> InstituteLanguageMasters { get; set; }

        public virtual ICollection<Religion> Religions { get; set; }

        public virtual ICollection<Caste> Castes { get; set; }

        public virtual ICollection<Relationship> Relationships { get; set; }

        public virtual ICollection<Occupation> Occupations { get; set; }

        public virtual ICollection<ReligionCategory> ReligionCategories { get; set; }

        public virtual ICollection<BloodGroup> BloodGroups { get; set; }

        public virtual ICollection<Level> Levels { get; set; }

        public virtual ICollection<SportDetail> SportDetails { get; set; }

        public virtual ICollection<Qualification> Qualifications { get; set; }

        public virtual ICollection<InstituteClass> InstituteClasses { get; set; }

        public virtual ICollection<InstituteSubject> InstituteSubjects { get; set; }

        public virtual ICollection<LookUp> LookUps { get; set; }

        public virtual ICollection<Gender> Genders { get; set; }

        public virtual ICollection<InstituteBccCcEmailMapping> InstituteBccCcEmailMappings { get; set; }

        public virtual ICollection<UserInstituteMapping> UserInstituteMappings { get; set; }

        public string AdminId { get; set; }
        [ForeignKey("AdminId")]
        public virtual ApplicationUser Admin { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }
    }
}
