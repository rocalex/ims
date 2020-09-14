using IMS.DomainModel.ApplicationClasses.Inventory.Lookup.ItemTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Lookup.ItemTypeManagement
{
    public interface IItemTypeManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddItemType addComponent, int instituteId);

        Task<List<ItemType>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateItemType updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
