using IMS.DomainModel.ApplicationClasses.Hostel.DailyExpenseManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.DailyExpenseManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using IMS.Utility.ImageStorageHelper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using System.Linq;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class DailyExpenseController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IDailyExpenseManagementRepository dailyExpenseManagementRepository;
        private readonly IImageStorageHelperService _imageStorageHelperService;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public DailyExpenseController(
            IDailyExpenseManagementRepository _dailyExpenseManagementRepository,
            IImageStorageHelperService imageStorageHelperService,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            _imageStorageHelperService = imageStorageHelperService;
            dailyExpenseManagementRepository = _dailyExpenseManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpPost("list")]
        public async Task<IActionResult> GetAllGroupsAsync([FromBody]SearchDailyExpenseRequest request)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await dailyExpenseManagementRepository.GetComponentsAsync(instituteId, request));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddDailyExpense[] addGroupAc)
        {
            return Ok(await dailyExpenseManagementRepository.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("summary/{messManageId}")]
        public async Task<IActionResult> GetSummaryAsync(int messManageId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            try
            {
                var dailyExpenses = await iMSDbContext.DailyExpenses.Include(s => s.ExpenseType).Where(x => x.InstituteId == instituteId && x.MessManageId == messManageId).ToListAsync();
                var total = 0;
                foreach(DailyExpense dailyExpense in dailyExpenses)
                {
                    total += dailyExpense.Amount;
                }
                var expenseType = dailyExpenses[0].ExpenseType;
                var messManages = await iMSDbContext.MessManageStudentMappings.Where(x => x.MessManageId == messManageId && x.InstituteId == instituteId).ToListAsync();
                var studentAmount = messManages.Count;
                return Ok(new
                {
                    TotalExpenditure = total,
                    StudentAmount = studentAmount,
                    ExpenseType = expenseType
                });

            }
            catch (Exception error)
            {
                return Ok(new
                {
                    TotalExpenditure = 0,
                    StudentAmount = 0
                });
            }
        }

        [HttpPost("uploadproof")]
        public async Task<IActionResult> UploadProofFilesAsync()
        {
            var fileInfo = Request.Form["fileInfo"];

            JArray fileInfos = JArray.Parse(fileInfo);
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var instituteName = (await iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var files = Request.Form.Files;
            var index = 0;
            foreach (JObject o in fileInfos.Children<JObject>())
            {
                var id = 0;
                var name = "";
                foreach (JProperty p in o.Properties())
                {
                    var key = p.Name;
                    if(key == "id")
                    {
                        id = (int)p.Value;
                    }
                    else
                    {
                        name = (string)p.Value;
                    }

                    var image = await _imageStorageHelperService.UploadSingleFileAsync(files[index], instituteName, "Book");
                    if (!string.IsNullOrWhiteSpace(image))
                    {
                        var dailyExpense = await iMSDbContext.DailyExpenses.FirstAsync(x => x.Id == id);
                        if (!string.IsNullOrEmpty(dailyExpense.ProofUrl))
                            System.IO.File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", dailyExpense.ProofUrl));
                        dailyExpense.ProofUrl = image;
                        iMSDbContext.DailyExpenses.Update(dailyExpense);
                        await iMSDbContext.SaveChangesAsync();
                    }
                }
            }
            return Ok(new { HasError = false, Message = "Updated successfully" });
        }
        #endregion
    }
}
