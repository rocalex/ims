using IMS.DomainModel.ApplicationClasses.Library.ExamPaperManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Library.ExamPaperManagement
{
    public interface IExamManagementRepository
    {
        Task<SharedLookUpResponse> AddExamPaperAsync(AddExam addExamPaper, int instituteId);

        Task<List<ExamPaper>> GetExamPapersAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateExamPaperAsync(UpdateExam updateExam, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
