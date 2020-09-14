using IMS.DomainModel.ApplicationClasses.Hostel.Lookup.BedStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.Lookup.BedStatusManagement;
using IMS.Repository.Payroll.ComponentGroupManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class BedStatusController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IBedStatusManagement bedStatusManagement;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public BedStatusController(
            IBedStatusManagement _bedStatusManagement,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            bedStatusManagement = _bedStatusManagement;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllGroupsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await bedStatusManagement.GetComponentsAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddBedStatus addGroupAc)
        {
            if (string.IsNullOrEmpty(addGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Bed Status name can't be null or empty"
                });
            else
                return Ok(await bedStatusManagement.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{bedStatusId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int bedStatusId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.BedStatuses.FirstOrDefaultAsync(x => x.Id == bedStatusId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Bed Status Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateBedStatus updateComponentGroupAc)
        {
            if (string.IsNullOrEmpty(updateComponentGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Bed Status name can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.BedStatuses.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await bedStatusManagement.UpdateComponentAsync(updateComponentGroupAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Bed Status not found" });
            }
        }
        #endregion
    }
}
