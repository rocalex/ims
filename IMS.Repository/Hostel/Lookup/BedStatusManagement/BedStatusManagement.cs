using IMS.DomainModel.ApplicationClasses.Hostel.Lookup.BedStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.Lookup.BedStatusManagement
{
    public class BedStatusManagement : IBedStatusManagement
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public BedStatusManagement(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddBedStatus addComponent, int instituteId)
        {
            if (!await iMSDbContext.BedStatuses.AnyAsync(x => x.InstituteId == instituteId && x.Name.ToLowerInvariant() == addComponent.Name.ToLowerInvariant()))
            {
                var componentGroup = new BedStatus()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addComponent.Name,
                };
                iMSDbContext.BedStatuses.Add(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Bed Status added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Component group with same code is already existed" };
            }
        }

        public async Task<List<BedStatus>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.BedStatuses.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.BedStatuses.ToListAsync();
            iMSDbContext.BedStatuses.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateBedStatus updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.BedStatuses.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.Name.ToLowerInvariant() == updateComponentAc.Name.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Name of Bed Status, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.BedStatuses.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentGroup.Name = updateComponentAc.Name;
                iMSDbContext.BedStatuses.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Bed Status updated successfully" };
            }
        }
        #endregion
    }
}
