using System.Collections.Generic;

namespace IMS.DomainModel.AppSettings
{
    public class TemplateManagementTypes
    {
        public TemplateManagementTypes()
        {
            Templates = new List<string>();
            TemplateFeatures = new List<string>();
        }

        public List<string> Templates { get; set; }

        public List<string> TemplateFeatures { get; set; }
    }
}
