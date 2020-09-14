using IMS.DomainModel.ApplicationClasses.SectionManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.SectionManagement
{
    public class SectionManagementRepository : ISectionManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public SectionManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Section - SS
        /// </summary>
        /// <param name="name">name of Section</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddSectionAsync(AddSectionManagementAc addSection, int instituteId)
        {
            if (!await _iMSDbContext.Sections.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addSection.Code.ToLowerInvariant()))
            {
                var section = new Section()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addSection.Name,
                    Code = addSection.Code,
                    Description = addSection.Description,
                    Status = true
                };
                _iMSDbContext.Sections.Add(section);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Section added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Section with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of Section by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Section>> GetAllSectionAsync(int instiuteId)
        {
            return (await _iMSDbContext.Sections.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Section - SS
        /// </summary>
        /// <param name="updateSectionManagement">Section detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateSectionAsync(UpdateSectionManagementAc updateSectionManagement, int instituteId)
        {
            var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId && x.Id != updateSectionManagement.SectionId).ToListAsync();
            var isDuplicate = sections.Any(x => x.Code.ToLowerInvariant() == updateSectionManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of section. Please use unique code" };
            else
            {
                var section = await _iMSDbContext.Sections.FirstAsync(x => x.Id == updateSectionManagement.SectionId);
                section.Name = updateSectionManagement.Name;
                section.Code = updateSectionManagement.Code;
                section.Description = updateSectionManagement.Description;
                section.Status = updateSectionManagement.Status;
                _iMSDbContext.Sections.Update(section);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Section updated successfully" };
            }
        }
        #endregion
    }
}
