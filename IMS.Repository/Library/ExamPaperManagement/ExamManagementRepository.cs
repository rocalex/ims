using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Library.ExamPaperManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Library.ExamPaperManagement
{
    public class ExamManagementRepository : IExamManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ExamManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddExamPaperAsync(AddExam addExamPaper, int instituteId)
        {
            if (!await iMSDbContext.ExamPapers.AnyAsync(x => x.InstituteId == instituteId && x.MappingId == addExamPaper.MappingId && x.PublisherName.ToLowerInvariant() == addExamPaper.PublisherName.ToLowerInvariant()))
            {
                var examPaper = new ExamPaper()
                {
                    InstituteId = instituteId,
                    PublisherName = addExamPaper.PublisherName,
                    Pages = addExamPaper.Pages,
                    Description = addExamPaper.Description,
                    MappingId = addExamPaper.MappingId,
                    AcademicYearId = addExamPaper.AcademicYearId
                };
                iMSDbContext.ExamPapers.Add(examPaper);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Examination Paper added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Examination Paper with same info is already existed" };
            }
        }

        public async Task<List<ExamPaper>> GetExamPapersAsync(int instituteId)
        {
            return (await iMSDbContext.ExamPapers.Include(s => s.Mapping).Include(s => s.Mapping.InstituteClass).Include(s => s.Mapping.InstituteSubject).Include(s => s.AcademicYear).Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.ExamPapers.ToListAsync();
            iMSDbContext.ExamPapers.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateExamPaperAsync(UpdateExam updateExam, int instituteId)
        {
            var examPapers = await iMSDbContext.ExamPapers.Where(x => x.InstituteId == instituteId && x.Id != updateExam.Id).ToListAsync();
            var isDuplicated = examPapers.Any(x => x.PublisherName.ToLowerInvariant() == updateExam.PublisherName.ToLowerInvariant() && x.MappingId == updateExam.MappingId);
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate info of Exmaination Paper, please use unique code" };
            else
            {
                var examPaper = await iMSDbContext.ExamPapers.FirstAsync(x => x.Id == updateExam.Id);
                examPaper.PublisherName = updateExam.PublisherName;
                examPaper.Pages = updateExam.Pages;
                examPaper.Description = updateExam.Description;
                examPaper.MappingId = updateExam.MappingId;
                examPaper.AcademicYearId = updateExam.AcademicYearId;
                examPaper.InstituteId = updateExam.InstituteId;
                iMSDbContext.ExamPapers.Update(examPaper);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Exmaination Paper updated successfully" };
            }
        }
        #endregion
    }
}
