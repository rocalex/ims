using IMS.DomainModel.ApplicationClasses.Hostel.MessManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.MessManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class MessManageController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IMessManagementRepository messManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public MessManageController(
            IMessManagementRepository _messManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            messManagementRepository = _messManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpPost("hostel")]
        public async Task<IActionResult> GetAllGroupsAsync([FromBody]GetMessManageRequest request)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await messManagementRepository.GetComponentsAsync(instituteId, request.HostelId, request.FromDate, request.ToDate));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddRequest addGroupAc)
        {
            return Ok(await messManagementRepository.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("report/{messManageId}")]
        public async Task<IActionResult> GetReportByIdAsync(int messManageId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var mappings = await iMSDbContext.MessManageStudentMappings.Include(x => x.MessManage).Include(x => x.Student).Where(x => x.MessManageId == messManageId && x.InstituteId == instituteId).ToListAsync();

            var results = new List<dynamic>();

            var dailyExpenses = await iMSDbContext.DailyExpenses.Include(s => s.ExpenseType).Where(x => x.InstituteId == instituteId && x.MessManageId == messManageId).ToListAsync();
            var total = 0;
            foreach (DailyExpense dailyExpense in dailyExpenses)
            {
                total += dailyExpense.Amount;
            }
            if(mappings.Count > 0)
            {
                var perStudentRate = (int)(total / mappings.Count);
                foreach (MessManageStudentMapping mapping in mappings)
                {
                    results.Add(new
                    {
                        RollNo = mapping.Student.RollNumber,
                        FirstName = mapping.Student.FirstName,
                        MiddleName = mapping.Student.MiddleName,
                        LastName = mapping.Student.LastName,
                        CardNumber = mapping.CardNumber,
                        Duration = mapping.Duration,
                        PerStudentRate = perStudentRate,
                        Total = Int16.Parse(mapping.Duration) * perStudentRate
                    });
                }
            }
            return Ok(results);
        }

        [HttpGet("hostel/{hostelId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int hostelId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.MessManages.Where(x => x.HostelId == hostelId && x.InstituteId == institudeId).ToListAsync();
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Mess Manage Not found" });
        }
        #endregion
    }
}
