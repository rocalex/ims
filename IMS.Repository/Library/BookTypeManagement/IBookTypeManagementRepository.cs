using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Library.BookTypeManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Library.BookTypeManagement
{
    public interface IBookTypeManagementRepository
    {
        Task<SharedLookUpResponse> AddBookTypeAsync(AddBookTypeAc addBookType, int instituteId);

        Task<List<BookType>> GetAllBookTypeAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateBookTypeAsync(UpdateBookTypeAc updateBookTypeAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
