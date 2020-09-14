using IMS.DomainModel.ApplicationClasses.SlabManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.SlabManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class SlabManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly ISlabManagementRepository _slabManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public SlabManagementController(ISlabManagementRepository slabManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _slabManagementRepository = slabManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddSlabAsync([FromBody]AddSlabManagementAc addSlabManagement)
        {
            if (string.IsNullOrEmpty(addSlabManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Slab name can't be empty" });
            else if (string.IsNullOrEmpty(addSlabManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Slab name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _slabManagementRepository.AddSlabAsync(addSlabManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllSlabAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _slabManagementRepository.GetAllSlabAsync(loggedInUserInstituteId));
        }

        [HttpGet("{SlabId}")]
        public async Task<IActionResult> GetSlabDetailByIdAsync(int SlabId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var Slab = await _iMSDbContext.Slabs.FirstOrDefaultAsync(x => x.Id == SlabId && x.InstituteId == loggedInUserInstituteId);
            if (Slab != null)
                return Ok(Slab);
            else
                return Ok(new { Message = "Slab not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateSlabAsync([FromBody]UpdateSlabManagementAc updateSlabManagement)
        {
            if (string.IsNullOrEmpty(updateSlabManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Slab name can't be empty" });
            else if (string.IsNullOrEmpty(updateSlabManagement.Code.Trim()))
                return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Slab name can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.Slabs.AnyAsync(x => x.Id == updateSlabManagement.SlabId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _slabManagementRepository.UpdateSlabAsync(updateSlabManagement, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Slab not found" });
            }
        }
        #endregion
    }
}
