namespace IMS.DomainModel.ApplicationClasses.ApiService.TimeTableManagement
{
    public class GetTimeTableAc
    {
        public int InstituteId { get; set; }

        public int AcademicYearId { get; set; }

        public int ClassId { get; set; }

        public int SectionId { get; set; }

        public int? StaffId { get; set; }
    }
}
