using IMS.DomainModel.ApplicationClasses.Hostel.FloorRoomManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.FloorRoomManagement
{
    public class FloorRoomManagementRepository : IFloorRoomManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public FloorRoomManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        public async Task<dynamic> AddRoomAsync(AddFloorRoomAc addRoom)
        {
            if (!await iMSDbContext.FloorRooms.AnyAsync(x => x.RoomNo.ToLowerInvariant() == addRoom.RoomNo.ToLowerInvariant() && x.FloorNo == addRoom.FloorNo && x.BlockId == addRoom.BlockId))
            {
                var floorRoom = new FloorRoom()
                {
                    CreatedOn = DateTime.UtcNow,
                    RoomNo = addRoom.RoomNo,
                    RoomType = addRoom.RoomType,
                    BedAmount = addRoom.BedAmount,
                    FloorNo = addRoom.FloorNo,
                    BlockId = addRoom.BlockId,
                    Status = addRoom.Status
                };
                iMSDbContext.FloorRooms.Add(floorRoom);
                await iMSDbContext.SaveChangesAsync();
                return new { HasError = false, Id = floorRoom.Id, Message = "Room added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Room with same No is already existed" };
            }
        }

        public async Task<List<FloorRoom>> GetComponentsAsync(int blockId, int floorNo)
        {
            return (await iMSDbContext.FloorRooms.Include(s => s.RoomTypeInstance).Include(s => s.Block).Include(s => s.Block.Hostel).Where(x => x.BlockId == blockId && x.FloorNo == floorNo).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.FloorRooms.ToListAsync();
            iMSDbContext.FloorRooms.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }


        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateFloorRoomAc updateRoom)
        {
            var floorRooms = await iMSDbContext.FloorRooms.Where(x => x.Id != updateRoom.Id).ToListAsync();
            var isDuplicated = floorRooms.Any(x => x.RoomNo.ToLowerInvariant() == updateRoom.RoomNo.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate No of Room, please use unique code" };
            else
            {
                var floorRoom = await iMSDbContext.FloorRooms.FirstAsync(x => x.Id == updateRoom.Id);
                floorRoom.RoomNo = updateRoom.RoomNo;
                floorRoom.RoomType = updateRoom.RoomType;
                floorRoom.BedAmount = updateRoom.BedAmount;
                floorRoom.Status = updateRoom.Status;
                iMSDbContext.FloorRooms.Update(floorRoom);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Room info updated successfully" };
            }
        }
    }
}
