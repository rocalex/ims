using IMS.DomainModel.ApplicationClasses.Hostel.BlockManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.BlockManagement
{
    public interface IBlockManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddBlockAc addComponent, int institudeId);

        Task<List<HostelBlock>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateBlockAc updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
