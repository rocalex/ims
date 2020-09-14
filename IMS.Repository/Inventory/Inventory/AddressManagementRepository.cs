using IMS.DomainModel.ApplicationClasses.Inventory.Location;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace IMS.Repository.Inventory.Inventory
{
    public class AddressManagementRepository : IAddressManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public AddressManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<dynamic> AddComponentAsync(AddAddress addComponent, int instituteId)
        {
            var componentGroup = new LocationAddressModel()
            {
                InstituteId = instituteId,
                CountryId = addComponent.CountryId,
                StateId = addComponent.StateId,
                CityId = addComponent.CityId,
                Address1 = addComponent.Address1,
                Address2 = addComponent.Address2,
                ZipCode = addComponent.ZipCode,
                Description = addComponent.Description,
            };
            iMSDbContext.LocationAddressModels.Add(componentGroup);
            await iMSDbContext.SaveChangesAsync();
            return new { HasError = false, Id=componentGroup.Id, Message = "Address added successfully" };
        }

        public Task MigratePreviousDataAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateAddress updateComponentAc, int instituteId)
        {
            var componentGroup = await iMSDbContext.LocationAddressModels.FirstAsync(x => x.Id == updateComponentAc.Id);
            componentGroup.CountryId = updateComponentAc.CountryId;
            componentGroup.StateId = updateComponentAc.StateId;
            componentGroup.CityId = updateComponentAc.CityId;
            componentGroup.Address1 = updateComponentAc.Address1;
            componentGroup.Address2 = updateComponentAc.Address2;
            componentGroup.ZipCode = updateComponentAc.ZipCode;
            componentGroup.Description = updateComponentAc.Description;
            iMSDbContext.LocationAddressModels.Update(componentGroup);
            await iMSDbContext.SaveChangesAsync();
            return new SharedLookUpResponse() { HasError = false, Message = "Address updated successfully" };
        }
        #endregion
    }
}
