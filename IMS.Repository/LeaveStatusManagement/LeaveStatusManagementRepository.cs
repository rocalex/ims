using IMS.DomainModel.ApplicationClasses.LeaveStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.LeaveStatusManagement
{
    public class LeaveStatusManagementRepository : ILeaveStatusManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly List<string> statuses = new List<string>() { "Pending", "Rejected", "OnHold", "Approve" };
        #endregion

        #region Constructor
        public LeaveStatusManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to seed Leave status - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        public async Task SeedLeaveStatusAsync(int instituteId)
        {
            List<LeaveStatus> LeaveStatuses = new List<LeaveStatus>();
            foreach (var item in statuses)
            {
                if (!await _iMSDbContext.LeaveStatuses.AnyAsync(c => c.Code.ToLowerInvariant() == item.ToLowerInvariant() && c.InstituteId == instituteId))
                {
                    LeaveStatuses.Add(new LeaveStatus()
                    {
                        Code = item,
                        CreatedOn = DateTime.UtcNow,
                        Description = item,
                        InstituteId = instituteId,
                        Name = item,
                        Status = true,
                        IsEditable = false
                    });
                }
            }
            _iMSDbContext.LeaveStatuses.AddRange(LeaveStatuses);
            await _iMSDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method to add Leave Status - SS
        /// </summary>
        /// <param name="name">name of LeaveStatus</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddLeaveStatusAsync(AddLeaveStatusManagementAc addLeaveStatus, int instituteId)
        {
            if (!await _iMSDbContext.LeaveStatuses.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addLeaveStatus.Code.ToLowerInvariant()))
            {
                var LeaveStatus = new LeaveStatus()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addLeaveStatus.Name,
                    Code = addLeaveStatus.Code,
                    Description = addLeaveStatus.Description,
                    Status = true,
                    IsEditable = true
                };
                _iMSDbContext.LeaveStatuses.Add(LeaveStatus);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Leave status added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Leave status with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of Leave Status by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<LeaveStatus>> GetAllLeaveStatusAsync(int instiuteId)
        {
            return (await _iMSDbContext.LeaveStatuses.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Leave Status - SS
        /// </summary>
        /// <param name="updateLeaveStatusManagement">LeaveStatus detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateLeaveStatusAsync(UpdateLeaveStatusManagementAc updateLeaveStatusManagement, int instituteId)
        {
            var LeaveStatuss = await _iMSDbContext.LeaveStatuses.Where(x => x.InstituteId == instituteId && x.Id != updateLeaveStatusManagement.Id).ToListAsync();
            var isDuplicate = LeaveStatuss.Any(x => x.Code.ToLowerInvariant() == updateLeaveStatusManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Leave status. Please use unique code" };
            else
            {
                var LeaveStatus = await _iMSDbContext.LeaveStatuses.FirstAsync(x => x.Id == updateLeaveStatusManagement.Id);
                LeaveStatus.Name = updateLeaveStatusManagement.Name;
                LeaveStatus.Code = updateLeaveStatusManagement.Code;
                LeaveStatus.Description = updateLeaveStatusManagement.Description;
                LeaveStatus.Status = updateLeaveStatusManagement.Status;
                _iMSDbContext.LeaveStatuses.Update(LeaveStatus);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { Message = "Leave status updated successfully", HasError = false };
            }
        }

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var institutes = await _iMSDbContext.Institutes.Select(s => s.Id).ToListAsync();
            foreach (var institute in institutes)
            {
                await SeedLeaveStatusAsync(institute);
            }
        }
        #endregion
    }
}
