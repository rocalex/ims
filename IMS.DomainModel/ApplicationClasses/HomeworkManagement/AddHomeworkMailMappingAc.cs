using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.HomeworkManagement
{
    public class AddHomeworkMailMappingAc
    {
        public int HomeworkId { get; set; }

        [Required]
        public string Message { get; set; }

        public string Subject { get; set; }

        public List<string> Bcc { get; set; }

        public List<StudentBasicInformation> Students { get; set; }
    }
}
