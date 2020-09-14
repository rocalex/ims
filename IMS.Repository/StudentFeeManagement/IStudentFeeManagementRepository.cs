using IMS.DomainModel.ApplicationClasses.StudentFeeManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StudentFeeManagement
{
    public interface IStudentFeeManagementRepository
    {
        /// <summary>
        /// Method to update student fee - SS
        /// </summary>
        /// <param name="studentFeeComponents">student fee components</param>
        /// <param name="studentFeeId">student fee id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<StudentFeeResponse> UpdateStudentFeeAsync(List<StudentFeeComponent> studentFeeComponents, int studentFeeId,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get student fee detail - SS
        /// </summary>
        /// <param name="studentId">student id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<StudentFeeResponse> GetStudentFeeAsync(int studentId, ApplicationUser loggedInUser);
    }
}
