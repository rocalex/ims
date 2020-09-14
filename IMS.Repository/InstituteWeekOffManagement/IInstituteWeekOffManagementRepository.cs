using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteWeekOffManagement
{
    public interface IInstituteWeekOffManagementRepository
    {
        /// <summary>
        /// Method for fetching the week offs by academic year id
        /// </summary>
        /// <param name="academicYearId"></param>
        /// <returns></returns>
        Task<List<InstituteWeekOffAc>> GetWeekOffsByAcademicYearIdAsync(int academicYearId, ApplicationUser currentUser);

        /// <summary>
        /// Method for bulk update of week offs
        /// </summary>
        /// <param name="updatedWeekOffs"></param>
        /// <returns></returns>
        Task BulkUpdateWeekOff(List<InstituteWeekOffAc> updatedWeekOffs, ApplicationUser currentUser);
    }
}
