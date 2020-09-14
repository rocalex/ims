using System;
using System.Collections.Generic;
using System.Text;

namespace IMS.DomainModel.ApplicationClasses.Library.BookManagement
{
    public class UpdateBookRequest
    {
        public UpdateBookAc UpdateBook { get; set; }
        public UpdatePublisher UpdatePublisher { get; set; }
    }
}
