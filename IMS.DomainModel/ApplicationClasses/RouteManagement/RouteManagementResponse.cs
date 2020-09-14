namespace IMS.DomainModel.ApplicationClasses.RouteManagement
{
    public class RouteManagementResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public RouteManagementResponseType ErrorType { get; set; }
    }

    public enum RouteManagementResponseType
    {
        Code,
        Name,
        Id,
        PlaceId
    }
}
