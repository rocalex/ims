namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class StaffManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public StaffManagementResponseType ErrorType { get; set; }

        public int StaffId { get; set; }
    }

    public enum StaffManagementResponseType
    {
        EmployeeId,
        FirstName,
        LastName,
        MaritalStatusId,
        TeachingStaffId,
        DesignationId,
        NationalityId,
        MotherTongueId,
        ReligionId,
        CasteId,
        BloodGroupId,
        PassportIssuedCountryId,
        PermanentAddress,
        MobileNumber,
        PermanentCityId,
        PresentCityId,
        Email,
        ExperienceList
    }
}
