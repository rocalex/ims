using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteWeekOffManagement
{
    public class InstituteWeekOffManagementRepository : IInstituteWeekOffManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public InstituteWeekOffManagementRepository(IMSDbContext imsDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _imsDbContext = imsDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the week offs by academic year id
        /// </summary>
        /// <param name="academicYearId"></param>
        /// <returns></returns>
        public async Task<List<InstituteWeekOffAc>> GetWeekOffsByAcademicYearIdAsync(int academicYearId, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            List<WeekOff> weekOffsList = await _imsDbContext.WeekOffs.Where(x => x.AcademicYearId == academicYearId && x.InstitutionId == currentUserInstituteId).ToListAsync();
            List<WeekDaysEnum> weekDaysEnumList = EnumHelperService.GetEnumValuesList<WeekDaysEnum>();

            List<InstituteWeekOffAc> weekOffsListAc = new List<InstituteWeekOffAc>();
            foreach (WeekDaysEnum weekDay in weekDaysEnumList)
            {
                weekOffsListAc.Add(new InstituteWeekOffAc
                {
                    AcademicYearId = academicYearId,
                    InstitutionId = currentUserInstituteId,
                    WeekDay = weekDay,
                    WeekDayString = EnumHelperService.GetDescription(weekDay),
                    IsWeekOff = weekOffsList.Any(x => x.WeekDay == weekDay)
                });
            }

            return weekOffsListAc;
        }

        /// <summary>
        /// Method for bulk update of week offs
        /// </summary>
        /// <param name="updatedWeekOffs"></param>
        /// <returns></returns>
        public async Task BulkUpdateWeekOff(List<InstituteWeekOffAc> updatedWeekOffs, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            List<WeekOff> addedWeekOffsList = new List<WeekOff>();
            List<WeekOff> removedWeekOffsList = new List<WeekOff>();

            foreach (InstituteWeekOffAc weekOffAc in updatedWeekOffs)
            {
                WeekOff weekOff = await _imsDbContext.WeekOffs.FirstOrDefaultAsync(x => x.AcademicYearId == weekOffAc.AcademicYearId && x.InstitutionId == currentUserInstituteId
                                        && x.WeekDay == weekOffAc.WeekDay);

                if (weekOff == null)
                {
                    WeekOff newWeekOff = new WeekOff
                    {
                        WeekDay = weekOffAc.WeekDay,
                        AcademicYearId = weekOffAc.AcademicYearId,
                        InstitutionId = weekOffAc.InstitutionId,
                        CreatedBy = currentUser.Id,
                        CreatedOn = DateTime.UtcNow
                    };
                    addedWeekOffsList.Add(newWeekOff);
                }
                else
                {
                    removedWeekOffsList.Add(weekOff);
                }
            }

            _imsDbContext.WeekOffs.AddRange(addedWeekOffsList);
            _imsDbContext.WeekOffs.RemoveRange(removedWeekOffsList);
            await _imsDbContext.SaveChangesAsync();
        }

        #endregion

        #region Private methods



        #endregion
    }
}
