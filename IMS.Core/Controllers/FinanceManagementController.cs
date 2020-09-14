using IMS.DomainModel.ApplicationClasses.FinanceManagement;
using IMS.DomainModel.Models;
using IMS.Repository.FinanceManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class FinanceManagementController : BaseController
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFinanceManagementRepository _financeManagementRepository;

        #endregion

        #region Constructor

        public FinanceManagementController(UserManager<ApplicationUser> userManager,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IFinanceManagementRepository financeManagementRepository)
            : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _financeManagementRepository = financeManagementRepository;
        }

        #endregion

        #region Public methods

        #region Chart of Accounts

        [HttpGet("chartofaccounts")]
        public async Task<IActionResult> GetChartOfAccountsListAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.GetChartOfAccountsListAsync(currentUserInstituteId));
        }

        [HttpGet("chartofaccounts/{chartOfAccountId}")]
        public async Task<IActionResult> GetChartOfAccountByIdAsync(int chartOfAccountId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.GetChartOfAccountByIdAsync(currentUserInstituteId, chartOfAccountId));
        }

        [HttpGet("chartofaccounts/parents")]
        public async Task<IActionResult> GetParentChartOfAccountsListAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.GetParentChartOfAccountsListAsync(currentUserInstituteId));
        }

        [HttpPost("chartofaccounts")]
        public async Task<IActionResult> AddNewChartOfAccountAsync([FromBody] FinanceChartOfAccounts newChartOfAccount)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _financeManagementRepository.AddNewChartOfAccountAsync(currentUserInstituteId, newChartOfAccount, currentUser));
        }

        [HttpPut("chartofaccounts")]
        public async Task<IActionResult> UpdateChartOfAccountAsync([FromBody] FinanceChartOfAccounts updatedChartOfAccount)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _financeManagementRepository.UpdateChartOfAccountAsync(currentUserInstituteId, updatedChartOfAccount, currentUser));
        }

        #endregion

        #region Basic receipts

        [HttpGet("receipt/initial")]
        public async Task<IActionResult> GetFinanceReceiptCreationInitialDataAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _financeManagementRepository.GetFinanceReceiptCreationInitialDataAsync(currentUserInstituteId, currentUser));
        }

        [HttpGet("receipt")]
        public async Task<IActionResult> GetFinanceReceiptsListAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.GetFinanceReceiptsListAsync(currentUserInstituteId));
        }

        [HttpGet("receipt/{financeReceiptId}")]
        public async Task<IActionResult> GetFinanceReceiptByIdAsync(int financeReceiptId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.GetFinanceReceiptByIdAsync(currentUserInstituteId, financeReceiptId));
        }

        [HttpPost("receipt")]
        public async Task<IActionResult> AddNewFinancialReceiptAsync([FromBody] FinanceReceipt addedFinanceReceipt)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _financeManagementRepository.AddNewFinancialReceiptAsync(currentUserInstituteId, currentUser, addedFinanceReceipt));
        }

        [HttpPut("receipt")]
        public async Task<IActionResult> UpdateFinanceReceiptAsync([FromBody] FinanceReceipt updatedFinanceReceipt)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.UpdateFinanceReceiptAsync(currentUserInstituteId, updatedFinanceReceipt));
        }

        #endregion

        #region Basic payments

        [HttpGet("payment/initial")]
        public async Task<IActionResult> GetFinancePaymentCreationInitialDataAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _financeManagementRepository.GetFinancePaymentCreationInitialDataAsync(currentUserInstituteId, currentUser));
        }

        [HttpGet("payment")]
        public async Task<IActionResult> GetAllFinancePaymentsAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.GetAllFinancePaymentsAsync(currentUserInstituteId));
        }

        [HttpGet("payment/{financePaymentId}")]
        public async Task<IActionResult> GetFinancePaymentByIdAsync(int financePaymentId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.GetFinancePaymentByIdAsync(currentUserInstituteId, financePaymentId));
        }

        [HttpPost("payment")]
        public async Task<IActionResult> AddNewFinancePaymentAsync([FromBody] FinancePayment addedFinancePayment)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _financeManagementRepository.AddNewFinancePaymentAsync(currentUserInstituteId, currentUser, addedFinancePayment));
        }

        [HttpPut("payment")]
        public async Task<IActionResult> UpdateFinancePaymentAsync([FromBody] FinancePayment updatedFinancePayment)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.UpdateFinancePaymentAsync(currentUserInstituteId, updatedFinancePayment));
        }

        #endregion

        #region Payment types

        [HttpGet("paymenttypes")]
        public async Task<IActionResult> GetAllPaymentTypesAsync()
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _financeManagementRepository.GetAllPaymentTypesAsync(currentUserInstituteId, currentUser));
        }

        [HttpGet("paymenttypes/{paymentTypeId}")]
        public async Task<IActionResult> GetPaymentTypeByIdAsync(int paymentTypeId)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.GetPaymentTypeByIdAsync(paymentTypeId, currentUserInstituteId));
        }

        [HttpPost("paymenttypes")]
        public async Task<IActionResult> AddNewPaymentTypeAsync([FromBody] FinancePaymentType addedPaymentType)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _financeManagementRepository.AddNewPaymentTypeAsync(currentUserInstituteId, currentUser, addedPaymentType));
        }

        [HttpPut("paymenttypes")]
        public async Task<IActionResult> UpdatePaymentTypeAsync([FromBody] FinancePaymentType updatedPaymentType)
        {
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _financeManagementRepository.UpdatePaymentTypeAsync(currentUserInstituteId, updatedPaymentType));
        }

        #endregion

        #endregion
    }
}
