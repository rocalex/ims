using IMS.DomainModel.ApplicationClasses.Hostel.BedManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.BedManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class BedController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IBedManagementRepository bedManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public BedController(
            IBedManagementRepository _bedManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            bedManagementRepository = _bedManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("room/{roomId}")]
        public async Task<IActionResult> GetAllGroupsAsync(int roomId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await bedManagementRepository.GetComponentsAsync(instituteId, roomId));
        }

        [HttpGet("floor/{blockId}/{floorId}")]
        public async Task<IActionResult> GetAllBedsByFloorAsync(int blockId, int floorId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();

            return Ok(await iMSDbContext.Beds.Where(x => x.Room.FloorNo == floorId && x.Room.BlockId == blockId && x.InstituteId == instituteId).ToListAsync());
        }

        [HttpGet("swapable/{roomId}")]
        public async Task<IActionResult> GetAllAvailableBedsAsync(int roomId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var allBeds = await iMSDbContext.Beds.Where(x => x.InstituteId == instituteId && x.RoomId == roomId).ToListAsync();

            var result = new List<Bed>();
            foreach(Bed bed in allBeds)
            {
                var isAllocated = await iMSDbContext.BedAllocations.AnyAsync(x => x.BedId == bed.Id);
                if(!isAllocated)
                {
                    result.Add(bed);
                }
            }

            return Ok(result);
        }

        [HttpGet("beds/{blockId}/{floorId}")]
        public async Task<IActionResult> GetAllBedsWithAllocationAsync(int blockId, int floorId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var beds = await iMSDbContext.Beds.Include(s => s.Room).Where(x => x.Room.FloorNo == floorId && x.Room.BlockId == blockId && x.InstituteId == instituteId).OrderBy(x => x.Room.RoomNo).ToListAsync();

            List<dynamic> results = new List<dynamic>();
            for(var i=0; i<beds.Count; i++)
            {
                var isAllocated = await iMSDbContext.BedAllocations.AnyAsync(x => x.BedId == beds[i].Id);
                if(isAllocated)
                {
                    results.Add(new
                    {
                        BedNo = beds[i].BedNo,
                        RoomNo = beds[i].Room.RoomNo,
                        Status = 1
                    });
                } else
                {
                    results.Add(new
                    {
                        BedNo = beds[i].BedNo,
                        RoomNo = beds[i].Room.RoomNo,
                        Status = 0
                    });
                }
            }

            return Ok(results);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddBed[] addBeds)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            for(var i=0; i<addBeds.Length; i++)
            {
                await bedManagementRepository.AddComponentAsync(addBeds[i], instituteId);
            }
            return Ok(new { HasError = false, Message = "Beds are created successfully" });
        }

        [HttpGet("bed/{bedId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int bedId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.Beds.FirstOrDefaultAsync(x => x.Id == bedId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Bed Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateBed[] updateComponentGroupAc)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            for(var i=0; i<updateComponentGroupAc.Length; i++)
            {
                await bedManagementRepository.UpdateComponentAsync(updateComponentGroupAc[i], instituteId);
            }
            return Ok(new SharedLookUpResponse() { HasError = false, Message = "Update Bed info found" });
        }
        #endregion
    }
}
