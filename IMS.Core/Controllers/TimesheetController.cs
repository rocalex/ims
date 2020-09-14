using IMS.DomainModel.ApplicationClasses.Payroll.TimesheetManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Payroll.TimesheetManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class TimesheetController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly ITimesheetManagementRepository timesheetManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public TimesheetController(
            ITimesheetManagementRepository _timesheetManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            timesheetManagementRepository = _timesheetManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpPost("{staffId}")]
        public async Task<IActionResult> GetAllGroupsAsync([FromBody]DateTime dateTime, int staffId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await timesheetManagementRepository.GetComponentAsync(staffId, dateTime, instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddTimesheet[] addGroupAc)
        {
                return Ok(await timesheetManagementRepository.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{staffId}/{month}")]
        public async Task<IActionResult> GetTimesheetByMonthAsync(int staffId, int month)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await timesheetManagementRepository.GetTimesheetsByMonthAsync(staffId, month, instituteId));
        }

        [HttpGet("{componentGroupId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int componentGroupId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.Timesheets.FirstOrDefaultAsync(x => x.Id == componentGroupId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Component Group Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateTimesheet updateComponentGroupAc)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (await iMSDbContext.Timesheets.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
            {
                return Ok(await timesheetManagementRepository.UpdateComponentAsync(updateComponentGroupAc, instituteId));
            }
            else
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Timesheet entry not found" });
        }
        #endregion
    }
}
