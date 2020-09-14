using System.Collections.Generic;

namespace IMS.DomainModel.AppSettings
{
    public class LookUpManagementData
    {
        public LookUpManagementData()
        {
            LookUps = new List<string>();
        }
        public List<string> LookUps { get; set; }
    }
}
