using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.TemplateManagement
{
    public class AddTemplateAc
    {
        [Required]
        public string Name { get; set; }

        public string TemplateFormat { get; set; }

        public string To { get; set; }

        public string EmailBcc { get; set; }

        public string EmailSubject { get; set; }

        public string Format { get; set; }

        public string TemplateFeatureType { get; set; }

        public string TemplateType { get; set; }
    }
}
