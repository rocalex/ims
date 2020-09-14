using IMS.DomainModel.ApplicationClasses.MarkManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS.Utility.InstituteUserMappingHelper;

namespace IMS.Repository.MarkManagement
{
    public class MarkManagementRepository : IMarkManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public MarkManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        #region Exam Definition
        /// <summary>
        /// Method to add Exam Definition - SS
        /// </summary>
        /// <param name="addExamDefinition">name of Exam Definition</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddExamDefinitionAsync(AddExamDefinitionAc addExamDefinition, int instituteId)
        {
            if (!await _iMSDbContext.ExamDefinitions.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addExamDefinition.Code.ToLowerInvariant()))
            {
                var examDefinition = new ExamDefinition()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addExamDefinition.Name,
                    Code = addExamDefinition.Code,
                    Description = addExamDefinition.Description,
                    Status = true
                };
                _iMSDbContext.ExamDefinitions.Add(examDefinition);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Exam definition added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Exam definition with the same name is already exist" };
        }

        /// <summary>
        /// Method to get list of ExamDefinition by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<ExamDefinition>> GetAllExamDefinitionAsync(int instiuteId)
        {
            return (await _iMSDbContext.ExamDefinitions.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update ExamDefinition - SS
        /// </summary>
        /// <param name="updateExamDefinitionManagement">ExamDefinition detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateExamDefinitionAsync(UpdateExamDefinitionAc updateExamDefinitionManagement, int instituteId)
        {
            var examDefinitions = await _iMSDbContext.ExamDefinitions.Where(x => x.InstituteId == instituteId && x.Id != updateExamDefinitionManagement.ExamDefinitionId).ToListAsync();
            var isDuplicate = examDefinitions.Any(x => x.Code.ToLowerInvariant() == updateExamDefinitionManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of exam definition. Please use unique code" };
            else
            {
                var examDefinition = await _iMSDbContext.ExamDefinitions.FirstAsync(x => x.Id == updateExamDefinitionManagement.ExamDefinitionId);
                examDefinition.Name = updateExamDefinitionManagement.Name;
                examDefinition.Code = updateExamDefinitionManagement.Code;
                examDefinition.Description = updateExamDefinitionManagement.Description;
                examDefinition.Status = updateExamDefinitionManagement.Status;
                _iMSDbContext.ExamDefinitions.Update(examDefinition);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Exam definition updated successfully" };
            }
        }
        #endregion

        #region Class Exam
        /// <summary>
        /// Method to add class exam - SS
        /// </summary>
        /// <param name="addClassExam">class exam</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<ClassExamResponse> AddClassExamAsync(AddClassExamAc addClassExam, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            if (!await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == addClassExam.ClassId && x.InstituteId == instituteId))
                return new ClassExamResponse() { HasError = true, Message = "Class not found", ErrorType = ClassExamResponseType.ClassId };
            else if (!await _iMSDbContext.Sections.AnyAsync(x => x.Id == addClassExam.SectionId && x.InstituteId == instituteId))
                return new ClassExamResponse() { HasError = true, Message = "Section not found", ErrorType = ClassExamResponseType.SectionId };
            else if (!await _iMSDbContext.ExamDefinitions.AnyAsync(x => x.Id == addClassExam.ExamId && x.InstituteId == instituteId))
                return new ClassExamResponse() { HasError = true, Message = "Exam not found", ErrorType = ClassExamResponseType.ExamId };
            else
            {
                var subjectIds = addClassExam.ClassExamSubjectMappings.Select(x => x.SubjectId).Distinct().ToList();
                var subjectCount = await _iMSDbContext.InstituteSubjects.CountAsync(x => subjectIds.Contains(x.Id));
                if (subjectIds.Count != subjectCount)
                    return new ClassExamResponse() { HasError = true, Message = "Subject not found", ErrorType = ClassExamResponseType.SubjectId };
                else
                {
                    var classExam = new ClassExam()
                    {
                        ClassId = addClassExam.ClassId,
                        CreatedOn = DateTime.UtcNow,
                        ExamId = addClassExam.ExamId,
                        SectionId = addClassExam.SectionId,
                        TotalAttendanceDays = addClassExam.TotalAttendanceDays,
                        UpdatedById = loggedInUser.Id,
                        UpdatedOn = DateTime.UtcNow
                    };
                    _iMSDbContext.ClassExams.Add(classExam);
                    await _iMSDbContext.SaveChangesAsync();
                    List<ClassExamSubjectMapping> classExamSubjects = new List<ClassExamSubjectMapping>();
                    foreach (var subject in addClassExam.ClassExamSubjectMappings)
                    {
                        classExamSubjects.Add(new ClassExamSubjectMapping()
                        {
                            ClassExamId = classExam.Id,
                            Content = subject.Content,
                            CreatedOn = DateTime.UtcNow,
                            EndTime = subject.EndTime,
                            MaxScore = subject.MaxScore,
                            MinScore = subject.MinScore,
                            Remark = subject.Remark,
                            StartDate = subject.StartDate,
                            StartTime = subject.StartTime,
                            SubjectId = subject.SubjectId
                        });
                    }
                    _iMSDbContext.ClassExamSubjectMappings.AddRange(classExamSubjects);
                    await _iMSDbContext.SaveChangesAsync();
                    return new ClassExamResponse() { HasError = false, Message = "Class exam detail added successfully" };
                }
            }
        }

        /// <summary>
        /// Method to get list of exam classes - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of class exam</returns>
        public async Task<List<ClassExam>> GetAllClassExamsAsync(int instituteId)
        {
            return (await _iMSDbContext.ClassExams.Include(s=>s.Class).Include(s => s.Section).Include(s => s.Exam)
                .Where(x => x.Exam.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update class exam - SS
        /// </summary>
        /// <param name="updateClassExam">class exam</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<ClassExamResponse> UpdateClassExamResponseAsync(UpdateClassExamAc updateClassExam, ApplicationUser loggedInUser)
        {
            var subjectIds = updateClassExam.ClassExamSubjectMappings.Select(x => x.SubjectId).Distinct().ToList();
            var subjectCount = await _iMSDbContext.InstituteSubjects.CountAsync(x => subjectIds.Contains(x.Id));
            if (subjectIds.Count != subjectCount)
                return new ClassExamResponse() { HasError = true, Message = "Subject not found", ErrorType = ClassExamResponseType.SubjectId };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var classExam = await _iMSDbContext.ClassExams.FirstOrDefaultAsync(x => x.Id == updateClassExam.ClassExamId && x.Exam.InstituteId == instituteId);
                if (classExam == null)
                    return new ClassExamResponse() { HasError = true, Message = "Class exam not found", ErrorType = ClassExamResponseType.ClassExamId };
                else
                {
                    classExam.TotalAttendanceDays = updateClassExam.TotalAttendanceDays;
                    classExam.UpdatedById = loggedInUser.Id;
                    classExam.UpdatedOn = DateTime.UtcNow;
                    var subjects = await _iMSDbContext.ClassExamSubjectMappings.Where(x => x.ClassExamId == classExam.Id).ToListAsync();
                    _iMSDbContext.ClassExamSubjectMappings.RemoveRange(subjects);
                    _iMSDbContext.ClassExams.Update(classExam);
                    await _iMSDbContext.SaveChangesAsync();
                    List<ClassExamSubjectMapping> classExamSubjects = new List<ClassExamSubjectMapping>();
                    foreach (var subject in updateClassExam.ClassExamSubjectMappings)
                    {
                        classExamSubjects.Add(new ClassExamSubjectMapping()
                        {
                            ClassExamId = classExam.Id,
                            Content = subject.Content,
                            CreatedOn = DateTime.UtcNow,
                            EndTime = subject.EndTime,
                            MaxScore = subject.MaxScore,
                            MinScore = subject.MinScore,
                            Remark = subject.Remark,
                            StartDate = subject.StartDate,
                            StartTime = subject.StartTime,
                            SubjectId = subject.SubjectId
                        });
                    }
                    _iMSDbContext.ClassExamSubjectMappings.AddRange(classExamSubjects);
                    await _iMSDbContext.SaveChangesAsync();
                    return new ClassExamResponse() { HasError = false, Message = "Class exam detail updated successfully" };
                }
            }
        }
        #endregion

        #region Exam Score Entry
        /// <summary>
        /// Method to add or update exam score - SS
        /// </summary>
        /// <param name="addExamScoreEntrys">list of score</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<ExamScoreEntryResponse> AddOrUpdateExamScoreEntryAsync(List<AddExamScoreEntryAc> addExamScoreEntrys, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var studentIds = addExamScoreEntrys.Select(x => x.StudentId).Distinct().ToList();
            var studentCount = await _iMSDbContext.StudentBasicInformation.CountAsync(x => studentIds.Contains(x.Id) && x.InstituteId == instituteId);
            if (studentIds.Count != studentCount)
                return new ExamScoreEntryResponse() { HasError = true, Message = "Student not found", ErrorType = ExamScoreEntryResponseType.StudentId };
            else
            {
                var subjectIds = addExamScoreEntrys.Select(x => x.SubjectId).Distinct().ToList();
                var subjectCount = await _iMSDbContext.InstituteSubjects.CountAsync(x => subjectIds.Contains(x.Id) && x.InstituteId == instituteId);
                if (subjectIds.Count != subjectCount)
                    return new ExamScoreEntryResponse() { HasError = true, Message = "Subject not found", ErrorType = ExamScoreEntryResponseType.SubjectId };
                else
                {
                    var examIds = addExamScoreEntrys.Select(x => x.ExamId).Distinct().ToList();
                    var examCount = await _iMSDbContext.InstituteSubjects.CountAsync(x => examIds.Contains(x.Id) && x.InstituteId == instituteId);
                    if (examIds.Count != examCount)
                        return new ExamScoreEntryResponse() { HasError = true, Message = "Exam not found", ErrorType = ExamScoreEntryResponseType.ExamId };
                    else
                    {
                        var scores = await _iMSDbContext.ExamScoreEntrys.Where(x => studentIds.Contains(x.StudentId)
                        && subjectIds.Contains(x.StudentId) && examIds.Contains(x.ExamId)).ToListAsync();
                        _iMSDbContext.ExamScoreEntrys.RemoveRange(scores);
                        await _iMSDbContext.SaveChangesAsync();
                        List<ExamScoreEntry> examScoreEntries = new List<ExamScoreEntry>();
                        foreach (var score in addExamScoreEntrys)
                        {
                            examScoreEntries.Add(new ExamScoreEntry()
                            {
                                CreatedOn = DateTime.UtcNow,
                                ExamId = score.ExamId,
                                StudentId = score.StudentId,
                                SubjectId = score.SubjectId,
                                Mark = score.Mark,
                                UpdatedById = loggedInUser.Id,
                                UpdatedOn = DateTime.UtcNow
                            });
                        }
                        _iMSDbContext.ExamScoreEntrys.AddRange(examScoreEntries);
                        await _iMSDbContext.SaveChangesAsync();
                        return new ExamScoreEntryResponse() { HasError = false, Message = "Student score updated successfully" };
                    }
                }
            }
        }

        /// <summary>
        /// Method to get score by exam id - SS
        /// </summary>
        /// <param name="examId">exam id</param>
        /// <param name="institueId">institue id</param>
        /// <returns>list of scores</returns>
        public async Task<List<ExamScoreEntry>> GetExamScoreEntriesAsync(int examId, int institueId)
        {
            return (await _iMSDbContext.ExamScoreEntrys.Where(x => x.ExamId == examId && x.Exam.Exam.InstituteId == institueId).ToListAsync());
        }
        #endregion
        #endregion
    }
}
