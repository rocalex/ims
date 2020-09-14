using IMS.DomainModel.ApplicationClasses.Library.IssueBookManagement;
using IMS.DomainModel.ApplicationClasses.Library.ReturnBookManagement;
using IMS.Repository.Library.BookManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Library.IssueBookManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class IssueBookController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IIssueBookManagementRepository issueBookManagementRepository;
        private readonly IBookManagementRepository bookManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public IssueBookController(
            IIssueBookManagementRepository _issueBookManagementRepository,
            IBookManagementRepository _bookManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            issueBookManagementRepository = _issueBookManagementRepository;
            bookManagementRepository = _bookManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllIssueBooksAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await issueBookManagementRepository.GetIssueBooksAync(instituteId));
        }

        [HttpGet("initial")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var books = await iMSDbContext.Books.Where(x => x.InstituteId == instituteId).ToListAsync();
            var staff = await iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var student = await iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == instituteId).ToListAsync();

            return Ok(new { Books = books, Staffs = staff, Students = student });
        }

        [HttpPost("")]
        public async Task<IActionResult> AddIssueBookAsync([FromBody]AddIssueBook addGroupAc)
        {
            if (addGroupAc.IssueDate == null)
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Issue date can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addGroupAc.RefNo.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Issue No can't be null or empty"
                });
            else
            {
                await bookManagementRepository.IssueBookAsync(addGroupAc.BookId);
                return Ok(await issueBookManagementRepository.AddIssueBookAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
            }
        }

        [HttpGet("availbook")]
        public async Task<IActionResult> GetAvailableBooksAsync()
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await iMSDbContext.BookTypes.Where(x => x.InstituteId == institudeId).ToListAsync());
        }

        [HttpGet("availuser")]
        public async Task<IActionResult> GetAvailableUsersAsync()
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var studentArray = await iMSDbContext.IssueBooks.GroupBy(x => x.Student).Select(x => new { Users = x.Key }).ToListAsync();
            var staffArray = await iMSDbContext.IssueBooks.GroupBy(x => x.Staff).Select(x => new { Users = x.Key }).ToListAsync();
            return Ok(new { Students = studentArray, Staffs = staffArray });
        }

        [HttpPost("return")]
        public async Task<IActionResult> ReturnBooksAsync([FromBody]ReturnBookRequest request)
        {
            for (var i = 0; i < request.ReturnBookList.Count; i++) {
                await bookManagementRepository.ReturnBookAsync(request.BookId);
                var x = request.ReturnBookList[i];
                await issueBookManagementRepository.ReturnIssueBookAsync(x.IssueBookId, x.Fine, x.ReturnDate);
            }

            return Ok(new { HasError = false, Message = "Return book success!" });
        }

        [HttpGet("book/{bookId}")]
        public async Task<IActionResult> GetIssueBooksByBookIdAsync(int bookId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await issueBookManagementRepository.GetIssueBooksByBookIdAsync(bookId, institudeId));
        }

        [HttpGet("user/{userType}/{userId}")]
        public async Task<IActionResult> GetIssueBooksByUserAsync(int userType, int userId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await issueBookManagementRepository.GetIssueBooksByUserAsync(userType, userId, institudeId));
        }

        [HttpGet("{issueId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int issueId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.IssueBooks.FirstOrDefaultAsync(x => x.Id == issueId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Issue book Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateIssueBook updateIssueBook)
        {
            if (updateIssueBook.IssueDate == null)
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Issue book name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateIssueBook.RefNo.Trim()))
                        return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Issue book no can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.IssueBooks.AnyAsync(x => x.Id == updateIssueBook.Id && x.InstituteId == instituteId))
                {
                    return Ok(await issueBookManagementRepository.UpdateIssueBookAsync(updateIssueBook, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Issue book not found" });
            }
        }

        [HttpDelete("{issueBookId}")]
        public async Task<IActionResult> DeleteAsync(int issueBookId)
        {
            await bookManagementRepository.ReturnBookAsync(issueBookId);
            return Ok(await issueBookManagementRepository.DeleteIssueBookAsync(issueBookId));
        }
        #endregion
    }
}
