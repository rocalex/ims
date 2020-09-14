namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
	public class StudentManagementResponse
	{
		public string Message { get; set; }

		public bool HasError { get; set; }

		public StudentManagementResponseType ErrorType { get; set; }

        public int StudentId { get; set; }
    }

	public enum StudentManagementResponseType
	{
		RollNumber,
		AdmissionNumber,
        AdmissionClassId,
        CurrentClassId,
        SectionId,
        CurrentAcademicYearId,
        FirstLanguageId,
        SecondLanguageId,
        GenderId,
        MaritalStatusId,
        FirstName,
		LastName,
		FeeChallanNumber,
        NationalityId,
        MotherTongueId,
        ReligionId,
        CasteId,
        BloodGroupId,
        PassportIssuedCountryId,
        RelievingClassId,
        MotherName,
		FamilyRelationName,
		FamilyRelationMobileNumber,
        FamilyRelationOccupationId,
        PermanentAddress,
        PermanentCityId,
        PresentCityId,
        MobileNumber,
        StudentPriorEducations,
        StudentDisciplines,
        StudentSportId,
        StudentLevelId,
        StudentAwardName,
        StudentAwardInstituteName
    }
}
