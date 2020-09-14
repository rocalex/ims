using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.ApplicationClasses.TimeTableManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.TimeTableManagement
{
    public interface ITimeTableManagementRepository
    {
        /// <summary>
        /// Method for fetching the class and sections list
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<List<TimeTableClassSectionAc>> GetClassSectionsListAsync(int instituteId);

        /// <summary>
        /// Method for fetching the list of week days
        /// </summary>
        /// <returns></returns>
        List<WeekDaysEnumDetails> GetDaysOfWeek(int instituteId);

        /// <summary>
        /// Method for add or update time table details
        /// </summary>
        /// <param name="addedTimeTable"></param>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddUpdateTimeTableAsync(AddTimeTableAc addedTimeTable, int instituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching the details of a time table based on class, section, institute and academic year
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <param name="academicYearId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<AddTimeTableAc> GetTimeTableDetailsAsync(int classId, int sectionId, int academicYearId, int instituteId);

        /// <summary>
        /// Method for fetching the details of a time table based on class, section, institute and academic year for a particular staff
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <param name="staffId"></param>
        /// <param name="academicYearId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<AddTimeTableAc> GetTimeTableForStaffAsync(int classId, int sectionId, int staffId, int academicYearId, int instituteId);
    }
}
