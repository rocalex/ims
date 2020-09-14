using IMS.DomainModel.ApplicationClasses.Inventory.Lookup.TaxTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace IMS.Repository.Inventory.Lookup.TaxTypeManagement
{
    public class TaxTypeManagementRepository : ITaxTypeManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public TaxTypeManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddTaxType addComponent, int instituteId)
        {
            if (!await iMSDbContext.TaxTypes.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addComponent.Code.ToLowerInvariant()))
            {
                var componentGroup = new TaxType()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addComponent.Name,
                    Code = addComponent.Code,
                    Type = addComponent.Type,
                    Value = addComponent.Value,
                    Status = addComponent.Status
                };
                iMSDbContext.TaxTypes.Add(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Tax Type added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Tax Type with same code is already existed" };
            }
        }

        public async Task<List<TaxType>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.TaxTypes.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.TaxTypes.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.TaxTypes.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateTaxType updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.TaxTypes.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.Code.ToLowerInvariant() == updateComponentAc.Code.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Tax Type, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.TaxTypes.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentGroup.Name = updateComponentAc.Name;
                componentGroup.Code = updateComponentAc.Code;
                componentGroup.Type = updateComponentAc.Type;
                componentGroup.Value = updateComponentAc.Value;
                componentGroup.Status = updateComponentAc.Status;
                iMSDbContext.TaxTypes.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Tax Type updated successfully" };
            }
        }
        #endregion
    }
}
