namespace IMS.DomainModel.ApplicationClasses.LeaveManagement
{
    public class StaffLeaveResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public StaffLeaveResponseType ErrorType { get; set; }
    }

    public enum StaffLeaveResponseType
    {
        StaffId,
        LeaveTypeId,
        Reason,
        StatusId,
        ApprovedById,
        Id
    }
}
