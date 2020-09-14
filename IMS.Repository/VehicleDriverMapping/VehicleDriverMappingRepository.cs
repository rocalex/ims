using IMS.DomainModel.ApplicationClasses.VehicleDriverMapping;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleDriverMapping
{
    public class VehicleDriverMappingRepository : IVehicleDriverMappingRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public VehicleDriverMappingRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add and update vehicle driver mapping - SS
        /// </summary>
        /// <param name="vehicleDriverMapping">vehicle driver detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleDriverMappingResponse> AddOrUpdateVehicleDriverMappingAsync(AddOrUpdateVehicleDriverMappingAc
            vehicleDriverMapping, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            if (!await _iMSDbContext.VehicleMasters.AnyAsync(x => x.InstituteId == instituteId && x.Id == vehicleDriverMapping.VehicleId))
                return new VehicleDriverMappingResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleDriverMappingResponseType.VehicleId };
            else
            {
                var driverIds = vehicleDriverMapping.Drivers.Select(x=>x.DriverId).Distinct().ToList();
                var studentCount = await _iMSDbContext.DriverMasters.CountAsync(x => x.InstituteId == instituteId &&
                driverIds.Contains(x.Id));
                if (driverIds.Count != studentCount)
                    return new VehicleDriverMappingResponse() { HasError = true, Message = "Driver not found", ErrorType = VehicleDriverMappingResponseType.DriverId };
                else
                {
                    var previous = await _iMSDbContext.VehicleDriverMappings.Where(x => x.VehicleId == vehicleDriverMapping.VehicleId).ToListAsync();
                    _iMSDbContext.VehicleDriverMappings.RemoveRange(previous);
                    await _iMSDbContext.SaveChangesAsync();
                    List<DomainModel.Models.VehicleDriverMapping> vehicleDriverMappings = new List<DomainModel.Models.VehicleDriverMapping>();
                    foreach (var driver in vehicleDriverMapping.Drivers)
                    {
                        vehicleDriverMappings.Add(new DomainModel.Models.VehicleDriverMapping()
                        {
                            CreatedOn = DateTime.UtcNow,
                            DriverId = driver.DriverId,
                            IsPrimary = driver.IsPrimary,
                            VehicleId = vehicleDriverMapping.VehicleId,
                            UpdatedById = loggedInUser.Id
                        });
                    }
                    _iMSDbContext.VehicleDriverMappings.AddRange(vehicleDriverMappings);
                    await _iMSDbContext.SaveChangesAsync();
                    return new VehicleDriverMappingResponse() { HasError = false, Message = "Vehicle driver detail updated successfully" };
                }
            }
        }

        /// <summary>
        /// Method to get driver list by vehicle id - SS
        /// </summary>
        /// <param name="vehicleId">vehicle id</param>
        /// <returns>driver list</returns>
        public async Task<List<DomainModel.Models.VehicleDriverMapping>> GetVehicleDriverMappingsAsync(int vehicleId)
        {
            var students = await _iMSDbContext.VehicleDriverMappings.Where(x => x.VehicleId == vehicleId).ToListAsync();
            return students;
        }
        #endregion
    }
}
