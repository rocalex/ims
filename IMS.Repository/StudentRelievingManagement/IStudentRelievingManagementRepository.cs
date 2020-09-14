using IMS.DomainModel.ApplicationClasses.StudentRelievingManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StudentRelievingManagement
{
    public interface IStudentRelievingManagementRepository
    {
        /// <summary>
        /// Method to add bulk student relieving details
        /// </summary>
        /// <param name="addStudentRelievings">student detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<StudentRelievingManagementResponse> AddStudentRelievingAsync(List<AddStudentRelievingManagementAc> addStudentRelievings, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get all student from relieving table - SS
        /// </summary>
        /// <param name="loggedInUser">loggedInUser</param>
        /// <returns>list of student</returns>
        Task<List<StudentRelievingMapping>> GetAllStudentRelievingMappingsAsync(ApplicationUser loggedInUser);

        /// <summary>
        /// Method to update student relieving detail - SS
        /// </summary>
        /// <param name="updateStudentRelievings">updated detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<StudentRelievingManagementResponse> UpdateStudentRelievingAsync(UpdateStudentRelievingManagementAc updateStudentRelievings, ApplicationUser loggedInUser);
    }
}
