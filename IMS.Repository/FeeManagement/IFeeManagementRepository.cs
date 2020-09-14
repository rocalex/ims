using IMS.DomainModel.ApplicationClasses.FeeManagement;
using IMS.DomainModel.ApplicationClasses.StudentFeeManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.FeeManagement
{
    public interface IFeeManagementRepository
    {
        #region Fee Component

        /// <summary>
        /// Method for fetching the list of all fee components - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<FeeComponent>> GetAllFeeComponentsAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for fetching the details of a fee component by id - RS
        /// </summary>
        /// <param name="feeComponentId"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<FeeComponent> GetFeeComponentByIdAsync(int feeComponentId, int currentUserInstituteId);

        /// <summary>
        /// Method for adding new fee component - RS
        /// </summary>
        /// <param name="addedFeeComponent"></param>
        /// <param name="currentUser"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<dynamic> AddNewFeeComponentAsync(FeeComponent addedFeeComponent, ApplicationUser currentUser, int currentUserInstituteId);

        /// <summary>
        /// Method for updating an existing fee component - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedFeeComponent"></param>
        /// <returns></returns>
        Task<dynamic> UpdateFeeComponentAsync(int currentUserInstituteId, FeeComponent updatedFeeComponent);

        #endregion

        #region Course Fee Terms

        /// <summary>
        /// Method for fetching the list of all institute classes for course fee terms - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<InstituteClass>> GetClassListForCourseFeeTermsAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for fetching the details of course fee term - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="courseFeeTermId"></param>
        /// <param name="termNumber"></param>
        /// <returns></returns>
        Task<List<CourseFeeTermDetailsAc>> GetDistributedFeeStructureAsync(int currentUserInstituteId, int courseFeeTermId, int termNumber);

        /// <summary>
        /// Method for adding or updating course fee terms - RS
        /// </summary>
        /// <param name="courseFeeTermAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddOrUpdateCourseFeeTermsAsync(AddCourseFeeTermAc addCourseFeeTermAc, int currentUserInstituteId, ApplicationUser currentUser);

        #endregion

        #region Student Fee Report

        /// <summary>
        /// Method for generating the student fee report - RS
        /// </summary>
        /// <param name="feeManagementReportQueryAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<FeeManagementReportResponseAc> GenerateStudentFeeReportAsync(FeeManagementReportQueryAc feeManagementReportQueryAc, int currentUserInstituteId);

        #endregion
    }
}
