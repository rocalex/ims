using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using IMS.DomainModel.Enums;

namespace IMS.DomainModel.Models
{
	public class StudentBasicInformation : BaseModel
	{
		#region Institute Info
		[Required]
		public string RollNumber { get; set; }

		public DateTime AdmissionDate { get; set; }

		[Required]
		public string AdmissionNumber { get; set; }

		public int AdmissionClassId { get; set; }
		[ForeignKey("AdmissionClassId")]
		public virtual InstituteClass AdmissionClass { get; set; }

		public int CurrentClassId { get; set; }
		[ForeignKey("CurrentClassId")]
		public virtual InstituteClass CurrentClass { get; set; }

        public int? SectionId { get; set; }
        [ForeignKey("SectionId")]
        public virtual Section SectionMap { get; set; }

		public int CurrentAcademicYearId { get; set; }
		[ForeignKey("CurrentAcademicYearId")]
		public virtual InstituteAcademicYear CurrentAcademicYear { get; set; }

		public int FirstLanguageId { get; set; }
		[ForeignKey("FirstLanguageId")]
		public virtual InstituteLanguageMaster FirstLanguage { get; set; }

		public int SecondLanguageId { get; set; }
		[ForeignKey("SecondLanguageId")]
		public virtual InstituteLanguageMaster SecondLanguage { get; set; }
		#endregion

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

		public bool IsPhysicallyHandicapped { get; set; }
		#endregion

		#region Student Application Nos Info
		public string SchoolApplicationNumber { get; set; }
		#endregion

		#region Challan Info
		[Required]
		public string FeeChallanNumber { get; set; }
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

		public string ComingBy { get; set; }

		public string ComingPlace { get; set; }

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

		#region Relieving Details
		public DateTime? RelievingDate { get; set; }

		public int? RelievingClassId  { get; set; }
		[ForeignKey("RelievingClassId")]
		public virtual InstituteClass RelievingClass { get; set; }

		public string TCNumber { get; set; }

		public DateTime? TCDate { get; set; }

		public RelievingTypeEnum RelievingType { get; set; }

		public string RelievingReason { get; set; }
		#endregion

		#region Contact Info
		#region Family Info
		public FamilyRelationTypeEnum FamilyRelationType { get; set; }

		[Required]
		public string MotherName { get; set; }

		[Required]
		public string FamilyRelationName { get; set; }

		public string FamilyRelationEmail { get; set; }

		[Required]
		public string FamilyRelationMobileNumber { get; set; }

		public int? FamilyRelationOccupationId { get; set; }
		[ForeignKey("FamilyRelationOccupationId")]
		public virtual Occupation FamilyRelationOccupation { get; set; }

		public string FamilyRelationMonthlyIncome { get; set; }
		#endregion

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

		public string PersonalImage { get; set; }

		[Required]
		public string UserId { get; set; }
		[ForeignKey("UserId")]
		public virtual ApplicationUser User { get; set; }

		public virtual ICollection<StudentPriorEducation> StudentPriorEducations { get; set; }

		public virtual ICollection<StudentSport> StudentSports { get; set; }

		public virtual ICollection<StudentAward> StudentAwards { get; set; }

		public virtual ICollection<Disciplinary> StudentDisciplines { get; set; }

        public int? InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }

        public bool IsArchived { get; set; }

        public virtual ICollection<StudentGalleryMapping> StudentGalleries { get; set; }

        public bool IsActive { get; set; }

        public int? BiometricId { get; set; }

        public virtual ICollection<StudentDocumentMapping> StudentDocumentMappings { get; set; }
    }
}
