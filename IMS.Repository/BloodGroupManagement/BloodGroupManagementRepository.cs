using IMS.DomainModel.ApplicationClasses.BloodGroupManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.BloodGroupManagement
{
    public class BloodGroupManagementRepository : IBloodGroupManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public BloodGroupManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add BloodGroup - SS
        /// </summary>
        /// <param name="name">name of BloodGroup</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddBloodGroupAsync(AddBloodGroupManagementAc addBloodGroup, int instituteId)
        {
            if (!await _iMSDbContext.BloodGroups.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addBloodGroup.Code.ToLowerInvariant()))
            {
                var bloodGroup = new BloodGroup()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addBloodGroup.Name,
                    Code = addBloodGroup.Code,
                    Description = addBloodGroup.Description,
                    Status = true
                };
                _iMSDbContext.BloodGroups.Add(bloodGroup);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Blood group added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Blood group with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of BloodGroup by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<BloodGroup>> GetAllBloodGroupAsync(int instiuteId)
        {
            return (await _iMSDbContext.BloodGroups.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update BloodGroup - SS
        /// </summary>
        /// <param name="updateBloodGroupManagement">BloodGroup detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateBloodGroupAsync(UpdateBloodGroupManagementAc updateBloodGroupManagement, int instituteId)
        {
            var bloodGroups = await _iMSDbContext.BloodGroups.Where(x => x.InstituteId == instituteId && x.Id != updateBloodGroupManagement.BloodGroupId).ToListAsync();
            var isDuplicate = bloodGroups.Any(x => x.Code.ToLowerInvariant() == updateBloodGroupManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Blood group. Please use unique code" };
            else
            {
                var bloodGroup = await _iMSDbContext.BloodGroups.FirstAsync(x => x.Id == updateBloodGroupManagement.BloodGroupId);
                bloodGroup.Name = updateBloodGroupManagement.Name;
                bloodGroup.Code = updateBloodGroupManagement.Code;
                bloodGroup.Description = updateBloodGroupManagement.Description;
                bloodGroup.Status = updateBloodGroupManagement.Status;
                _iMSDbContext.BloodGroups.Update(bloodGroup);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { Message = "Blood group updated successfully", HasError = false };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.BloodGroups.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.BloodGroups.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
