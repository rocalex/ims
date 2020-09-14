using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StaffBasicPersonalInformation : BaseModel
    {
        #region Personal Info
        [Required]
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        [Required]
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int GenderId { get; set; }
        [ForeignKey("GenderId")]
        public virtual Gender Gender { get; set; }

        public int? MaritalStatusId { get; set; }
        [ForeignKey("MaritalStatusId")]
        public virtual MaritalStatus MaritalStatusMap { get; set; }

        public string Qualification { get; set; }

        public DateTime DateOfJoining { get; set; }

        public bool IsTeachingStaff { get; set; }

        public int? TeachingStaffId { get; set; }
        [ForeignKey("TeachingStaffId")]
        public virtual TeachingStaff TeachingStaff { get; set; }

        [Required]
        public string EmployeeId { get; set; }

        public int DesignationId { get; set; }
        [ForeignKey("DesignationId")]
        public virtual Designation Designation { get; set; }
        #endregion

        #region Other Info
        public int? NationalityId { get; set; }
        [ForeignKey("NationalityId")]
        public virtual InstituteNationality Nationality { get; set; }

        public string SocialSecurityNumber { get; set; }

        public int? MotherTongueId { get; set; }
        [ForeignKey("MotherTongueId")]
        public virtual MotherTongue MotherTongue { get; set; }

        public int? ReligionId { get; set; }
        [ForeignKey("ReligionId")]
        public virtual Religion Religion { get; set; }

        public int? CasteId { get; set; }
        [ForeignKey("CasteId")]
        public virtual Caste Caste { get; set; }

        public int? BloodGroupId { get; set; }
        [ForeignKey("BloodGroupId")]
        public virtual BloodGroup BloodGroup { get; set; }

        public string IdentificationMarks { get; set; }
        #endregion

        #region Passport
        public string PassportNumber { get; set; }

        public int? PassportIssuedCountryId { get; set; }
        [ForeignKey("PassportIssuedCountryId")]
        public virtual AdministrationCountry PassportIssuedCountry { get; set; }

        public DateTime? PassportIssuedDate { get; set; }

        public DateTime? PassportExpireDate { get; set; }
        #endregion

        #region Contact Info
        #region Permanent
        [Required]
        public string PermanentAddress { get; set; }

        public int PermanentCityId { get; set; }
        [ForeignKey("PermanentCityId")]
        public virtual AdministrationCity PermanentCity { get; set; }

        public string PermanentZipcode { get; set; }

        [Required]
        public string MobileNumber { get; set; }

        public string AlternatePhoneNumber { get; set; }
        #endregion

        #region Present
        public bool IsPresentAddressIsSameAsPermanent { get; set; }

        public string PresentAddress { get; set; }

        public int PresentCityId { get; set; }
        [ForeignKey("PresentCityId")]
        public virtual AdministrationCity PresentCity { get; set; }

        public string PresentZipcode { get; set; }
        #endregion
        #endregion

        #region Photo
        public string PersonalImage { get; set; }

        public string FamilyImage { get; set; }
        #endregion

        public ICollection<StaffExperienceMapping> StaffExperiences { get; set; }

        public ICollection<StaffDepartmentMapping> StaffDepartments { get; set; }

        [Required]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }

        [NotMapped]
        public string Email { get; set; }

        public int? InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public bool IsArchived { get; set; }

        public ICollection<StaffGalleryMapping> StaffGalleries { get; set; }

        public int? BiometricId { get; set; }

        [NotMapped]
        public List<InstituteClassSubjectMapping> ClassSubjectMappings { get; set; }

        public virtual ICollection<StaffDocumentMapping> StaffDocumentMappings { get; set; }
    }
}
