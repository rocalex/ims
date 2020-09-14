using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.OccupationManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.OccupationManagement
{
    public class OccupationManagementRepository : IOccupationManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public OccupationManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Occupation - SS
        /// </summary>
        /// <param name="name">name of Occupation</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddOccupationAsync(AddOccupationManagementAc addOccupation, int instituteId)
        {
            if (!await _iMSDbContext.Occupations.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addOccupation.Code.ToLowerInvariant()))
            {
                var Occupation = new Occupation()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addOccupation.Name,
                    Code = addOccupation.Code,
                    Description = addOccupation.Description,
                    Status = true
                };
                _iMSDbContext.Occupations.Add(Occupation);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Occupation added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Occupation with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of Occupation by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Occupation>> GetAllOccupationAsync(int instiuteId)
        {
            return (await _iMSDbContext.Occupations.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Occupation - SS
        /// </summary>
        /// <param name="updateOccupationManagement">Occupation detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateOccupationAsync(UpdateOccupationManagementAc updateOccupationManagement, int instituteId)
        {
            var Occupations = await _iMSDbContext.Occupations.Where(x => x.InstituteId == instituteId && x.Id != updateOccupationManagement.OccupationId).ToListAsync();
            var isDuplicate = Occupations.Any(x => x.Code.ToLowerInvariant() == updateOccupationManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of occupation. Please use unique code" };
            else
            {
                var Occupation = await _iMSDbContext.Occupations.FirstAsync(x => x.Id == updateOccupationManagement.OccupationId);
                Occupation.Name = updateOccupationManagement.Name;
                Occupation.Code = updateOccupationManagement.Code;
                Occupation.Description = updateOccupationManagement.Description;
                Occupation.Status = updateOccupationManagement.Status;
                _iMSDbContext.Occupations.Update(Occupation);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Occupation updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.Occupations.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.Occupations.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
