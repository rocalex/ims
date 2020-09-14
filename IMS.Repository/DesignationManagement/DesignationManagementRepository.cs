using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.DesignationManagement
{
    public class DesignationManagementRepository : IDesignationManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public DesignationManagementRepository(IMSDbContext imsDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _imsDbContext = imsDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all designations
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<List<Designation>> GetAllDesignationsAsync(ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return (await _imsDbContext.Designations.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync());
        }

        /// <summary>
        /// Method for fetching designation by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<Designation> GetDesignationByIdAsync(int id, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return (await _imsDbContext.Designations.FirstOrDefaultAsync(x => x.Id == id && x.InstituteId == currentUserInstituteId));
        }

        /// <summary>
        /// Method for adding new designation
        /// </summary>
        /// <param name="newDesignation"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddDesignationAsync(Designation newDesignation, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            if (await _imsDbContext.Designations.AnyAsync(x => x.DesignationName.ToLowerInvariant().Equals(newDesignation.DesignationName.ToLowerInvariant())
                && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Designation name already exists", HasError = true };
            }
            else if (await _imsDbContext.Designations.AnyAsync(x => x.Code.ToLowerInvariant().Equals(newDesignation.Code.ToLowerInvariant())
                && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Designation code already exists", HasError = true };
            }

            newDesignation.InstituteId = currentUserInstituteId;
            newDesignation.CreatedBy = currentUser.Id;
            newDesignation.CreatedOn = DateTime.UtcNow;
            _imsDbContext.Designations.Add(newDesignation);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Designation added successfully" };
        }

        /// <summary>
        /// Method for updating designation
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedDesignation"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateDesignationAsync(int id, Designation updatedDesignation, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            Designation designation = await GetDesignationByIdAsync(id, currentUser);

            if (designation == null)
            {
                return new { Message = "No designation exists with this id", HasError = true };
            }
            else if (await _imsDbContext.Designations.AnyAsync(x => x.DesignationName.ToLowerInvariant().Equals(updatedDesignation.DesignationName.ToLowerInvariant())
                 && x.Id != id && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Designation name already exists", HasError = true };
            }
            else if (await _imsDbContext.Designations.AnyAsync(x => x.Code.ToLowerInvariant().Equals(updatedDesignation.Code.ToLowerInvariant())
                 && x.Id != id && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Designation code already exists", HasError = true };
            }

            designation.DesignationName = updatedDesignation.DesignationName;
            designation.Code = updatedDesignation.Code;
            designation.Description = updatedDesignation.Description;
            designation.UpdatedBy = currentUser.Id;
            designation.UpdatedAt = DateTime.UtcNow;
            _imsDbContext.Designations.Update(designation);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Designation updated successfully" };
        }

        #endregion

        #region Private methods



        #endregion
    }
}
