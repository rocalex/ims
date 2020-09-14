using IMS.DomainModel.ApplicationClasses.NotificationManagement;
using IMS.DomainModel.ApplicationClasses.StaffManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.NotificationManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.StaffActivityManagement
{
    public class StaffActivityManagementRepository : IStaffActivityManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly SystemRoles _systemRoles;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private INotificationManagementRepository _notificationManagementRepository;

        #endregion

        #region Constructor

        public StaffActivityManagementRepository(IMSDbContext imsDbContext,
            IOptions<SystemRoles> systemRoles,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            INotificationManagementRepository notificationManagementRepository)
        {
            _imsDbContext = imsDbContext;
            _systemRoles = systemRoles.Value;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _notificationManagementRepository = notificationManagementRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all activities - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<List<StaffActivityAc>> GetAllActivitiesAsync(ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            List<StaffActivity> staffActivitiesList = await _imsDbContext.StaffActivities
                .Include(x => x.MeetingAgenda)
                .Include(x => x.ActivityStatus)
                .Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<StaffActivityAc> staffActivitiesListAc = new List<StaffActivityAc>();

            foreach (StaffActivity staffActivity in staffActivitiesList)
            {
                staffActivitiesListAc.Add(new StaffActivityAc
                {
                    Id = staffActivity.Id,
                    Name = staffActivity.Name,
                    Description = staffActivity.Description,
                    StartDate = staffActivity.StartDate,
                    EndDate = staffActivity.EndDate,
                    IsActive = staffActivity.IsActive,
                    InstituteId = staffActivity.InstituteId,
                    ActivityStatusId = staffActivity.ActivityStatusId,
                    ActivityStatusName = staffActivity.ActivityStatus.Name,
                    MeetingAgendaId = staffActivity.MeetingAgendaId,
                    MeetingAgendaName = staffActivity.MeetingAgenda.Name,
                    StartTime = staffActivity.StartTime,
                    EndTime = staffActivity.EndTime,
                    Location = staffActivity.Location
                });
            }

            return staffActivitiesListAc;
        }

        /// <summary>
        /// Method for fetching an activity by id - RS
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<StaffActivityAc> GetActivityByIdAsync(int activityId, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            StaffActivity staffActivity = await _imsDbContext.StaffActivities
                .Include(x => x.MeetingAgenda)
                .Include(x => x.ActivityStatus)
                .Include(x => x.ActivityAttendeeMappings)
                .FirstOrDefaultAsync(x => x.Id == activityId && x.InstituteId == currentUserInstituteId);

            StaffActivityAc staffActivityAc = new StaffActivityAc
            {
                Id = staffActivity.Id,
                Name = staffActivity.Name,
                Description = staffActivity.Description,
                StartDate = staffActivity.StartDate,
                EndDate = staffActivity.EndDate,
                IsActive = staffActivity.IsActive,
                InstituteId = staffActivity.InstituteId,
                ActivityStatusId = staffActivity.ActivityStatusId,
                ActivityStatusName = staffActivity.ActivityStatus.Name,
                MeetingAgendaId = staffActivity.MeetingAgendaId,
                MeetingAgendaName = staffActivity.MeetingAgenda.Name,
                StartTime = staffActivity.StartTime,
                EndTime = staffActivity.EndTime,
                Location = staffActivity.Location,
                ActivityAttendeeList = new List<StaffActivityAttendeeMappingAc>()
            };

            List<ApplicationUser> activityAttendeesList = await _imsDbContext.ActivityAttendeeMappings
                .Where(x => x.ActivityId == activityId)
                .Include(x => x.Attendee)
                .Select(x => x.Attendee)
                .ToListAsync();

            List<StudentBasicInformation> studentBasicInformationList = await _imsDbContext.StudentBasicInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<StaffBasicPersonalInformation> staffBasicPersonalInformationList = await _imsDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            foreach (ActivityAttendeeMapping activityAttendeeMapping in staffActivity.ActivityAttendeeMappings)
            {
                string attendeeName = activityAttendeesList.FirstOrDefault(x => x.Id == activityAttendeeMapping.AttendeeId)?.Name;
                if (activityAttendeeMapping.ActivityAttendeeType == ActivityAttendeeTypeEnum.Staff)
                {
                    attendeeName = staffBasicPersonalInformationList.FirstOrDefault(x => x.UserId == activityAttendeeMapping.AttendeeId).FirstName;
                }
                else if (activityAttendeeMapping.ActivityAttendeeType == ActivityAttendeeTypeEnum.Student)
                {
                    attendeeName = studentBasicInformationList.FirstOrDefault(x => x.UserId == activityAttendeeMapping.AttendeeId).FirstName;

                }
                staffActivityAc.ActivityAttendeeList.Add(new StaffActivityAttendeeMappingAc
                {
                    ActivityId = staffActivity.Id,
                    ActivityName = staffActivity.Name,
                    ActivityAttendeeType = activityAttendeeMapping.ActivityAttendeeType,
                    ActivityAttendeeTypeString = EnumHelperService.GetDescription(activityAttendeeMapping.ActivityAttendeeType),
                    AttendeeId = activityAttendeeMapping.AttendeeId,
                    AttendeeName = attendeeName
                });
            }

            return staffActivityAc;
        }

        /// <summary>
        /// Method for adding new activity - RS
        /// </summary>
        /// <param name="newStaffActivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddActivityAsync(StaffActivityAc newStaffActivityAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            if (await _imsDbContext.StaffActivities.AnyAsync(x => x.InstituteId == currentUserInstituteId &&
            x.Name.ToLowerInvariant().Equals(newStaffActivityAc.Name.ToLowerInvariant()) && x.StartDate == newStaffActivityAc.StartDate && x.EndDate == newStaffActivityAc.EndDate))
            {
                return new { Message = "Activity already exists with this name within the same date range", HasError = true };
            }
            else
            {
                // Add activity
                StaffActivity newStaffActivity = new StaffActivity
                {
                    ActivityStatusId = newStaffActivityAc.ActivityStatusId,
                    Description = newStaffActivityAc.Description,
                    EndDate = newStaffActivityAc.EndDate,
                    EndTime = newStaffActivityAc.EndTime,
                    IsActive = newStaffActivityAc.IsActive,
                    Location = newStaffActivityAc.Location,
                    MeetingAgendaId = newStaffActivityAc.MeetingAgendaId,
                    Name = newStaffActivityAc.Name,
                    StartDate = newStaffActivityAc.StartDate,
                    StartTime = newStaffActivityAc.StartTime,
                    InstituteId = currentUserInstituteId,
                    CreatedOn = DateTime.UtcNow
                };
                _imsDbContext.StaffActivities.Add(newStaffActivity);
                await _imsDbContext.SaveChangesAsync();

                // Add activity attendee
                await AddActivityAttendeeAsync(newStaffActivity.Id, newStaffActivityAc.ActivityAttendeeList);

                // Add notification
                if (newStaffActivity.IsActive)
                {
                    await AddNotificationsAsync(currentUserInstituteId, currentUser, newStaffActivityAc);
                }

                return new { Message = "Activity created successfully" };
            }
        }

        /// <summary>
        /// Method for updating an existing activity - RS
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="updatedStaffActivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateActivityAsync(int activityId, StaffActivityAc updatedStaffActivityAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            StaffActivity existingActivity = await _imsDbContext.StaffActivities.FirstOrDefaultAsync(x => x.Id == activityId && x.InstituteId == currentUserInstituteId);

            if (existingActivity == null)
            {
                return new { Message = "No activity exists with this id", HasError = true };
            }
            else if (await _imsDbContext.StaffActivities.AnyAsync(x => x.Id != activityId && x.InstituteId == currentUserInstituteId &&
                x.Name.ToLowerInvariant().Equals(updatedStaffActivityAc.Name.ToLowerInvariant())
                && x.StartDate == updatedStaffActivityAc.StartDate && x.EndDate == updatedStaffActivityAc.EndDate))
            {
                return new { Message = "Activity already exists with this name within the same date range", HasError = true };
            }
            else
            {
                // Update activity
                existingActivity.Name = updatedStaffActivityAc.Name;
                existingActivity.Description = updatedStaffActivityAc.Description;
                existingActivity.StartDate = updatedStaffActivityAc.StartDate;
                existingActivity.EndDate = updatedStaffActivityAc.EndDate;
                existingActivity.IsActive = updatedStaffActivityAc.IsActive;
                existingActivity.MeetingAgendaId = updatedStaffActivityAc.MeetingAgendaId;
                existingActivity.ActivityStatusId = updatedStaffActivityAc.ActivityStatusId;
                existingActivity.StartTime = updatedStaffActivityAc.StartTime;
                existingActivity.EndTime = updatedStaffActivityAc.EndTime;
                existingActivity.Location = updatedStaffActivityAc.Location;
                _imsDbContext.StaffActivities.Update(existingActivity);
                await _imsDbContext.SaveChangesAsync();

                // Update activity attendee
                List<ActivityAttendeeMapping> activityAttendeeMappingsList = await _imsDbContext.ActivityAttendeeMappings
                    .Where(x => x.ActivityId == existingActivity.Id).ToListAsync();
                _imsDbContext.ActivityAttendeeMappings.RemoveRange(activityAttendeeMappingsList);
                await _imsDbContext.SaveChangesAsync();
                await AddActivityAttendeeAsync(existingActivity.Id, updatedStaffActivityAc.ActivityAttendeeList);

                // Add notification
                if (existingActivity.IsActive)
                {
                    await AddNotificationsAsync(currentUserInstituteId, currentUser, updatedStaffActivityAc);
                }

                return new { Message = "Activity updated successfully" };
            }
        }

        /// <summary>
        /// Method for fetching the list of all students for attendee - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<StudentBasicInformation>> GetAttendeeStudentsListAsync(int currentUserInstituteId)
        {
            List<StudentBasicInformation> studentsList = new List<StudentBasicInformation>();
            List<StudentBasicInformation> students = await _imsDbContext.StudentBasicInformation.Where(x => x.InstituteId == currentUserInstituteId && x.IsActive).ToListAsync();
            List<int> relievedStudents = await _imsDbContext.StudentRelievingMappings.Where(x => x.Student.InstituteId == currentUserInstituteId).Select(x => x.StudentId).ToListAsync();
            students.ForEach(x =>
            {
                if (!relievedStudents.Contains(x.Id))
                    studentsList.Add(x);
            });

            return studentsList;
        }

        /// <summary>
        /// Method for fetching the list of all system users for attendee - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<UserAc>> GetAttendeeSystemUsersListAsync(int currentUserInstituteId)
        {
            List<UserAc> systemUsersList = new List<UserAc>();
            List<ApplicationUser> usersList = await _imsDbContext.Users.ToListAsync();
            foreach (ApplicationUser user in usersList)
            {
                IdentityRole roleName = null;
                IdentityUserRole<string> userRoleMapping = await _imsDbContext.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);
                if (userRoleMapping != null)
                    roleName = await _imsDbContext.Roles.FirstAsync(x => x.Id == userRoleMapping.RoleId);

                if (roleName == null || !roleName.Name.ToLowerInvariant().Equals(_systemRoles.Roles[0].ToLowerInvariant()))
                {
                    Institute userInstitute = (await _imsDbContext.UserInstituteMappings.Include(x => x.Institute)
                        .FirstOrDefaultAsync(x => x.UserId.Equals(user.Id) && x.InstituteId == currentUserInstituteId))?.Institute;
                    systemUsersList.Add(new UserAc
                    {
                        Id = user.Id,
                        Name = user.Name,
                        InstituteId = userInstitute?.Id,
                        Institute = userInstitute?.Name,
                        Email = user.Email
                    });
                }
            }

            return systemUsersList;
        }

        /// <summary>
        /// Method for fetching the list of all activities for a particular student - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="studentId"></param>
        /// <returns></returns>
        public async Task<List<StaffActivity>> GetActivitiesForStudentAsync(int currentUserInstituteId, int? studentId)
        {
            List<StaffActivity> activitiesList = await _imsDbContext.StaffActivities
                .Include(x => x.MeetingAgenda)
                .Include(x => x.ActivityStatus)
                .Include(x => x.ActivityAttendeeMappings)
                .Where(x => x.InstituteId == currentUserInstituteId && x.IsActive && x.ActivityAttendeeMappings.Any(y => y.ActivityAttendeeType == ActivityAttendeeTypeEnum.Student))
                .ToListAsync();

            if (studentId.HasValue)
            {
                ApplicationUser studentUser = (await _imsDbContext.StudentBasicInformation
                    .Include(x => x.User)
                    .FirstOrDefaultAsync(x => x.InstituteId == currentUserInstituteId && x.Id == studentId))
                    .User;
                activitiesList = activitiesList.Where(x => x.ActivityAttendeeMappings.Any(y => y.AttendeeId == studentUser.Id)).ToList();
            }

            // Remove user details (like password)
            activitiesList.ForEach(activity =>
            {
                activity.ActivityAttendeeMappings.ToList().ForEach(attendee =>
                {
                    attendee.Attendee = null;
                });
            });

            return activitiesList;
        }

        /// <summary>
        /// Method for fetching the list of all activities for a particular staff - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="staffId"></param>
        /// <returns></returns>
        public async Task<List<StaffActivity>> GetActivitiesForStaffAsync(int currentUserInstituteId, int? staffId)
        {
            List<StaffActivity> activitiesList = await _imsDbContext.StaffActivities
                .Include(x => x.MeetingAgenda)
                .Include(x => x.ActivityStatus)
                .Include(x => x.ActivityAttendeeMappings)
                .Where(x => x.InstituteId == currentUserInstituteId && x.IsActive && x.ActivityAttendeeMappings.Any(y => y.ActivityAttendeeType == ActivityAttendeeTypeEnum.Staff))
                .ToListAsync();

            if (staffId.HasValue)
            {
                ApplicationUser staffUser = (await _imsDbContext.StaffBasicPersonalInformation
                    .Include(x => x.User)
                    .FirstOrDefaultAsync(x => x.InstituteId == currentUserInstituteId && x.Id == staffId))
                    .User;
                activitiesList = activitiesList.Where(x => x.ActivityAttendeeMappings.Any(y => y.AttendeeId == staffUser.Id)).ToList();
            }

            // Remove user details (like password)
            activitiesList.ForEach(activity =>
            {
                activity.ActivityAttendeeMappings.ToList().ForEach(attendee =>
                {
                    attendee.Attendee = null;
                });
            });

            return activitiesList;
        }

        #endregion

        #region Private methods

        /// <summary>
        /// Private method for mapping activity and attendees - RS
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="activityAttendeeAcList"></param>
        /// <returns></returns>
        private async Task AddActivityAttendeeAsync(int activityId, List<StaffActivityAttendeeMappingAc> activityAttendeeAcList)
        {
            List<ActivityAttendeeMapping> newActivityAttendeeMappingList = new List<ActivityAttendeeMapping>();
            foreach (StaffActivityAttendeeMappingAc activityAttendeeAc in activityAttendeeAcList)
            {
                newActivityAttendeeMappingList.Add(new ActivityAttendeeMapping
                {
                    ActivityAttendeeType = activityAttendeeAc.ActivityAttendeeType,
                    ActivityId = activityId,
                    AttendeeId = activityAttendeeAc.AttendeeId,
                    CreatedOn = DateTime.UtcNow
                });
            }

            _imsDbContext.ActivityAttendeeMappings.AddRange(newActivityAttendeeMappingList);
            await _imsDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method for creating notification - RS
        /// </summary>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <param name="circularNotice"></param>
        /// <returns></returns>
        private async Task AddNotificationsAsync(int instituteId, ApplicationUser currentUser, StaffActivityAc staffActivity)
        {
            NotificationAc notificationAc = new NotificationAc
            {
                NotificationDetails = staffActivity.Description,
                NotificationMessage = staffActivity.Name,
                NotificationUserMappingsList = new List<NotificationUserMappingAc>()
            };

            notificationAc.NotificationTo = null;
            foreach (StaffActivityAttendeeMappingAc attendee in staffActivity.ActivityAttendeeList)
            {
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = attendee.AttendeeId
                });
            }

            await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
        }

        #endregion
    }
}
