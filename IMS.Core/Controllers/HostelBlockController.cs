using IMS.DomainModel.ApplicationClasses.Hostel.BlockManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.BlockManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class HostelBlockController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IBlockManagementRepository blockManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public HostelBlockController(
            IBlockManagementRepository blockManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            this.blockManagementRepository = blockManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllBlockAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await blockManagementRepository.GetComponentsAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddBlockAc addGroupAc)
        {
            if (string.IsNullOrEmpty(addGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Block name can't be null or empty"
                });
            else
                return Ok(await blockManagementRepository.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("hostel/{hostelId}")]
        public async Task<IActionResult> GetBlockByHostelIdAsync(int hostelId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var block = await iMSDbContext.HostelBlocks.Where(x => x.HostelId == hostelId && x.InstituteId == institudeId).ToListAsync();
            if (block != null)
            {
                return Ok(block);
            }
            else
                return Ok(new { HasError = true, Message = "Block Not Found" });
        }

        [HttpGet("{blockId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int blockId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.HostelBlocks.FirstOrDefaultAsync(x => x.Id == blockId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Block Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateBlockAc updateComponentGroupAc)
        {
            if (string.IsNullOrEmpty(updateComponentGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Block name can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.BookTypes.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await blockManagementRepository.UpdateComponentAsync(updateComponentGroupAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Block not found" });
            }
        }
        #endregion
    }
}
