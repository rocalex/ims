using IMS.DomainModel.ApplicationClasses.UserGroup;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.UserGroupManagement
{
    public interface IUserGroupManagementRepository
    {
        #region User Group
        /// <summary>
        /// Method for fetching the list of user groups
        /// </summary>
        /// <returns></returns>
        Task<List<UserGroup>> GetAllUserGroupsAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching a particular user group by id
        /// </summary>
        /// <param name="userGroupId"></param>
        /// <returns></returns>
        Task<UserGroup> GetUserGroupByIdAsync(int userGroupId);

        /// <summary>
        /// Method for creating a new user group
        /// </summary>
        /// <param name="newUserGroupAc"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task AddNewUserGroupAsync(AddUserGroupAc newUserGroupAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating an existing user group
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedUserGroupAc"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task UpdateUserGroupAsync(int id, AddUserGroupAc updatedUserGroupAc, ApplicationUser currentUser);
        #endregion

        #region User Group Feature
        /// <summary>
        /// Method to get all feature list by user group id - SS
        /// </summary>
        /// <param name="userGroupId">user group id</param>
        /// <returns>list of user group feature</returns>
        Task<List<UserGroupFeature>> GetAllUserGroupFeaturesByUserGroupIdAsync(int userGroupId);

        /// <summary>
        /// Method to update bulk user group feature - SS
        /// </summary>
        /// <param name="userGroupFeatures">list of user group feature</param>
        Task BulkUpdateUserGroupFeatureAsync(List<UserGroupFeature> userGroupFeatures);

        /// <summary>
        /// Method to add student and staff in user group - SS
        /// </summary>
        /// <param name="userId">user id</param>
        /// <param name="isStudent">is student</param>
        /// <param name="instituteId">institute id</param>
        Task AddStudentOrStaffInUserGroupAsync(string userId, bool isStudent, int instituteId);

        Task MigrateUserGroupFeatureAsync();

        /// <summary>
        /// Method to seed feature list by user group id - SS
        /// </summary>
        /// <param name="userGroupId">user group id</param>
        Task SeedingUserGroupFeaturesAsync(int userGroupId);
        #endregion
    }
}
