using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.HomeworkManagement
{
    public class AddHomeworkMessageMappingAc
    {
        public int HomeworkId { get; set; }

        [Required]
        public string Message { get; set; }

        public List<string> OtherNumbers { get; set; }

        public List<StudentBasicInformation> Students { get; set; }
    }
}
