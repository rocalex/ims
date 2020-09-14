using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.DisciplinaryManagement
{
    public class UpdateDisciplinaryManagementAc
    {
        public int Id { get; set; }

        public int StatusId { get; set; }

        [Required]
        public string Subject { get; set; }

        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        public string Remarks { get; set; }
    }
}
