using IMS.DomainModel.ApplicationClasses.Hostel.ExpenseTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.ExpenseTypeManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class ExpenseTypeController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IExpenseTypeManagementRepository expenseTypeManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ExpenseTypeController(
            IExpenseTypeManagementRepository _expenseTypeManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            expenseTypeManagementRepository = _expenseTypeManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllGroupsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await expenseTypeManagementRepository.GetExpenseTypesAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddExpenseType addExpenseType)
        {
            if (string.IsNullOrEmpty(addExpenseType.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Expense Type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addExpenseType.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Expense Type code can't be null or empty"
                });
            else
                return Ok(await expenseTypeManagementRepository.AddExpenseTypeAsync(addExpenseType, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{expenseTypeId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int expenseTypeId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.ExpenseTypes.FirstOrDefaultAsync(x => x.Id == expenseTypeId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Expense Type Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateExpenseType updateExpenseType)
        {
            if (string.IsNullOrEmpty(updateExpenseType.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Expense Type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateExpenseType.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Expense Type code can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.ExpenseTypes.AnyAsync(x => x.Id == updateExpenseType.Id && x.InstituteId == instituteId))
                {
                    return Ok(await expenseTypeManagementRepository.UpdateExpenseTypeAsync(updateExpenseType, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Expense Type not found" });
            }
        }
        #endregion
    }
}
