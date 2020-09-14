using IMS.DomainModel.ApplicationClasses.Library.BookManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using IMS.DomainModel.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using IMS.Utility.ImageStorageHelper;
using System.IO;

namespace IMS.Repository.Library.BookManagement
{
    public class BookManagementRepository : IBookManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        private readonly IImageStorageHelperService _imageStorageHelperService;
        #endregion

        #region Constructor
        public BookManagementRepository(
            IImageStorageHelperService imageStorageHelperService,
            IMSDbContext _imsDbContext)
        {
            _imageStorageHelperService = imageStorageHelperService;
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<AddBookReply> AddBookAsync(AddBookAc addComponent, int publisherId, int institudeId)
        {
            if (!await iMSDbContext.Books.AnyAsync(x => x.InstituteId == institudeId && x.Code.ToLowerInvariant() == addComponent.Code.ToLowerInvariant()))
            {
                var book = new Book()
                {
                    Code = addComponent.Code,
                    Name = addComponent.Name,
                    ISBN = addComponent.ISBN,
                    Title = addComponent.Title,
                    BookTypeId = addComponent.BookTypeId,
                    AuthorName = addComponent.AuthorName,
                    Quantity = addComponent.Quantity,
                    Remaining = addComponent.Quantity,
                    PurchaseDate = addComponent.PurchaseDate,
                    Edition = addComponent.Edition,
                    Price = addComponent.Price,
                    Pages = addComponent.Pages,
                    BillNo = addComponent.BillNo,
                    ImageUrl = addComponent.ImageUrl,
                    PublisherId = publisherId,
                    InstituteId = institudeId
                };
                iMSDbContext.Books.Add(book);
                await iMSDbContext.SaveChangesAsync();
                return new AddBookReply() { HasError = false, Message = "Book added successfully", BookId = book.Id };
            }
            else
            {
                return new AddBookReply() { HasError = true, ErrorType = ResponseType.Code, Message = "Book with same code is already existed" };
            }
        }

        public async Task<int> IssueBookAsync(int bookid)
        {
            var book = await iMSDbContext.Books.FirstAsync(x => x.Id == bookid);
            book.Remaining = book.Remaining - 1;
            iMSDbContext.Books.Update(book);
            await iMSDbContext.SaveChangesAsync();
            return 1;
        }

        public async Task<List<Book>> GetBooksAsync(int instituteId)
        {
            return (await iMSDbContext.Books.Include(s => s.BookType).Include(s => s.Publisher).Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.ComponentGroups.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.ComponentGroups.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task AddOrUpdateStaffImageAsync(IFormFileCollection files, int bookId, int instituteId)
        {
            var instituteName = (await iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var image = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Book");
            if (image.Count != 0)
            {
                var book = await iMSDbContext.Books.FirstAsync(x => x.Id == bookId);
                if (!string.IsNullOrEmpty(book.ImageUrl))
                    File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", book.ImageUrl));
                book.ImageUrl = image[0];
                iMSDbContext.Books.Update(book);
                await iMSDbContext.SaveChangesAsync();
            }
        }

        public async Task<AddBookReply> UpdateBookAsync(UpdateBookAc updateComponentAc, int instituteId)
        {
            var books = await iMSDbContext.Books.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = books.Any(x => x.Code.ToLowerInvariant() == updateComponentAc.Code.ToLowerInvariant());
            if (isDuplicated)
                return new AddBookReply() { HasError = true, ErrorType = ResponseType.Code, Message = "Duplicate Code of Book, please use unique code" };
            else
            {
                var book = await iMSDbContext.Books.FirstAsync(x => x.Id == updateComponentAc.Id);
                book.Name = updateComponentAc.Name;
                book.Code = updateComponentAc.Code;
                book.ISBN= updateComponentAc.ISBN;
                book.Title = updateComponentAc.Title;
                book.BookTypeId = updateComponentAc.BookTypeId;
                book.AuthorName = updateComponentAc.AuthorName;
                book.Quantity = updateComponentAc.Quantity;
                book.PurchaseDate = updateComponentAc.PurchaseDate;
                book.Edition = updateComponentAc.Edition;
                book.Price = updateComponentAc.Price;
                book.Pages = updateComponentAc.Pages;
                book.BillNo = updateComponentAc.BillNo;
                book.ImageUrl = updateComponentAc.ImageUrl;
                book.PublisherId = updateComponentAc.PublisherId;
                book.InstituteId = instituteId;
                iMSDbContext.Books.Update(book);
                await iMSDbContext.SaveChangesAsync();
                return new AddBookReply() { HasError = false, Message = "Book updated successfully", BookId = book.Id };
            }
        }

        public async Task<int> ReturnBookAsync(int bookId)
        {
            var book = await iMSDbContext.Books.FirstAsync(x => x.Id == bookId);
            book.Remaining = book.Remaining + 1;
            iMSDbContext.Books.Update(book);
            await iMSDbContext.SaveChangesAsync();

            return 1;
        }
        #endregion
    }
}
