using System;
using System.Collections.Generic;
using System.Text;

namespace IMS.DomainModel.ApplicationClasses.Hostel.MessManagement
{
    public class AddRequest
    {
        public int HostelId { get; set; }

        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        public AddMessStudentMapping[] Mappings { get; set; }
    }
}
