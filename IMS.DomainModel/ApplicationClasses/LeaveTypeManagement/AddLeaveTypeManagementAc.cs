using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.LeaveTypeManagement
{
    public class AddLeaveTypeManagementAc
    {
        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public double NumberOfAllowedLeave { get; set; }

        public string LeaveAssignedTypeEnumDescription { get; set; }

        public string Description { get; set; }

        public virtual List<string> LeaveAssignedTos { get; set; }
    }
}
