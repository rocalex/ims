using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.SportDetailManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.SportDetailManagement
{
    public class SportDetailManagementRepository : ISportDetailManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public SportDetailManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add SportDetail - SS
        /// </summary>
        /// <param name="name">name of SportDetail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddSportDetailAsync(AddSportDetailManagementAc addSport, int instituteId)
        {
            if (!await _iMSDbContext.SportDetails.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addSport.Code.ToLowerInvariant()))
            {
                var sportDetail = new SportDetail()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addSport.Name,
                    Code = addSport.Code,
                    Description = addSport.Description,
                    Status = true
                };
                _iMSDbContext.SportDetails.Add(sportDetail);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Sport detail added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Sport detail with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of SportDetail by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<SportDetail>> GetAllSportDetailAsync(int instiuteId)
        {
            return (await _iMSDbContext.SportDetails.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update SportDetail - SS
        /// </summary>
        /// <param name="updateSportDetailManagement">SportDetail detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateSportDetailAsync(UpdateSportDetailManagementAc updateSportDetailManagement, int instituteId)
        {
            var sportDetails = await _iMSDbContext.SportDetails.Where(x => x.InstituteId == instituteId && x.Id != updateSportDetailManagement.SportDetailId).ToListAsync();
            var isDuplicate = sportDetails.Any(x => x.Code.ToLowerInvariant() == updateSportDetailManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of sport detail. Please use unique code" };
            else
            {
                var sportDetail = await _iMSDbContext.SportDetails.FirstAsync(x => x.Id == updateSportDetailManagement.SportDetailId);
                sportDetail.Name = updateSportDetailManagement.Name;
                sportDetail.Code = updateSportDetailManagement.Code;
                sportDetail.Description = updateSportDetailManagement.Description;
                sportDetail.Status = updateSportDetailManagement.Status;
                _iMSDbContext.SportDetails.Update(sportDetail);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Sport detail updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.SportDetails.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.SportDetails.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
