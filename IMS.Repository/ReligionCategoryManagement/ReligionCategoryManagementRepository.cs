using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.ReligionCategoryManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.ReligionCategoryManagement
{
    public class ReligionCategoryManagementRepository : IReligionCategoryManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public ReligionCategoryManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add ReligionCategory - SS
        /// </summary>
        /// <param name="name">name of ReligionCategory</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddReligionCategoryAsync(AddReligionCategoryManagementAc addReligion, int instituteId)
        {
            if (!await _iMSDbContext.ReligionCategories.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addReligion.Code.ToLowerInvariant()))
            {
                var ReligionCategory = new ReligionCategory()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addReligion.Name,
                    Code = addReligion.Code,
                    Description = addReligion.Description,
                    Status = true
                };
                _iMSDbContext.ReligionCategories.Add(ReligionCategory);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Religion category added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Religion category with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of ReligionCategory by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<ReligionCategory>> GetAllReligionCategoryAsync(int instiuteId)
        {
            return (await _iMSDbContext.ReligionCategories.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update ReligionCategory - SS
        /// </summary>
        /// <param name="updateReligionCategoryManagement">ReligionCategory detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateReligionCategoryAsync(UpdateReligionCategoryManagementAc updateReligionCategoryManagement, int instituteId)
        {
            var ReligionCategorys = await _iMSDbContext.ReligionCategories.Where(x => x.InstituteId == instituteId && x.Id != updateReligionCategoryManagement.ReligionCategoryId).ToListAsync();
            var isDuplicate = ReligionCategorys.Any(x => x.Code.ToLowerInvariant() == updateReligionCategoryManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Religion category. Please use unique code" };
            else
            {
                var ReligionCategory = await _iMSDbContext.ReligionCategories.FirstAsync(x => x.Id == updateReligionCategoryManagement.ReligionCategoryId);
                ReligionCategory.Name = updateReligionCategoryManagement.Name;
                ReligionCategory.Code = updateReligionCategoryManagement.Code;
                ReligionCategory.Description = updateReligionCategoryManagement.Description;
                ReligionCategory.Status = updateReligionCategoryManagement.Status;
                _iMSDbContext.ReligionCategories.Update(ReligionCategory);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Religion category updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.ReligionCategories.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.ReligionCategories.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
