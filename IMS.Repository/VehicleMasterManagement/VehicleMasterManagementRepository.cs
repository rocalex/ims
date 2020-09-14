using IMS.DomainModel.ApplicationClasses.VehicleMasterManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using IMS.Utility.ImageStorageHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleMasterManagement
{
    public class VehicleMasterManagementRepository : IVehicleMasterManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly IImageStorageHelperService _imageStorageHelperService;
        #endregion

        #region Constructor
        public VehicleMasterManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService 
            instituteUserMappingHelperService, IImageStorageHelperService imageStorageHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _imageStorageHelperService = imageStorageHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add vehicle master - SS
        /// </summary>
        /// <param name="addVehicleMaster">vehicle detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleMasterManagementResponse> AddVehicleMasterAsync(AddVehicleMasterManagementAc addVehicleMaster,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addVehicleMaster.VehicleCode) && string.IsNullOrEmpty(addVehicleMaster.VehicleCode.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle code can't be empty", ErrorType = VehicleMasterManagementResponseType.VehicleCode };
            else if (string.IsNullOrEmpty(addVehicleMaster.VehicleType) && string.IsNullOrEmpty(addVehicleMaster.VehicleType.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle type can't be empty", ErrorType = VehicleMasterManagementResponseType.VehicleType };
            else if (string.IsNullOrEmpty(addVehicleMaster.FuelType) && string.IsNullOrEmpty(addVehicleMaster.FuelType.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Fuel type can't be empty", ErrorType = VehicleMasterManagementResponseType.FuelType };
            else if (string.IsNullOrEmpty(addVehicleMaster.VehicleRegistrationNumber) && string.IsNullOrEmpty(addVehicleMaster.VehicleRegistrationNumber.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle registration number can't be empty", ErrorType = VehicleMasterManagementResponseType.VehicleRegistrationNumber };
            else if (string.IsNullOrEmpty(addVehicleMaster.EngineNumber) && string.IsNullOrEmpty(addVehicleMaster.EngineNumber.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Engine number can't be empty", ErrorType = VehicleMasterManagementResponseType.EngineNumber };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (await _iMSDbContext.VehicleMasters.AnyAsync(x => x.InstituteId == instituteId && x.VehicleCode.ToLowerInvariant() == addVehicleMaster.VehicleCode.ToLowerInvariant()))
                    return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle code already exist. Please use unique one", ErrorType = VehicleMasterManagementResponseType.VehicleCode };
                else
                {
                    var vehicle = new VehicleMaster()
                    {
                        AverageKMPL = addVehicleMaster.AverageKMPL,
                        ChasisNumber = addVehicleMaster.ChasisNumber,
                        CreatedOn = DateTime.UtcNow,
                        EngineNumber = addVehicleMaster.EngineNumber,
                        ExtraFittings = addVehicleMaster.ExtraFittings,
                        FitnessExpDate = addVehicleMaster.FitnessExpDate,
                        FuelType = EnumHelperService.GetValueFromDescription<VehicleMasterFuelTypeEnum>(addVehicleMaster.FuelType),
                        InstituteId = instituteId,
                        InsuranceDate = addVehicleMaster.InsuranceDate,
                        InsuranceExpDate = addVehicleMaster.InsuranceExpDate,
                        InsuranceNumber = addVehicleMaster.InsuranceNumber,
                        NextMaintenanceDate = addVehicleMaster.NextMaintenanceDate,
                        PermitValidityDate = addVehicleMaster.PermitValidityDate,
                        UpdatedById = loggedInUser.Id,
                        UpdatedOn = DateTime.UtcNow,
                        VehicleCode = addVehicleMaster.VehicleCode,
                        VehicleRegistrationNumber = addVehicleMaster.VehicleRegistrationNumber,
                        VehicleType = EnumHelperService.GetValueFromDescription<VehicleMasterTypeEnum>(addVehicleMaster.VehicleType)
                    };
                    _iMSDbContext.VehicleMasters.Add(vehicle);
                    await _iMSDbContext.SaveChangesAsync();
                    return new VehicleMasterManagementResponse() { HasError = false, Message = "Vehicle added successfully", Data = new { Id = vehicle.Id } };
                }
            }
        }

        /// <summary>
        /// Method to get vehicles list
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of vehicles</returns>
        public async Task<List<VehicleMaster>> GetVehicleMastersAsync(int instituteId)
        {
            var list = await _iMSDbContext.VehicleMasters.Where(x => x.InstituteId == instituteId).ToListAsync();
            list.ForEach(x =>
            {
                x.FuelTypeDescription = EnumHelperService.GetDescription(x.FuelType);
                x.VehicleTypeDescription = EnumHelperService.GetDescription(x.VehicleType);
            });
            return list;
        }

        /// <summary>
        /// Method to update vehicle master - SS
        /// </summary>
        /// <param name="updateVehicleMaster">vehicle detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<VehicleMasterManagementResponse> UpdateVehicleMasterAsync(UpdateVehicleMasterManagementAc updateVehicleMaster,
            ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateVehicleMaster.VehicleCode) && string.IsNullOrEmpty(updateVehicleMaster.VehicleCode.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle code can't be empty", ErrorType = VehicleMasterManagementResponseType.VehicleCode };
            else if (string.IsNullOrEmpty(updateVehicleMaster.VehicleType) && string.IsNullOrEmpty(updateVehicleMaster.VehicleType.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle type can't be empty", ErrorType = VehicleMasterManagementResponseType.VehicleType };
            else if (string.IsNullOrEmpty(updateVehicleMaster.FuelType) && string.IsNullOrEmpty(updateVehicleMaster.FuelType.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Fuel type can't be empty", ErrorType = VehicleMasterManagementResponseType.FuelType };
            else if (string.IsNullOrEmpty(updateVehicleMaster.VehicleRegistrationNumber) && string.IsNullOrEmpty(updateVehicleMaster.VehicleRegistrationNumber.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle registration number can't be empty", ErrorType = VehicleMasterManagementResponseType.VehicleRegistrationNumber };
            else if (string.IsNullOrEmpty(updateVehicleMaster.EngineNumber) && string.IsNullOrEmpty(updateVehicleMaster.EngineNumber.Trim()))
                return new VehicleMasterManagementResponse() { HasError = true, Message = "Engine number can't be empty", ErrorType = VehicleMasterManagementResponseType.EngineNumber };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var vehicles = await _iMSDbContext.VehicleMasters.Where(x => x.InstituteId == instituteId && x.Id != updateVehicleMaster.Id).ToListAsync();
                if (vehicles.Any(x => x.VehicleCode.ToLowerInvariant() == updateVehicleMaster.VehicleCode.ToLowerInvariant()))
                    return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle code already exist. Please use unique one", ErrorType = VehicleMasterManagementResponseType.VehicleCode };
                else
                {
                    var vehicle = await _iMSDbContext.VehicleMasters.FirstOrDefaultAsync(x => x.Id == updateVehicleMaster.Id);
                    if (vehicle == null)
                        return new VehicleMasterManagementResponse() { HasError = true, Message = "Vehicle not found", ErrorType = VehicleMasterManagementResponseType.Id };
                    else
                    {
                        vehicle.AverageKMPL = updateVehicleMaster.AverageKMPL;
                        vehicle.ChasisNumber = updateVehicleMaster.ChasisNumber;
                        vehicle.EngineNumber = updateVehicleMaster.EngineNumber;
                        vehicle.ExtraFittings = updateVehicleMaster.ExtraFittings;
                        vehicle.FitnessExpDate = updateVehicleMaster.FitnessExpDate;
                        vehicle.FuelType = EnumHelperService.GetValueFromDescription<VehicleMasterFuelTypeEnum>(updateVehicleMaster.FuelType);
                        vehicle.InsuranceDate = updateVehicleMaster.InsuranceDate;
                        vehicle.InsuranceExpDate = updateVehicleMaster.InsuranceExpDate;
                        vehicle.InsuranceNumber = updateVehicleMaster.InsuranceNumber;
                        vehicle.NextMaintenanceDate = updateVehicleMaster.NextMaintenanceDate;
                        vehicle.PermitValidityDate = updateVehicleMaster.PermitValidityDate;
                        vehicle.UpdatedById = loggedInUser.Id;
                        vehicle.UpdatedOn = DateTime.UtcNow;
                        vehicle.VehicleCode = updateVehicleMaster.VehicleCode;
                        vehicle.VehicleRegistrationNumber = updateVehicleMaster.VehicleRegistrationNumber;
                        vehicle.VehicleType = EnumHelperService.GetValueFromDescription<VehicleMasterTypeEnum>(updateVehicleMaster.VehicleType);
                        _iMSDbContext.VehicleMasters.Update(vehicle);
                        await _iMSDbContext.SaveChangesAsync();
                        return new VehicleMasterManagementResponse() { HasError = false, Message = "Vehicle updated successfully" };
                    }
                }
            }
        }

        /// <summary>
        /// Method to add images - SS
        /// </summary>
        /// <param name="formFiles">form files</param>
        /// <param name="vehicleId">vehicle id</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        public async Task<VehicleMasterManagementResponse> AddOrUpdateImagesAsync(IFormFileCollection formFiles, int vehicleId, int instituteId)
        {
            var vehicle = await _iMSDbContext.VehicleMasters.FirstOrDefaultAsync(x => x.Id == vehicleId && x.InstituteId == instituteId);
            if (vehicle == null)
                return new VehicleMasterManagementResponse { Message = "Vehicle not found", HasError = true };
            else
            {
                var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
                var images = await _imageStorageHelperService.UploadBlobDataAsync(formFiles, instituteName, "Driver");
                if(images.Count != 0)
                {
                    for (int i = 0; i < formFiles.Count; i++)
                    {
                        switch(formFiles[i].Name)
                        {
                            case "VehiclePhoto":
                                vehicle.VehiclePhoto = images[i];
                                break;
                            case "RegistrationCopyPhoto":
                                vehicle.RegistrationCopyPhoto = images[i];
                                break;
                            case "InsuranceCopyPhoto":
                                vehicle.InsuranceCopyPhoto = images[i];
                                break;
                        }
                    }
                    _iMSDbContext.VehicleMasters.Update(vehicle);
                    await _iMSDbContext.SaveChangesAsync();
                }
                return new VehicleMasterManagementResponse() { HasError = false };
            }
        }

        /// <summary>
        /// Method to add or update Vehicle document - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="vehicleId">Vehicle id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <param name="addVehicleDocuments">documnets details</param>
        public async Task AddOrUpdateVehicleDocumentsAsync(IFormFileCollection files, int vehicleId, ApplicationUser loggedInUser,
            List<AddVehicleDocumentMappingAc> addVehicleDocuments)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var images = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Document");
            if (images.Count != 0)
            {
                var gallery = new List<VehicleDocumentMapping>();
                for (int i = 0; i < images.Count; i++)
                {
                    gallery.Add(new VehicleDocumentMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        ExpiredDate = addVehicleDocuments[i].ExpiredDate,
                        FileType = EnumHelperService.GetValueFromDescription<FileTypeEnum>(addVehicleDocuments[i].FileType),
                        FileUrl = images[i],
                        MetaData = addVehicleDocuments[i].MetaData,
                        VehicleId = vehicleId,
                        Name = addVehicleDocuments[i].Name
                    });
                }
                _iMSDbContext.VehicleDocumentMappings.AddRange(gallery);
                await _iMSDbContext.SaveChangesAsync();
            }
        }
        #endregion
    }
}
