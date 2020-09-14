using EFCore.BulkExtensions;
using IMS.DomainModel.ApplicationClasses.DisciplinaryManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.DisciplinaryManagement
{
    public class DisciplinaryManagementRepository : IDisciplinaryManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public DisciplinaryManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add disciplinary - SS
        /// </summary>
        /// <param name="addDisciplinary">disciplinary</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<DisciplinaryManagementResponse> AddDisciplinaryAsync(AddDisciplinaryManagementAc addDisciplinary,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addDisciplinary.Subject.Trim()))
                return new DisciplinaryManagementResponse() { HasError = true, Message = "Subject can't be empty", ErrorType = DisciplinaryManagementResponseType.Subject };
            else if (string.IsNullOrEmpty(addDisciplinary.Description.Trim()))
                return new DisciplinaryManagementResponse() { HasError = true, Message = "Description can't be empty", ErrorType = DisciplinaryManagementResponseType.Description };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var studentsCount = await _iMSDbContext.StudentBasicInformation.CountAsync(x => addDisciplinary.StudentIds
                .Contains(x.Id) && x.InstituteId == instituteId);
                if (studentsCount != addDisciplinary.StudentIds.Count)
                    return new DisciplinaryManagementResponse() { HasError = true, Message = "Student not found", ErrorType = DisciplinaryManagementResponseType.StudentId };
                else
                {
                    if (!await _iMSDbContext.DisciplinaryStatuses.AnyAsync(x => x.InstituteId == instituteId && x.Id == addDisciplinary.StatusId))
                        return new DisciplinaryManagementResponse() { HasError = true, Message = "Status not found", ErrorType = DisciplinaryManagementResponseType.StatusId };
                    else
                    {
                        List<Disciplinary> disciplinaries = new List<Disciplinary>();
                        foreach (var studentId in addDisciplinary.StudentIds)
                        {
                            disciplinaries.Add(new Disciplinary()
                            {
                                CreatedOn = DateTime.UtcNow,
                                Date = addDisciplinary.Date,
                                Description = addDisciplinary.Description,
                                Remarks = addDisciplinary.Remarks,
                                StatusId = addDisciplinary.StatusId,
                                StudentId = studentId,
                                Subject = addDisciplinary.Subject,
                                UpdatedById = loggedInUser.Id,
                                UpdatedOn = DateTime.UtcNow
                            });
                        }
                        using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                        {
                            await _iMSDbContext.BulkInsertAsync(disciplinaries);
                            db.Commit();
                        }
                        return new DisciplinaryManagementResponse() { HasError = false, Message = "Disciplinary added successfully", Data = disciplinaries.Select(s => s.Id) };
                    }
                }
            }
        }

        /// <summary>
        /// Method to get disciplinaries - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of disciplinaries</returns>
        public async Task<List<Disciplinary>> GetDisciplinariesAsync(int instituteId)
        {
            return await _iMSDbContext.Disciplinaries.Include(s=>s.Student).Include(s => s.Status)
                .Where(x => x.Student.InstituteId == instituteId).ToListAsync();
        }

        /// <summary>
        /// Method to update disciplinary - SS
        /// </summary>
        /// <param name="updateDisciplinary">disciplinary</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<DisciplinaryManagementResponse> UpdateDisciplinaryAsync(UpdateDisciplinaryManagementAc updateDisciplinary,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateDisciplinary.Subject.Trim()))
                return new DisciplinaryManagementResponse() { HasError = true, Message = "Subject can't be empty", ErrorType = DisciplinaryManagementResponseType.Subject };
            else if (string.IsNullOrEmpty(updateDisciplinary.Description.Trim()))
                return new DisciplinaryManagementResponse() { HasError = true, Message = "Description can't be empty", ErrorType = DisciplinaryManagementResponseType.Description };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.DisciplinaryStatuses.AnyAsync(x => x.InstituteId == instituteId && x.Id == updateDisciplinary.StatusId))
                    return new DisciplinaryManagementResponse() { HasError = true, Message = "Status not found", ErrorType = DisciplinaryManagementResponseType.StatusId };
                else
                {
                    var disciplinary = await _iMSDbContext.Disciplinaries.FirstOrDefaultAsync(x => x.Id == updateDisciplinary.Id && x.Student.InstituteId == instituteId);
                    if (disciplinary == null)
                        return new DisciplinaryManagementResponse() { HasError = true, Message = "Disciplinary not found", ErrorType = DisciplinaryManagementResponseType.Id };
                    else
                    {
                        disciplinary.CreatedOn = DateTime.UtcNow;
                        disciplinary.Date = updateDisciplinary.Date;
                        disciplinary.Description = updateDisciplinary.Description;
                        disciplinary.Remarks = updateDisciplinary.Remarks;
                        disciplinary.StatusId = updateDisciplinary.StatusId;
                        disciplinary.Subject = updateDisciplinary.Subject;
                        disciplinary.UpdatedById = loggedInUser.Id;
                        disciplinary.UpdatedOn = DateTime.UtcNow;
                        _iMSDbContext.Disciplinaries.Update(disciplinary);
                        await _iMSDbContext.SaveChangesAsync();
                        return new DisciplinaryManagementResponse() { HasError = false, Message = "Disciplinary updated successfully" };
                    }
                }
            }
        }
        #endregion
    }
}
