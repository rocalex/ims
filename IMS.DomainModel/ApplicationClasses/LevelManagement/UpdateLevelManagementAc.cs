using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.LevelManagement
{
    public class UpdateLevelManagementAc
    {
        [Required]
        public string Name { get; set; }

        public int LevelId { get; set; }

		[Required]
		public string Code { get; set; }

		public bool Status { get; set; }

		public string Description { get; set; }
	}
}
