using IMS.DomainModel.ApplicationClasses.Hostel.FloorRoomManagement;
using IMS.DomainModel.ApplicationClasses.Hostel.BlockManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.FloorRoomManagement;
using IMS.Repository.Hostel.BlockManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class FloorRoomController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IFloorRoomManagementRepository floorRoomManagementRepository;
        private readonly IBlockManagementRepository blockManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public FloorRoomController(
            IFloorRoomManagementRepository _floorRoomManagementRepository,
            IBlockManagementRepository _blockManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            floorRoomManagementRepository = _floorRoomManagementRepository;
            blockManagementRepository = _blockManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("{blockId}/{floorNo}")]
        public async Task<IActionResult> GetAllRoomByBlockFloor(int blockId, int floorNo)
        {
            return Ok(await floorRoomManagementRepository.GetComponentsAsync(blockId, floorNo));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetFloorListAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await blockManagementRepository.GetComponentsAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddRoomAsync([FromBody]AddFloorRoomAc addFloorRoom)
        {
            if (string.IsNullOrEmpty(addFloorRoom.RoomNo.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Room No can't be null or empty"
                });
            else
                return Ok(await floorRoomManagementRepository.AddRoomAsync(addFloorRoom));
        }

        [HttpGet("{roomId}")]
        public async Task<IActionResult> GetRoomDetailByIdAsync(int roomId)
        {
            var gruop = await iMSDbContext.FloorRooms.FirstOrDefaultAsync(x => x.Id == roomId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Room info Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateRoomAsync([FromBody]UpdateFloorRoomAc updateRoom)
        {

            if (string.IsNullOrEmpty(updateRoom.RoomNo.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Room No can't be null or empty"
                });
            else
            {
                if (await iMSDbContext.FloorRooms.AnyAsync(x => x.Id == updateRoom.Id))
                {
                    return Ok(await floorRoomManagementRepository.UpdateComponentAsync(updateRoom));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Room Info not found" });
            }
        }
    }
    #endregion
}
