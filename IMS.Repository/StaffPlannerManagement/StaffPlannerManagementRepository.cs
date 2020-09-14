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

namespace IMS.Repository.StaffPlannerManagement
{
    public class StaffPlannerManagementRepository : IStaffPlannerManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private INotificationManagementRepository _notificationManagementRepository;
        private SystemRoles _systemRoles;

        #endregion

        #region Constructor

        public StaffPlannerManagementRepository(IMSDbContext imsDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            INotificationManagementRepository notificationManagementRepository,
            IOptions<SystemRoles> systemRoles)
        {
            _imsDbContext = imsDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _notificationManagementRepository = notificationManagementRepository;
            _systemRoles = systemRoles.Value;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all activities
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<List<StaffPlannerAc>> GetAllStaffPlansAsync(ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            List<StaffPlanner> staffPlansList = await _imsDbContext.StaffPlanners
                .Include(x => x.Staff)
                .Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<StaffPlannerAc> staffPlansListAc = new List<StaffPlannerAc>();

            foreach (StaffPlanner staffPlan in staffPlansList)
            {
                staffPlansListAc.Add(new StaffPlannerAc
                {
                    Id = staffPlan.Id,
                    Name = staffPlan.Name,
                    Description = staffPlan.Description,
                    DateOfPlan = staffPlan.DateOfPlan,
                    IsActive = staffPlan.IsActive,
                    StaffId = staffPlan.StaffId,
                    StaffName = staffPlan.Staff.FirstName,
                    InstituteId = staffPlan.InstituteId
                });
            }

            return staffPlansListAc;
        }

        /// <summary>
        /// Method for fetching an activity by id
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<StaffPlannerAc> GetStaffPlanByIdAsync(int plannerId, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            StaffPlanner staffPlan = await _imsDbContext.StaffPlanners
                .Include(x => x.Staff)
                .Include(x => x.PlannerAttendeeMappings)
                .FirstOrDefaultAsync(x => x.Id == plannerId && x.InstituteId == currentUserInstituteId);

            StaffPlannerAc staffPlanAc = new StaffPlannerAc
            {
                Id = staffPlan.Id,
                Name = staffPlan.Name,
                Description = staffPlan.Description,
                DateOfPlan = staffPlan.DateOfPlan,
                IsActive = staffPlan.IsActive,
                StaffId = staffPlan.StaffId,
                StaffName = staffPlan.Staff.FirstName,
                InstituteId = staffPlan.InstituteId,
                PlannerAttendeeList = new List<StaffPlannerAttendeeMappingAc>()
            };

            List<ApplicationUser> plannerAttendeesList = await _imsDbContext.PlannerAttendeeMappings
                .Where(x => x.PlannerId == plannerId)
                .Include(x => x.Attendee)
                .Select(x => x.Attendee)
                .ToListAsync();

            List<StudentBasicInformation> studentBasicInformationList = await _imsDbContext.StudentBasicInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<StaffBasicPersonalInformation> staffBasicPersonalInformationList = await _imsDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            foreach (PlannerAttendeeMapping plannerAttendeeMapping in staffPlan.PlannerAttendeeMappings)
            {
                string attendeeName = plannerAttendeesList.FirstOrDefault(x => x.Id == plannerAttendeeMapping.AttendeeId)?.Name;
                if (plannerAttendeeMapping.ActivityAttendeeType == ActivityAttendeeTypeEnum.Staff)
                {
                    attendeeName = staffBasicPersonalInformationList.FirstOrDefault(x => x.UserId == plannerAttendeeMapping.AttendeeId).FirstName;
                }
                else if (plannerAttendeeMapping.ActivityAttendeeType == ActivityAttendeeTypeEnum.Student)
                {
                    attendeeName = studentBasicInformationList.FirstOrDefault(x => x.UserId == plannerAttendeeMapping.AttendeeId).FirstName;
                }

                staffPlanAc.PlannerAttendeeList.Add(new StaffPlannerAttendeeMappingAc
                {
                    PlannerId = staffPlan.Id,
                    PlannerName = staffPlan.Name,
                    PlannerAttendeeType = plannerAttendeeMapping.ActivityAttendeeType,
                    PlannerAttendeeTypeString = EnumHelperService.GetDescription(plannerAttendeeMapping.ActivityAttendeeType),
                    AttendeeId = plannerAttendeeMapping.AttendeeId,
                    AttendeeName = attendeeName
                });
            }

            return staffPlanAc;
        }

        /// <summary>
        /// Method for adding new activity
        /// </summary>
        /// <param name="newStaffActivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddStaffPlanAsync(StaffPlannerAc newStaffPlanAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            if (await _imsDbContext.StaffPlanners.AnyAsync(x => x.InstituteId == currentUserInstituteId &&
                x.Name.ToLowerInvariant().Equals(newStaffPlanAc.Name.ToLowerInvariant()) && x.DateOfPlan == newStaffPlanAc.DateOfPlan))
            {
                return new { Message = "Plan already exist with this name on the selected date", HasError = true };
            }
            else
            {
                // Add activity
                StaffPlanner newStaffPlan = new StaffPlanner
                {
                    CreatedOn = DateTime.UtcNow,
                    DateOfPlan = newStaffPlanAc.DateOfPlan,
                    Description = newStaffPlanAc.Description,
                    InstituteId = currentUserInstituteId,
                    IsActive = newStaffPlanAc.IsActive,
                    Name = newStaffPlanAc.Name,
                    StaffId = newStaffPlanAc.StaffId
                };
                _imsDbContext.StaffPlanners.Add(newStaffPlan);
                await _imsDbContext.SaveChangesAsync();

                // Add activity attendee
                await AddPlannerAttendeeAsync(newStaffPlan.Id, newStaffPlanAc.PlannerAttendeeList);

                // Add notification
                if (newStaffPlan.IsActive)
                {
                    await AddNotificationsAsync(currentUserInstituteId, currentUser, newStaffPlanAc);
                }

                return new { Message = "Plan created successfully" };
            }
        }

        /// <summary>
        /// Method for updating an existing activity
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="updatedStaffActivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateStaffPlanAsync(int planId, StaffPlannerAc updatedStaffPlanAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            StaffPlanner existingStaffPlan = await _imsDbContext.StaffPlanners.FirstOrDefaultAsync(x => x.Id == planId && x.InstituteId == currentUserInstituteId);

            if (existingStaffPlan == null)
            {
                return new { Message = "No plan exist with this id", HasError = true };
            }
            else if (await _imsDbContext.StaffPlanners.AnyAsync(x => x.Id != planId && x.InstituteId == currentUserInstituteId &&
                x.Name.ToLowerInvariant().Equals(updatedStaffPlanAc.Name.ToLowerInvariant())
                && x.DateOfPlan == updatedStaffPlanAc.DateOfPlan))
            {
                return new { Message = "Plan already exist with this name on the selected date", HasError = true };
            }
            else
            {
                // Update planner
                existingStaffPlan.Name = updatedStaffPlanAc.Name;
                existingStaffPlan.Description = updatedStaffPlanAc.Description;
                existingStaffPlan.DateOfPlan = updatedStaffPlanAc.DateOfPlan;
                existingStaffPlan.IsActive = updatedStaffPlanAc.IsActive;
                existingStaffPlan.StaffId = updatedStaffPlanAc.StaffId;
                _imsDbContext.StaffPlanners.Update(existingStaffPlan);
                await _imsDbContext.SaveChangesAsync();

                // Update planner attendee
                List<PlannerAttendeeMapping> plannerAttendeeMappingsList = await _imsDbContext.PlannerAttendeeMappings
                    .Where(x => x.PlannerId == existingStaffPlan.Id).ToListAsync();
                _imsDbContext.PlannerAttendeeMappings.RemoveRange(plannerAttendeeMappingsList);
                await _imsDbContext.SaveChangesAsync();
                await AddPlannerAttendeeAsync(existingStaffPlan.Id, updatedStaffPlanAc.PlannerAttendeeList);

                // Add notification
                if (existingStaffPlan.IsActive)
                {
                    await AddNotificationsAsync(currentUserInstituteId, currentUser, updatedStaffPlanAc);
                }

                return new { Message = "Plan updated successfully" };
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

        #endregion

        #region Private methods

        /// <summary>
        /// Private method for mapping planner and attendees - RS
        /// </summary>
        /// <param name="plannerId"></param>
        /// <param name="plannerAttendeeAcList"></param>
        /// <returns></returns>
        private async Task AddPlannerAttendeeAsync(int plannerId, List<StaffPlannerAttendeeMappingAc> plannerAttendeeAcList)
        {
            List<PlannerAttendeeMapping> newPlannerAttendeeMappingList = new List<PlannerAttendeeMapping>();
            foreach (StaffPlannerAttendeeMappingAc plannerAttendeeAc in plannerAttendeeAcList)
            {
                newPlannerAttendeeMappingList.Add(new PlannerAttendeeMapping
                {
                    ActivityAttendeeType = plannerAttendeeAc.PlannerAttendeeType,
                    PlannerId = plannerId,
                    AttendeeId = plannerAttendeeAc.AttendeeId,
                    CreatedOn = DateTime.UtcNow
                });
            }

            _imsDbContext.PlannerAttendeeMappings.AddRange(newPlannerAttendeeMappingList);
            await _imsDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method for creating notification - RS
        /// </summary>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <param name="staffPlanner"></param>
        /// <returns></returns>
        private async Task AddNotificationsAsync(int instituteId, ApplicationUser currentUser, StaffPlannerAc staffPlanner)
        {
            NotificationAc notificationAc = new NotificationAc
            {
                NotificationDetails = staffPlanner.Description,
                NotificationMessage = staffPlanner.Name,
                NotificationUserMappingsList = new List<NotificationUserMappingAc>()
            };

            notificationAc.NotificationTo = null;
            foreach (StaffPlannerAttendeeMappingAc attendee in staffPlanner.PlannerAttendeeList)
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
