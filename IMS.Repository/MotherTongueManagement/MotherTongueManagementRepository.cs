using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.MotherTongueManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.MotherTongueManagement
{
    public class MotherTongueManagementRepository : IMotherTongueManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public MotherTongueManagementRepository(IMSDbContext imsDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _imsDbContext = imsDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all mother tongues
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<List<MotherTongueAc>> GetAllMotherTonguesAsync(ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            List<MotherTongue> motherTonguesList = await _imsDbContext.MotherTongues.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<MotherTongueAc> motherTonguesListAc = new List<MotherTongueAc>();
            foreach (MotherTongue motherTongue in motherTonguesList)
            {
                motherTonguesListAc.Add(new MotherTongueAc
                {
                    Id = motherTongue.Id,
                    Name = motherTongue.Language,
                    Code = motherTongue.Code,
                    Description = motherTongue.Description,
                    Status = motherTongue.Status,
                    CreatedOn = motherTongue.CreatedOn
                });
            }

            return motherTonguesListAc;
        }

        /// <summary>
        /// Method for fetching mother tongue by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<MotherTongueAc> GetMotherTongueByIdAsync(int id, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            MotherTongue motherTongue = await _imsDbContext.MotherTongues.FirstOrDefaultAsync(x => x.Id == id && x.InstituteId == currentUserInstituteId);
            return (motherTongue == null)
                ? null
                : new MotherTongueAc
                {
                    Id = motherTongue.Id,
                    Name = motherTongue.Language,
                    Code = motherTongue.Code,
                    Description = motherTongue.Description,
                    Status = motherTongue.Status,
                    CreatedOn = motherTongue.CreatedOn
                };
        }

        /// <summary>
        /// Method for adding new mother tongue
        /// </summary>
        /// <param name="newMotherTongue"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<SharedLookUpResponse> AddMotherTongueAsync(MotherTongueAc newMotherTongueAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            if (await _imsDbContext.MotherTongues.AnyAsync(x => x.Language.ToLowerInvariant().Equals(newMotherTongueAc.Name.ToLowerInvariant())
                 && x.InstituteId == currentUserInstituteId))
            {
                return new SharedLookUpResponse { Message = "Mother tongue already exists with this name", HasError = true, ErrorType = SharedLookUpResponseType.Name };
            }
            else if (await _imsDbContext.MotherTongues.AnyAsync(x => x.Code.ToLowerInvariant().Equals(newMotherTongueAc.Code.ToLowerInvariant())
                 && x.InstituteId == currentUserInstituteId))
            {
                return new SharedLookUpResponse { Message = "Mother tongue already exists with this code", HasError = true, ErrorType = SharedLookUpResponseType.Code };
            }

            MotherTongue newMotherTongue = new MotherTongue
            {
                Code = newMotherTongueAc.Code,
                Language = newMotherTongueAc.Name,
                Description = newMotherTongueAc.Description,
                Status = true,
                InstituteId = currentUserInstituteId,
                CreatedBy = currentUser.Id,
                CreatedOn = DateTime.UtcNow
            };
            _imsDbContext.MotherTongues.Add(newMotherTongue);
            await _imsDbContext.SaveChangesAsync();

            return new SharedLookUpResponse { HasError = false, Message = "Blood group added successfully" };
        }

        /// <summary>
        /// Method for updating mother tongue
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedMotherTongue"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<SharedLookUpResponse> UpdateMotherTongueAsync(int id, MotherTongueAc updatedMotherTongueAc, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            MotherTongue motherTongue = await _imsDbContext.MotherTongues.FirstOrDefaultAsync(x => x.Id == id && x.InstituteId == currentUserInstituteId);
            if (motherTongue == null)
            {
                return new SharedLookUpResponse { Message = "No mother tongue exists with this id", HasError = true };
            }
            else if (await _imsDbContext.MotherTongues.AnyAsync(x => x.Language.ToLowerInvariant().Equals(updatedMotherTongueAc.Name.ToLowerInvariant())
                 && x.Id != id && x.InstituteId == currentUserInstituteId))
            {
                return new SharedLookUpResponse { Message = "Mother tongue already exists with this name", HasError = true, ErrorType = SharedLookUpResponseType.Name };
            }
            else if (await _imsDbContext.MotherTongues.AnyAsync(x => x.Code.ToLowerInvariant().Equals(updatedMotherTongueAc.Code.ToLowerInvariant())
                 && x.Id != id && x.InstituteId == currentUserInstituteId))
            {
                return new SharedLookUpResponse { Message = "Mother tongue already exists with this code", HasError = true, ErrorType = SharedLookUpResponseType.Code };
            }

            motherTongue.Language = updatedMotherTongueAc.Name;
            motherTongue.Code = updatedMotherTongueAc.Code;
            motherTongue.Description = updatedMotherTongueAc.Description;
            motherTongue.Status = true;
            _imsDbContext.MotherTongues.Update(motherTongue);
            await _imsDbContext.SaveChangesAsync();

            return new SharedLookUpResponse { Message = "Mother tongue updated successfully", HasError = false };
        }

        #endregion

        #region Private methods



        #endregion
    }
}
