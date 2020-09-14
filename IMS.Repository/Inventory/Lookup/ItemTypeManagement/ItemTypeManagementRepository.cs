using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Inventory.Lookup.ItemTypeManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Lookup.ItemTypeManagement
{
    public class ItemTypeManagementRepository : IItemTypeManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ItemTypeManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddItemType addComponent, int instituteId)
        {
            if (!await iMSDbContext.ItemTypes.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addComponent.Code.ToLowerInvariant()))
            {
                var componentGroup = new ItemType()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addComponent.Name,
                    Code = addComponent.Code,
                    Description = addComponent.Description,
                    Status = addComponent.Status
                };
                iMSDbContext.ItemTypes.Add(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Item Type added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Item type with same code is already existed" };
            }
        }

        public async Task<List<ItemType>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.ItemTypes.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.ItemTypes.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.ItemTypes.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateItemType updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.ItemTypes.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.Code.ToLowerInvariant() == updateComponentAc.Code.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Item type, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.ItemTypes.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentGroup.Name = updateComponentAc.Name;
                componentGroup.Code = updateComponentAc.Code;
                componentGroup.Description = updateComponentAc.Description;
                componentGroup.Status = updateComponentAc.Status;
                iMSDbContext.ItemTypes.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Item type updated successfully" };
            }
        }
        #endregion
    }
}
