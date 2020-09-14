using IMS.DomainModel.ApplicationClasses.DisciplinaryStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.DisciplinaryStatusManagement
{
    public class DisciplinaryStatusManagementRepository : IDisciplinaryStatusManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly List<string> statuses = new List<string>() { "Open", "Closed", "OnHold", "Rejected" };
        #endregion

        #region Constructor
        public DisciplinaryStatusManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to seed Disciplinary status - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        public async Task SeedDisciplinaryStatusAsync(int instituteId)
        {
            List<DisciplinaryStatus> disciplinaryStatuses = new List<DisciplinaryStatus>();
            foreach (var item in statuses)
            {
                if (!await _iMSDbContext.DisciplinaryStatuses.AnyAsync(c => c.Code.ToLowerInvariant() == item.ToLowerInvariant() && c.InstituteId == instituteId))
                {
                    disciplinaryStatuses.Add(new DisciplinaryStatus()
                    {
                        Code = item,
                        CreatedOn = DateTime.UtcNow,
                        Description = item,
                        InstituteId = instituteId,
                        Name = item,
                        Status = true,
                        IsEditable = false
                    });
                }
            }
            _iMSDbContext.DisciplinaryStatuses.AddRange(disciplinaryStatuses);
            await _iMSDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method to add Disciplinary Status - SS
        /// </summary>
        /// <param name="name">name of DisciplinaryStatus</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddDisciplinaryStatusAsync(AddDisciplinaryStatusManagementAc addDisciplinaryStatus, int instituteId)
        {
            if (!await _iMSDbContext.DisciplinaryStatuses.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addDisciplinaryStatus.Code.ToLowerInvariant()))
            {
                var disciplinaryStatus = new DisciplinaryStatus()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addDisciplinaryStatus.Name,
                    Code = addDisciplinaryStatus.Code,
                    Description = addDisciplinaryStatus.Description,
                    Status = true,
                    IsEditable = true
                };
                _iMSDbContext.DisciplinaryStatuses.Add(disciplinaryStatus);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Disciplinary status added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Disciplinary status with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of Disciplinary Status by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<DisciplinaryStatus>> GetAllDisciplinaryStatusAsync(int instiuteId)
        {
            return (await _iMSDbContext.DisciplinaryStatuses.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Disciplinary Status - SS
        /// </summary>
        /// <param name="updateDisciplinaryStatusManagement">DisciplinaryStatus detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateDisciplinaryStatusAsync(UpdateDisciplinaryStatusManagementAc updateDisciplinaryStatusManagement, int instituteId)
        {
            var disciplinaryStatuss = await _iMSDbContext.DisciplinaryStatuses.Where(x => x.InstituteId == instituteId && x.Id != updateDisciplinaryStatusManagement.Id).ToListAsync();
            var isDuplicate = disciplinaryStatuss.Any(x => x.Code.ToLowerInvariant() == updateDisciplinaryStatusManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Disciplinary status. Please use unique code" };
            else
            {
                var disciplinaryStatus = await _iMSDbContext.DisciplinaryStatuses.FirstAsync(x => x.Id == updateDisciplinaryStatusManagement.Id);
                disciplinaryStatus.Name = updateDisciplinaryStatusManagement.Name;
                disciplinaryStatus.Code = updateDisciplinaryStatusManagement.Code;
                disciplinaryStatus.Description = updateDisciplinaryStatusManagement.Description;
                disciplinaryStatus.Status = updateDisciplinaryStatusManagement.Status;
                _iMSDbContext.DisciplinaryStatuses.Update(disciplinaryStatus);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { Message = "Disciplinary status updated successfully", HasError = false };
            }
        }

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var institutes = await _iMSDbContext.Institutes.Select(s=>s.Id).ToListAsync();
            foreach (var institute in institutes)
            {
                await SeedDisciplinaryStatusAsync(institute);
            }
        }
        #endregion
    }
}
