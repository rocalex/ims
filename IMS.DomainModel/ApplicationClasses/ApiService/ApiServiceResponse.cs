namespace IMS.DomainModel.ApplicationClasses.ApiService
{
    public class ApiServiceResponse
    {
        public int Status { get; set; }

        public string Message { get; set; }

        public dynamic ResultObj { get; set; }
    }
}
