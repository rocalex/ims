using IMS.DomainModel.ApplicationClasses.TransportationStageManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.TransportationStageManagement
{
    public class TransportationStageManagementRepository : ITransportationStageManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public TransportationStageManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add stage - SS
        /// </summary>
        /// <param name="addTransportationStage">stage detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<TransportationStageManagementResponse> AddTransportationStageAsync(AddTransportationStageManagementAc
            addTransportationStage, ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addTransportationStage.Name) && string.IsNullOrEmpty(addTransportationStage.Name))
                return new TransportationStageManagementResponse() { HasError = true, Message = "Name can't be empty", ErrorType = TransportationStageManagementResponseType.Name };
            else if (string.IsNullOrEmpty(addTransportationStage.Code) && string.IsNullOrEmpty(addTransportationStage.Code))
                return new TransportationStageManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = TransportationStageManagementResponseType.Code };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (await _iMSDbContext.TransportationStages.AnyAsync(x => x.Code.ToLowerInvariant() == addTransportationStage.Code
                 .ToLowerInvariant() && x.InstituteId == instituteId))
                    return new TransportationStageManagementResponse() { HasError = true, Message = "Code already exist. Please use unique one", ErrorType = TransportationStageManagementResponseType.Code };
                else
                {
                    var stage = new TransportationStage()
                    {
                        Address = addTransportationStage.Address,
                        Code = addTransportationStage.Code,
                        CreatedOn = DateTime.UtcNow,
                        InstituteId = instituteId,
                        Name = addTransportationStage.Name,
                        UpdatedById = loggedInUser.Id,
                        UpdatedOn = DateTime.UtcNow,
                        Latitude = addTransportationStage.Latitude,
                        Longitude =addTransportationStage.Longitude,
                        SlabId = addTransportationStage.SlabId,
                        Term1 = addTransportationStage.Term1,
                        Term2 = addTransportationStage.Term2,
                        Term3 = addTransportationStage.Term3
                    };
                    _iMSDbContext.TransportationStages.Add(stage);
                    await _iMSDbContext.SaveChangesAsync();
                    return new TransportationStageManagementResponse() { HasError = false, Message = "Stage added successfully" };
                }
            }
        }

        /// <summary>
        /// Method to list of stages - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of stages</returns>
        public async Task<List<TransportationStage>> GetTransportationStagesAsync(int instituteId)
        {
            return await _iMSDbContext.TransportationStages.Include(e=>e.Slab).Where(x => x.InstituteId == instituteId).ToListAsync();
        }

        /// <summary>
        /// Method to update stage - SS
        /// </summary>
        /// <param name="updateTransportationStage">stage detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<TransportationStageManagementResponse> UpdateTransportationStageAsync(UpdateTransportationStageManagementAc
            updateTransportationStage, ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateTransportationStage.Name) && string.IsNullOrEmpty(updateTransportationStage.Name))
                return new TransportationStageManagementResponse() { HasError = true, Message = "Name can't be empty", ErrorType = TransportationStageManagementResponseType.Name };
            else if (string.IsNullOrEmpty(updateTransportationStage.Code) && string.IsNullOrEmpty(updateTransportationStage.Code))
                return new TransportationStageManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = TransportationStageManagementResponseType.Code };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var stages = await _iMSDbContext.TransportationStages.Where(x => x.InstituteId == instituteId && x.Id != updateTransportationStage.Id).ToListAsync();
                if (stages.Any(x => x.Code.ToLowerInvariant() == updateTransportationStage.Code.ToLowerInvariant()))
                    return new TransportationStageManagementResponse() { HasError = true, Message = "Code already exist. Please use unique one", ErrorType = TransportationStageManagementResponseType.Code };
                else
                {
                    var stage = await _iMSDbContext.TransportationStages.FirstOrDefaultAsync(x => x.Id == updateTransportationStage.Id && x.InstituteId == instituteId);
                    if (stage == null)
                        return new TransportationStageManagementResponse() { HasError = true, Message = "Stage not found", ErrorType = TransportationStageManagementResponseType.Id };
                    else
                    {
                        stage.Address = updateTransportationStage.Address;
                        stage.Code = updateTransportationStage.Code;
                        stage.Name = updateTransportationStage.Name;
                        stage.UpdatedById = loggedInUser.Id;
                        stage.UpdatedOn = DateTime.UtcNow;
                        stage.Latitude = updateTransportationStage.Latitude;
                        stage.Longitude = updateTransportationStage.Longitude;
                        stage.SlabId = updateTransportationStage.SlabId;
                        stage.Term1 = updateTransportationStage.Term1;
                        stage.Term2 = updateTransportationStage.Term2;
                        stage.Term3 = updateTransportationStage.Term3;
                        _iMSDbContext.TransportationStages.Update(stage);
                        await _iMSDbContext.SaveChangesAsync();
                        return new TransportationStageManagementResponse() { HasError = false, Message = "Stage updated successfully" };
                    }
                }
            }
        }
        #endregion
    }
}