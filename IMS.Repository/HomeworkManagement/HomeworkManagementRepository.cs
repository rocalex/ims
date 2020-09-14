using EFCore.BulkExtensions;
using IMS.DomainModel.ApplicationClasses.CircularNoticeManagement;
using IMS.DomainModel.ApplicationClasses.EmailService;
using IMS.DomainModel.ApplicationClasses.HomeworkManagement;
using IMS.DomainModel.ApplicationClasses.NotificationManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.EmailService;
using IMS.Repository.NotificationManagement;
using IMS.Utility.InstituteUserMappingHelper;
using IMS.Utility.SmsService;
using Microsoft.EntityFrameworkCore;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.HomeworkManagement
{
    public class HomeworkManagementRepository : IHomeworkManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly ISmsService _smsService;
        private readonly IEmailService _emailService;
        private readonly INotificationManagementRepository _notificationManagementRepository;
        #endregion

        #region Constructor
        public HomeworkManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, ISmsService smsService, IEmailService emailService, INotificationManagementRepository notificationManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _smsService = smsService;
            _emailService = emailService;
            _notificationManagementRepository = notificationManagementRepository;
        }
        #endregion

        #region Public Method(s)

        /// <summary>
        /// Method to add or update homework - SS
        /// </summary>
        /// <param name="homeWork">home work</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<HomeworkManagementResponse> AddOrUpdateHomeworkAsync(AddHomeworkManagementAc homeWork, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            if (!await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.Id == homeWork.StaffId && x.InstituteId == instituteId))
                return new HomeworkManagementResponse() { Message = "Staff not found", HasError = true, ErrorType = HomeworkManagementReponseType.StaffId };
            else if (!await _iMSDbContext.InstituteClasses.AnyAsync(x => x.Id == homeWork.ClassId && x.InstituteId == instituteId))
                return new HomeworkManagementResponse() { Message = "Class not found", HasError = true, ErrorType = HomeworkManagementReponseType.ClassId };
            else if (!await _iMSDbContext.Sections.AnyAsync(x => x.Id == homeWork.SectionId && x.InstituteId == instituteId))
                return new HomeworkManagementResponse() { Message = "Section not found", HasError = true, ErrorType = HomeworkManagementReponseType.SectionId };
            else
            {
                var subjectIds = homeWork.HomeworkSubjectMappings.Select(x => x.SubjectId).Distinct().ToList();
                var subjectCount = await _iMSDbContext.InstituteClassSubjectMappings.CountAsync(x => subjectIds.Contains(x.SubjectId)
                && x.ClassId == homeWork.ClassId && x.FacultyId == homeWork.StaffId || x.AlternateFacultyId == homeWork.StaffId);
                if (subjectIds.Count != subjectCount)
                    return new HomeworkManagementResponse() { Message = "Subject not found", HasError = true, ErrorType = HomeworkManagementReponseType.SubjectId };
                else
                {
                    var homeworkTexts = homeWork.HomeworkSubjectMappings.Select(x => x.HomeworkData).ToList();
                    if (homeworkTexts.Any(x => string.IsNullOrEmpty(x.Trim())))
                        return new HomeworkManagementResponse() { Message = "Home can't be empty", HasError = true, ErrorType = HomeworkManagementReponseType.HomeworkData };
                    else
                    {
                        var homework = await _iMSDbContext.Homeworks.FirstOrDefaultAsync(x => x.ClassId == homeWork.ClassId
                        && x.StaffId == homeWork.StaffId && x.SectionId == homeWork.SectionId && x.HomeworkDate == homeWork.HomeworkDate);
                        if (homework == null)
                        {
                            homework = new Homework()
                            {
                                ClassId = homeWork.ClassId,
                                CreatedOn = DateTime.UtcNow,
                                HomeworkDate = homeWork.HomeworkDate,
                                SectionId = homeWork.SectionId,
                                StaffId = homeWork.StaffId,
                                UpdatedById = loggedInUser.Id,
                                UpdatedOn = DateTime.UtcNow
                            };
                            _iMSDbContext.Homeworks.Add(homework);
                            await _iMSDbContext.SaveChangesAsync();
                        }
                        else
                        {
                            homework.UpdatedById = loggedInUser.Id;
                            homework.UpdatedOn = DateTime.UtcNow;
                            _iMSDbContext.Homeworks.Update(homework);
                            await _iMSDbContext.SaveChangesAsync();
                            var previousHomeWorkSubjects = await _iMSDbContext.HomeworkSubjectMappings.Where(x => x.HomeworkId == homework.Id).ToListAsync();
                            if (previousHomeWorkSubjects.Count != 0)
                            {
                                using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                                {
                                    await _iMSDbContext.BulkDeleteAsync(previousHomeWorkSubjects);
                                    db.Commit();
                                }
                            }
                        }
                        List<HomeworkSubjectMapping> homeworkSubjects = new List<HomeworkSubjectMapping>();
                        foreach (var homeworkSubject in homeWork.HomeworkSubjectMappings)
                        {
                            homeworkSubjects.Add(new HomeworkSubjectMapping()
                            {
                                CreatedOn = DateTime.UtcNow,
                                HomeworkData = homeworkSubject.HomeworkData,
                                HomeworkId = homework.Id,
                                IsSelected = homeworkSubject.IsSelected,
                                SubjectId = homeworkSubject.SubjectId
                            });
                        }
                        using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                        {
                            await _iMSDbContext.BulkInsertAsync(homeworkSubjects);
                            db.Commit();
                        }

                        // Set bell notification
                        await SendBellNotificationOnHomewordCreation(homeWork, loggedInUser, instituteId);

                        return new HomeworkManagementResponse() { HasError = false, Message = "Homework updated successfully", Data = new { Id = homework.Id } };
                    }
                }
            }
        }

        /// <summary>
        /// Method to get homework - SS
        /// </summary>
        /// <param name="getHomework">get homework detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>home work detail</returns>
        public async Task<Homework> GetHomeworkAsync(GetHomeworkAc getHomework, int instituteId)
        {
            var homeWork = await _iMSDbContext.Homeworks.Include(s => s.HomeworkSubjectMappings).FirstOrDefaultAsync(x =>
              x.ClassId == getHomework.ClassId && x.StaffId == getHomework.StaffId && x.SectionId == getHomework.SectionId
              && x.Class.InstituteId == instituteId && x.HomeworkDate.Date == getHomework.Date.Date);
            if (homeWork != null)
                homeWork.HomeworkMessageMappings = await _iMSDbContext.HomeworkMessageMappings.Include(s => s.StudentRecieveHomeworkMessageMappings)
                    .Where(x => x.HomeworkId == homeWork.Id).ToListAsync();
            return homeWork;
        }

        /// <summary>
        /// Method to get homework - SS
        /// </summary>
        /// <param name="classId">class id</param>
        /// <param name="sectionId">section id</param>
        /// <param name="staffId">staff id</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>home work detail</returns>
        public async Task<List<Homework>> GetHomeworkAsync(int staffId, int classId, int sectionId, int instituteId)
        {
            var homeworks = await _iMSDbContext.Homeworks.Include(s => s.HomeworkSubjectMappings).Include(s => s.Staff).Where(x => x.ClassId == classId
              && x.StaffId == staffId && x.SectionId == sectionId && x.Class.InstituteId == instituteId).ToListAsync();
            foreach (var homework in homeworks)
            {
                homework.HomeworkMessageMappings = await _iMSDbContext.HomeworkMessageMappings.Include(s => s.StudentRecieveHomeworkMessageMappings)
                    .Where(x => x.HomeworkId == homework.Id).ToListAsync();
            }
            return homeworks;
        }

        /// <summary>
        /// Method to send homework message - SS
        /// </summary>
        /// <param name="homeworkMessage">homework message</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        public async Task<HomeworkManagementResponse> SendMessageAsync(AddHomeworkMessageMappingAc homeworkMessage, int instituteId)
        {
            if (string.IsNullOrEmpty(homeworkMessage.Message))
                return new HomeworkManagementResponse() { HasError = true, Message = "Message can't be empty", ErrorType = HomeworkManagementReponseType.Message };
            else
            {
                if (await _iMSDbContext.Homeworks.AnyAsync(x => x.Class.InstituteId == instituteId))
                {
                    var homeworkMessageMapping = new HomeworkMessageMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        Message = homeworkMessage.Message,
                        HomeworkId = homeworkMessage.HomeworkId,
                    };
                    _iMSDbContext.HomeworkMessageMappings.Add(homeworkMessageMapping);
                    await _iMSDbContext.SaveChangesAsync();
                    List<StudentRecieveHomeworkMessageMapping> messageMappings = new List<StudentRecieveHomeworkMessageMapping>();
                    foreach (var student in homeworkMessage.Students)
                    {
                        messageMappings.Add(new StudentRecieveHomeworkMessageMapping()
                        {
                            HomeworkMessageId = homeworkMessageMapping.Id,
                            StudentId = student.Id,
                            CreatedOn = DateTime.UtcNow,
                        });
                    }
                    if (messageMappings.Count != 0)
                        using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                        {
                            await _iMSDbContext.BulkInsertAsync(messageMappings);
                            db.Commit();
                        }
                    messageMappings = await _iMSDbContext.StudentRecieveHomeworkMessageMappings.Include(s => s.Student)
                        .Where(x => x.HomeworkMessageId == homeworkMessageMapping.Id).ToListAsync();
                    var recipients = string.Empty;
                    foreach (var user in messageMappings)
                    {
                        recipients += user.Student.MobileNumber;
                        recipients += ",";
                    }
                    await _smsService.SendSms(recipients, homeworkMessage.Message);
                    return new HomeworkManagementResponse() { HasError = false, Message = "Message send successfully" };
                }
                else
                    return new HomeworkManagementResponse() { HasError = true, Message = "Homework not found", ErrorType = HomeworkManagementReponseType.Id };
            }
        }

        /// <summary>
        /// Method to send mail for homework - SS
        /// </summary>
        /// <param name="homeworkMail">homework mail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        public async Task<HomeworkManagementResponse> SendMailAsync(AddHomeworkMailMappingAc homeworkMail, int instituteId)
        {
            if (string.IsNullOrEmpty(homeworkMail.Message))
                return new HomeworkManagementResponse() { HasError = true, Message = "Message can't be empty", ErrorType = HomeworkManagementReponseType.Message };
            else if (string.IsNullOrEmpty(homeworkMail.Subject))
                return new HomeworkManagementResponse() { HasError = true, Message = "Message can't be empty", ErrorType = HomeworkManagementReponseType.Subject };
            else
            {
                if (await _iMSDbContext.Homeworks.AnyAsync(x => x.Class.InstituteId == instituteId))
                {
                    var homeworkMailMapping = new HomeworkMailMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        HomeworkId = homeworkMail.HomeworkId,
                        Message = homeworkMail.Message,
                        Subject = homeworkMail.Subject
                    };
                    _iMSDbContext.HomeworkMailMappings.Add(homeworkMailMapping);
                    await _iMSDbContext.SaveChangesAsync();
                    List<StudentRecieveHomeworkMailMapping> mailMappings = new List<StudentRecieveHomeworkMailMapping>();
                    foreach (var student in homeworkMail.Students)
                    {
                        mailMappings.Add(new StudentRecieveHomeworkMailMapping()
                        {
                            HomeworkMailId = homeworkMailMapping.Id,
                            StudentId = student.Id,
                            CreatedOn = DateTime.UtcNow,
                        });
                    }
                    if (mailMappings.Count != 0)
                        using (var db = await _iMSDbContext.Database.BeginTransactionAsync())
                        {
                            await _iMSDbContext.BulkInsertAsync(mailMappings);
                            db.Commit();
                        }
                    mailMappings = await _iMSDbContext.StudentRecieveHomeworkMailMappings.Include(s => s.Student)
                        .Where(x => x.HomeworkMailId == homeworkMailMapping.Id).ToListAsync();
                    var tos = new List<EmailAddress>();
                    foreach (var user in mailMappings)
                    {
                        tos.Add(new EmailAddress() { Name = user.Student.FirstName, Address = user.Student.FamilyRelationEmail });
                    }
                    var emailConfiguration = await _iMSDbContext.AdministrationEmailConfigurations.Include(s => s.Institute)
                    .FirstOrDefaultAsync(x => x.InstituteId == instituteId);
                    if (emailConfiguration != null)
                    {
                        var path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
                        var engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
                        string resultFromFile = await engine.CompileRenderAsync("NotificationMail.cshtml", new CircularNoticeAc()
                        {
                            InstituteName = emailConfiguration.Institute.Name,
                            Message = homeworkMail.Message
                        });
                        var email = new EmailMessage()
                        {
                            Content = resultFromFile,
                            FromAddresses = new List<EmailAddress>() { new EmailAddress() { Name = emailConfiguration.Institute.Name, Address = emailConfiguration.MailUserName } },
                            Subject = "Homework",
                            ToAddresses = tos
                        };
                        _emailService.SendMail(email);
                    }
                    return new HomeworkManagementResponse() { HasError = false, Message = "Mail send successfully" };
                }
                else
                    return new HomeworkManagementResponse() { HasError = true, Message = "Homework not found", ErrorType = HomeworkManagementReponseType.Id };
            }
        }

        /// <summary>
        /// Method for fetching the list of all homeworks
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<List<Homework>> GetAllHomeworksAsync(int instituteId)
        {
            List<Homework> allHomeworks = await _iMSDbContext.Homeworks
                .Include(x => x.HomeworkSubjectMappings)
                .Include(x => x.Staff)
                .Where(x => x.Class.InstituteId == instituteId)
                .ToListAsync();

            foreach (Homework homework in allHomeworks)
            {
                homework.HomeworkMessageMappings = await _iMSDbContext.HomeworkMessageMappings
                    .Include(s => s.StudentRecieveHomeworkMessageMappings)
                    .Where(x => x.HomeworkId == homework.Id)
                    .ToListAsync();
            }

            return allHomeworks;
        }

        #endregion

        #region Private method

        /// <summary>
        /// Method for setting bell notification on creation of homeworks
        /// </summary>
        /// <param name="homeWork"></param>
        /// <param name="currentUser"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        private async Task SendBellNotificationOnHomewordCreation(AddHomeworkManagementAc homeWork, ApplicationUser currentUser, int instituteId)
        {
            StaffBasicPersonalInformation homeWorkCreatedByStaff = await _iMSDbContext.StaffBasicPersonalInformation
                .FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

            List<StudentBasicInformation> recipientStudentsList = await _iMSDbContext.StudentBasicInformation
                .Where(x => x.CurrentClassId == homeWork.ClassId && x.SectionId == homeWork.SectionId && x.IsActive && !x.IsArchived)
                .ToListAsync();

            NotificationAc notificationAc = new NotificationAc
            {
                NotificationMessage = "Homework",
                NotificationTo = null,
                NotificationUserMappingsList = new List<NotificationUserMappingAc>()
            };

            // For students
            notificationAc.NotificationDetails = string.Format("Homework: Complete assignment dated {0}", homeWork.HomeworkDate.ToString("dd-MM-yyyy"));
            foreach (StudentBasicInformation recipientStudent in recipientStudentsList)
            {
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = recipientStudent.UserId
                });
            }
            await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
            notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

            if(homeWorkCreatedByStaff != null)
            {
                InstituteClass instituteClass = await _iMSDbContext.InstituteClasses
                    .Include(x => x.Institute)
                    .FirstAsync(x => x.Id == homeWork.ClassId);

                // To self
                notificationAc.NotificationDetails = string.Format("You have added homework for {0}", instituteClass.Name);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = homeWorkCreatedByStaff.UserId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

                // To the admin
                notificationAc.NotificationDetails = string.Format("{0} has added homework for {1}", homeWorkCreatedByStaff.FirstName, instituteClass.Name);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = instituteClass.Institute.AdminId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();
            }
        }

        #endregion
    }
}
