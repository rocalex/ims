using EFCore.BulkExtensions;
using IMS.DomainModel.ApplicationClasses.DriverMasterManagement;
using IMS.DomainModel.ApplicationClasses.VehicleMasterManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.ImageStorageHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.DriverMasterManagement
{
    public class DriverMasterManagementRepository : IDriverMasterManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly IImageStorageHelperService _imageStorageHelperService;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public DriverMasterManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IImageStorageHelperService imageStorageHelperService, UserManager<ApplicationUser> userManager)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _imageStorageHelperService = imageStorageHelperService;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)

        /// <summary>
        /// Method to add driver - SS
        /// </summary>
        /// <param name="addDriverMaster">driver detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<DriverMasterManagementResponse> AddDriverMasterAsync(AddDriverMasterManagementAc addDriverMaster,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addDriverMaster.Name) && string.IsNullOrEmpty(addDriverMaster.Name.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "Name can't be empty", ErrorType = DriverMasterManagementResponseType.Name };
            else if (string.IsNullOrEmpty(addDriverMaster.MobileNumber) && string.IsNullOrEmpty(addDriverMaster.MobileNumber.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "Mobile number can't be empty", ErrorType = DriverMasterManagementResponseType.MobileNumber };
            else if (string.IsNullOrEmpty(addDriverMaster.LicenseNumber) && string.IsNullOrEmpty(addDriverMaster.LicenseNumber.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "License number can't be empty", ErrorType = DriverMasterManagementResponseType.LicenseNumber };
            else if (string.IsNullOrEmpty(addDriverMaster.LicenseType) && string.IsNullOrEmpty(addDriverMaster.LicenseType.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "License type can't be empty", ErrorType = DriverMasterManagementResponseType.LicenseType };
            else if (string.IsNullOrEmpty(addDriverMaster.PlaceOfIssue) && string.IsNullOrEmpty(addDriverMaster.PlaceOfIssue.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "Place of issue can't be empty", ErrorType = DriverMasterManagementResponseType.PlaceOfIssue };
            else if (string.IsNullOrEmpty(addDriverMaster.IssuingAuthority) && string.IsNullOrEmpty(addDriverMaster.IssuingAuthority.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "Issuing authority can't be empty", ErrorType = DriverMasterManagementResponseType.IssuingAuthority };
            else
            {
                var user = await _userManager.FindByNameAsync(addDriverMaster.MobileNumber);
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                bool isUserExist = false;
                if (user != null)
                    isUserExist = await _iMSDbContext.DriverMasters.AnyAsync(x => x.UserId == user.Id && x.InstituteId == instituteId);
                if (isUserExist)
                    return new DriverMasterManagementResponse() { HasError = true, Message = "Driver with this mobile number already exist", ErrorType = DriverMasterManagementResponseType.MobileNumber };
                else
                {
                    #region Add User
                    if (user == null)
                    {
                        var password = "itech1@3";
                        user = new ApplicationUser()
                        {
                            CreatedBy = loggedInUser.Id,
                            CreatedOn = DateTime.UtcNow,
                            UserName = addDriverMaster.MobileNumber,
                            Name = addDriverMaster.Name,
                            UpdatedOn = DateTime.UtcNow,
                            UpdatedBy = loggedInUser.Id
                        };
                        await _userManager.CreateAsync(user, password);
                    }
                    else
                    {
                        if (await _iMSDbContext.Institutes.AnyAsync(x => x.Id == instituteId && x.AdminId == user.Id))
                            return new DriverMasterManagementResponse() { HasError = true, ErrorType = DriverMasterManagementResponseType.MobileNumber, Message = "Monile number is already linked up with admin. Admin can't be driver" };
                    }
                    _iMSDbContext.UserInstituteMappings.Add(new UserInstituteMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        InstituteId = instituteId,
                        IsActive = false,
                        UserId = user.Id
                    });
                    await _iMSDbContext.SaveChangesAsync();
                    #endregion

                    #region Add Driver
                    var driver = new DriverMaster()
                    {
                        Address = addDriverMaster.Address,
                        CreatedOn = DateTime.UtcNow,
                        DateOfBirth = addDriverMaster.DateOfBirth,
                        DateOfIssue = addDriverMaster.DateOfIssue,
                        InstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true),
                        IsDriver = addDriverMaster.IsDriver,
                        IssuingAuthority = addDriverMaster.IssuingAuthority,
                        LicenseNumber = addDriverMaster.LicenseNumber,
                        LicenseType = addDriverMaster.LicenseType,
                        MobileNumber = addDriverMaster.MobileNumber,
                        Name = addDriverMaster.Name,
                        PlaceOfIssue = addDriverMaster.PlaceOfIssue,
                        Salary = addDriverMaster.Salary,
                        UpdatedById = loggedInUser.Id,
                        UpdatedOn = DateTime.UtcNow,
                        ValidityTill = addDriverMaster.ValidityTill,
                        UserId = user.Id
                    };
                    _iMSDbContext.DriverMasters.Add(driver);
                    await _iMSDbContext.SaveChangesAsync();
                    #endregion
                    return new DriverMasterManagementResponse() { HasError = false, Message = "Driver added successfully", Data = new { Id = driver.Id } };
                }
            }
        }

        /// <summary>
        /// Method to get list of drivers - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of drivers</returns>
        public async Task<List<DriverMaster>> GetDriverMastersAsync(int instituteId)
        {
            return await _iMSDbContext.DriverMasters.Where(x => x.InstituteId == instituteId).ToListAsync();
        }

        /// <summary>
        /// Method to update driver - SS
        /// </summary>
        /// <param name="updateDriverMaster">driver detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<DriverMasterManagementResponse> UpdateDriverMasterAsync(UpdateDriverMasterManagementAc updateDriverMaster,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateDriverMaster.Name) && string.IsNullOrEmpty(updateDriverMaster.Name.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "Name can't be empty", ErrorType = DriverMasterManagementResponseType.Name };
            else if (string.IsNullOrEmpty(updateDriverMaster.MobileNumber) && string.IsNullOrEmpty(updateDriverMaster.MobileNumber.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "Mobile number can't be empty", ErrorType = DriverMasterManagementResponseType.MobileNumber };
            else if (string.IsNullOrEmpty(updateDriverMaster.LicenseNumber) && string.IsNullOrEmpty(updateDriverMaster.LicenseNumber.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "License number can't be empty", ErrorType = DriverMasterManagementResponseType.LicenseNumber };
            else if (string.IsNullOrEmpty(updateDriverMaster.LicenseType) && string.IsNullOrEmpty(updateDriverMaster.LicenseType.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "License type can't be empty", ErrorType = DriverMasterManagementResponseType.LicenseType };
            else if (string.IsNullOrEmpty(updateDriverMaster.PlaceOfIssue) && string.IsNullOrEmpty(updateDriverMaster.PlaceOfIssue.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "Place of issue can't be empty", ErrorType = DriverMasterManagementResponseType.PlaceOfIssue };
            else if (string.IsNullOrEmpty(updateDriverMaster.IssuingAuthority) && string.IsNullOrEmpty(updateDriverMaster.IssuingAuthority.Trim()))
                return new DriverMasterManagementResponse() { HasError = true, Message = "Issuing authority can't be empty", ErrorType = DriverMasterManagementResponseType.IssuingAuthority };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var driver = await _iMSDbContext.DriverMasters.FirstOrDefaultAsync(x => x.Id == updateDriverMaster.Id && x.InstituteId == instituteId);
                if (driver == null)
                    return new DriverMasterManagementResponse() { HasError = true, Message = "Driver not found", ErrorType = DriverMasterManagementResponseType.Id };
                else
                {
                    driver.Address = updateDriverMaster.Address;
                    driver.DateOfBirth = updateDriverMaster.DateOfBirth;
                    driver.DateOfIssue = updateDriverMaster.DateOfIssue;
                    driver.IsDriver = updateDriverMaster.IsDriver;
                    driver.IssuingAuthority = updateDriverMaster.IssuingAuthority;
                    driver.LicenseNumber = updateDriverMaster.LicenseNumber;
                    driver.LicenseType = updateDriverMaster.LicenseType;
                    driver.MobileNumber = updateDriverMaster.MobileNumber;
                    driver.Name = updateDriverMaster.Name;
                    driver.PlaceOfIssue = updateDriverMaster.PlaceOfIssue;
                    driver.Salary = updateDriverMaster.Salary;
                    driver.UpdatedById = loggedInUser.Id;
                    driver.UpdatedOn = DateTime.UtcNow;
                    driver.ValidityTill = updateDriverMaster.ValidityTill;
                    _iMSDbContext.DriverMasters.Update(driver);
                    await _iMSDbContext.SaveChangesAsync();
                    return new DriverMasterManagementResponse() { HasError = false, Message = "Driver updated successfully" };
                }
            }
        }

        /// <summary>
        /// Method to add or update image - SS
        /// </summary>
        /// <param name="files">files</param>
        /// <param name="driverId">driver id</param>
        /// <param name="instituteId">institute id</param>
        public async Task AddOrUpdateImageAsync(IFormFileCollection files, int driverId, int instituteId)
        {
            var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var image = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Driver");
            if (image.Count != 0)
            {
                var driver = await _iMSDbContext.DriverMasters.FirstAsync(x => x.Id == driverId);
                if (!string.IsNullOrEmpty(driver.LicensePhoto))
                    File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", driver.LicensePhoto));
                driver.LicensePhoto = image[0];
                _iMSDbContext.DriverMasters.Update(driver);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method to migrated previous driver data - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var institutes = await _iMSDbContext.Institutes.ToListAsync();
            foreach (var institute in institutes)
            {
                var drivers = await _iMSDbContext.DriverMasters.Where(x => x.InstituteId == institute.Id).ToListAsync();
                foreach (var driver in drivers)
                {
                    if (string.IsNullOrEmpty(driver.UserId))
                    {
                        var user = await _userManager.FindByNameAsync(driver.MobileNumber);
                        if (user == null)
                        {
                            var password = "itech1@3";
                            user = new ApplicationUser()
                            {
                                CreatedBy = institute.AdminId,
                                CreatedOn = DateTime.UtcNow,
                                UserName = driver.MobileNumber,
                                Name = driver.Name,
                                UpdatedOn = DateTime.UtcNow,
                                UpdatedBy = institute.AdminId
                            };
                            await _userManager.CreateAsync(user, password);
                        }
                        driver.UserId = user.Id;
                        _iMSDbContext.UserInstituteMappings.Add(new UserInstituteMapping()
                        {
                            CreatedOn = DateTime.UtcNow,
                            InstituteId = institute.Id,
                            IsActive = false,
                            UserId = user.Id
                        });
                        await _iMSDbContext.SaveChangesAsync();
                    }
                }
                using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                {
                    await _iMSDbContext.BulkUpdateAsync(drivers);
                    db.Commit();
                }
            }
        }

        public async Task<dynamic> GetDriverDashboardDetails(string currentUserId, int currentUserInstituteId)
        {
            DriverMaster driver = await _iMSDbContext.DriverMasters.FirstOrDefaultAsync(x => x.UserId.Equals(currentUserId) && x.InstituteId == currentUserInstituteId);
            if (driver != null)
            {
                List<DomainModel.Models.VehicleDriverMapping> vehicleDriverMappingsList = await _iMSDbContext.VehicleDriverMappings
                    .Where(x => x.DriverId == driver.Id)
                    .Include(x => x.Vehicle)
                    .ToListAsync();

                List<int> vehicleIdsList = vehicleDriverMappingsList.Select(x => x.Vehicle.Id).Distinct().ToList();

                List<VehicleAccident> vehicleAccidents = await _iMSDbContext.VehicleAccidents.Where(x => vehicleIdsList.Contains(x.VehicleId))
                    .Include(x => x.Vehicle).ToListAsync();

                List<VehicleMaintenance> vehicleMaintanances = await _iMSDbContext.VehicleMaintenances.Where(x => vehicleIdsList.Contains(x.VehicleId))
                    .Include(x => x.Vehicle).ToListAsync();

                List<VehicleRepair> vehicleRepairs = await _iMSDbContext.VehicleRepairs.Where(x => vehicleIdsList.Contains(x.VehicleId))
                    .Include(x => x.Vehicle).ToListAsync();

                List<VehicleAccidentMaintenanceAc> vehicleAccidentMaintenanceDetailsList = new List<VehicleAccidentMaintenanceAc>();

                foreach (VehicleAccident vehicleAccident in vehicleAccidents)
                {
                    vehicleAccidentMaintenanceDetailsList.Add(new VehicleAccidentMaintenanceAc
                    {
                        Type = "Accident",
                        Date = vehicleAccident.AccidentDate,
                        EstimatedCost = vehicleAccident.EstimateCost,
                        VehicleNumber = vehicleAccident.Vehicle.VehicleCode
                    });
                }

                foreach (VehicleMaintenance vehicleMaintanance in vehicleMaintanances)
                {
                    vehicleAccidentMaintenanceDetailsList.Add(new VehicleAccidentMaintenanceAc
                    {
                        Type = "Maintenance",
                        Date = vehicleMaintanance.MaintenanceDate,
                        EstimatedCost = vehicleMaintanance.EstimateCost,
                        VehicleNumber = vehicleMaintanance.Vehicle.VehicleCode
                    });
                }

                foreach (VehicleRepair vehicleRepair in vehicleRepairs)
                {
                    vehicleAccidentMaintenanceDetailsList.Add(new VehicleAccidentMaintenanceAc
                    {
                        Type = "Repair",
                        Date = vehicleRepair.RepairDate,
                        EstimatedCost = vehicleRepair.RepairCost,
                        VehicleNumber = vehicleRepair.Vehicle.VehicleCode
                    });
                }

                return new
                {
                    VehiclesList = vehicleDriverMappingsList,
                    VehicleAccidentMaintenanceDetailsList = vehicleAccidentMaintenanceDetailsList
                };
            }
            return null;
        }

        #endregion
    }
}
