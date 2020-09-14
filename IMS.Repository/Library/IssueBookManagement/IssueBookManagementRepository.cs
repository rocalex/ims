using IMS.DomainModel.ApplicationClasses.Library.IssueBookManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Repository.Library.IssueBookManagement
{
    public class IssueBookManagementRepository : IIssueBookManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public IssueBookManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public methods
        public async  Task<SharedLookUpResponse> AddIssueBookAsync(AddIssueBook addIssueBook, int institudeId)
        {
            if (!await iMSDbContext.IssueBooks.AnyAsync(x => x.InstituteId == institudeId && x.BookId == addIssueBook.BookId && x.StudentId == addIssueBook.StudentId && x.StaffId == addIssueBook.StaffId))
            {
                var issueBook = new IssueBook()
                {
                    InstituteId = institudeId,
                    UserType = addIssueBook.UserType,
                    StudentId = addIssueBook.StudentId,
                    StaffId = addIssueBook.StaffId,
                    BookId = addIssueBook.BookId,
                    IssueDate = addIssueBook.IssueDate,
                    RefNo = addIssueBook.RefNo,
                    Status = 0,
                    Description = addIssueBook.Description
                };
                iMSDbContext.IssueBooks.Add(issueBook);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Issue Book added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Issue Book with same info is already existed" };
            }
        }

        public async Task<List<IssueBook>> GetIssueBooksAync(int instituteId)
        {
            return (await iMSDbContext.IssueBooks.Include(s => s.Staff).Include(s => s.Student).Include(s => s.Book).Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task<List<IssueBook>> GetIssueBooksByBookIdAsync(int bookId, int instituteId)
        {
            return (await iMSDbContext.IssueBooks.Include(s => s.Staff).Include(s => s.Student).Include(s => s.Book).Include(s => s.Book.BookType).Include(s => s.Book.Publisher).Where(x => x.InstituteId == instituteId && x.Book.BookTypeId == bookId).ToListAsync());
        }

        public async  Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.IssueBooks.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Description))
                    x.Description = x.Book.Name;
            });
            iMSDbContext.IssueBooks.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateIssueBookAsync(UpdateIssueBook updateIssueBook, int instituteId)
        {
            var issueBooks = await iMSDbContext.IssueBooks.Where(x => x.InstituteId == instituteId && x.Id != updateIssueBook.Id).ToListAsync();
            var isDuplicated = issueBooks.Any(x => x.BookId == updateIssueBook.BookId && x.StudentId == updateIssueBook.StudentId && x.StaffId == updateIssueBook.StaffId);
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate issue of same book, please use unique code" };
            else
            {
                var issueBook = await iMSDbContext.IssueBooks.FirstAsync(x => x.Id == updateIssueBook.Id);
                issueBook.UserType = updateIssueBook.UserType;
                issueBook.StudentId = updateIssueBook.StudentId;
                issueBook.BookId = updateIssueBook.BookId;
                issueBook.IssueDate = updateIssueBook.IssueDate;
                issueBook.RefNo = updateIssueBook.RefNo;
                issueBook.Description = updateIssueBook.Description;
                issueBook.StaffId = updateIssueBook.StaffId;
                iMSDbContext.IssueBooks.Update(issueBook);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Issue book entry updated successfully" };
            }
        }

        public async Task<SharedLookUpResponse> ReturnIssueBookAsync(int issueBookId, int fine, DateTime returnDate)
        {
            var issueBook = await iMSDbContext.IssueBooks.FirstAsync(x => x.Id == issueBookId);
            issueBook.Status = 1;
            issueBook.Fine = fine;
            issueBook.ReturnDate = returnDate;
            iMSDbContext.IssueBooks.Update(issueBook);
            await iMSDbContext.SaveChangesAsync();
            return new SharedLookUpResponse() { HasError = false, Message = "Issue Book Returned Successfully" };
        }

        public async Task<SharedLookUpResponse> DeleteIssueBookAsync(int issueBookId)
        {
            IssueBook issueBook = await iMSDbContext.IssueBooks.FirstOrDefaultAsync(x => x.Id == issueBookId);
            if (issueBook == null)
                return new SharedLookUpResponse { Message = "There is no Issue Book with this id", HasError = true, ErrorType = SharedLookUpResponseType.Code };
            else
            {
                iMSDbContext.IssueBooks.Remove(issueBook);
                await iMSDbContext.SaveChangesAsync();

                return new SharedLookUpResponse { HasError = false, Message = "Issue book deleted successfully" };
            }
        }

        public async Task<List<IssueBook>> GetIssueBooksByUserAsync(int userType, int userId, int instituteId)
        {
            if(userType == 0)
            {
                return (await iMSDbContext.IssueBooks.Include(s => s.Student).Include(s => s.Book).Include(s => s.Book.BookType).Include(s => s.Book.Publisher).Where(x => x.InstituteId == instituteId && x.StudentId == userId).ToListAsync());
            } 
            else
            {
                return (await iMSDbContext.IssueBooks.Include(s => s.Staff).Include(s => s.Book).Include(s => s.Book.BookType).Include(s => s.Book.Publisher).Where(x => x.InstituteId == instituteId && x.StaffId == userId).ToListAsync());
            }
        }

        #endregion
    }
}
