using IMS.DomainModel.ApplicationClasses.Payroll.EmployeeCompMappingManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Payroll.EmployeeCompMappingManagement
{
    public interface IEmployeeCompMappingRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddEmployeeCompMapping addComponent, int instituteId);

        Task<List<EmployeeCompMapping>> GetComponentsAsync(int staffId, int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateEmployeeCompMapping updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
