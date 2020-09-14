using IMS.DomainModel.ApplicationClasses.VehicleMaintenanceManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleMaintenanceManagement
{
    public class VehicleMaintenanceManagementRepository : IVehicleMaintenanceManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public VehicleMaintenanceManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Vehicle Maintenance - SS
        /// </summary>
        /// <param name="addVehicleMaintenance">Vehicle Maintenance</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleMaintenanceManagementResponse> AddVehicleMaintenanceAsync(AddVehicleMaintenanceManagementAc
            addVehicleMaintenance, ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addVehicleMaintenance.Code.Trim()))
                return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = VehicleMaintenanceManagementResponseType.Code };
            else if (string.IsNullOrEmpty(addVehicleMaintenance.ActionTaken.Trim()))
                return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Action taken can't be empty", ErrorType = VehicleMaintenanceManagementResponseType.ActionTaken };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.InstituteId == instituteId && x.Id == addVehicleMaintenance.VehicleId))
                    return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleMaintenanceManagementResponseType.VehicleId };
                else
                {
                    if (await _iMSDbContext.VehicleMaintenances.AnyAsync(x => x.Code.ToLowerInvariant() == addVehicleMaintenance.Code.ToLowerInvariant() && x.Vehicle.InstituteId == instituteId))
                        return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Vehicle maintenance code already exist. Please unique one", ErrorType = VehicleMaintenanceManagementResponseType.Code };
                    else
                    {
                        var maintenance = new VehicleMaintenance()
                        {
                            ActionTaken = addVehicleMaintenance.ActionTaken,
                            Code = addVehicleMaintenance.Code,
                            CreatedOn = DateTime.UtcNow,
                            EstimateCost = addVehicleMaintenance.EstimateCost,
                            MaintenanceDate = addVehicleMaintenance.MaintenanceDate,
                            MaintenanceDoneBy = addVehicleMaintenance.MaintenanceDoneBy,
                            NextMaintenanceDate = addVehicleMaintenance.NextMaintenanceDate,
                            Remark = addVehicleMaintenance.Remark,
                            UpdatedById = loggedInUser.Id,
                            UpdatedOn = DateTime.UtcNow,
                            VehicleId = addVehicleMaintenance.VehicleId
                        };
                        _iMSDbContext.VehicleMaintenances.Add(maintenance);
                        await _iMSDbContext.SaveChangesAsync();
                        return new VehicleMaintenanceManagementResponse() { HasError = false, Message = "Vehicle maintenance added successfully" };
                    }
                }
            }
        }

        /// <summary>
        /// Method to get list of Vehicle Maintenances - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of Vehicle Maintenances</returns>
        public async Task<List<VehicleMaintenance>> GetVehicleMaintenancesAsync(int instituteId)
        {
            return await _iMSDbContext.VehicleMaintenances.Include(s=>s.Vehicle).Where(x => x.Vehicle.InstituteId == instituteId).ToListAsync();
        }

        /// <summary>
        /// Method to update Vehicle Maintenance - SS
        /// </summary>
        /// <param name="updateVehicleMaintenance">Vehicle Maintenance</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleMaintenanceManagementResponse> UpdateVehicleMaintenanceAsync(UpdateVehicleMaintenanceManagementAc
            updateVehicleMaintenance, ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateVehicleMaintenance.Code.Trim()))
                return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = VehicleMaintenanceManagementResponseType.Code };
            else if (string.IsNullOrEmpty(updateVehicleMaintenance.ActionTaken.Trim()))
                return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Action taken can't be empty", ErrorType = VehicleMaintenanceManagementResponseType.ActionTaken };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.InstituteId == instituteId && x.Id == updateVehicleMaintenance.VehicleId))
                    return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleMaintenanceManagementResponseType.VehicleId };
                else
                {
                    var maintenances = await _iMSDbContext.VehicleMaintenances.Where(x => x.Vehicle.InstituteId == instituteId && x.Id != updateVehicleMaintenance.Id).ToListAsync();
                    if (maintenances.Any(x => x.Code.ToLowerInvariant() == updateVehicleMaintenance.Code.ToLowerInvariant()))
                        return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Vehicle maintenance code already exist. Please unique one", ErrorType = VehicleMaintenanceManagementResponseType.Code };
                    else
                    {
                        var maintenance = await _iMSDbContext.VehicleMaintenances.FirstOrDefaultAsync(x => x.Id == updateVehicleMaintenance.Id && x.Vehicle.InstituteId == instituteId);
                        if (maintenance == null)
                            return new VehicleMaintenanceManagementResponse() { HasError = true, Message = "Vehicle maintenance not found", ErrorType = VehicleMaintenanceManagementResponseType.Id };
                        else
                        {
                            maintenance.ActionTaken = updateVehicleMaintenance.ActionTaken;
                            maintenance.Code = updateVehicleMaintenance.Code;
                            maintenance.EstimateCost = updateVehicleMaintenance.EstimateCost;
                            maintenance.MaintenanceDate = updateVehicleMaintenance.MaintenanceDate;
                            maintenance.MaintenanceDoneBy = updateVehicleMaintenance.MaintenanceDoneBy;
                            maintenance.NextMaintenanceDate = updateVehicleMaintenance.NextMaintenanceDate;
                            maintenance.Remark = updateVehicleMaintenance.Remark;
                            maintenance.UpdatedById = loggedInUser.Id;
                            maintenance.UpdatedOn = DateTime.UtcNow;
                            maintenance.VehicleId = updateVehicleMaintenance.VehicleId;
                            _iMSDbContext.VehicleMaintenances.Update(maintenance);
                            await _iMSDbContext.SaveChangesAsync();
                            return new VehicleMaintenanceManagementResponse() { HasError = false, Message = "Vehicle maintenance updated successfully" };
                        }
                    }
                }
            }
        }
        #endregion
    }
}
