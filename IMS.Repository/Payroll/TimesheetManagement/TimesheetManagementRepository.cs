using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Payroll.TimesheetManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Payroll.TimesheetManagement
{
    public class TimesheetManagementRepository : ITimesheetManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public TimesheetManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddTimesheet[] addComponent, int instituteId)
        {
            var oldEntries = await iMSDbContext.Timesheets.Where(x => x.StaffId == addComponent[0].StaffId && x.PresenceDate.Month == addComponent[0].PresenceDate.Month).ToListAsync();
            iMSDbContext.Timesheets.RemoveRange(oldEntries);
            await iMSDbContext.SaveChangesAsync();

            foreach(AddTimesheet timesheet in addComponent)
            {
                var newTimesheet = new Timesheet()
                {
                    InstituteId = instituteId,
                    StaffId = timesheet.StaffId,
                    PresenceDate = timesheet.PresenceDate,
                    PresenceType = timesheet.PresenceType,
                };
                iMSDbContext.Timesheets.Add(newTimesheet);
            }
            await iMSDbContext.SaveChangesAsync();
            return new SharedLookUpResponse() { HasError = false, Message = "Timesheet Entries added successfully" };
        }

        public async Task<List<Timesheet>> GetTimesheetsByMonthAsync(int staffId, int month, int instituteId)
        {
            var results = new List<Timesheet>();
            var currentYear = DateTime.UtcNow.Year;
            foreach (DateTime date in AllDatesInMonth(currentYear, month))
            {
                var isExist = await iMSDbContext.Timesheets.AnyAsync(x => x.InstituteId == instituteId && x.StaffId == staffId && x.PresenceDate == date);
                if (isExist)
                {
                    var timesheet = await iMSDbContext.Timesheets.FirstAsync(x => x.InstituteId == instituteId && x.StaffId == staffId && x.PresenceDate == date);
                    results.Add(timesheet);
                }
                else
                {
                    var timesheet = new Timesheet()
                    {
                        PresenceDate = date,
                        StaffId = staffId,
                        PresenceType = 0,
                        InstituteId = instituteId
                    };
                    iMSDbContext.Timesheets.Add(timesheet);
                    await iMSDbContext.SaveChangesAsync();
                    results.Add(timesheet);
                }
            }
            return results;
        }

        public async Task<Timesheet> GetComponentAsync(int staffId, DateTime date, int instituteId)
        {
            var isExist = await iMSDbContext.Timesheets.AnyAsync(x => x.InstituteId == instituteId && x.StaffId == staffId && x.PresenceDate.Year == date.Year && x.PresenceDate.Month == date.Month && x.PresenceDate.Date == date.Date);
            if(isExist)
            {
                var timesheet = await iMSDbContext.Timesheets.FirstAsync(x => x.InstituteId == instituteId && x.StaffId == staffId && x.PresenceDate.Year == date.Year && x.PresenceDate.Month == date.Month && x.PresenceDate.Date == date.Date);
                return timesheet;
            } else
            {
                var timesheet = new Timesheet()
                {
                    PresenceDate = new DateTime(date.Year, date.Month, date.Day),
                    StaffId = staffId,
                    PresenceType = 0,
                    InstituteId = instituteId
                };
                iMSDbContext.Timesheets.Add(timesheet);
                await iMSDbContext.SaveChangesAsync();
                return timesheet;         
            }
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.Timesheets.ToListAsync();
            iMSDbContext.Timesheets.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateTimesheet updateComponentAc, int instituteId)
        {
            var updateTimesheet = await iMSDbContext.Timesheets.FirstAsync(x => x.Id == updateComponentAc.Id);
            updateTimesheet.StaffId = updateComponentAc.StaffId;
            updateTimesheet.PresenceDate = new DateTime(updateComponentAc.PresenceDate.Year, updateComponentAc.PresenceDate.Month, updateComponentAc.PresenceDate.Day);
            updateTimesheet.PresenceType = updateComponentAc.PresenceType;
            iMSDbContext.Timesheets.Update(updateTimesheet);
            await iMSDbContext.SaveChangesAsync();
            return new SharedLookUpResponse() { HasError = false, Message = "Timesheet Entry updated successfully" };
        }
        #endregion

        public static IEnumerable<DateTime> AllDatesInMonth(int year, int month)
        {
            int days = DateTime.DaysInMonth(year, month);
            for (int day = 1; day <= days; day++)
            {
                yield return new DateTime(year, month, day);
            }
        }
    }
}
