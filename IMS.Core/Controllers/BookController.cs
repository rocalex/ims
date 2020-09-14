using IMS.DomainModel.ApplicationClasses.Library.BookManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Library.BookManagement;
using IMS.Repository.Library.PublisherManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class BookController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IBookManagementRepository bookManagementRepository;
        private readonly IPublisherManagementRepository publisherManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public BookController(
            IBookManagementRepository _bookManagementRepository,
            IPublisherManagementRepository _publisherManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            bookManagementRepository = _bookManagementRepository;
            publisherManagementRepository = _publisherManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public Methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllBooksAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await bookManagementRepository.GetBooksAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddBookRequest addGroupAc)
        {
            var addBook = addGroupAc.AddBook;
            var addPublisher = addGroupAc.AddPublisher;
            if(string.IsNullOrEmpty(addPublisher.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Publisher name can't be null or empty"
                });
            else if(string.IsNullOrEmpty(addPublisher.Email.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Publisher email can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addBook.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Component Group name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addBook.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Component Group code can't be null or empty"
                });
            else
            {
                var publisherId = await publisherManagementRepository.AddPublisherAsync(addPublisher);
                return Ok(await bookManagementRepository.AddBookAsync(addBook, publisherId, await GetUserCurrentSelectedInstituteIdAsync()));
            }
        }

        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetBookDetailById(int bookId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.Books.Include(s => s.Publisher).Include(s => s.BookType).FirstOrDefaultAsync(x => x.Id == bookId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Book Not found" });
        }

        [HttpPost("image/{bookId}")]
        public async Task<IActionResult> AddOrUpdateStaffImageAsync(int bookId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            await bookManagementRepository.AddOrUpdateStaffImageAsync(Request.Form.Files, bookId, loggedInUserInstituteId);
            return Ok();
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateBookAsync([FromBody]UpdateBookRequest updateComponentGroupAc)
        {
            var updatePublisher = updateComponentGroupAc.UpdatePublisher;
            var updateBook = updateComponentGroupAc.UpdateBook;

            if (string.IsNullOrEmpty(updatePublisher.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Publisher name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updatePublisher.Email.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Publisher name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateBook.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Book name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateBook.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Book code can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                await publisherManagementRepository.UpdatePublisherAsync(updatePublisher);
                if (await iMSDbContext.Books.AnyAsync(x => x.Id == updateBook.Id && x.InstituteId == instituteId))
                {
                    return Ok(await bookManagementRepository.UpdateBookAsync(updateBook, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Book not found" });
            }
        }

        [HttpDelete("{bookId}")]
        public async Task<IActionResult> DeleteAsync(int bookId)
        {
            var book = await iMSDbContext.Books.FirstAsync(x => x.Id == bookId);
            iMSDbContext.Books.Remove(book);
            await iMSDbContext.SaveChangesAsync();
            return Ok(new SharedLookUpResponse() { HasError = false, Message = "Book Deleted successfully" });
        }
        #endregion
    }
}
