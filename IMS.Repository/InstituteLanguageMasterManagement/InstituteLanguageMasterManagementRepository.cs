using IMS.DomainModel.ApplicationClasses.InstituteLanguageMasterManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteLanguageMasterManagement
{
    public class InstituteLanguageMasterManagementRepository : IInstituteLanguageMasterManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly DomainModel.AppSettings.InstituteLanguageMaster _instituteLanguageMaster;
        #endregion

        #region Constructor
        public InstituteLanguageMasterManagementRepository(IMSDbContext iMSDbContext,
            IOptions<DomainModel.AppSettings.InstituteLanguageMaster> instituteLanguageMaster)
        {
            _iMSDbContext = iMSDbContext;
            _instituteLanguageMaster = instituteLanguageMaster.Value;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add InstituteLanguageMaster - SS
        /// </summary>
        /// <param name="name">name of InstituteLanguageMaster</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddInstituteLanguageMasterAsync(AddInstituteLanguageMasterManagementAc addInstituteLanguageMaster, int instituteId)
        {
            if (!await _iMSDbContext.InstituteLanguageMasters.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addInstituteLanguageMaster.Code.ToLowerInvariant()))
            {
                var InstituteLanguageMaster = new InstituteLanguageMaster()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addInstituteLanguageMaster.Name,
                    Code = addInstituteLanguageMaster.Code,
                    Description = addInstituteLanguageMaster.Description,
                    Status = true
                };
                _iMSDbContext.InstituteLanguageMasters.Add(InstituteLanguageMaster);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Language added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Language with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of InstituteLanguageMaster by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<InstituteLanguageMaster>> GetAllInstituteLanguageMasterAsync(int instiuteId)
        {
            return (await _iMSDbContext.InstituteLanguageMasters.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update InstituteLanguageMaster - SS
        /// </summary>
        /// <param name="updateInstituteLanguageMasterManagement">InstituteLanguageMaster detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateInstituteLanguageMasterAsync(UpdateInstituteLanguageMasterManagementAc updateInstituteLanguageMasterManagement, int instituteId)
        {
            var InstituteLanguageMasters = await _iMSDbContext.InstituteLanguageMasters.Where(x => x.InstituteId == instituteId && x.Id != updateInstituteLanguageMasterManagement.Id).ToListAsync();
            var isDuplicate = InstituteLanguageMasters.Any(x => x.Code.ToLowerInvariant() == updateInstituteLanguageMasterManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Language. Please use unique code" };
            else
            {
                var InstituteLanguageMaster = await _iMSDbContext.InstituteLanguageMasters.FirstAsync(x => x.Id == updateInstituteLanguageMasterManagement.Id);
                InstituteLanguageMaster.Name = updateInstituteLanguageMasterManagement.Name;
                InstituteLanguageMaster.Code = updateInstituteLanguageMasterManagement.Code;
                InstituteLanguageMaster.Description = updateInstituteLanguageMasterManagement.Description;
                InstituteLanguageMaster.Status = updateInstituteLanguageMasterManagement.Status;
                _iMSDbContext.InstituteLanguageMasters.Update(InstituteLanguageMaster);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { Message = "Language updated successfully", HasError = false };
            }
        }
        #endregion
    }
}
