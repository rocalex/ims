using IMS.DomainModel.ApplicationClasses.Hostel.BedAllocationManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.BedAllocationManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class BedAllocationController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IBedAllocationManagementRepository bedAllocationManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public BedAllocationController(
            IBedAllocationManagementRepository _bedAllocationManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            bedAllocationManagementRepository = _bedAllocationManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllGroupsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await bedAllocationManagementRepository.GetComponentsAsync(instituteId));
        }

        [HttpPost("{blockId}/{floorNo}")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddBedAllocation[] addGroupAc, int floorNo)
        {
            return Ok(await bedAllocationManagementRepository.AddComponentAsync(addGroupAc, floorNo, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("room/{roomId}")]
        public async Task<IActionResult> GetAllocationsByRoomIdAsync(int roomId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await iMSDbContext.BedAllocations.Include(s => s.Bed).Include(s => s.Bed.Room).Include(s => s.Student).Include(s => s.Student.Gender).Where(x => x.InstituteId == instituteId && x.Bed.RoomId == roomId).ToListAsync());
        }

        [HttpGet("report/{blockId}/{floorId}")]
        public async Task<IActionResult> GetReportByFloorAsync(int blockId, int floorId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var beds = await iMSDbContext.Beds.Include(x => x.Room).Where(x => x.InstituteId == instituteId && x.Room.FloorNo == floorId && x.Room.BlockId == blockId).ToListAsync();

            var results = new List<dynamic>();
            foreach(Bed bed in beds)
            {
                var isExist = await iMSDbContext.BedAllocations.AnyAsync(x => x.BedId == bed.Id && x.InstituteId == instituteId);
                if(isExist)
                {
                    var allocation = await iMSDbContext.BedAllocations.Include(x => x.Student).FirstAsync(x => x.BedId == bed.Id && x.InstituteId == instituteId);
                    results.Add(new
                    {
                        RoomNo = bed.Room.RoomNo,
                        BedNo = bed.BedNo,
                        RollNo = allocation.Student.RollNumber,
                        FirstName = allocation.Student.FirstName,
                        MiddleName = allocation.Student.MiddleName,
                        LastName = allocation.Student.LastName,
                        Status = "Occupied"
                    });
                }
                else
                {
                    results.Add(new
                    {
                        RoomNo = bed.Room.RoomNo,
                        BedNo = bed.BedNo,
                        RollNo = "N/A",
                        FirstName = "",
                        MiddleName = "",
                        LastName = "",
                        Status = "Available"
                    });
                }
            }

            return Ok(results);
        }

        [HttpGet("createdByMe")]
        public async Task<IActionResult> GetAllocationByMe()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var students = await iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();

            List<dynamic> results = new List<dynamic>();
            for (var i = 0; i < students.Count; i++)
            {
                var isAllocated = await iMSDbContext.BedAllocations.AnyAsync(x => x.StudentId == students[i].Id);
                if (isAllocated)
                {
                    var allocation = await iMSDbContext.BedAllocations.Include(s => s.Bed).FirstAsync(x => x.StudentId == students[i].Id);
                    results.Add(new
                    {
                        FirstName = students[i].FirstName,
                        MiddleName = students[i].MiddleName,
                        LastName = students[i].LastName,
                        StudentId = students[i].Id,
                        RollNo = students[i].RollNumber,
                        ImgUrl = students[i].PersonalImage,
                        BedNo = allocation.BedId,
                        Bed = allocation.Bed,
                        RoomNo = allocation.Bed.RoomId,
                        StatusId = allocation.Status
                    });
                } else
                {
                    results.Add(new
                    {
                        FirstName = students[i].FirstName,
                        MiddleName = students[i].MiddleName,
                        LastName = students[i].LastName,
                        StudentId = students[i].Id,
                        RollNo = students[i].RollNumber,
                        ImgUrl = students[i].PersonalImage
                    });
                }
            }
            return Ok(results);
        }

        [HttpGet("{componentGroupId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int componentGroupId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.BedAllocations.FirstOrDefaultAsync(x => x.Id == componentGroupId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Bed Allocation Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateBedAllocation updateComponentGroupAc)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (await iMSDbContext.BedAllocations.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
            {
                return Ok(await bedAllocationManagementRepository.UpdateComponentAsync(updateComponentGroupAc, instituteId));
            }
            else
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Bed Allocation not found" });
        }

        [HttpDelete("{allocationId}")]
        public async Task<IActionResult> DeleteAllocationAsync(int allocationId)
        {
            try
            {
                var allocation = await iMSDbContext.BedAllocations.FirstAsync(x => x.Id == allocationId);
                iMSDbContext.BedAllocations.Remove(allocation);
                await iMSDbContext.SaveChangesAsync();
                return Ok(new SharedLookUpResponse() { HasError = false, Message = "Bed Allocation Removed successfully!" });
            }
            catch (System.Exception exception)
            {
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Other, Message = "Removing bed allocation Failed!" });
            }
        }
        #endregion
    }
}
