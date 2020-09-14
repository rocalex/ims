using IMS.DomainModel.ApplicationClasses.Inventory.Location;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Inventory
{
    public interface ILocationManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddLocation addComponent, int instituteId);

        Task<List<Location>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateLocation updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
