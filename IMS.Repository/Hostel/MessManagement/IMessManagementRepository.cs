using IMS.DomainModel.ApplicationClasses.Hostel.MessManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace IMS.Repository.Hostel.MessManagement
{
    public interface IMessManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddRequest addComponent, int instituteId);

        Task<List<MessManageStudentMapping>> GetComponentsAsync(int instituteId, int hostelId, DateTime fromDate, DateTime toDate);

        Task MigratePreviousDataAsync();
    }
}
