using IMS.DomainModel.ApplicationClasses.Hostel.FloorRoomManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.FloorRoomManagement
{
    public interface IFloorRoomManagementRepository
    {
        Task<dynamic> AddRoomAsync(AddFloorRoomAc addRoom);

        Task<List<FloorRoom>> GetComponentsAsync(int blockId, int floorNo);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateFloorRoomAc updateRoom);

        Task MigratePreviousDataAsync();
    }
}
