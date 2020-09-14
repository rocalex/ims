using IMS.DomainModel.ApplicationClasses.CasteManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.CasteManagement
{
    public class CasteManagementRepository : ICasteManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public CasteManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Caste - SS
        /// </summary>
        /// <param name="name">name of Caste</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddCasteAsync(AddCasteManagementAc addCaste, int instituteId)
        {
            if (!await _iMSDbContext.Castes.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addCaste.Code.ToLowerInvariant()))
            {
                var Caste = new Caste()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addCaste.Name,
                    Code = addCaste.Code,
                    Description = addCaste.Description,
                    Status = true
                };
                _iMSDbContext.Castes.Add(Caste);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Caste added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Caste with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of Caste by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Caste>> GetAllCasteAsync(int instiuteId)
        {
            return (await _iMSDbContext.Castes.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Caste - SS
        /// </summary>
        /// <param name="updateCasteManagement">Caste detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateCasteAsync(UpdateCasteManagementAc updateCasteManagement, int instituteId)
        {
            var castes = await _iMSDbContext.Castes.Where(x => x.InstituteId == instituteId && x.Id != updateCasteManagement.CasteId).ToListAsync();
            var isDuplicate = castes.Any(x => x.Code.ToLowerInvariant() == updateCasteManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of caste. Please use unique code" };
            else
            {
                var caste = await _iMSDbContext.Castes.FirstAsync(x => x.Id == updateCasteManagement.CasteId);
                caste.Name = updateCasteManagement.Name;
                caste.Code = updateCasteManagement.Code;
                caste.Description = updateCasteManagement.Description;
                caste.Status = updateCasteManagement.Status;
                _iMSDbContext.Castes.Update(caste);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Caste updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.Castes.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.Castes.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
