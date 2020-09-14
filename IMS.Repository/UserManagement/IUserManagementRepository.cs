using IMS.DomainModel.ApplicationClasses.Authentication;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.UserManagement
{
    public interface IUserManagementRepository
    {
        /// <summary>
        /// Method for fetching the list of users
        /// </summary>
        /// <returns></returns>
        Task<List<UserAc>> GetAllUsersAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching a particular user by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<UserAc> GetUserByIdAsync(string userId);

        /// <summary>
        /// Method for adding a new user
        /// </summary>
        /// <param name="newUserAc"></param>
        /// <returns></returns>
        Task AddNewUserAsync(AddUserAc newUserAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating an existing user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedUserAc"></param>
        /// <returns></returns>
        Task UpdateUserAsync(string id, UpdateUserAc updatedUserAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for sending the forgot password mail
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        Task SendForgotPasswordEmailAsync(ApplicationUser user);

        /// <summary>
        /// Method for resetting the forgotten password
        /// </summary>
        /// <param name="forgotPasswordResetAc"></param>
        /// <returns></returns>
        Task<bool> ResetForgotPassword(ForgotPasswordResetAc forgotPasswordResetAc);

        /// <summary>
        /// Method for updating the details of logged in user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedUserAc"></param>
        /// <returns></returns>
        Task UpdateLoggedInUserProfileDetails(UpdateUserAc updatedUserAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching the dashboard data of a logged in, non-admin user - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<UserDashboardAc> GetLoggedInUserDashboard(ApplicationUser currentUser, int academicYearId);
    }
}
