using System;

namespace IMS.DomainModel.ApplicationClasses.StudentRelievingManagement
{
    public class AddStudentRelievingManagementAc
    {
        public int StudentId { get; set; }

        public string StudentRelieving { get; set; }

        public string Reason { get; set; }

        public DateTime RelievingDate { get; set; }
    }
}
