using IMS.DomainModel.ApplicationClasses.Inventory.Lookup.TaxTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Lookup.TaxTypeManagement
{
    public interface ITaxTypeManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddTaxType addComponent, int instituteId);

        Task<List<TaxType>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateTaxType updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
