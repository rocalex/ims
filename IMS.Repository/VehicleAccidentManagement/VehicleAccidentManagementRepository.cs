using IMS.DomainModel.ApplicationClasses.VehicleAccidentManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleAccidentManagement
{
    public class VehicleAccidentManagementRepository : IVehicleAccidentManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public VehicleAccidentManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add vehicle accident - SS
        /// </summary>
        /// <param name="addVehicleAccident">vehicle accident</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleAccidentManagementResponse> AddVehicleAccidentAsync(AddVehicleAccidentManagementAc addVehicleAccident,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addVehicleAccident.Code.Trim()))
                return new VehicleAccidentManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = VehicleAccidentManagementResponseType.Code };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.Id == addVehicleAccident.VehicleId && x.InstituteId == instituteId))
                    return new VehicleAccidentManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleAccidentManagementResponseType.VehicleId };
                else
                {
                    if (!await _iMSDbContext.DriverMasters.AnyAsync(x => x.Id == addVehicleAccident.DriverId && x.InstituteId == instituteId))
                        return new VehicleAccidentManagementResponse() { HasError = true, Message = "Driver not found", ErrorType = VehicleAccidentManagementResponseType.DriverId };
                    else
                    {
                        if (await _iMSDbContext.VehicleAccidents.AnyAsync(x => x.Code.ToLowerInvariant() == addVehicleAccident.Code.ToLowerInvariant() && x.Vehicle.InstituteId == instituteId))
                            return new VehicleAccidentManagementResponse() { HasError = true, Message = "Vehicle accident code already exist. Please use unique one", ErrorType = VehicleAccidentManagementResponseType.Code };
                        else
                        {
                            var accident = new VehicleAccident()
                            {
                                AccidentDate = addVehicleAccident.AccidentDate,
                                Address = addVehicleAccident.Address,
                                Code = addVehicleAccident.Code,
                                CreatedOn = DateTime.UtcNow,
                                DriverId = addVehicleAccident.DriverId,
                                EstimateCost = addVehicleAccident.EstimateCost,
                                UpdatedById = loggedInUser.Id,
                                UpdatedOn = DateTime.UtcNow,
                                VehicleId = addVehicleAccident.VehicleId
                            };
                            _iMSDbContext.VehicleAccidents.Add(accident);
                            await _iMSDbContext.SaveChangesAsync();
                            return new VehicleAccidentManagementResponse() { HasError = false, Message = "Vehicle accident added successfully" };
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Method to get list of vehicle accidents - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of vehicle accidents</returns>
        public async Task<List<VehicleAccident>> GetVehicleAccidentsAsync(int instituteId)
        {
            return await _iMSDbContext.VehicleAccidents.Include(s => s.Driver).Include(s => s.Vehicle).Where(x => x.Vehicle.InstituteId == instituteId).ToListAsync();
        }

        /// <summary>
        /// Method to update vehicle accident - SS
        /// </summary>
        /// <param name="addVehicleAccident">vehicle accident</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleAccidentManagementResponse> UpdateVehicleAccidentAsync(UpdateVehicleAccidentManagementAc updateVehicleAccident,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateVehicleAccident.Code.Trim()))
                return new VehicleAccidentManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = VehicleAccidentManagementResponseType.Code };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.Id == updateVehicleAccident.VehicleId && x.InstituteId == instituteId))
                    return new VehicleAccidentManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleAccidentManagementResponseType.VehicleId };
                else
                {
                    if (!await _iMSDbContext.DriverMasters.AnyAsync(x => x.Id == updateVehicleAccident.DriverId && x.InstituteId == instituteId))
                        return new VehicleAccidentManagementResponse() { HasError = true, Message = "Driver not found", ErrorType = VehicleAccidentManagementResponseType.DriverId };
                    else
                    {
                        var accidents = await _iMSDbContext.VehicleAccidents.Where(x => x.Vehicle.InstituteId == instituteId && x.Id != updateVehicleAccident.Id).ToListAsync();
                        if (accidents.Any(x => x.Code.ToLowerInvariant() == updateVehicleAccident.Code.ToLowerInvariant()))
                            return new VehicleAccidentManagementResponse() { HasError = true, Message = "Vehicle accident code already exist. Please use unique one", ErrorType = VehicleAccidentManagementResponseType.Code };
                        else
                        {
                            var accident = await _iMSDbContext.VehicleAccidents.FirstOrDefaultAsync(x => x.Id == updateVehicleAccident.Id && x.Vehicle.InstituteId == instituteId);
                            if (accident == null)
                                return new VehicleAccidentManagementResponse() { HasError = true, Message = "Vehicle accident not found", ErrorType = VehicleAccidentManagementResponseType.Id };
                            else
                            {
                                accident.AccidentDate = updateVehicleAccident.AccidentDate;
                                accident.Address = updateVehicleAccident.Address;
                                accident.Code = updateVehicleAccident.Code;
                                accident.DriverId = updateVehicleAccident.DriverId;
                                accident.EstimateCost = updateVehicleAccident.EstimateCost;
                                accident.UpdatedById = loggedInUser.Id;
                                accident.UpdatedOn = DateTime.UtcNow;
                                accident.VehicleId = updateVehicleAccident.VehicleId;
                                _iMSDbContext.VehicleAccidents.Update(accident);
                                await _iMSDbContext.SaveChangesAsync();
                                return new VehicleAccidentManagementResponse() { HasError = false, Message = "Vehicle accident updated successfully" };
                            }
                        }
                    }
                }
            }
        }
        #endregion
    }
}
