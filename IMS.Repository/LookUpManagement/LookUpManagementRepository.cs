using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.LookUpManagement
{
    public class LookUpManagementRepository : ILookUpManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly LookUpManagementData _lookUpManagementData;
        #endregion

        #region Constructor
        public LookUpManagementRepository(IMSDbContext iMSDbContext, IOptions<LookUpManagementData> lookUpManagementData)
        {
            _iMSDbContext = iMSDbContext;
            _lookUpManagementData = lookUpManagementData.Value;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to get all look up - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of look ups</returns>
        public async Task<List<LookUp>> GetAllLookUpsAsync(int instituteId)
        {
            await SeedLookUpAsync(instituteId);
            return (await _iMSDbContext.LookUps.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to add look up mapping - SS
        /// </summary>
        /// <param name="addLookUpManagement">look up details</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        public async Task<LookUpManagementResponse> AddLookUpMappingAsync(AddLookUpManagementAc addLookUpManagement, int instituteId)
        {
            if (!await _iMSDbContext.LookUpMappings.AnyAsync(x => x.LookUp.InstituteId == instituteId
            && x.Code.ToLowerInvariant() == addLookUpManagement.Code.ToLowerInvariant()))
            {
                var lookUpMapping = new LookUpMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    Code = addLookUpManagement.Code,
                    Name = addLookUpManagement.Name,
                    Description = addLookUpManagement.Description,
                    IsDefault = addLookUpManagement.IsDefault,
                    IsDeleted = addLookUpManagement.IsDeleted,
                    IsSystemRow = addLookUpManagement.IsSystemRow,
                    LookUpId = addLookUpManagement.LookUpId,
                    Status = addLookUpManagement.Status
                };
                _iMSDbContext.LookUpMappings.Add(lookUpMapping);
                await _iMSDbContext.SaveChangesAsync();
                return new LookUpManagementResponse() { HasError = false, Message = "Look up added successfully" };
            }
            else
                return new LookUpManagementResponse() { HasError = true, Message = "Look up code already exist", ErrorType = LookUpManagementResponseType.Code };
        }

        /// <summary>
        /// Method to get all look up mappings - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of look ups</returns>
        public async Task<List<LookUpMapping>> GetAllLookUpMappingAsync(int instituteId)
        {
            var list = await _iMSDbContext.LookUpMappings.Include(a=>a.LookUp).OrderByDescending(c => c.LookUp.Name).Where(x => x.LookUp.InstituteId == instituteId).ToListAsync();
            list.Reverse();
            return list;
        }

        /// <summary>
        /// Method to update look up mapping - SS
        /// </summary>
        /// <param name="updateLookUpManagement">look up detail</param>
        /// <param name="instituteId">isntitute id</param>
        /// <returns>response</returns>
        public async Task<LookUpManagementResponse> UpdateLookUpMappingAsync(UpdateLookUpManagementAc updateLookUpManagement, int instituteId)
        {
            var subjects = await _iMSDbContext.LookUpMappings.Where(x => x.LookUp.InstituteId == instituteId && x.Id != updateLookUpManagement.Id).ToListAsync();
            var isDuplicate = subjects.Any(x => x.Code.ToLowerInvariant() == updateLookUpManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new LookUpManagementResponse() { HasError = true, Message = "Duplicate look up code. Please use unique look up code", ErrorType = LookUpManagementResponseType.Code };
            else
            {
                var lookUpMapping = await _iMSDbContext.LookUpMappings.FirstAsync(x => x.Id == updateLookUpManagement.Id);
                lookUpMapping.Code = updateLookUpManagement.Code;
                lookUpMapping.Description= updateLookUpManagement.Description;
                lookUpMapping.Name = updateLookUpManagement.Name;
                lookUpMapping.IsDefault = updateLookUpManagement.IsDefault;
                lookUpMapping.IsDeleted = updateLookUpManagement.IsDeleted;
                lookUpMapping.IsSystemRow = updateLookUpManagement.IsSystemRow;
                lookUpMapping.Status = updateLookUpManagement.Status;
                lookUpMapping.LookUpId = updateLookUpManagement.LookUpId;
                _iMSDbContext.LookUpMappings.Update(lookUpMapping);
                await _iMSDbContext.SaveChangesAsync();
                return new LookUpManagementResponse() { HasError = false, Message = "Look up updated successfully" };
            }
        }
        #endregion

        #region Private Method(s)
        /// <summary>
        /// Method to seed look up - SS
        /// </summary>
        /// <param name="instituteId">insttute id</param>
        private async Task SeedLookUpAsync(int instituteId)
        {
            var lookUps = await _iMSDbContext.LookUps.Where(x => x.InstituteId == instituteId).Select(c => c.Name).ToListAsync();
            var lookUpsToAdd = _lookUpManagementData.LookUps.Except(lookUps).ToList();
            List<LookUp> lookUp = new List<LookUp>();
            foreach (var item in lookUpsToAdd)
            {
                lookUp.Add(new LookUp()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = item,
                    Status = true
                });
            }
            if (lookUp.Count != 0)
            {
                _iMSDbContext.LookUps.AddRange(lookUp);
                await _iMSDbContext.SaveChangesAsync();
            }
        }
        #endregion
    }
}
