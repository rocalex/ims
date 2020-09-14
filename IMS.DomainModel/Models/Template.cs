using IMS.DomainModel.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Template : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public TemplateFormatEnum TemplateFormat { get; set; }

        public string To { get; set; }

        public string EmailBcc { get; set; }

        public string EmailSubject { get; set; }

        [Required]
        public string Format { get; set; }

        public TemplateFeatureEnum TemplateFeatureType { get; set; }

        public TemplateTypeEnum TemplateType { get; set; }

        public int InstituteId { get; set; }
        [ForeignKey("InstituteId")]
        public virtual Institute Institute { get; set; }
    }
}
