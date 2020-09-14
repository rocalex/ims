using IMS.DomainModel.ApplicationClasses.VehicleMasterManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.VehicleMasterManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class VehicleMasterManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVehicleMasterManagementRepository _vehicleMasterManagementRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public VehicleMasterManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService 
            instituteUserMappingHelperService, IVehicleMasterManagementRepository vehicleMasterManagementRepository, IMSDbContext 
            imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _vehicleMasterManagementRepository = vehicleMasterManagementRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddVehicleMasterAsync([FromBody]AddVehicleMasterManagementAc addVehicleMaster)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleMasterManagementRepository.AddVehicleMasterAsync(addVehicleMaster, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetVehicleMastersAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _vehicleMasterManagementRepository.GetVehicleMastersAsync(instituteId));
        }

        [HttpGet("{vehicleId}")]
        public async Task<IActionResult> GetVehicleMasterAsync(int vehicleId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var vehicle = await _imsDbContext.VehicleMasters.Include(s=>s.VehicleDocumentMappings).FirstOrDefaultAsync(x => x.Id == vehicleId && x.InstituteId == instituteId);
            if (vehicle != null)
            {
                vehicle.FuelTypeDescription = EnumHelperService.GetDescription(vehicle.FuelType);
                vehicle.VehicleTypeDescription = EnumHelperService.GetDescription(vehicle.VehicleType);
                return Ok(vehicle);
            }
            else
                return Ok(new { Message = "Vehicle not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateVehicleMasterAsync([FromBody]UpdateVehicleMasterManagementAc updateVehicleMaster)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleMasterManagementRepository.UpdateVehicleMasterAsync(updateVehicleMaster, user));
        }

        [HttpPost("image/{vehicleId}")]
        public async Task<IActionResult> AddOrUpdateImagesAsync(int vehicleId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _vehicleMasterManagementRepository.AddOrUpdateImagesAsync(Request.Form.Files, vehicleId, instituteId));
        }

        [HttpPost("document/{vehicleId}")]
        public async Task<IActionResult> AddOrUpdateVehicleDocumentAsync(int vehicleId)
        {
            var isModel = Request.Form.TryGetValue("model-document", out StringValues modelData);
            if (isModel)
            {
                var files = Request.Form.Files;
                List<AddVehicleDocumentMappingAc> model = JsonConvert.DeserializeObject<List<AddVehicleDocumentMappingAc>>(modelData.ToString());
                var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
                await _vehicleMasterManagementRepository.AddOrUpdateVehicleDocumentsAsync(files, vehicleId, loggedInUser, model);
            }
            return Ok();
        }

        [HttpPut("documentdata/{vehicleId}")]
        public async Task<IActionResult> UpdateDocumentDataAsync([FromBody]List<AddVehicleDocumentMappingAc> VehicleDocuments, int vehicleId)
        {
            var documents = await _imsDbContext.VehicleDocumentMappings.Where(x => x.VehicleId == vehicleId).ToListAsync();
            _imsDbContext.VehicleDocumentMappings.RemoveRange(documents);
            await _imsDbContext.SaveChangesAsync();
            List<VehicleDocumentMapping> VehicleDocumentMappings = new List<VehicleDocumentMapping>();
            foreach (var doc in VehicleDocuments)
            {
                VehicleDocumentMappings.Add(new VehicleDocumentMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    ExpiredDate = doc.ExpiredDate,
                    FileType = EnumHelperService.GetValueFromDescription<FileTypeEnum>(doc.FileType),
                    FileUrl = doc.FileUrl,
                    MetaData = doc.MetaData,
                    Name = doc.Name,
                    VehicleId = vehicleId
                });
            }
            _imsDbContext.VehicleDocumentMappings.AddRange(VehicleDocumentMappings);
            await _imsDbContext.SaveChangesAsync();
            return Ok();
        }
        #endregion
    }
}
