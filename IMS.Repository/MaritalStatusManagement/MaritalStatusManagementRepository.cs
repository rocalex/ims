using IMS.DomainModel.ApplicationClasses.MaritalStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.MaritalStatusManagement
{
    public class MaritalStatusManagementRepository : IMaritalStatusManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public MaritalStatusManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add MaritalStatus - SS
        /// </summary>
        /// <param name="name">name of MaritalStatus</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddMaritalStatusAsync(AddMaritalStatusManagementAc addMaritalStatus, int instituteId)
        {
            if (!await _iMSDbContext.MaritalStatuses.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addMaritalStatus.Code.ToLowerInvariant()))
            {
                var maritalStatus = new MaritalStatus()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addMaritalStatus.Name,
                    Code = addMaritalStatus.Code,
                    Description = addMaritalStatus.Description,
                    Status = true
                };
                _iMSDbContext.MaritalStatuses.Add(maritalStatus);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Marital status added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Marital status with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of MaritalStatus by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<MaritalStatus>> GetAllMaritalStatusAsync(int instiuteId)
        {
            return (await _iMSDbContext.MaritalStatuses.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update MaritalStatus - SS
        /// </summary>
        /// <param name="updateMaritalStatusManagement">MaritalStatus detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateMaritalStatusAsync(UpdateMaritalStatusManagementAc updateMaritalStatusManagement, int instituteId)
        {
            var maritalStatuss = await _iMSDbContext.MaritalStatuses.Where(x => x.InstituteId == instituteId && x.Id != updateMaritalStatusManagement.MaritalStatusId).ToListAsync();
            var isDuplicate = maritalStatuss.Any(x => x.Code.ToLowerInvariant() == updateMaritalStatusManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of marital status. Please use unique code" };
            else
            {
                var maritalStatus = await _iMSDbContext.MaritalStatuses.FirstAsync(x => x.Id == updateMaritalStatusManagement.MaritalStatusId);
                maritalStatus.Name = updateMaritalStatusManagement.Name;
                maritalStatus.Code = updateMaritalStatusManagement.Code;
                maritalStatus.Description = updateMaritalStatusManagement.Description;
                maritalStatus.Status = updateMaritalStatusManagement.Status;
                _iMSDbContext.MaritalStatuses.Update(maritalStatus);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Marital status updated successfully" };
            }
        }
        #endregion
    }
}
