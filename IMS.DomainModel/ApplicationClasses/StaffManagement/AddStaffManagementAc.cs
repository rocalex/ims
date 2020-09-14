using IMS.DomainModel.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class AddStaffManagementAc
    {
        public AddStaffManagementAc()
        {
            AddStaffExperienceMappings = new List<AddStaffExperienceMappingAc>();
        }
        #region Personal Info
        [Required]
        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        [Required]
        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int GenderId { get; set; }

        public int MaritalStatusId { get; set; }

        public string Qualification { get; set; }

        public DateTime DateOfJoining { get; set; }

        public bool IsTeachingStaff { get; set; }

        public int? TeachingStaffId { get; set; }

        [Required]
        public string EmployeeId { get; set; }

        public int DesignationId { get; set; }

        public List<int> DepartmentsIdList { get; set; }
        #endregion

        #region Other Info
        public int? NationalityId { get; set; }

        public string SocialSecurityNumber { get; set; }

        public int? MotherTongueId { get; set; }

        public int? ReligionId { get; set; }

        public int? CasteId { get; set; }

        public int? BloodGroupId { get; set; }

        public string IdentificationMarks { get; set; }
        #endregion

        #region Passport
        public string PassportNumber { get; set; }

        public int? PassportIssuedCountryId { get; set; }

        public DateTime? PassportIssuedDate { get; set; }

        public DateTime? PassportExpireDate { get; set; }
        #endregion

        #region Contact Info
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

        #region Photo
        public string PersonalImage { get; set; }

        public string FamilyImage { get; set; }
        #endregion

        [Required]
        public string Email { get; set; }

        public List<AddStaffExperienceMappingAc> AddStaffExperienceMappings { get; set; }
    }
}
