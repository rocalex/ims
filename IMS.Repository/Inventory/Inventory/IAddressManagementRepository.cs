using IMS.DomainModel.ApplicationClasses.Inventory.Location;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Inventory
{
    public interface IAddressManagementRepository
    {
        Task<dynamic> AddComponentAsync(AddAddress addComponent, int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateAddress updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
