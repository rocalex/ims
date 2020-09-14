using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StudentRouteMapping
{
    public class AddOrUpdateStudentRouteMappingAc
    {
        public AddOrUpdateStudentRouteMappingAc()
        {
            StudentIds = new List<int>();
        }
        public int RouteId { get; set; }

        public List<int> StudentIds { get; set; }
    }
}
