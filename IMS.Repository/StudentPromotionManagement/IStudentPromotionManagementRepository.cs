using IMS.DomainModel.ApplicationClasses.StudentPromotionManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StudentPromotionManagement
{
    public interface IStudentPromotionManagementRepository
    {
        /// <summary>
        /// Method to add student promotion - SS
        /// </summary>
        /// <param name="addStudentPromotions">student detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<StudentPromotionManagementResponse> AddStudentPromotionAsync(List<AddStudentPromotionManagementAc>
            addStudentPromotions, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of student promotion - SS
        /// </summary>
        /// <param name="loggedInUser">loggedInUser</param>
        /// <returns>list of promoted student</returns>
        Task<List<StudentPromotionMapping>> GetAllStudentPromotionAsync(ApplicationUser loggedInUser);

        /// <summary>
        /// Method to update student promotion - SS
        /// </summary>
        /// <param name="updateStudentPromotion">student detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>respose</returns>
        Task<StudentPromotionManagementResponse> UpdateStudentPromotionAsync(UpdateStudentPromotionManagementAc
            updateStudentPromotion, ApplicationUser loggedInUser);
    }
}
