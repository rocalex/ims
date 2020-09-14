namespace IMS.DomainModel.ApplicationClasses.LeaveTypeManagement
{
    public class LeaveTypeManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public LeaveTypeManagementResponseType ErrorType { get; set; }
    }

    public enum LeaveTypeManagementResponseType
    {
        Code,
        Name,
        LeaveAssignedTos,
        Id
    }
}
