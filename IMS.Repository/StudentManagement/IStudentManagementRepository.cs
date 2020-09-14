using System.Collections.Generic;
using System.Threading.Tasks;
using IMS.DomainModel.ApplicationClasses;
using IMS.DomainModel.ApplicationClasses.StudentManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Http;

namespace IMS.Repository.StudentManagement
{
	public interface IStudentManagementRepository
	{
		/// <summary>
		/// Method to add student detail - SS
		/// </summary>
		/// <param name="addStudent">student detail</param>
		/// <param name="loggedInUser">logged in user detail</param>
		/// <returns>response</returns>
		Task<StudentManagementResponse> AddStudentAsync(AddStudentManagementAc addStudent, ApplicationUser loggedInUser);

		/// <summary>
		/// Method to get initial data for add and edit student - SS
		/// </summary>
		/// <param name="instituteId">institute id</param>
		/// <returns>bundle of initial data</returns>
		Task<InitialDataForAddOrEditStudentBundle> GetInitialDataForAddOrEditStudentBundleAsync(int instituteId);

        /// <summary>
        /// Method to update student - SS
        /// </summary>
        /// <param name="updateStudent">student detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<StudentManagementResponse> UpdateStudentAsync(UpdateStudentManagementAc updateStudent, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to upload student image - SS
        /// </summary>
        /// <param name="files">files of images</param>
        /// <param name="studentId">student id</param>
        /// <param name="instituteId">institute id</param>
        Task AddOrUpdateStaffImageAsync(IFormFileCollection files, int studentId, int instituteId);

        /// <summary>
        /// Method to add or update student gallery - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="studentId">student id</param>
        /// <param name="loggedInUser">logged in user</param>
        Task AddOrUpdateStudentGalleryAsync(IFormFileCollection files, int studentId, ApplicationUser loggedInUser);

        /// <summary>
        /// Method for archiving a student - RS
        /// </summary>
        /// <param name="studentId"></param>
        /// <returns></returns>
        Task<dynamic> ArchiveStudentAsync(int studentId, int instituteId);

        /// <summary>
        /// Method for fetching the user details of a student - RS
        /// </summary>
        /// <param name=""></param>
        /// <param name=""></param>
        /// <returns></returns>
        Task<UserAc> GetStudentUserDetailsAsync(int studentId, int loggedInUserInstituteId);

        /// <summary>
        /// Method for sending manual notifications to the students - RS
        /// </summary>
        /// <param name="studentNotificationAc"></param>
        /// <param name="currentUser"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<NotificationErrorAc> SendNotificationAsync(StudentNotificationAc studentNotificationAc, ApplicationUser currentUser, int instituteId);

        /// <summary>
        /// Method for fetching the list of all student articles - RS
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<List<StudentArticles>> GetAllStudentsArticlesAsync(int instituteId);

        /// <summary>
        /// Method for approving an article - RS
        /// </summary>
        /// <param name="articleId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<dynamic> ApproveStudentArticleAsync(int articleId, int instituteId);

        /// <summary>
        /// Method for fetching the dashboard details of the students for logged in admin - RS
        /// </summary>
        /// <param name="currentUser">currentUser</param>
        /// <returns></returns>
        Task<StudentManagementDashboardDetailsAc> GetStudentManagementDashboardDetailsAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method to add bulk student from excel - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <param name="formFile">excel file</param>
        /// <param name="loggedInUserId">logged in user</param>
        /// <returns>message</returns>
        Task<string> ImportStudentFromExcelAsync(int instituteId, IFormFile formFile, string loggedInUserId);

        /// <summary>
        /// Method to add or update student document - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="studentId">student id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <param name="addStudentDocuments">documnets details</param>
        Task AddOrUpdateStudentDocumentsAsync(IFormFileCollection files, int studentId, ApplicationUser loggedInUser,
            List<AddStudentDocumentMappingAc> addStudentDocuments);
    }
}
