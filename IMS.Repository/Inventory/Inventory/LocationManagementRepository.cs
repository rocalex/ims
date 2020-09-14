using IMS.DomainModel.ApplicationClasses.Inventory.Location;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Inventory
{
    public class LocationManagementRepository : ILocationManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public LocationManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddLocation addComponent, int instituteId)
        {
            if (!await iMSDbContext.Locations.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addComponent.Code.ToLowerInvariant()))
            {
                var componentGroup = new Location()
                {
                    IsParent = addComponent.IsParent,
                    Alias = addComponent.Alias,
                    InstituteId = instituteId,
                    Name = addComponent.Name,
                    Code = addComponent.Code,
                    Description = addComponent.Description,
                    Status = addComponent.Status
                };
                if(addComponent.BillingAddressId != null)
                {
                    componentGroup.BillingAddressId = addComponent.BillingAddressId;
                }
                if(addComponent.ShippingAddressId != null)
                {
                    componentGroup.ShippingAddressId = addComponent.ShippingAddressId;
                }
                iMSDbContext.Locations.Add(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Location added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Location with same code is already existed" };
            }
        }

        public async Task<List<Location>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.Locations.Include(s => s.BillingAddress).Include(s => s.ShippingAddress).Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.Locations.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.Locations.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateLocation updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.Locations.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.Code.ToLowerInvariant() == updateComponentAc.Code.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Location, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.Locations.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentGroup.Name = updateComponentAc.Name;
                componentGroup.Code = updateComponentAc.Code;
                componentGroup.Description = updateComponentAc.Description;
                componentGroup.Status = updateComponentAc.Status;
                componentGroup.ShippingAddressId = updateComponentAc.ShippingAddressId;
                componentGroup.BillingAddressId = updateComponentAc.BillingAddressId;
                componentGroup.Alias = updateComponentAc.Alias;
                componentGroup.IsParent = updateComponentAc.IsParent;
                iMSDbContext.Locations.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Location updated successfully" };
            }
        }
        #endregion
    }
}
