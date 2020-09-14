using System;

namespace IMS.DomainModel.ApplicationClasses.FeeManagement
{
    public class CourseFeeTermAc
    {
        public int Id { get; set; }

        public int ClassId { get; set; }

        public string ClassName { get; set; }

        public int AcademicYearId { get; set; }

        public string AcademicYearName { get; set; }

        public DateTime DueDate { get; set; }

        public double LateFee { get; set; }

        public int ReligionId { get; set; }

        public string ReligionName { get; set; }
    }
}
