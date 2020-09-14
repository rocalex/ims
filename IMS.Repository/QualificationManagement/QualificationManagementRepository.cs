using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.QualificationManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.QualificationManagement
{
    public class QualificationManagementRepository : IQualificationManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public QualificationManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Qualification - SS
        /// </summary>
        /// <param name="name">name of Qualification</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddQualificationAsync(AddQualificationManagementAc addQualification, int instituteId)
        {
            if (!await _iMSDbContext.Qualifications.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addQualification.Code.ToLowerInvariant()))
            {
                var qualification = new Qualification()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addQualification.Name,
                    Code = addQualification.Code,
                    Description = addQualification.Description,
                    Status = true
                };
                _iMSDbContext.Qualifications.Add(qualification);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Qualification added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Qualification with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of Qualification by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Qualification>> GetAllQualificationAsync(int instiuteId)
        {
            return (await _iMSDbContext.Qualifications.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Qualification - SS
        /// </summary>
        /// <param name="updateQualificationManagement">Qualification detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateQualificationAsync(UpdateQualificationManagementAc updateQualificationManagement, int instituteId)
        {
            var qualifications = await _iMSDbContext.Qualifications.Where(x => x.InstituteId == instituteId && x.Id != updateQualificationManagement.QualificationId).ToListAsync();
            var isDuplicate = qualifications.Any(x => x.Code.ToLowerInvariant() == updateQualificationManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of qualification. Please use unique code" };
            else
            {
                var qualification = await _iMSDbContext.Qualifications.FirstAsync(x => x.Id == updateQualificationManagement.QualificationId);
                qualification.Name = updateQualificationManagement.Name;
                qualification.Code = updateQualificationManagement.Code;
                qualification.Description = updateQualificationManagement.Description;
                qualification.Status = updateQualificationManagement.Status;
                _iMSDbContext.Qualifications.Update(qualification);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Qualification updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.Qualifications.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.Qualifications.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
