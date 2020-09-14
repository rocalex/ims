using System;
using System.Collections.Generic;
using System.Text;

namespace IMS.DomainModel.ApplicationClasses.Library.ReturnBookManagement
{
    public class ReturnBookAc
    {
        public int IssueBookId { get; set; }

        public int Fine { get; set; }

        public DateTime ReturnDate { get; set; }
    }
}
