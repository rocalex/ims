using IMS.DomainModel.ApplicationClasses.InstituteAcademicYear;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteAcademicYearManagement
{
    public interface IInstituteAcademicYearManagementRepository
    {
        /// <summary>
        /// Method for fetching the list of all academic years
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<List<InstituteAcademicYear>> GetAcademicYearsListAsync(int instituteId);

        /// <summary>
        /// Method for fetching the details of an academic year by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<InstituteAcademicYear> GetAcademicYearByIdAsync(int id, ApplicationUser currentUser);

        /// <summary>
        /// Method for adding new academic year
        /// </summary>
        /// <param name="newAcademicYearAc"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddAcademicYearAsync(AddInstituteAcademicYearAc newAcademicYearAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating an academic year
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedAcademicYearAc"></param>
        /// <returns></returns>
        Task<dynamic> UpdateAcademicYearAsync(int id, AddInstituteAcademicYearAc updatedAcademicYearAc, ApplicationUser currentUser);
    }
}
