using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.RouteManagement
{
    public class AddRouteManagementAc
    {
        public AddRouteManagementAc()
        {
            RouteStageMappings = new List<RouteStageMappingAc>();
        }

        [Required]
        public string Code { get; set; }

        [Required]
        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public List<RouteStageMappingAc> RouteStageMappings { get; set; }
    }
}
