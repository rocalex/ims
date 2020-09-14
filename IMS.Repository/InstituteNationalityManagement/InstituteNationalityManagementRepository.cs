using IMS.DomainModel.ApplicationClasses.InstituteNationalityManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteNationalityManagement
{
    public class InstituteNationalityManagementRepository : IInstituteNationalityManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public InstituteNationalityManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add nationality - SS
        /// </summary>
        /// <param name="name">name of nation</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddInstituteNationalityAsync(AddInstituteNationalityAc addInstitute, int instituteId)
        {
            if (!await _iMSDbContext.InstituteNationalities.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addInstitute.Code.ToLowerInvariant()))
            {
                var nationality = new InstituteNationality()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addInstitute.Name,
                    Code = addInstitute.Code,
                    Description = addInstitute.Description,
                    Status = true
                };
                _iMSDbContext.InstituteNationalities.Add(nationality);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Nationality added successfully" };
            }
            else
                return new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Nationality with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of nationality - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of nation</returns>
        public async Task<List<InstituteNationality>> GetAllInstituteNationalityAsync(int instituteId)
        {
            return (await _iMSDbContext.InstituteNationalities.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update nationality - SS
        /// </summary>
        /// <param name="updateInstituteNationality">nation detail</param>
        /// <param name="instituteId">institue id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateInstituteNationalityAsync(UpdateInstituteNationalityAc updateInstituteNationality, int instituteId)
        {
            var nationalities = await _iMSDbContext.InstituteNationalities.Where(x => x.InstituteId == instituteId
            && x.Id != updateInstituteNationality.NationalityId).ToListAsync();
            var isDuplicate = nationalities.Any(x => x.Code.ToLowerInvariant() == updateInstituteNationality.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of nationality. Please use unique code" };
            else
            {
                var nationality = await _iMSDbContext.InstituteNationalities.FirstAsync(x => x.Id == updateInstituteNationality.NationalityId);
                nationality.Name = updateInstituteNationality.Name;
                nationality.Code = updateInstituteNationality.Code;
                nationality.Description = updateInstituteNationality.Description;
                nationality.Status = updateInstituteNationality.Status;
                _iMSDbContext.InstituteNationalities.Update(nationality);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Nationality updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.InstituteNationalities.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.InstituteNationalities.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
