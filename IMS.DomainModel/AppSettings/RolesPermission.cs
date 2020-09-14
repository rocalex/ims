using System.Collections.Generic;

namespace IMS.DomainModel.AppSettings
{
    public class RolesPermission
    {
        public RolesPermission()
        {
            Roles = new List<string>();
        }
        public List<string> Roles { get; set; }
    }
}
