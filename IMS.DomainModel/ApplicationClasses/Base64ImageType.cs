using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses
{
    public class Base64ImageType
    {
        public Base64ImageType()
        {
            Images = new List<string>();
        }
        public List<string> Images { get; set; }

        public string FolderName { get; set; }

        public string SubFolderName { get; set; }
    }
}
