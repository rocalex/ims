using IMS.DomainModel.ApplicationClasses.InstituteSubjectManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteSubjectManagement
{
    public class InstituteSubjectManagementRepository : IInstituteSubjectManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public InstituteSubjectManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add institute subject - SS
        /// </summary>
        /// <param name="addInstituteSubject">subject detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<InstituteSubjectResponse> AddInstituteSubjectAsync(AddInstituteSubjectManagementAc addInstituteSubject, int instituteId)
        {
            if (!await _iMSDbContext.InstituteSubjects.AnyAsync(x => x.InstituteId == instituteId
            && x.Code.ToLowerInvariant() == addInstituteSubject.Code.ToLowerInvariant()))
            {
                var instituteSubject = new InstituteSubject()
                {
                    CreatedOn = DateTime.UtcNow,
                    Code = addInstituteSubject.Code,
                    InstituteId = instituteId,
                    IsGroup = addInstituteSubject.IsGroup,
                    Name = addInstituteSubject.Name,
                    Description = addInstituteSubject.Description
                };
                _iMSDbContext.InstituteSubjects.Add(instituteSubject);
                await _iMSDbContext.SaveChangesAsync();
                return new InstituteSubjectResponse() { HasError = false, Message = "Subject added successfully" };
            }
            else
                return new InstituteSubjectResponse() { HasError = true, Message = "Subject code already exist", ErrorType = InstituteSubjectResponseType.Code };
        }

        /// <summary>
        /// Method to get all institute subjects by institute id - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of subjects</returns>
        public async Task<List<InstituteSubject>> GetAllInstituteSubjectsAsync(int instituteId)
        {
            return (await _iMSDbContext.InstituteSubjects.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update subject - SS
        /// </summary>
        /// <param name="updateInstituteSubject">subject detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<InstituteSubjectResponse> UpdateInstituteSubjectAsync(UpdateInstituteSubjectManagementAc updateInstituteSubject, int instituteId)
        {
            var subjects = await _iMSDbContext.InstituteSubjects.Where(x => x.InstituteId == instituteId && x.Id != updateInstituteSubject.Id).ToListAsync();
            var isDuplicate = subjects.Any(x => x.Code.ToLowerInvariant() == updateInstituteSubject.Code.ToLowerInvariant());
            if (isDuplicate)
                return new InstituteSubjectResponse() { HasError = true, Message = "Duplicate subject code. Please use unique subject code", ErrorType = InstituteSubjectResponseType.Code };
            else
            {
                var instituteSubject = await _iMSDbContext.InstituteSubjects.FirstAsync(x => x.Id == updateInstituteSubject.Id);
                instituteSubject.Code = updateInstituteSubject.Code;
                instituteSubject.IsGroup = updateInstituteSubject.IsGroup;
                instituteSubject.Name = updateInstituteSubject.Name;
                instituteSubject.Description = updateInstituteSubject.Description;
                _iMSDbContext.InstituteSubjects.Update(instituteSubject);
                await _iMSDbContext.SaveChangesAsync();
                return new InstituteSubjectResponse() { HasError = false, Message = "Subject updated successfully" };
            }
        }
        #endregion
    }
}
