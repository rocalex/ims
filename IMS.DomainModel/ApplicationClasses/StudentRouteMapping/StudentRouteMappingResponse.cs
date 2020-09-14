namespace IMS.DomainModel.ApplicationClasses.StudentRouteMapping
{
    public class StudentRouteMappingResponse
    {
        public string Message { get; set; }

        public bool HasError { get; set; }

        public StudentRouteMappingResponseType ErrorType { get; set; }
    }

    public enum StudentRouteMappingResponseType
    {
        RouteId,
        StudentId
    }
}
