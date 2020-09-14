using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class LeaveAssignedTo : BaseModel
    {
        public int LeaveTypeId { get; set; }
        [ForeignKey("LeaveTypeId")]
        public virtual LeaveType LeaveType { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
    }
}
