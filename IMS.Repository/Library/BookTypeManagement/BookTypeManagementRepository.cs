using IMS.DomainModel.ApplicationClasses.Library.BookTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.ConditionalFormatting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Library.BookTypeManagement
{
    public class BookTypeManagementRepository : IBookTypeManagementRepository
    {
        #region
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        public BookTypeManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }

        #region Public Methods
        public async Task<SharedLookUpResponse> AddBookTypeAsync(AddBookTypeAc addBookType, int instituteId)
        {
            if(!await _iMSDbContext.BookTypes.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addBookType.Code.ToLowerInvariant()))
            {
                var bookType = new BookType()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addBookType.Name,
                    Code = addBookType.Code,
                    Description = addBookType.Description,
                    Status = true
                };
                _iMSDbContext.BookTypes.Add(bookType);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Book Type added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Book type with same code is already existing" };
            }
        }

        public async Task<List<BookType>> GetAllBookTypeAsync(int instituteId)
        {
            return (await _iMSDbContext.BookTypes.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task<SharedLookUpResponse> UpdateBookTypeAsync(UpdateBookTypeAc updateBookTypeAc, int instituteId)
        {
            var bookTypes = await _iMSDbContext.BookTypes.Where(x => x.InstituteId == instituteId && x.Id != updateBookTypeAc.Id).ToListAsync();
            var isDuplicate = bookTypes.Any(x => x.Code.ToLowerInvariant() == updateBookTypeAc.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Blood group. Please use unique code" };
            else
            {
                var bookType = await _iMSDbContext.BookTypes.FirstAsync(x => x.Id == updateBookTypeAc.Id);
                bookType.Name = updateBookTypeAc.Name;
                bookType.Code = updateBookTypeAc.Code;
                bookType.Description = updateBookTypeAc.Description;
                bookType.Status = updateBookTypeAc.Status;
                _iMSDbContext.BookTypes.Update(bookType);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { Message = "Book Type updated successfully", HasError = false };
            }
        }

        public async Task MigratePreviousDataAsync()
        {
            var datas = await _iMSDbContext.BookTypes.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.BookTypes.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
