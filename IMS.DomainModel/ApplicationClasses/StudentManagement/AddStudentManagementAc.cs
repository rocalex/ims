using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using IMS.DomainModel.Enums;

namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
	public class AddStudentManagementAc
	{
		public AddStudentManagementAc()
		{
			StudentAwards = new List<AddStudentAwardAc>();
			StudentDisciplines = new List<AddStudentDisciplineAc>();
			StudentPriorEducations = new List<AddStudentPriorEducationAc>();
			StudentSports = new List<AddStudentSportAc>();
		}
		#region Institute Info
		[Required]
		public string RollNumber { get; set; }

		public DateTime AdmissionDate { get; set; }

		[Required]
		public string AdmissionNumber { get; set; }

		public int AdmissionClassId { get; set; }

		public int CurrentClassId { get; set; }

		public int SectionId { get; set; }

		public int CurrentAcademicYearId { get; set; }

		public int FirstLanguageId { get; set; }

		public int SecondLanguageId { get; set; }
		#endregion

		#region Personal Info
		[Required]
		public string FirstName { get; set; }

		public string MiddleName { get; set; }

		[Required]
		public string LastName { get; set; }

		public DateTime DateOfBirth { get; set; }

		public int GenderId { get; set; }

		public int MaritalStatusId { get; set; }

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

		public string SocialSecurityNumber { get; set; }

		public int? MotherTongueId { get; set; }

		public int? ReligionId { get; set; }

		public int? CasteId { get; set; }

		public int? BloodGroupId { get; set; }

		public string ComingBy { get; set; }

		public string ComingPlace { get; set; }

		public string IdentificationMarks { get; set; }
		#endregion

		#region Passport
		public string PassportNumber { get; set; }

		public int? PassportIssuedCountryId { get; set; }

		public DateTime? PassportIssuedDate { get; set; }

		public DateTime? PassportExpireDate { get; set; }
		#endregion

		#region Relieving Details
		public DateTime? RelievingDate { get; set; }

		public int? RelievingClassId { get; set; }

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

		public string FamilyRelationMonthlyIncome { get; set; }
		#endregion

		#region Permanent
		[Required]
		public string PermanentAddress { get; set; }

		public int PermanentCityId { get; set; }

		public string PermanentZipcode { get; set; }

		[Required]
		public string MobileNumber { get; set; }

		public string AlternatePhoneNumber { get; set; }
		#endregion

		#region Present
		public bool IsPresentAddressIsSameAsPermanent { get; set; }

		public string PresentAddress { get; set; }

		public int PresentCityId { get; set; }

		public string PresentZipcode { get; set; }
		#endregion
		#endregion

		public List<AddStudentPriorEducationAc> StudentPriorEducations { get; set; }

		public List<AddStudentSportAc> StudentSports { get; set; }

		public List<AddStudentAwardAc> StudentAwards { get; set; }

		public List<AddStudentDisciplineAc> StudentDisciplines { get; set; }
	}
}
