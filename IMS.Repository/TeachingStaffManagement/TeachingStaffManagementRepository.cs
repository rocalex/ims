using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.TeachingStaffManagementManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.TeachingStaffManagement
{
    public class TeachingStaffManagementRepository : ITeachingStaffManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly List<string> staffs = new List<string>() { "Contract", "Temporary", "Permanent" };
        #endregion

        #region Constructor
        public TeachingStaffManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to seed data for institute - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        public async Task SeedTeachingStaffAsync(int instituteId)
        {
            List<TeachingStaff> teachingStaffs = new List<TeachingStaff>();
            foreach (var item in staffs)
            {
                if (!await _iMSDbContext.TeachingStaffs.AnyAsync(c => c.Code.ToLowerInvariant() == item.ToLowerInvariant() && c.InstituteId == instituteId))
                {
                    teachingStaffs.Add(new TeachingStaff()
                    {
                        Code = item,
                        CreatedOn = DateTime.UtcNow,
                        Description = item,
                        InstituteId = instituteId,
                        Name = item,
                        Status = true
                    });
                }
            }
            _iMSDbContext.TeachingStaffs.AddRange(teachingStaffs);
            await _iMSDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method to get teaching staffs - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of teaching staffs</returns>
        public async Task<List<TeachingStaff>> GetAllTeachingStaffsAsync(int instituteId)
        {
            return (await _iMSDbContext.TeachingStaffs.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to add TeachingStaff - SS
        /// </summary>
        /// <param name="name">name of TeachingStaff</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddTeachingStaffAsync(AddTeachingStaffManagementAc addTeachingStaff, int instituteId)
        {
            if (!await _iMSDbContext.TeachingStaffs.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addTeachingStaff.Code.ToLowerInvariant()))
            {
                var TeachingStaff = new TeachingStaff()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addTeachingStaff.Name,
                    Code = addTeachingStaff.Code,
                    Description = addTeachingStaff.Description,
                    Status = true
                };
                _iMSDbContext.TeachingStaffs.Add(TeachingStaff);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Teaching staff added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Teaching staff with the same name is already exist" };
        }

        /// <summary>
        /// Method to update TeachingStaff - SS
        /// </summary>
        /// <param name="updateTeachingStaffManagement">TeachingStaff detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateTeachingStaffAsync(UpdateTeachingStaffManagementAc updateTeachingStaffManagement, int instituteId)
        {
            var teachingStaffs = await _iMSDbContext.TeachingStaffs.Where(x => x.InstituteId == instituteId && x.Id != updateTeachingStaffManagement.TeachingStaffId).ToListAsync();
            var isDuplicate = teachingStaffs.Any(x => x.Code.ToLowerInvariant() == updateTeachingStaffManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of teaching staff. Please use unique code" };
            else
            {
                var teachingStaff = await _iMSDbContext.TeachingStaffs.FirstAsync(x => x.Id == updateTeachingStaffManagement.TeachingStaffId);
                teachingStaff.Name = updateTeachingStaffManagement.Name;
                teachingStaff.Code = updateTeachingStaffManagement.Code;
                teachingStaff.Description = updateTeachingStaffManagement.Description;
                _iMSDbContext.TeachingStaffs.Update(teachingStaff);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Teaching staff updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var instituteIds = await _iMSDbContext.Institutes.Select(s => s.Id).ToListAsync();
            foreach (var id in instituteIds)
            {
                await SeedTeachingStaffAsync(id);
            }
        }
        #endregion
    }
}
