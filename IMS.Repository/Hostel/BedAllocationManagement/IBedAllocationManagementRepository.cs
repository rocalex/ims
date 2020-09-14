using IMS.DomainModel.ApplicationClasses.Hostel.BedAllocationManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.BedAllocationManagement
{
    public interface IBedAllocationManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddBedAllocation[] addComponent, int floorNo, int instituteId);

        Task<List<BedAllocation>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateBedAllocation updateComponentAc, int instituteId);
    }
}
