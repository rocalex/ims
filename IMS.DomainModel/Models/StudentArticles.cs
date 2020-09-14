using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class StudentArticles : BaseModel
    {
        public string Title { get; set; }

        public string FileName { get; set; }

        public int SubmittedBy { get; set; }

        public bool IsApproved { get; set; }

        public string ArticleFilePath { get; set; }

        public DateTime SubmissionDate { get; set; }

        [ForeignKey("SubmittedBy")]
        public virtual StudentBasicInformation SubmittedByStudent { get; set; }
    }
}
