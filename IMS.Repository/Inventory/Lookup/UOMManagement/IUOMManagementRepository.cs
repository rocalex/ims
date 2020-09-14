using IMS.DomainModel.ApplicationClasses.Inventory.Lookup.UOMManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Lookup.UOMManagement
{
    public interface IUOMManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddUOM addComponent, int instituteId);

        Task<List<UOM>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateUOM updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
