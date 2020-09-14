using System;
using System.Collections.Generic;
using System.Text;

namespace IMS.DomainModel.ApplicationClasses.Hostel.MessManagement
{
    public class GetMessManageRequest
    {
        public int HostelId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }
    }
}
