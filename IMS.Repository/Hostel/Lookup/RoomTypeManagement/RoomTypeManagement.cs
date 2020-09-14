using IMS.DomainModel.ApplicationClasses.Hostel.Lookup.RoomTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.Lookup.RoomTypeManagement
{
    public class RoomTypeManagement : IRoomTypeManagement
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public RoomTypeManagement(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddRoomType addComponent, int instituteId)
        {
            if (!await iMSDbContext.RoomTypes.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addComponent.Code.ToLowerInvariant()))
            {
                var componentGroup = new RoomType()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addComponent.Name,
                    Code = addComponent.Code,
                    Description = addComponent.Description,
                };
                iMSDbContext.RoomTypes.Add(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Room Type added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Room Type with same code is already existed" };
            }
        }

        public async Task<List<RoomType>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.RoomTypes.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.RoomTypes.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.RoomTypes.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateRoomType updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.RoomTypes.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.Code.ToLowerInvariant() == updateComponentAc.Code.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Room Type, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.RoomTypes.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentGroup.Name = updateComponentAc.Name;
                componentGroup.Code = updateComponentAc.Code;
                componentGroup.Description = updateComponentAc.Description;
                iMSDbContext.RoomTypes.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Room Type updated successfully" };
            }
        }
        #endregion
    }
}
