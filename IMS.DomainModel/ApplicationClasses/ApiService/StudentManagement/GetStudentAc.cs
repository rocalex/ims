namespace IMS.DomainModel.ApplicationClasses.ApiService.StudentManagement
{
    public class GetStudentAc
    {
        public int InstituteId { get; set; }

        public int AcademicYearId { get; set; }

        public int? ClassId { get; set; }

        public int? SectionId { get; set; }
    }
}
