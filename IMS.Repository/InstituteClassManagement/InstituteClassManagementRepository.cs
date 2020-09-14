using IMS.DomainModel.ApplicationClasses.InstituteClassManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteClassManagement
{
    public class InstituteClassManagementRepository : IInstituteClassManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public InstituteClassManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add institute class - SS
        /// </summary>
        /// <param name="addInstituteClass">class detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<InstituteClassResponse> AddInstituteClassAsync(AddInstituteClassManagementAc addInstituteClass, int instituteId)
        {
            if (!await _iMSDbContext.InstituteClasses.AnyAsync(x => x.InstituteId == instituteId
            && x.GroupCode.ToLowerInvariant() == addInstituteClass.GroupCode.ToLowerInvariant()))
            {
                if (!await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.Id == addInstituteClass.ClassTeacherId
                 && x.InstituteId == instituteId))
                    return new InstituteClassResponse() { HasError = true, Message = "Staff teacher not found", ErrorType = InstituteClassResponseType.ClassTeacherId };
                else
                {
                    var instituteClass = new InstituteClass()
                    {
                        ClassOrder = addInstituteClass.ClassOrder,
                        CreatedOn = DateTime.UtcNow,
                        Duration = addInstituteClass.Duration,
                        DurationUnit = addInstituteClass.DurationUnit,
                        GroupCode = addInstituteClass.GroupCode,
                        InstituteId = instituteId,
                        IsGroup = addInstituteClass.IsGroup,
                        Name = addInstituteClass.Name,
                        NumberOfFeeTerms = addInstituteClass.NumberOfFeeTerms,
                        ClassTeacherId = addInstituteClass.ClassTeacherId
                    };
                    _iMSDbContext.InstituteClasses.Add(instituteClass);
                    await _iMSDbContext.SaveChangesAsync();
                    return new InstituteClassResponse() { HasError = false, Message = "Class added successfully" };
                }
            }
            else
                return new InstituteClassResponse() { HasError = true, Message = "Group code already exist", ErrorType = InstituteClassResponseType.GroupCode };
        }

        /// <summary>
        /// Method to get all institute classes by institute id - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of classes</returns>
        public async Task<List<InstituteClass>> GetAllInstituteClassesAsync(int instituteId)
        {
            return (await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update class - SS
        /// </summary>
        /// <param name="updateInstituteClass">class detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<InstituteClassResponse> UpdateInstituteClassAsync(UpdateInstituteClassManagementAc updateInstituteClass, int instituteId)
        {
            var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId && x.Id != updateInstituteClass.Id).ToListAsync();
            var isDuplicate = classes.Any(x => x.GroupCode.ToLowerInvariant() == updateInstituteClass.GroupCode.ToLowerInvariant());
            if (isDuplicate)
                return new InstituteClassResponse() { HasError = true, Message = "Duplicate group code. Please use unique group code", ErrorType = InstituteClassResponseType.GroupCode };
            else
            {
                if (!await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.Id == updateInstituteClass.ClassTeacherId
                 && x.InstituteId == instituteId))
                    return new InstituteClassResponse() { HasError = true, Message = "Staff teacher not found", ErrorType = InstituteClassResponseType.ClassTeacherId };
                else
                {
                    var instituteClass = await _iMSDbContext.InstituteClasses.FirstAsync(x => x.Id == updateInstituteClass.Id);
                    instituteClass.ClassOrder = updateInstituteClass.ClassOrder;
                    instituteClass.Duration = updateInstituteClass.Duration;
                    instituteClass.DurationUnit = updateInstituteClass.DurationUnit;
                    instituteClass.GroupCode = updateInstituteClass.GroupCode;
                    instituteClass.IsGroup = updateInstituteClass.IsGroup;
                    instituteClass.Name = updateInstituteClass.Name;
                    instituteClass.NumberOfFeeTerms = updateInstituteClass.NumberOfFeeTerms;
                    instituteClass.ClassTeacherId = updateInstituteClass.ClassTeacherId;
                    _iMSDbContext.InstituteClasses.Update(instituteClass);
                    await _iMSDbContext.SaveChangesAsync();
                    return new InstituteClassResponse() { HasError = false, Message = "Class updated successfully" };
                }
            }
        }
        #endregion
    }
}
