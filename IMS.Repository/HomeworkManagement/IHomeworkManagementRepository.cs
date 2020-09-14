using IMS.DomainModel.ApplicationClasses.HomeworkManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.HomeworkManagement
{
    public interface IHomeworkManagementRepository
    {
        /// <summary>
        /// Method to add or update homework - SS
        /// </summary>
        /// <param name="homeWork">home work</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<HomeworkManagementResponse> AddOrUpdateHomeworkAsync(AddHomeworkManagementAc homeWork, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get homework - SS
        /// </summary>
        /// <param name="getHomework">get homework detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>home work detail</returns>
        Task<Homework> GetHomeworkAsync(GetHomeworkAc getHomework, int instituteId);

        /// <summary>
        /// Method to get homework - SS
        /// </summary>
        /// <param name="classId">class id</param>
        /// <param name="sectionId">section id</param>
        /// <param name="staffId">staff id</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>home work detail</returns>
        Task<List<Homework>> GetHomeworkAsync(int staffId, int classId, int sectionId, int instituteId);

        /// <summary>
        /// Method to send homework message - SS
        /// </summary>
        /// <param name="homeworkMessage">homework message</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        Task<HomeworkManagementResponse> SendMessageAsync(AddHomeworkMessageMappingAc homeworkMessage, int instituteId);

        /// <summary>
        /// Method to send mail for homework - SS
        /// </summary>
        /// <param name="homeworkMail">homework mail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        Task<HomeworkManagementResponse> SendMailAsync(AddHomeworkMailMappingAc homeworkMail, int instituteId);

        /// <summary>
        /// Method for fetching the list of all homeworks
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<List<Homework>> GetAllHomeworksAsync(int instituteId);
    }
}
