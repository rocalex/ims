using IMS.DomainModel.ApplicationClasses.Hostel.BedManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.BedManagement
{
    public interface IBedManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddBed addComponent, int instituteId);

        Task<List<Bed>> GetComponentsAsync(int instituteId, int roomId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateBed updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
