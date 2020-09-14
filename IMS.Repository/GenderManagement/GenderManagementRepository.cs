using IMS.DomainModel.ApplicationClasses.GenderManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.GenderManagement
{
    public class GenderManagementRepository : IGenderManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public GenderManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Gender - SS
        /// </summary>
        /// <param name="name">name of Gender</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddGenderAsync(AddGenderManagementAc addGender, int instituteId)
        {
            if (!await _iMSDbContext.Genders.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addGender.Code.ToLowerInvariant()))
            {
                var Gender = new Gender()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addGender.Name,
                    Code = addGender.Code,
                    Description = addGender.Description,
                    Status = true
                };
                _iMSDbContext.Genders.Add(Gender);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Gender added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Gender with the same name is already exist" };
        }

        /// <summary>
        /// Method to get list of Gender by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Gender>> GetAllGenderAsync(int instiuteId)
        {
            return (await _iMSDbContext.Genders.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Gender - SS
        /// </summary>
        /// <param name="updateGenderManagement">Gender detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateGenderAsync(UpdateGenderManagementAc updateGenderManagement, int instituteId)
        {
            var genders = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId && x.Id != updateGenderManagement.GenderId).ToListAsync();
            var isDuplicate = genders.Any(x => x.Code.ToLowerInvariant() == updateGenderManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of gender. Please use unique code" };
            else
            {
                var gender = await _iMSDbContext.Genders.FirstAsync(x => x.Id == updateGenderManagement.GenderId);
                gender.Name = updateGenderManagement.Name;
                gender.Code = updateGenderManagement.Code;
                gender.Description = updateGenderManagement.Description;
                gender.Status = updateGenderManagement.Status;
                _iMSDbContext.Genders.Update(gender);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Gender updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.Genders.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.Genders.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
