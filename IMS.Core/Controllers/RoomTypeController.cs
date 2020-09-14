using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using IMS.Repository.Hostel.Lookup.RoomTypeManagement;
using IMS.DomainModel.ApplicationClasses.Hostel.Lookup.RoomTypeManagement;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class RoomTypeController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IRoomTypeManagement roomTypeManagement;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public RoomTypeController(
            IRoomTypeManagement _roomTypeManagement,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            roomTypeManagement = _roomTypeManagement;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllGroupsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await roomTypeManagement.GetComponentsAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddRoomType addGroupAc)
        {
            if (string.IsNullOrEmpty(addGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Room Type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addGroupAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Room Type code can't be null or empty"
                });
            else
                return Ok(await roomTypeManagement.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{roomTypeId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int roomTypeId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.RoomTypes.FirstOrDefaultAsync(x => x.Id == roomTypeId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Room Type Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateRoomType updateComponentGroupAc)
        {
            if (string.IsNullOrEmpty(updateComponentGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Room Type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateComponentGroupAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Room Type code can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.RoomTypes.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await roomTypeManagement.UpdateComponentAsync(updateComponentGroupAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Room Type not found" });
            }
        }
        #endregion
    }
}
