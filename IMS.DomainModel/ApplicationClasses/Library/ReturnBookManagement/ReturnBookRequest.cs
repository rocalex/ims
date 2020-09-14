using System;
using System.Collections.Generic;
using System.Text;

namespace IMS.DomainModel.ApplicationClasses.Library.ReturnBookManagement
{
    public class ReturnBookRequest
    {
        public int BookId { get; set; }
        public List<ReturnBookAc> ReturnBookList { get; set; }
    }
}
