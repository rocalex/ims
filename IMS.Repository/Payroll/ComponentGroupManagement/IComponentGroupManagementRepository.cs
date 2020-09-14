using IMS.DomainModel.ApplicationClasses.Payroll.ComponentGroupManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Payroll.ComponentGroupManagement
{
    public interface IComponentGroupManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentGroupAsync(AddComponentGroupAc addComponentGroup, int instituteId);

        Task<List<ComponentGroup>> GetComponentGroupsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateComponentGroupAsync(UpdateComponentGroupAc updateComponentGroupAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
