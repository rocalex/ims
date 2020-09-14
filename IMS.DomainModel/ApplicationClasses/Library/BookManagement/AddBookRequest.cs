using System;
using System.Collections.Generic;
using System.Text;

namespace IMS.DomainModel.ApplicationClasses.Library.BookManagement
{
    public class AddBookRequest
    {
        public AddBookAc AddBook { get; set; }

        public AddPublisher AddPublisher { get; set; }
    }
}
