using IMS.DomainModel.ApplicationClasses.Library.BookTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Library.BookTypeManagement;
using IMS.Repository.UserManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class BookTypeController : BaseController
    {
        #region private variables
        private const string BaseUrl = "api/[controller]";
        private readonly IBookTypeManagementRepository _bookTypeManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public BookTypeController(IBookTypeManagementRepository bookTypeManagementRepository,
            IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _bookTypeManagementRepository = bookTypeManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllBookTypesAsync()
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _bookTypeManagementRepository.GetAllBookTypeAsync(institudeId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddBookTypeAsync([FromBody]AddBookTypeAc addBookTypeAc)
        {
            if (string.IsNullOrEmpty(addBookTypeAc.Name.Trim()))
                return Ok(new SharedLookUpResponse(){
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Book Type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addBookTypeAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Book Type code can't be null or empty"
                });
            else
                return Ok(await _bookTypeManagementRepository.AddBookTypeAsync(addBookTypeAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{bookTypeId}")]
        public async Task<IActionResult> GetBookTypeDetailsByIdAsync(int bookTypeId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var BookType = await _iMSDbContext.BookTypes.FirstOrDefaultAsync(x => x.Id == bookTypeId && x.InstituteId == institudeId);
            if (BookType != null)
            {
                return Ok(BookType);
            }
            else
                return Ok(new { Message = "Book Type Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateBookTypeAsync([FromBody]UpdateBookTypeAc updateBookTypeAc)
        {
            if (string.IsNullOrEmpty(updateBookTypeAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Book Type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateBookTypeAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Book Type code can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.BookTypes.AnyAsync(x => x.Id == updateBookTypeAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await _bookTypeManagementRepository.UpdateBookTypeAsync(updateBookTypeAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Book Type not found" });
            }
        }
        #endregion
    }
}
