using IMS.DomainModel.ApplicationClasses.Payroll.ComponentManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Payroll.ComponentManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class ComponentController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IComponentManagementRepository componentManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ComponentController(
            IComponentManagementRepository _componentManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService _instituteUserMappingHelperService
            ) : base (_instituteUserMappingHelperService)
        {
            componentManagementRepository = _componentManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllComponentsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await componentManagementRepository.GetComponentsAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddComponentAsync([FromBody]AddComponentAc addComponentAc)
        {
            if (string.IsNullOrEmpty(addComponentAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Component Group name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addComponentAc.ShortName.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Component Group code can't be null or empty"
                });
            else
                return Ok(await componentManagementRepository.AddComponentAsync(addComponentAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{componentId}")]
        public async Task<IActionResult> GetComponentDetailByIdAsync(int componentId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.PayrollComponents.FirstOrDefaultAsync(x => x.Id == componentId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Component Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateComponentAsync([FromBody]UpdateComponentAc updateComponentAc)
        {
            if (string.IsNullOrEmpty(updateComponentAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Component Group name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateComponentAc.ShortName.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Component Group short name can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.BookTypes.AnyAsync(x => x.Id == updateComponentAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await componentManagementRepository.UpdateComponentAsync(updateComponentAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Component not found" });
            }
        }
        #endregion
    }
}
