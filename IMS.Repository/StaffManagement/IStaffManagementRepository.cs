using IMS.DomainModel.ApplicationClasses.StaffManagement;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StaffManagement
{
    public interface IStaffManagementRepository
    {
        /// <summary>
        /// Method to add staff detail - SS
        /// </summary>
        /// <param name="addStaff">staff detail</param>
        /// <param name="loggedInUser">logged in user detail</param>
        /// <returns>response</returns>
        Task<StaffManagementResponse> AddStaffDetailAsync(AddStaffManagementAc addStaff, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get initial data for add and edit staff - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>bundle of initial data</returns>
        Task<InitialDataForAddOrEditStaffBundle> GetInitialDataForAddOrEditStaffAsync(int instituteId);

        /// <summary>
        /// Method to update staff - SS
        /// </summary>
        /// <param name="updateStaff">staff detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<StaffManagementResponse> UpdateStaffAsync(UpdateStaffManagementAc updateStaff, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to upload staff image - SS
        /// </summary>
        /// <param name="files">files of images</param>
        /// <param name="staffId">staff id</param>
        /// <param name="instituteId">institute id</param>
        Task AddOrUpdateStaffImageAsync(IFormFileCollection files, int staffId, int instituteId);

        /// <summary>
        /// Method to add or update staff gallery - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="staffId">staff id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns></returns>
        Task AddOrUpdateStaffGalleryAsync(IFormFileCollection files, int staffId, ApplicationUser loggedInUser);

        /// <summary>
        /// Method for fetching the dashboard details of the staffs for logged in admin - RS
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<StaffManagementDashboardDetailsAc> GetStaffManagementDashboardDetailsAsync(int instituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method to import excel to add staff - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <param name="formFile">form file excel</param>
        /// <param name="loggedInUserId">logged in user</param>
        /// <returns>message</returns>
        Task<string> ImportStaffFromExcelAsync(int instituteId, IFormFile formFile, string loggedInUserId);

        /// <summary>
        /// Method to add or update staff document - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="staffId">staff id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <param name="addStaffDocuments">documnets details</param>
        Task AddOrUpdateStaffDocumentsAsync(IFormFileCollection files, int staffId, ApplicationUser loggedInUser,
            List<AddStaffDocumentMappingAc> addStaffDocuments);
    }
}
