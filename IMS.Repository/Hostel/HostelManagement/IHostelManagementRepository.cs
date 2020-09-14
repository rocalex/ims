using IMS.DomainModel.ApplicationClasses.Hostel.HostelManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.HostelManagement
{
    public interface IHostelManagementRepository
    {
        Task<SharedLookUpResponse> AddHostelAsync(AddHostelAc addComponent, int institudeId);

        Task<List<IMS.DomainModel.Models.Hostel>> GetHostelsAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateHostelAsync(UpdateHostelAc updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
