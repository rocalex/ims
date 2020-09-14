using IMS.DomainModel.ApplicationClasses.VehicleBreakDownManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleBreakDownManagement
{
    public class VehicleBreakDownManagementRepository : IVehicleBreakDownManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public VehicleBreakDownManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add vehicle break down - SS
        /// </summary>
        /// <param name="addVehicleBreakDown">vehicle break down</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleBreakDownManagementResponse> AddVehicleBreakDownAsync(AddVehicleBreakDownManagementAc addVehicleBreakDown,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addVehicleBreakDown.Code.Trim()))
                return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = VehicleBreakDownManagementResponseType.Code };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.Id == addVehicleBreakDown.VehicleId && x.InstituteId == instituteId))
                    return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleBreakDownManagementResponseType.VehicleId };
                else
                {
                    if (!await _iMSDbContext.DriverMasters.AnyAsync(x => x.Id == addVehicleBreakDown.DriverId && x.InstituteId == instituteId))
                        return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Driver not found", ErrorType = VehicleBreakDownManagementResponseType.DriverId };
                    else
                    {
                        if (await _iMSDbContext.VehicleBreakDowns.AnyAsync(x => x.Code.ToLowerInvariant() == addVehicleBreakDown.Code.ToLowerInvariant() && x.Vehicle.InstituteId == instituteId))
                            return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Vehicle break down code already exist. Please use unique one", ErrorType = VehicleBreakDownManagementResponseType.Code };
                        else
                        {
                            var BreakDown = new VehicleBreakDown()
                            {
                                BreakDownDate = addVehicleBreakDown.BreakDownDate,
                                Address = addVehicleBreakDown.Address,
                                Code = addVehicleBreakDown.Code,
                                CreatedOn = DateTime.UtcNow,
                                DriverId = addVehicleBreakDown.DriverId,
                                BreakDownDuration = addVehicleBreakDown.BreakDownDuration,
                                UpdatedById = loggedInUser.Id,
                                UpdatedOn = DateTime.UtcNow,
                                VehicleId = addVehicleBreakDown.VehicleId
                            };
                            _iMSDbContext.VehicleBreakDowns.Add(BreakDown);
                            await _iMSDbContext.SaveChangesAsync();
                            return new VehicleBreakDownManagementResponse() { HasError = false, Message = "Vehicle break down added successfully" };
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Method to get list of vehicle break down - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of vehicle break down</returns>
        public async Task<List<VehicleBreakDown>> GetVehicleBreakDownsAsync(int instituteId)
        {
            return await _iMSDbContext.VehicleBreakDowns.Include(s => s.Driver).Include(s => s.Vehicle).Where(x => x.Vehicle.InstituteId == instituteId).ToListAsync();
        }

        /// <summary>
        /// Method to update vehicle break down - SS
        /// </summary>
        /// <param name="addVehicleBreakDown">vehicle break down</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleBreakDownManagementResponse> UpdateVehicleBreakDownAsync(UpdateVehicleBreakDownManagementAc updateVehicleBreakDown,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateVehicleBreakDown.Code.Trim()))
                return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = VehicleBreakDownManagementResponseType.Code };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.Id == updateVehicleBreakDown.VehicleId && x.InstituteId == instituteId))
                    return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleBreakDownManagementResponseType.VehicleId };
                else
                {
                    if (!await _iMSDbContext.DriverMasters.AnyAsync(x => x.Id == updateVehicleBreakDown.DriverId && x.InstituteId == instituteId))
                        return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Driver not found", ErrorType = VehicleBreakDownManagementResponseType.DriverId };
                    else
                    {
                        var BreakDowns = await _iMSDbContext.VehicleBreakDowns.Where(x => x.Vehicle.InstituteId == instituteId && x.Id != updateVehicleBreakDown.Id).ToListAsync();
                        if (BreakDowns.Any(x => x.Code.ToLowerInvariant() == updateVehicleBreakDown.Code.ToLowerInvariant()))
                            return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Vehicle break down code already exist. Please use unique one", ErrorType = VehicleBreakDownManagementResponseType.Code };
                        else
                        {
                            var BreakDown = await _iMSDbContext.VehicleBreakDowns.FirstOrDefaultAsync(x => x.Id == updateVehicleBreakDown.Id && x.Vehicle.InstituteId == instituteId);
                            if (BreakDown == null)
                                return new VehicleBreakDownManagementResponse() { HasError = true, Message = "Vehicle break down not found", ErrorType = VehicleBreakDownManagementResponseType.Id };
                            else
                            {
                                BreakDown.BreakDownDate = updateVehicleBreakDown.BreakDownDate;
                                BreakDown.Address = updateVehicleBreakDown.Address;
                                BreakDown.Code = updateVehicleBreakDown.Code;
                                BreakDown.DriverId = updateVehicleBreakDown.DriverId;
                                BreakDown.BreakDownDuration = updateVehicleBreakDown.BreakDownDuration;
                                BreakDown.UpdatedById = loggedInUser.Id;
                                BreakDown.UpdatedOn = DateTime.UtcNow;
                                BreakDown.VehicleId = updateVehicleBreakDown.VehicleId;
                                _iMSDbContext.VehicleBreakDowns.Update(BreakDown);
                                await _iMSDbContext.SaveChangesAsync();
                                return new VehicleBreakDownManagementResponse() { HasError = false, Message = "Vehicle break down updated successfully" };
                            }
                        }
                    }
                }
            }
        }
        #endregion
    }
}
