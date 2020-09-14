using EFCore.BulkExtensions;
using IMS.DomainModel.ApplicationClasses.LeaveTypeManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.LeaveTypeManagement
{
    public class LeaveTypeManagementRepository : ILeaveTypeManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public LeaveTypeManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Leave type - SS
        /// </summary>
        /// <param name="addLeaveType">leave type</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<LeaveTypeManagementResponse> AddLeaveType(AddLeaveTypeManagementAc addLeaveType, ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addLeaveType.Code.Trim()))
                return new LeaveTypeManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = LeaveTypeManagementResponseType.Code };
            else if (string.IsNullOrEmpty(addLeaveType.Name.Trim()))
                return new LeaveTypeManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = LeaveTypeManagementResponseType.Name };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var assignedToCount = await _iMSDbContext.UserInstituteMappings.CountAsync(x => addLeaveType.LeaveAssignedTos.Contains(x.UserId) && x.InstituteId == instituteId);
                if (assignedToCount != addLeaveType.LeaveAssignedTos.Count)
                    return new LeaveTypeManagementResponse() { HasError = true, Message = "User not found", ErrorType = LeaveTypeManagementResponseType.LeaveAssignedTos };
                else
                {
                    if (await _iMSDbContext.LeaveTypes.AnyAsync(x => x.InstituteId == instituteId &&
                     x.Code.ToLowerInvariant() == addLeaveType.Code.ToLowerInvariant()))
                        return new LeaveTypeManagementResponse() { HasError = true, Message = "Leave type with same code already exist. Please use unique one", ErrorType = LeaveTypeManagementResponseType.Code };
                    else
                    {
                        var leaveType = new LeaveType()
                        {
                            Code = addLeaveType.Code,
                            CreatedOn = DateTime.UtcNow,
                            Description = addLeaveType.Description,
                            InstituteId = instituteId,
                            LeaveAssignedTypeEnum = EnumHelperService.GetValueFromDescription<LeaveAssignedTypeEnum>(addLeaveType.LeaveAssignedTypeEnumDescription),
                            Name = addLeaveType.Name,
                            NumberOfAllowedLeave = addLeaveType.NumberOfAllowedLeave,
                            UpdatedById = loggedInUser.Id,
                            UpdatedOn = DateTime.UtcNow
                        };
                        _iMSDbContext.LeaveTypes.Add(leaveType);
                        await _iMSDbContext.SaveChangesAsync();
                        List<LeaveAssignedTo> assignedTos = new List<LeaveAssignedTo>();
                        foreach (var user in addLeaveType.LeaveAssignedTos)
                        {
                            assignedTos.Add(new LeaveAssignedTo()
                            {
                                CreatedOn = DateTime.UtcNow,
                                LeaveTypeId = leaveType.Id,
                                UserId = user
                            });
                        }
                        using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                        {
                            await _iMSDbContext.BulkInsertAsync(assignedTos);
                            db.Commit();
                        }
                        return new LeaveTypeManagementResponse() { HasError = false, Message = "Leave type added succesfully" };
                    }
                }
            }
        }

        /// <summary>
        /// Method to get list of leave types - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of leave types</returns>
        public async Task<List<LeaveType>> GetLeaveTypesAsync(int instituteId)
        {
            var list = await _iMSDbContext.LeaveTypes.Where(x => x.InstituteId == instituteId).ToListAsync();
            list.ForEach(x => x.LeaveAssignedTypeEnumDescription = EnumHelperService.GetDescription(x.LeaveAssignedTypeEnum));
            return list;
        }

        /// <summary>
        /// Method to update Leave type - SS
        /// </summary>
        /// <param name="updateLeaveType">leave type</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<LeaveTypeManagementResponse> UpdateLeaveType(UpdateLeaveTypeManagementAc updateLeaveType, ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateLeaveType.Code.Trim()))
                return new LeaveTypeManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = LeaveTypeManagementResponseType.Code };
            else if (string.IsNullOrEmpty(updateLeaveType.Name.Trim()))
                return new LeaveTypeManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = LeaveTypeManagementResponseType.Name };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var assignedToCount = await _iMSDbContext.UserInstituteMappings.CountAsync(x => updateLeaveType.LeaveAssignedTos.Contains(x.UserId) && x.InstituteId == instituteId);
                if (assignedToCount != updateLeaveType.LeaveAssignedTos.Count)
                    return new LeaveTypeManagementResponse() { HasError = true, Message = "User not found", ErrorType = LeaveTypeManagementResponseType.LeaveAssignedTos };
                else
                {
                    var types = await _iMSDbContext.LeaveTypes.Where(x => x.InstituteId == instituteId && x.Id != updateLeaveType.Id).ToListAsync();
                    if (types.Any(x => x.Code.ToLowerInvariant() == updateLeaveType.Code.ToLowerInvariant()))
                        return new LeaveTypeManagementResponse() { HasError = true, Message = "Leave type with same code already exist. Please use unique one", ErrorType = LeaveTypeManagementResponseType.Code };
                    else
                    {
                        var leaveType = await _iMSDbContext.LeaveTypes.FirstOrDefaultAsync(x => x.Id == updateLeaveType.Id && x.InstituteId == instituteId);
                        if (leaveType == null)
                            return new LeaveTypeManagementResponse() { HasError = true, Message = "Leave type not found", ErrorType = LeaveTypeManagementResponseType.Id };
                        else
                        {
                            leaveType.Code = updateLeaveType.Code;
                            leaveType.Description = updateLeaveType.Description;
                            leaveType.LeaveAssignedTypeEnum = EnumHelperService.GetValueFromDescription<LeaveAssignedTypeEnum>(updateLeaveType.LeaveAssignedTypeEnumDescription);
                            leaveType.Name = updateLeaveType.Name;
                            leaveType.NumberOfAllowedLeave = updateLeaveType.NumberOfAllowedLeave;
                            leaveType.UpdatedById = loggedInUser.Id;
                            leaveType.UpdatedOn = DateTime.UtcNow;
                            _iMSDbContext.LeaveTypes.Update(leaveType);
                            await _iMSDbContext.SaveChangesAsync();
                            var previous = await _iMSDbContext.LeaveAssignedTos.Where(x => x.LeaveTypeId == leaveType.Id).ToListAsync();
                            using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                            {
                                await _iMSDbContext.BulkDeleteAsync(previous);
                                db.Commit();
                            }
                            List<LeaveAssignedTo> assignedTos = new List<LeaveAssignedTo>();
                            foreach (var user in updateLeaveType.LeaveAssignedTos)
                            {
                                assignedTos.Add(new LeaveAssignedTo()
                                {
                                    CreatedOn = DateTime.UtcNow,
                                    LeaveTypeId = leaveType.Id,
                                    UserId = user
                                });
                            }
                            using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                            {
                                await _iMSDbContext.BulkInsertAsync(assignedTos);
                                db.Commit();
                            }
                            return new LeaveTypeManagementResponse() { HasError = false, Message = "Leave type updated succesfully" };
                        }
                    }
                }
            }
        }
        #endregion
    }
}
