using IMS.DomainModel.ApplicationClasses.ActivityStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.ActivityStatusManagement
{
    public class ActivityStatusManagementRepository : IActivityStatusManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _iMSDbContext;
        private readonly ActivityStatusAppSettings _activityStatusAppSettings;

        #endregion

        #region Constructor

        public ActivityStatusManagementRepository(IMSDbContext iMSDbContext,
            IOptions<ActivityStatusAppSettings> activityStatusAppSettings)
        {
            _iMSDbContext = iMSDbContext;
            _activityStatusAppSettings = activityStatusAppSettings.Value;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method to add Activity Status - RS
        /// </summary>
        /// <param name="addActivityStatus">Slab</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddActivityStatusAsync(AddActivityStatusAC addActivityStatus, int instituteId)
        {
            if (!await _iMSDbContext.ActivityStatus.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addActivityStatus.Code.ToLowerInvariant()))
            {
                ActivityStatus activityStatus = new ActivityStatus()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addActivityStatus.Name,
                    Code = addActivityStatus.Code,
                    Description = addActivityStatus.Description,
                    Status = true,
                    IsEditable = true
                };
                _iMSDbContext.ActivityStatus.Add(activityStatus);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Activity Status added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Activity Status with the same name is already exist" };
        }

        /// <summary>
        /// Method to get list of Activity Status by institute id - RS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<ActivityStatus>> GetAllActivityStatusAsync(int instituteId, ApplicationUser currentUser)
        {
            await SeedInitialActivityStatus(instituteId, currentUser);
            return (await _iMSDbContext.ActivityStatus.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Activity Status - RS
        /// </summary>
        /// <param name="updateMeetingAgenda">Slab detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateActivityStatusAsync(UpdateActivityStatusAC updateActivityStatus, int instituteId)
        {
            List<ActivityStatus> activityStatuses = await _iMSDbContext.ActivityStatus.Where(x => x.InstituteId == instituteId && x.Id != updateActivityStatus.ActivityStatusId).ToListAsync();
            bool isDuplicate = activityStatuses.Any(x => x.Code.ToLowerInvariant() == updateActivityStatus.Code.ToLowerInvariant());

            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Activity Status. Please use unique code" };
            else
            {
                ActivityStatus activityStatus = await _iMSDbContext.ActivityStatus.FirstAsync(x => x.Id == updateActivityStatus.ActivityStatusId);
                activityStatus.Name = updateActivityStatus.Name;
                activityStatus.Code = updateActivityStatus.Code;
                activityStatus.Description = updateActivityStatus.Description;
                activityStatus.Status = updateActivityStatus.Status;

                _iMSDbContext.ActivityStatus.Update(activityStatus);
                await _iMSDbContext.SaveChangesAsync();

                return new SharedLookUpResponse() { HasError = false, Message = "Activity Status updated successfully" };
            }
        }

        #endregion

        #region Private methods

        /// <summary>
        /// Method for seeding the initial activity status
        /// </summary>
        /// <param name="instiuteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        private async Task SeedInitialActivityStatus(int instituteId, ApplicationUser currentUser)
        {
            List<string> existingActivityStatus = await _iMSDbContext.ActivityStatus.Where(x => x.InstituteId == instituteId).Select(c => c.Name).ToListAsync();
            List<string> activityStatusToAdd = _activityStatusAppSettings.InitialActivityStatus.Except(existingActivityStatus).ToList();

            List<ActivityStatus> addedActivityStatusList = new List<ActivityStatus>();
            foreach (string activityStatus in activityStatusToAdd)
            {
                addedActivityStatusList.Add(new ActivityStatus()
                {
                    Code = activityStatus,
                    Name = activityStatus,
                    Status = true,
                    InstituteId = instituteId,
                    CreatedOn = DateTime.UtcNow,
                    IsEditable = false
                });
            }

            if (addedActivityStatusList.Count != 0)
            {
                _iMSDbContext.ActivityStatus.AddRange(addedActivityStatusList);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        #endregion
    }
}
