using IMS.DomainModel.ApplicationClasses.InstituteHolidays;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteHolidayManagement
{
    public interface IInstituteHolidayManagementRepository
    {
        /// <summary>
        /// Method for fetching the list off holidays by selected academic year
        /// </summary>
        /// <param name="academicYearId"></param>
        /// <returns></returns>
        Task<List<InstituteHolidayAc>> GetHolidaysByAcademicYearIdAsync(int academicYearId, ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching the list of all occurance types
        /// </summary>
        /// <returns></returns>
        List<HolidayOccuranceTypeEnumDetailsListAc> GetOccuranceTypesList();

        /// <summary>
        /// Method for adding new holiday
        /// </summary>
        /// <param name="newHoliday"></param>
        /// <returns></returns>
        Task AddNewHoliday(AddHolidayAc newHolidayAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching the details of the holiday
        /// </summary>
        /// <param name="holidayId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<AddHolidayAc> GetHolidayDetailsByIdAsync(int holidayId, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating holiday
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedHoliday"></param>
        /// <returns></returns>
        Task<dynamic> UpdateHolidayAsync(int id, AddHolidayAc updatedHolidayAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for deleting a holiday
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<dynamic> DeleteHolidayAsync(int id);
    }
}
