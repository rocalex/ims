using IMS.DomainModel.ApplicationClasses.InstituteAcademicYear;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteAcademicYearManagement
{
    public class InstituteAcademicYearManagementRepository : IInstituteAcademicYearManagementRepository
    {
        #region Private variables

        private IMSDbContext _imsDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public InstituteAcademicYearManagementRepository(IMSDbContext imsDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _imsDbContext = imsDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all academic years
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<List<InstituteAcademicYear>> GetAcademicYearsListAsync(int instituteId)
        {
            return (await _imsDbContext.InstituteAcademicYears.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method for fetching the details of an academic year by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<InstituteAcademicYear> GetAcademicYearByIdAsync(int id, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return await _imsDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.Id == id && x.InstituteId == currentUserInstituteId);
        }

        /// <summary>
        /// Method for adding new academic year
        /// </summary>
        /// <param name="newAcademicYearAc"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddAcademicYearAsync(AddInstituteAcademicYearAc newAcademicYearAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            InstituteAcademicYear existingAcademicYear = await _imsDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.FromDate == newAcademicYearAc.FromDate
                && x.ToDate == newAcademicYearAc.ToDate && x.InstituteId == currentUserInstituteId);

            if (existingAcademicYear != null)
            {
                return new { Message = "Academic year already exist within the same date range", HasError = true };
            }
            else if (await _imsDbContext.InstituteAcademicYears.AnyAsync(x => x.AcademicYearCode.ToLowerInvariant().Equals(newAcademicYearAc.AcademicYearCode.ToLowerInvariant())
                     && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Academic year code already exist", HasError = true };
            }
            else if (newAcademicYearAc.IsActive && await _imsDbContext.InstituteAcademicYears.AnyAsync(x => x.IsActive && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Another academic year is already active", HasError = true };
            }

            // Add new academic year
            InstituteAcademicYear newAcademicYear = new InstituteAcademicYear
            {
                AcademicYearCode = newAcademicYearAc.AcademicYearCode,
                ChallanStartingNumber = newAcademicYearAc.ChallanStartingNumber,
                FromDate = newAcademicYearAc.FromDate,
                ToDate = newAcademicYearAc.ToDate,
                IsActive = newAcademicYearAc.IsActive,
                CreatedBy = currentUser.Id,
                CreatedOn = DateTime.UtcNow,
                InstituteId = currentUserInstituteId
            };

            _imsDbContext.InstituteAcademicYears.Add(newAcademicYear);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Academic year added successfully" };
        }

        /// <summary>
        /// Method for updating an academic year
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedAcademicYearAc"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateAcademicYearAsync(int id, AddInstituteAcademicYearAc updatedAcademicYearAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            InstituteAcademicYear academicYear = await _imsDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.Id == id && x.InstituteId == currentUserInstituteId);

            if (academicYear == null)
            {
                return new { Message = "No academic year exists with this id", HasError = true };
            }
            else if (await _imsDbContext.InstituteAcademicYears.AnyAsync(x => x.Id != id && x.FromDate == updatedAcademicYearAc.FromDate
                && x.ToDate == updatedAcademicYearAc.ToDate && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Academic year already exist within the same date range", HasError = true };
            }
            else if (await _imsDbContext.InstituteAcademicYears.AnyAsync(x => x.Id != id &&
                x.AcademicYearCode.ToLowerInvariant().Equals(updatedAcademicYearAc.AcademicYearCode.ToLowerInvariant()) && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Academic year code already exist", HasError = true };
            }
            else if (updatedAcademicYearAc.IsActive && await _imsDbContext.InstituteAcademicYears.AnyAsync(x => x.Id != id && x.IsActive && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Another academic year is already active", HasError = true };
            }
            else
            {
                academicYear.AcademicYearCode = updatedAcademicYearAc.AcademicYearCode;
                academicYear.ChallanStartingNumber = updatedAcademicYearAc.ChallanStartingNumber;
                academicYear.IsActive = updatedAcademicYearAc.IsActive;
                academicYear.FromDate = updatedAcademicYearAc.FromDate;
                academicYear.ToDate = updatedAcademicYearAc.ToDate;
                academicYear.UpdatedBy = currentUser.Id;
                academicYear.UpdatedOn = DateTime.UtcNow;
                _imsDbContext.InstituteAcademicYears.Update(academicYear);
                await _imsDbContext.SaveChangesAsync();

                return new { Message = "Academic year updated successfully" };
            }
        }

        #endregion

        #region Private methods



        #endregion
    }
}
