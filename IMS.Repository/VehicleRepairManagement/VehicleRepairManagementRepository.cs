using IMS.DomainModel.ApplicationClasses.VehicleRepairManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleRepairManagement
{
    public class VehicleRepairManagementRepository : IVehicleRepairManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public VehicleRepairManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add vehicle repair - SS
        /// </summary>
        /// <param name="addVehicleRepair">vehicle repair</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleRepairManagementResponse> AddVehicleRepairAsync(AddVehicleRepairManagementAc addVehicleRepair,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addVehicleRepair.Code.Trim()))
                return new VehicleRepairManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = VehicleRepairManagementResponseType.Code };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.Id == addVehicleRepair.VehicleId && x.InstituteId == instituteId))
                    return new VehicleRepairManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleRepairManagementResponseType.VehicleId };
                else
                {
                    if (await _iMSDbContext.VehicleRepairs.AnyAsync(x => x.Code.ToLowerInvariant() == addVehicleRepair.Code.ToLowerInvariant() && x.Vehicle.InstituteId == instituteId))
                        return new VehicleRepairManagementResponse() { HasError = true, Message = "Vehicle repair code already exist, Please use unique one", ErrorType = VehicleRepairManagementResponseType.Code };
                    else
                    {
                        var repair = new VehicleRepair()
                        {
                            Code = addVehicleRepair.Code,
                            CreatedOn = DateTime.UtcNow,
                            Remarks = addVehicleRepair.Remarks,
                            RepairCost = addVehicleRepair.RepairCost,
                            RepairDate = addVehicleRepair.RepairDate,
                            UpdatedById = loggedInUser.Id,
                            UpdatedOn = DateTime.UtcNow,
                            VehicleId = addVehicleRepair.VehicleId
                        };
                        _iMSDbContext.VehicleRepairs.Add(repair);
                        await _iMSDbContext.SaveChangesAsync();
                        return new VehicleRepairManagementResponse() { HasError = false, Message = "Vehicle repair added successfully" };
                    }
                }
            }
        }

        /// <summary>
        /// Method to get list of vehicle repairs - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of vehicle repairs</returns>
        public async Task<List<VehicleRepair>> GetVehicleRepairsAsync(int instituteId)
        {
            return await _iMSDbContext.VehicleRepairs.Include(s=>s.Vehicle).Where(x => x.Vehicle.InstituteId == instituteId).ToListAsync();
        }

        /// <summary>
        /// Method to update vehicle repair - SS
        /// </summary>
        /// <param name="updateVehicleRepair">vehicle repair</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleRepairManagementResponse> UpdateVehicleRepairAsync(UpdateVehicleRepairManagementAc updateVehicleRepair,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateVehicleRepair.Code.Trim()))
                return new VehicleRepairManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = VehicleRepairManagementResponseType.Code };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.Id == updateVehicleRepair.VehicleId && x.InstituteId == instituteId))
                    return new VehicleRepairManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleRepairManagementResponseType.VehicleId };
                else
                {
                    var repairs = await _iMSDbContext.VehicleRepairs.Where(x => x.Vehicle.InstituteId == instituteId && x.Id != updateVehicleRepair.Id).ToListAsync();
                    if (repairs.Any(x => x.Code.ToLowerInvariant() == updateVehicleRepair.Code.ToLowerInvariant()))
                        return new VehicleRepairManagementResponse() { HasError = true, Message = "Vehicle repair code already exist, Please use unique one", ErrorType = VehicleRepairManagementResponseType.Code };
                    else
                    {
                        var repair = await _iMSDbContext.VehicleRepairs.FirstOrDefaultAsync(x => x.Id == updateVehicleRepair.Id && x.Vehicle.InstituteId == instituteId);
                        if (repair == null)
                            return new VehicleRepairManagementResponse() { HasError = true, Message = "Vehicle repair not found", ErrorType = VehicleRepairManagementResponseType.Id };
                        else
                        {
                            repair.Code = updateVehicleRepair.Code;
                            repair.Remarks = updateVehicleRepair.Remarks;
                            repair.RepairCost = updateVehicleRepair.RepairCost;
                            repair.RepairDate = updateVehicleRepair.RepairDate;
                            repair.UpdatedById = loggedInUser.Id;
                            repair.UpdatedOn = DateTime.UtcNow;
                            repair.VehicleId = updateVehicleRepair.VehicleId;
                            _iMSDbContext.VehicleRepairs.Update(repair);
                            await _iMSDbContext.SaveChangesAsync();
                            return new VehicleRepairManagementResponse() { HasError = false, Message = "Vehicle repair updated successfully" };
                        }
                    }
                }
            }
        }
        #endregion
    }
}
