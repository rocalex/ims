using IMS.DomainModel.ApplicationClasses.UserGroup;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.UserGroupManagement
{
    public class UserGroupManagementRepository : IUserGroupManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public UserGroupManagementRepository(IMSDbContext iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public Methods
        #region User Group
        /// <summary>
        ///  Method for fetching the list of all user groups
        /// </summary>
        /// <returns></returns>
        public async Task<List<UserGroup>> GetAllUserGroupsAsync(ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return (await _iMSDbContext.UserGroups.ToListAsync()).FindAll(x => x.InstituteId == currentUserInstituteId);
        }

        /// <summary>
        /// Method for fetching a particular user group by id
        /// </summary>
        /// <param name="userGroupId"></param>
        /// <returns></returns>
        public async Task<UserGroup> GetUserGroupByIdAsync(int userGroupId)
        {
            return (await _iMSDbContext.UserGroups.FirstOrDefaultAsync(x => x.Id == userGroupId));
        }

        /// <summary>
        /// Method for adding a new user group
        /// </summary>
        /// <param name="newUerGroupAc"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task AddNewUserGroupAsync(AddUserGroupAc newUserGroupAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            UserGroup newUserGroup = new UserGroup()
            {
                Code = newUserGroupAc.Code,
                Name = newUserGroupAc.Name,
                Description = newUserGroupAc.Description,
                CreatedOn = DateTime.UtcNow,
                CreatedByUserId = currentUser.Id,
                InstituteId = currentUserInstituteId
                //CompanyWbs = 1
            };

            _iMSDbContext.UserGroups.Add(newUserGroup);
            await _iMSDbContext.SaveChangesAsync();
            await SeedingUserGroupFeaturesAsync(newUserGroup.Id);
        }

        /// <summary>
        /// Method for updating an existing user group
        /// </summary>
        /// <param name="updatedUserGroupAc"></param>
        /// <returns></returns>
        public async Task UpdateUserGroupAsync(int id, AddUserGroupAc updatedUserGroupAc, ApplicationUser currentUser)
        {
            UserGroup existingUserGroup = await _iMSDbContext.UserGroups.FirstAsync(x => x.Id == id);

            // Update details
            existingUserGroup.Code = updatedUserGroupAc.Code;
            existingUserGroup.Name = updatedUserGroupAc.Name;
            existingUserGroup.Description = updatedUserGroupAc.Description;
            existingUserGroup.LastUpdatedUserId = currentUser.Id;
            existingUserGroup.LastUpdatedDate = DateTime.UtcNow;

            _iMSDbContext.UserGroups.Update(existingUserGroup);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion

        #region User Group Feature
        /// <summary>
        /// Method to get all feature list by user group id - SS
        /// </summary>
        /// <param name="userGroupId">user group id</param>
        /// <returns>list of user group feature</returns>
        public async Task<List<UserGroupFeature>> GetAllUserGroupFeaturesByUserGroupIdAsync(int userGroupId)
        {
            await SeedingUserGroupFeaturesAsync(userGroupId);
            var list = await _iMSDbContext.UserGroupFeatures.OrderByDescending(c => c.UserGroupFeatureParent).Where(x => x.UserGroupId == userGroupId).ToListAsync();
            list.Reverse();
            list.ForEach(x =>
            {
                x.UserGroupFeatureChildDescription = EnumHelperService.GetDescription(x.UserGroupFeatureChild);
                x.UserGroup = null;
                x.UserGroupFeatureParentDescription = EnumHelperService.GetDescription(x.UserGroupFeatureParent);
            });
            return list;
        }

        /// <summary>
        /// Method to update bulk user group feature - SS
        /// </summary>
        /// <param name="userGroupFeatures">list of user group feature</param>
        public async Task BulkUpdateUserGroupFeatureAsync(List<UserGroupFeature> userGroupFeatures)
        {
            var userGroupId = userGroupFeatures[0].UserGroupId;
            var previous = await _iMSDbContext.UserGroupFeatures.Where(x => x.UserGroupId == userGroupId).ToListAsync();
            _iMSDbContext.UserGroupFeatures.RemoveRange(previous);
            await _iMSDbContext.SaveChangesAsync();
            userGroupFeatures.ForEach(x => x.Id = 0);
            _iMSDbContext.UserGroupFeatures.AddRange(userGroupFeatures);
            await _iMSDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method to add student and staff in user group - SS
        /// </summary>
        /// <param name="userId">user id</param>
        /// <param name="isStudent">is student</param>
        /// <param name="instituteId">institute id</param>
        public async Task AddStudentOrStaffInUserGroupAsync(string userId, bool isStudent, int instituteId)
        {
            int userGroup = 0;
            if (isStudent)
                userGroup = (await _iMSDbContext.UserGroups.FirstAsync(x => x.Code == "Student" && x.InstituteId == instituteId)).Id;
            else
                userGroup = (await _iMSDbContext.UserGroups.FirstAsync(x => x.Code == "Staff" && x.InstituteId == instituteId)).Id;
            if (!await _iMSDbContext.UserGroupMapping.AnyAsync(x => x.UserId == userId && x.UserGroupId == userGroup))
            {
                _iMSDbContext.UserGroupMapping.Add(new UserGroupMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    UserGroupId = userGroup,
                    UserId = userId
                });
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        public async Task MigrateUserGroupFeatureAsync()
        {
            List<UserGroupMapping> userGroupMappings = new List<UserGroupMapping>();
            var institutes = await _iMSDbContext.Institutes.ToListAsync();
            foreach (var institute in institutes)
            {
                var userGroupAdminId = (await _iMSDbContext.UserGroups.FirstAsync(x => x.Code == "Admin" && x.InstituteId == institute.Id)).Id;
                if (!await _iMSDbContext.UserGroupMapping.AnyAsync(x => x.UserId == institute.AdminId && x.UserGroupId == userGroupAdminId))
                {
                    userGroupMappings.Add(new UserGroupMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        UserGroupId = userGroupAdminId,
                        UserId = institute.AdminId
                    });
                }

                var staffUserGroupId = (await _iMSDbContext.UserGroups.FirstAsync(x => x.Code == "Staff" && x.InstituteId == institute.Id)).Id;
                var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == institute.Id).ToListAsync();
                foreach (var staff in staffs)
                {
                    if (!await _iMSDbContext.UserGroupMapping.AnyAsync(x => x.UserId == staff.UserId && x.UserGroupId == staffUserGroupId))
                    {
                        userGroupMappings.Add(new UserGroupMapping()
                        {
                            CreatedOn = DateTime.UtcNow,
                            UserGroupId = staffUserGroupId,
                            UserId = staff.UserId
                        });
                    }
                }

                var studentUserGroupId = (await _iMSDbContext.UserGroups.FirstAsync(x => x.Code == "Student" && x.InstituteId == institute.Id)).Id;
                var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == institute.Id).ToListAsync();
                foreach (var student in students)
                {
                    if (!await _iMSDbContext.UserGroupMapping.AnyAsync(x => x.UserId == student.UserId && x.UserGroupId == studentUserGroupId))
                    {
                        userGroupMappings.Add(new UserGroupMapping()
                        {
                            CreatedOn = DateTime.UtcNow,
                            UserGroupId = studentUserGroupId,
                            UserId = student.UserId
                        });
                    }
                }
            }
            if (userGroupMappings.Count != 0)
            {
                _iMSDbContext.UserGroupMapping.AddRange(userGroupMappings);
                await _iMSDbContext.SaveChangesAsync();
            }
        }
        #endregion
        #endregion

        #region Private variables
        #region User Group Feature
        /// <summary>
        /// Method to seed feature list by user group id - SS
        /// </summary>
        /// <param name="userGroupId">user group id</param>
        public async Task SeedingUserGroupFeaturesAsync(int userGroupId)
        {
            var userGroup = await _iMSDbContext.UserGroups.FirstAsync(x => x.Id == userGroupId);
            List<UserGroupFeature> userGroupFeatures = new List<UserGroupFeature>();
            foreach (var child in (UserGroupFeatureChildEnum[])Enum.GetValues(typeof(UserGroupFeatureChildEnum)))
            {
                if (!await _iMSDbContext.UserGroupFeatures.AnyAsync(x => x.UserGroupId == userGroupId && x.UserGroupFeatureChild == child))
                {
                    var feature = new UserGroupFeature()
                    {
                        CanAdd = ((userGroup.Name == "Admin") ? true : false),
                        CanDelete = ((userGroup.Name == "Admin") ? true : false),
                        CanEdit = ((userGroup.Name == "Admin") ? true : false),
                        CanView = ((userGroup.Name == "Admin") ? true : false),
                        CreatedOn = DateTime.UtcNow,
                        UserGroupFeatureChild = child,
                        UserGroupId = userGroupId
                    };
                    switch (child)
                    {
                        case UserGroupFeatureChildEnum.AcademicAutoSequence: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.AcademicCity: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.AcademicCountry: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.AcademicCurrency: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.AcademicEmail: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.AcademicEvent: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.AcademicLookUp: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.AcademicState: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.AcademicTemplates: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.FinanceBasicPayment: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Finance; break;
                        case UserGroupFeatureChildEnum.FinanceBasicReciept: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Finance; break;
                        case UserGroupFeatureChildEnum.FinanceChartOfPayment: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Finance; break;
                        case UserGroupFeatureChildEnum.FinancePaymentType: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Finance; break;
                        case UserGroupFeatureChildEnum.InstituteAcademicYear: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.InstituteClass: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.InstituteClassSubjectMapping: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.InstituteHolidayOff: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.InstituteSubject: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.InstituteTimeTable: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.InstituteWeekOff: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.StaffActivity: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StaffDashboard: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StaffDepartment: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StaffDesignation: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StaffInfo: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StaffPlanner: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StudentArticles: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentAttendance: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentDashboard: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentCourseFeeTerm: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentFeeComponent: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentStudentFee: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentFeeReceipt: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentFeeRefund: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentFeeReport: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentInActive: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentInfo: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentLookUp: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentMarkClassExam: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentMarkExamDefinition: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentMarkExamScoreEntry: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentPromotion: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StudentRelieving: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.TransportDriver: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportRoute: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportStage: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportStudentRouteMapping: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportVehicle: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportVehicleAccident: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportVehicleBreakDown: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportVehicleDriverMapping: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportVehicleMaintanence: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.TransportVehicleRepair: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Transportation; break;
                        case UserGroupFeatureChildEnum.UserManagementPermission: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.UserManagementRole: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.UserManagementUsers: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Administration; break;
                        case UserGroupFeatureChildEnum.StaffReport: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StudentReport: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.Homework: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.Disciplinary: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.CircularNotice: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StudentLeaveManagement: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Student; break;
                        case UserGroupFeatureChildEnum.StaffLeaveManagement: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                        case UserGroupFeatureChildEnum.StaffAttendance: feature.UserGroupFeatureParent = UserGroupFeatureParentEnum.Staff; break;
                    }
                    userGroupFeatures.Add(feature);
                }
            }
            _iMSDbContext.UserGroupFeatures.AddRange(userGroupFeatures);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
        #endregion
    }
}
