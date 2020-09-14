using System;

namespace IMS.DomainModel.ApplicationClasses.HomeworkManagement
{
    public class GetHomeworkAc
    {
        public int StaffId { get; set; }

        public int ClassId { get; set; }

        public int SectionId { get; set; }

        public DateTime Date { get; set; }
    }
}
