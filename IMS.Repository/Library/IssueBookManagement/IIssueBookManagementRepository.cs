using IMS.DomainModel.ApplicationClasses.Library.IssueBookManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace IMS.Repository.Library.IssueBookManagement
{
    public interface IIssueBookManagementRepository
    {
        Task<SharedLookUpResponse> AddIssueBookAsync(AddIssueBook addIssueBook, int institudeId);

        Task<List<IssueBook>> GetIssueBooksAync(int instituteId);

        Task<SharedLookUpResponse> UpdateIssueBookAsync(UpdateIssueBook updateIssueBook, int instituteId);

        Task<SharedLookUpResponse> DeleteIssueBookAsync(int issueBookId);

        Task<SharedLookUpResponse> ReturnIssueBookAsync(int issueBookId, int fine, DateTime returnDate);

        Task<List<IssueBook>> GetIssueBooksByBookIdAsync(int bookId, int instituteId);

        Task<List<IssueBook>> GetIssueBooksByUserAsync(int userType, int userId, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
