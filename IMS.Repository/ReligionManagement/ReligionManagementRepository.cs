using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.ReligionManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.ReligionManagement
{
    public class ReligionManagementRepository : IReligionManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public ReligionManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add religion - SS
        /// </summary>
        /// <param name="name">name of religion</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddReligionAsync(AddReligionManagementAc addReligion, int instituteId)
        {
            if (!await _iMSDbContext.Religions.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addReligion.Code.ToLowerInvariant()))
            {
                var religion = new Religion()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addReligion.Name,
                    Code = addReligion.Code,
                    Description = addReligion.Description,
                    Status = true
                };
                _iMSDbContext.Religions.Add(religion);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Religion added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Religion with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of religion by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Religion>> GetAllReligionAsync(int instiuteId)
        {
            return (await _iMSDbContext.Religions.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update religion - SS
        /// </summary>
        /// <param name="updateReligionManagement">religion detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateReligionAsync(UpdateReligionManagementAc updateReligionManagement, int instituteId)
        {
            var religions = await _iMSDbContext.Religions.Where(x => x.InstituteId == instituteId && x.Id != updateReligionManagement.ReligionId).ToListAsync();
            var isDuplicate = religions.Any(x => x.Code.ToLowerInvariant() == updateReligionManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of religion. Please use unique code" };
            else
            {
                var religion = await _iMSDbContext.Religions.FirstAsync(x => x.Id == updateReligionManagement.ReligionId);
                religion.Name = updateReligionManagement.Name;
                religion.Code = updateReligionManagement.Code;
                religion.Description = updateReligionManagement.Description;
                religion.Status = updateReligionManagement.Status;
                _iMSDbContext.Religions.Update(religion);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Religion updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.Religions.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.Religions.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
