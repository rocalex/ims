using System;

namespace IMS.DomainModel.ApplicationClasses.MotherTongueManagement
{
    public class MotherTongueAc
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
