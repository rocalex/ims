using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.DisciplinaryManagement
{
    public class AddDisciplinaryManagementAc
    {
        public AddDisciplinaryManagementAc()
        {
            StudentIds = new List<int>();
        }
        public List<int> StudentIds { get; set; }

        public int StatusId { get; set; }

        [Required]
        public string Subject { get; set; }

        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        public string Remarks { get; set; }
    }
}
