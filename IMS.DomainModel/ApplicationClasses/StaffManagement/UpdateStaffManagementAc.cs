using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class UpdateStaffManagementAc : AddStaffManagementAc
    {
        public UpdateStaffManagementAc()
        {
            GalleryImageToDelete = new List<int>();
        }
        public int Id { get; set; }

        public List<int> GalleryImageToDelete { get; set; }
    }
}
