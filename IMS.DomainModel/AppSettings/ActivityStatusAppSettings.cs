using System.Collections.Generic;

namespace IMS.DomainModel.AppSettings
{
    public class ActivityStatusAppSettings
    {
        public ActivityStatusAppSettings()
        {
            InitialActivityStatus = new List<string>();
        }

        public List<string> InitialActivityStatus { get; set; }
    }
}
