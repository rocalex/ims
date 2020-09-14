using IMS.DomainModel.ApplicationClasses.Hostel.Lookup.RoomTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.Lookup.RoomTypeManagement
{
    public interface IRoomTypeManagement
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddRoomType addComponent, int instituteId);

        Task<List<RoomType>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateRoomType updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
