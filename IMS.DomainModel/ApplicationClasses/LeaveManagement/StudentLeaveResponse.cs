namespace IMS.DomainModel.ApplicationClasses.LeaveManagement
{
    public class StudentLeaveResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public StudentLeaveResponseType ErrorType { get; set; }
    }

    public enum StudentLeaveResponseType
    {
        StudentId,
        LeaveTypeId,
        Reason,
        StatusId,
        ApprovedById,
        Id
    }
}
