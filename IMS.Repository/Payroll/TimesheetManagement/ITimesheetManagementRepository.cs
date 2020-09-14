using IMS.DomainModel.ApplicationClasses.Payroll.TimesheetManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace IMS.Repository.Payroll.TimesheetManagement
{
    public interface ITimesheetManagementRepository
    {
        Task<SharedLookUpResponse> AddComponentAsync(AddTimesheet[] addComponent, int instituteId);

        Task<Timesheet> GetComponentAsync(int staffId, DateTime date, int instituteId);

        Task<List<Timesheet>> GetTimesheetsByMonthAsync(int staffId, int month, int instituteId);

        Task<SharedLookUpResponse> UpdateComponentAsync(UpdateTimesheet updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
