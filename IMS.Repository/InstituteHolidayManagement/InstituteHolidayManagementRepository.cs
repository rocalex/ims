using IMS.DomainModel.ApplicationClasses.InstituteHolidays;
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

namespace IMS.Repository.InstituteHolidayManagement
{
    public class InstituteHolidayManagementRepository : IInstituteHolidayManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public InstituteHolidayManagementRepository(IMSDbContext imsDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _imsDbContext = imsDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list off holidays by selected academic year
        /// </summary>
        /// <param name="academicYearId"></param>
        /// <returns></returns>
        public async Task<List<InstituteHolidayAc>> GetHolidaysByAcademicYearIdAsync(int academicYearId, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            List<Holiday> holidaysList = await _imsDbContext.Holidays.Where(x => x.InstitutionId == currentUserInstituteId && x.AcademicYearId == academicYearId).ToListAsync();
            List<InstituteHolidayAc> holidaysListAc = new List<InstituteHolidayAc>();

            foreach (Holiday holiday in holidaysList)
            {
                holidaysListAc.Add(new InstituteHolidayAc
                {
                    Id = holiday.Id,
                    AcademicYearId = holiday.AcademicYearId,
                    InstitutionId = holiday.InstitutionId,
                    HolidayDate = holiday.HolidayDate,
                    HolidayToDate = holiday.HolidayToDate,
                    Description = holiday.Description,
                    OccuranceType = holiday.OccuranceType,
                    OccuranceTypeString = EnumHelperService.GetDescription(holiday.OccuranceType)
                });
            }

            return holidaysListAc;
        }

        /// <summary>
        /// Method for fetching the list of all occurance types
        /// </summary>
        /// <returns></returns>
        public List<HolidayOccuranceTypeEnumDetailsListAc> GetOccuranceTypesList()
        {
            List<HolidayOccuranceTypeEnum> occuranceTypeEnumList = EnumHelperService.GetEnumValuesList<HolidayOccuranceTypeEnum>();
            List<HolidayOccuranceTypeEnumDetailsListAc> occuranceTypeEnumDetailsList = new List<HolidayOccuranceTypeEnumDetailsListAc>();

            foreach (HolidayOccuranceTypeEnum holidayOccuranceType in occuranceTypeEnumList)
            {
                occuranceTypeEnumDetailsList.Add(new HolidayOccuranceTypeEnumDetailsListAc
                {
                    HolidayOccuranceTypeEnum = holidayOccuranceType,
                    HolidayOccuranceTypeEnumString = EnumHelperService.GetDescription(holidayOccuranceType)
                });
            }

            return occuranceTypeEnumDetailsList;
        }

        /// <summary>
        /// Method for adding new holiday
        /// </summary>
        /// <param name="newHoliday"></param>
        /// <returns></returns>
        public async Task AddNewHoliday(AddHolidayAc newHolidayAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            Holiday newHoliday = new Holiday
            {
                AcademicYearId = newHolidayAc.AcademicYearId,
                HolidayDate = newHolidayAc.FromDate,
                HolidayToDate = newHolidayAc.ToDate,
                Description = newHolidayAc.Description,
                OccuranceType = newHolidayAc.OccuranceType,
                InstitutionId = currentUserInstituteId,
                CreatedBy = currentUser.Id,
                CreatedOn = currentUser.CreatedOn
            };

            _imsDbContext.Add(newHoliday);
            await _imsDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method for fetching the details of the holiday
        /// </summary>
        /// <param name="holidayId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<AddHolidayAc> GetHolidayDetailsByIdAsync(int holidayId, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            Holiday holiday = await _imsDbContext.Holidays.FirstOrDefaultAsync(x => x.Id == holidayId && x.InstitutionId == currentUserInstituteId);
            
            return new AddHolidayAc
            {
                Id = holiday.Id,
                AcademicYearId = holiday.AcademicYearId,
                Description = holiday.Description,
                FromDate = holiday.HolidayDate,
                ToDate = holiday.HolidayToDate,
                OccuranceType = holiday.OccuranceType,
                OccuranceTypeString = EnumHelperService.GetDescription(holiday.OccuranceType)
            };
        }

        /// <summary>
        /// Method for updating holiday
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedHoliday"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateHolidayAsync(int id, AddHolidayAc updatedHolidayAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            Holiday holiday = await _imsDbContext.Holidays.FirstOrDefaultAsync(x => x.Id == id && x.InstitutionId == currentUserInstituteId);

            if (holiday == null)
            {
                return new { Message = "No holiday exists with this id", HasError = true };
            }
            else
            {

                holiday.HolidayDate = updatedHolidayAc.FromDate;
                holiday.HolidayToDate = updatedHolidayAc.ToDate;
                holiday.OccuranceType = updatedHolidayAc.OccuranceType;
                holiday.Description = updatedHolidayAc.Description;
                holiday.UpdatedBy = currentUser.Id;
                holiday.UpdatedOn = DateTime.UtcNow;
                _imsDbContext.Holidays.Update(holiday);
                await _imsDbContext.SaveChangesAsync();

                return new { Message = "Holiday updated successfully" };
            }
        }

        /// <summary>
        /// Method for deleting a holiday
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<dynamic> DeleteHolidayAsync(int id)
        {
            Holiday holiday = await _imsDbContext.Holidays.FirstOrDefaultAsync(x => x.Id == id);
            
            if(holiday == null)
            {
                return new { Message = "No holidays found with the id", HasError = true };
            }
            else
            {
                _imsDbContext.Holidays.Remove(holiday);
                await _imsDbContext.SaveChangesAsync();

                return new { Message = "Holiday deleted successfully" };
            }
        }

        #endregion

        #region Private methods



        #endregion
    }
}
