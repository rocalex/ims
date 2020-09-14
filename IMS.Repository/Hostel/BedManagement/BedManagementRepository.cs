using IMS.DomainModel.ApplicationClasses.Hostel.BedManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.BedManagement
{
    public class BedManagementRepository : IBedManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public BedManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddBed addComponent, int instituteId)
        {
            if (!await iMSDbContext.Beds.AnyAsync(x => x.InstituteId == instituteId && x.BedNo.ToLowerInvariant() == addComponent.BedNo.ToLowerInvariant()))
            {
                var bed = new Bed()
                {
                    InstituteId = instituteId,
                    BedNo = addComponent.BedNo,
                    Status = addComponent.Status,
                    RoomId = addComponent.RoomId,
                };
                iMSDbContext.Beds.Add(bed);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Bed added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Bed with same code is already existed" };
            }
        }

        public async Task<List<Bed>> GetComponentsAsync(int instituteId, int roomId)
        {
            return (await iMSDbContext.Beds.Include(s => s.Room).Include(s => s.Room.Block).Include(s => s.Room.Block.Hostel).Where(x => x.InstituteId == instituteId && x.RoomId == roomId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.Beds.ToListAsync();
            iMSDbContext.Beds.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateBed updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.Beds.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.BedNo.ToLowerInvariant() == updateComponentAc.BedNo.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate No of Bed, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.Beds.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentGroup.BedNo = updateComponentAc.BedNo;
                componentGroup.RoomId = updateComponentAc.RoomId;
                componentGroup.Status = updateComponentAc.Status;
                iMSDbContext.Beds.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Bed updated successfully" };
            }
        }
        #endregion
    }
}
