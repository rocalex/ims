using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.RelationshipManagement
{
    public class UpdateRelationshipManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int RelationshipId { get; set; }

        [Required]
        public string Code { get; set; }

        public bool Status { get; set; }

        public string Description { get; set; }
    }
}
