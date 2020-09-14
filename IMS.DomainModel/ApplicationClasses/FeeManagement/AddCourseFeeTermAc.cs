using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.FeeManagement
{
    public class AddCourseFeeTermAc
    {
        public int Term { get; set; }

        public CourseFeeTermAc CourseFeeTermAc { get; set; }

        public List<CourseFeeTermDetailsAc> CourseFeeTermDetailsList { get; set; }
    }
}
