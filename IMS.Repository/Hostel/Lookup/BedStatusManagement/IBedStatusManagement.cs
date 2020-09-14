using IMS.DomainModel.ApplicationClasses.Hostel.Lookup.BedStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.Lookup.BedStatusManagement
{
    public interface IBedStatusManagement
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddBedStatus addComponent, int instituteId);

        Task<List<BedStatus>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateBedStatus updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
