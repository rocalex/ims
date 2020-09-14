using IMS.DomainModel.ApplicationClasses.Inventory.Lookup.UOMManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Lookup.UOMManagement
{
    public class UOMManagementRepository : IUOMManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public UOMManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddUOM addComponent, int instituteId)
        {
            if (!await iMSDbContext.UOMs.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addComponent.Code.ToLowerInvariant()))
            {
                var componentGroup = new UOM()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addComponent.Name,
                    Code = addComponent.Code,
                    Description = addComponent.Description,
                    Status = addComponent.Status
                };
                iMSDbContext.UOMs.Add(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "UOM added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "UOM with same code is already existed" };
            }
        }

        public async Task<List<UOM>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.UOMs.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.UOMs.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.UOMs.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateUOM updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.UOMs.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.Code.ToLowerInvariant() == updateComponentAc.Code.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of UOM, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.UOMs.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentGroup.Name = updateComponentAc.Name;
                componentGroup.Code = updateComponentAc.Code;
                componentGroup.Description = updateComponentAc.Description;
                componentGroup.Status = updateComponentAc.Status;
                iMSDbContext.UOMs.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "UOM updated successfully" };
            }
        }
        #endregion
    }
}
