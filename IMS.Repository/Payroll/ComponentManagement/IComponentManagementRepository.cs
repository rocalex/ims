using IMS.DomainModel.ApplicationClasses.Payroll.ComponentManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Payroll.ComponentManagement
{
    public interface IComponentManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddComponentAc addComponent, int instituteId);

        Task<List<PayrollComponent>> GetComponentsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateComponentAc updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
