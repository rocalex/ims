using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.HomeworkManagement
{
    public class AddHomeworkManagementAc
    {
        public AddHomeworkManagementAc()
        {
            HomeworkSubjectMappings = new List<AddHomeworkSubjectMappingAc>();
        }

        public int StaffId { get; set; }

        public DateTime HomeworkDate { get; set; }

        public int ClassId { get; set; }

        public int SectionId { get; set; }

        public List<AddHomeworkSubjectMappingAc> HomeworkSubjectMappings { get; set; }
    }

    public class AddHomeworkSubjectMappingAc
    {
        public int SubjectId { get; set; }

        [Required]
        public string HomeworkData { get; set; }

        public bool IsSelected { get; set; }
    }
}
