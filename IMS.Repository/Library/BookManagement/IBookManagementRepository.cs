using IMS.DomainModel.ApplicationClasses.Library.BookManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Library.BookManagement
{
    public interface IBookManagementRepository
    {
        Task<AddBookReply> AddBookAsync(AddBookAc addComponent, int publisherId, int institudeId);

        Task<List<Book>> GetBooksAsync(int instituteId);

        Task<int> IssueBookAsync(int bookId);

        Task<int> ReturnBookAsync(int bookId);

        Task AddOrUpdateStaffImageAsync(IFormFileCollection files, int studentId, int instituteId);

        Task<AddBookReply> UpdateBookAsync(UpdateBookAc updateComponentAc, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
