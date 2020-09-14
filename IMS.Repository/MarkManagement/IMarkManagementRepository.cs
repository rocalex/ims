using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.MarkManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.MarkManagement
{
    public interface IMarkManagementRepository
    {
        #region Exam Definition
        /// <summary>
        /// Method to add Exam Definition - SS
        /// </summary>
        /// <param name="addExamDefinition">name of Exam Definition</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddExamDefinitionAsync(AddExamDefinitionAc addExamDefinition, int instituteId);

        /// <summary>
        /// Method to get list of ExamDefinition by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<ExamDefinition>> GetAllExamDefinitionAsync(int instiuteId);

        /// <summary>
        /// Method to update ExamDefinition - SS
        /// </summary>
        /// <param name="updateExamDefinitionManagement">ExamDefinition detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateExamDefinitionAsync(UpdateExamDefinitionAc updateExamDefinitionManagement, int instituteId);
        #endregion

        #region Class Exam
        /// <summary>
        /// Method to add class exam - SS
        /// </summary>
        /// <param name="addClassExam">class exam</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<ClassExamResponse> AddClassExamAsync(AddClassExamAc addClassExam, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of exam classes - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of class exam</returns>
        Task<List<ClassExam>> GetAllClassExamsAsync(int instituteId);

        /// <summary>
        /// Method to update class exam - SS
        /// </summary>
        /// <param name="updateClassExam">class exam</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<ClassExamResponse> UpdateClassExamResponseAsync(UpdateClassExamAc updateClassExam, ApplicationUser loggedInUser);
        #endregion

        #region Exam Score Entry
        /// <summary>
        /// Method to add or update exam score - SS
        /// </summary>
        /// <param name="addExamScoreEntrys">list of score</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<ExamScoreEntryResponse> AddOrUpdateExamScoreEntryAsync(List<AddExamScoreEntryAc> addExamScoreEntrys,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get score by exam id - SS
        /// </summary>
        /// <param name="examId">exam id</param>
        /// <param name="institueId">institue id</param>
        /// <returns>list of scores</returns>
        Task<List<ExamScoreEntry>> GetExamScoreEntriesAsync(int examId, int institueId);
        #endregion
    }
}
