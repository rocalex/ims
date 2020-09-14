using IMS.DomainModel.ApplicationClasses.Payroll.EmployeeCompMappingManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Payroll.EmployeeCompMappingManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;


namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class EmployeeCompMappingController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IEmployeeCompMappingRepository employeeCompMappingRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public EmployeeCompMappingController(
            IEmployeeCompMappingRepository _employeeCompMappingRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            employeeCompMappingRepository = _employeeCompMappingRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("staff/{staffId}")]
        public async Task<IActionResult> GetAllGroupsAsync(int staffId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await employeeCompMappingRepository.GetComponentsAsync(staffId, instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddEmployeeCompMapping addGroupAc)
        {
           return Ok(await employeeCompMappingRepository.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{componentGroupId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int componentGroupId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.ComponentGroups.FirstOrDefaultAsync(x => x.Id == componentGroupId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Employee Component Mapping Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateEmployeeCompMapping updateComponentGroupAc)
        {
            if (updateComponentGroupAc.ComponentId == 0)
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Employee Component Mapping Component can't be null or empty"
                });
            else if (updateComponentGroupAc.ComponentTypeId == 0)
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Employee Component Mapping component type can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.EmployeeCompMappings.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await employeeCompMappingRepository.UpdateComponentAsync(updateComponentGroupAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Employee Component Mapping not found" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompMappingAsync(int id)
        {
            var comp = await iMSDbContext.EmployeeCompMappings.FirstAsync(x => x.Id == id);
            iMSDbContext.Remove(comp);
            await iMSDbContext.SaveChangesAsync();
            return Ok(new SharedLookUpResponse()
            {
                HasError = false,
                Message = "Employee Component Mapping deleted successfully!"
            });
        }
        #endregion
    }
}
