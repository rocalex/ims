using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
    public class UpdateStudentManagementAc : AddStudentManagementAc
    {
        public UpdateStudentManagementAc()
        {
            GalleryImageToDelete = new List<int>();
            DocumentToDelete = new List<int>();
        }
        public int Id { get; set; }

        public List<int> GalleryImageToDelete { get; set; }

        public List<int> DocumentToDelete { get; set; }
    }
}
