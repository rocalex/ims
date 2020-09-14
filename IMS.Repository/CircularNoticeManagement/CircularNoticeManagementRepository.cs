using IMS.DomainModel.ApplicationClasses.CircularNoticeManagement;
using IMS.DomainModel.ApplicationClasses.EmailService;
using IMS.DomainModel.ApplicationClasses.NotificationManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.EventManagement;
using IMS.Repository.NotificationManagement;
using IMS.Repository.TemplateManagement;
using IMS.Utility.EmailService;
using IMS.Utility.EnumHelper;
using IMS.Utility.SmsService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit.Text;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.CircularNoticeManagement
{
    public class CircularNoticeManagementRepository : ICircularNoticeManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly SystemRoles _systemRoles;
        private readonly EmailConfiguration _emailConfiguration;
        private readonly ISmsService _smsService;
        private readonly IEmailService _emailService;
        private readonly INotificationManagementRepository _notificationManagementRepository;
        private readonly ITemplateManagementRepository _templateManagementRepository;
        private readonly TemplateManagementTypes _templateManagementTypes;
        private readonly IEventManagementRepository _eventManagementRepository;

        #endregion

        #region Constructor

        public CircularNoticeManagementRepository(IMSDbContext imsDbContext,
            IOptions<SystemRoles> systemRoles,
            IOptions<EmailConfiguration> emailConfiguration,
            ISmsService smsService,
            IEmailService emailService,
            INotificationManagementRepository notificationManagementRepository,
            ITemplateManagementRepository templateManagementRepository,
            IOptions<TemplateManagementTypes> templateManagementTypes,
            IEventManagementRepository eventManagementRepository)
        {
            _imsDbContext = imsDbContext;
            _systemRoles = systemRoles.Value;
            _emailConfiguration = emailConfiguration.Value;
            _smsService = smsService;
            _emailService = emailService;
            _notificationManagementRepository = notificationManagementRepository;
            _templateManagementRepository = templateManagementRepository;
            _templateManagementTypes = templateManagementTypes.Value;
            _eventManagementRepository = eventManagementRepository;
        }

        #endregion

        #region Public methods
        /// <summary>
        /// Method for fetching the list of all students for attendee - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<StudentBasicInformation>> GetAttendeeStudentsListAsync(int currentUserInstituteId)
        {
            List<StudentBasicInformation> studentsList = new List<StudentBasicInformation>();
            List<StudentBasicInformation> students = await _imsDbContext.StudentBasicInformation.Where(x => x.InstituteId == currentUserInstituteId && x.IsActive).ToListAsync();
            List<int> relievedStudents = await _imsDbContext.StudentRelievingMappings.Where(x => x.Student.InstituteId == currentUserInstituteId).Select(x => x.StudentId).ToListAsync();
            students.ForEach(x =>
            {
                if (!relievedStudents.Contains(x.Id))
                    studentsList.Add(x);
            });

            return studentsList;
        }

        /// <summary>
        /// Method for fetching the list of all system users for attendee - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<UserAc>> GetAttendeeSystemUsersListAsync(int currentUserInstituteId)
        {
            List<UserAc> systemUsersList = new List<UserAc>();
            List<ApplicationUser> usersList = await _imsDbContext.Users.ToListAsync();
            foreach (ApplicationUser user in usersList)
            {
                IdentityRole roleName = null;
                IdentityUserRole<string> userRoleMapping = await _imsDbContext.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);
                if (userRoleMapping != null)
                    roleName = await _imsDbContext.Roles.FirstAsync(x => x.Id == userRoleMapping.RoleId);

                if (roleName == null || !roleName.Name.ToLowerInvariant().Equals(_systemRoles.Roles[0].ToLowerInvariant()))
                {
                    Institute userInstitute = (await _imsDbContext.UserInstituteMappings.Include(x => x.Institute)
                        .FirstOrDefaultAsync(x => x.UserId.Equals(user.Id) && x.InstituteId == currentUserInstituteId))?.Institute;
                    systemUsersList.Add(new UserAc
                    {
                        Id = user.Id,
                        Name = user.Name,
                        InstituteId = userInstitute?.Id,
                        Institute = userInstitute?.Name,
                        Email = user.Email
                    });
                }
            }

            return systemUsersList;
        }

        /// <summary>
        /// Method for fetching the list of all circular/notice - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<CircularNoticeAc>> GetAllCircularNoticeAsync(int currentUserInstituteId)
        {
            List<CircularNotice> circularNoticeList = await _imsDbContext.CircularNotices
                .Where(x => x.InstituteId == currentUserInstituteId)
                .Include(x => x.CircularNoticeRecipients)
                .ToListAsync();

            List<CircularNoticeAc> circularNoticeAcList = new List<CircularNoticeAc>();

            foreach (CircularNotice circularNotice in circularNoticeList)
            {
                circularNoticeAcList.Add(new CircularNoticeAc
                {
                    Id = circularNotice.Id,
                    Description = circularNotice.Description,
                    Message = circularNotice.Message,
                    NoticeDate = circularNotice.NoticeDate,
                    NoticeTo = circularNotice.NoticeTo,
                    NoticeToString = EnumHelperService.GetDescription(circularNotice.NoticeTo),
                    NoticeType = circularNotice.NoticeType,
                    NoticeTypeString = EnumHelperService.GetDescription(circularNotice.NoticeType)
                });
            }

            return circularNoticeAcList;
        }

        /// <summary>
        /// Method for fetching a particular circular/notice by id - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="noticeId"></param>
        /// <returns></returns>
        public async Task<CircularNoticeAc> GetCircularNoticeByIdAsync(int currentUserInstituteId, int noticeId)
        {
            CircularNotice circularNotice = await _imsDbContext.CircularNotices
                .Include(x => x.CircularNoticeRecipients)
                .FirstOrDefaultAsync(x => x.InstituteId == currentUserInstituteId && x.Id == noticeId);

            CircularNoticeAc circularNoticeAc = new CircularNoticeAc
            {
                Id = circularNotice.Id,
                Description = circularNotice.Description,
                Message = circularNotice.Message,
                NoticeDate = circularNotice.NoticeDate,
                NoticeTo = circularNotice.NoticeTo,
                NoticeToString = EnumHelperService.GetDescription(circularNotice.NoticeTo),
                NoticeType = circularNotice.NoticeType,
                NoticeTypeString = EnumHelperService.GetDescription(circularNotice.NoticeType),
                CircularNoticeRecipientsList = new List<CircularNoticeRecipientAc>()
            };

            List<ApplicationUser> circularNoticeRecipientsList = await _imsDbContext.CircularNoticeRecipients
                .Where(x => x.CircularNoticeId == noticeId)
                .Include(x => x.Recipient)
                .Select(x => x.Recipient)
                .ToListAsync();

            foreach (CircularNoticeRecipient circularNoticeRecipient in circularNotice.CircularNoticeRecipients)
            {
                circularNoticeAc.CircularNoticeRecipientsList.Add(new CircularNoticeRecipientAc
                {
                    RecipientId = circularNoticeRecipient.RecipientId,
                    RecipientName = circularNoticeRecipientsList.FirstOrDefault(x => x.Id == circularNoticeRecipient.RecipientId)?.Name,
                    CircularNoticeId = circularNotice.Id,
                    RecipientType = circularNoticeRecipient.RecipientType,
                    RecipientTypeString = EnumHelperService.GetDescription(circularNoticeRecipient.RecipientType)
                });
            }

            return circularNoticeAc;
        }

        /// <summary>
        /// Method for adding new circular/notice - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="addedCircularNoticeAc"></param>
        /// <returns></returns>
        public async Task<dynamic> AddNewCircularNoticeAsync(int currentUserInstituteId, CircularNoticeAc addedCircularNoticeAc, ApplicationUser currentUser)
        {
            // Add Notice
            CircularNotice newCircularNotice = new CircularNotice
            {
                Message = addedCircularNoticeAc.Message,
                NoticeDate = addedCircularNoticeAc.NoticeDate,
                NoticeType = addedCircularNoticeAc.NoticeType,
                NoticeTo = addedCircularNoticeAc.NoticeTo,
                Description = addedCircularNoticeAc.Description,
                InstituteId = currentUserInstituteId,
                CreatedOn = DateTime.UtcNow,
                CreatedById = currentUser.Id
            };
            _imsDbContext.CircularNotices.Add(newCircularNotice);
            await _imsDbContext.SaveChangesAsync();

            // Add notice recipients
            await AddNoticeRecipientsAsync(newCircularNotice.Id, addedCircularNoticeAc.CircularNoticeRecipientsList);
            var noticeRecipientMappingsList = await _imsDbContext.CircularNoticeRecipients.Include(s => s.Recipient)
                    .Where(x => x.CircularNoticeId == newCircularNotice.Id).ToListAsync();

            if (addedCircularNoticeAc.IsNotificationSendingEnabled)
            {
                #region Send Mail/Message

                var tos = new List<EmailAddress>();
                var messageRecipients = new List<string>();
                foreach (var user in noticeRecipientMappingsList)
                {
                    if (!string.IsNullOrEmpty(user.Recipient.Email))
                        tos.Add(new EmailAddress() { Name = user.Recipient.Name, Address = user.Recipient.Email });
                    else
                        messageRecipients.Add(user.Recipient.UserName);
                }
                var emailConfiguration = await _imsDbContext.AdministrationEmailConfigurations.Include(s => s.Institute)
                    .FirstOrDefaultAsync(x => x.InstituteId == newCircularNotice.InstituteId);
                if (emailConfiguration != null)
                {
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
                    var engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
                    string resultFromFile = await engine.CompileRenderAsync("NotificationMail.cshtml", new CircularNoticeAc()
                    {
                        InstituteName = addedCircularNoticeAc.InstituteName,
                        Message = newCircularNotice.Message
                    });
                    // Send Email
                    var email = new EmailMessage()
                    {
                        Content = resultFromFile,
                        ToAddresses = tos,
                        FromAddresses = new List<EmailAddress>() { new EmailAddress() { Name = emailConfiguration.Institute.Name, Address = emailConfiguration.MailUserName } },
                        Subject = "Notice"
                    };
                    _emailService.SendMail(email);
                }
                var recipient = string.Empty;
                foreach (var user in messageRecipients)
                {
                    recipient += user;
                    recipient += ",";
                }

                // Send SMS
                await _smsService.SendSms(recipient, newCircularNotice.Message);

                #endregion

                #region Add events for report generation

                await _eventManagementRepository.AddEventReportInfoAsync(currentUserInstituteId, addedCircularNoticeAc.Description,
                    EnumHelperService.GetDescription(addedCircularNoticeAc.NoticeType), EnumHelperService.GetDescription(addedCircularNoticeAc.NoticeTo), TemplateFormatEnum.Email);

                await _eventManagementRepository.AddEventReportInfoAsync(currentUserInstituteId, addedCircularNoticeAc.Description,
                    EnumHelperService.GetDescription(addedCircularNoticeAc.NoticeType), EnumHelperService.GetDescription(addedCircularNoticeAc.NoticeTo), TemplateFormatEnum.Sms);

                #endregion
            }

            // Add notification
            await AddNotificationsAsync(currentUserInstituteId, currentUser, addedCircularNoticeAc);

            return new { Message = EnumHelperService.GetDescription(newCircularNotice.NoticeType) + " created successfully", HasError = false };
        }

        /// <summary>
        /// Method for updating an existing circular/notice - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedCircularNoticeAc"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateCircularNoticeAsync(int currentUserInstituteId, CircularNoticeAc updatedCircularNoticeAc, ApplicationUser currentUser)
        {
            CircularNotice existingNotice = await _imsDbContext.CircularNotices.FirstOrDefaultAsync(x => x.Id == updatedCircularNoticeAc.Id && x.InstituteId == currentUserInstituteId);

            if (existingNotice == null)
            {
                return new { Message = "No notice exists with this id", HasError = true };
            }
            else
            {
                // Update notice
                existingNotice.Message = updatedCircularNoticeAc.Message;
                existingNotice.Description = updatedCircularNoticeAc.Description;
                existingNotice.NoticeDate = updatedCircularNoticeAc.NoticeDate;
                existingNotice.NoticeType = updatedCircularNoticeAc.NoticeType;
                existingNotice.NoticeTo = updatedCircularNoticeAc.NoticeTo;
                existingNotice.UpdatedById = currentUser.Id;

                _imsDbContext.CircularNotices.Update(existingNotice);
                await _imsDbContext.SaveChangesAsync();

                // Update notice recipients
                List<CircularNoticeRecipient> noticeRecipientMappingsList = await _imsDbContext.CircularNoticeRecipients
                    .Where(x => x.CircularNoticeId == existingNotice.Id).ToListAsync();

                _imsDbContext.CircularNoticeRecipients.RemoveRange(noticeRecipientMappingsList);
                await _imsDbContext.SaveChangesAsync();
                await AddNoticeRecipientsAsync(existingNotice.Id, updatedCircularNoticeAc.CircularNoticeRecipientsList);
                noticeRecipientMappingsList = await _imsDbContext.CircularNoticeRecipients.Include(s => s.Recipient)
                    .Where(x => x.CircularNoticeId == existingNotice.Id).ToListAsync();

                if (updatedCircularNoticeAc.IsNotificationSendingEnabled)
                {
                    #region Send Mail/Message

                    var tos = new List<EmailAddress>();
                    var messageRecipients = new List<string>();
                    foreach (var user in noticeRecipientMappingsList)
                    {
                        if (!string.IsNullOrEmpty(user.Recipient.Email))
                            tos.Add(new EmailAddress() { Name = user.Recipient.Name, Address = user.Recipient.Email });
                        else
                            messageRecipients.Add(user.Recipient.UserName);
                    }
                    var emailConfiguration = await _imsDbContext.AdministrationEmailConfigurations.Include(s => s.Institute)
                        .FirstOrDefaultAsync(x => x.InstituteId == existingNotice.InstituteId);
                    if (emailConfiguration != null)
                    {
                        var path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
                        var engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
                        string resultFromFile = await engine.CompileRenderAsync("NotificationMail.cshtml", new CircularNoticeAc() {
                            InstituteName = updatedCircularNoticeAc.InstituteName, Message = existingNotice.Message });
                        // Send Email
                        var email = new EmailMessage()
                        {
                            Content = resultFromFile,
                            ToAddresses = tos,
                            FromAddresses = new List<EmailAddress>() { new EmailAddress() { Name = emailConfiguration.Institute.Name, Address = emailConfiguration.MailUserName } },
                            Subject = "Notice"
                        };
                        _emailService.SendMail(email);
                    }
                    var recipient = string.Empty;
                    foreach (var user in messageRecipients)
                    {
                        recipient += user;
                        recipient += ",";
                    }
                    // Send SMS
                    await _smsService.SendSms(recipient, existingNotice.Message);

                    #endregion

                    #region Add events for report generation

                    await _eventManagementRepository.AddEventReportInfoAsync(currentUserInstituteId, updatedCircularNoticeAc.Description,
                        EnumHelperService.GetDescription(updatedCircularNoticeAc.NoticeType), EnumHelperService.GetDescription(updatedCircularNoticeAc.NoticeTo), TemplateFormatEnum.Email);

                    await _eventManagementRepository.AddEventReportInfoAsync(currentUserInstituteId, updatedCircularNoticeAc.Description,
                        EnumHelperService.GetDescription(updatedCircularNoticeAc.NoticeType), EnumHelperService.GetDescription(updatedCircularNoticeAc.NoticeTo), TemplateFormatEnum.Sms);

                    #endregion
                }

                // Add notification
                await AddNotificationsAsync(currentUserInstituteId, currentUser, updatedCircularNoticeAc);

                return new { Message = EnumHelperService.GetDescription(existingNotice.NoticeType) + " updated successfully" };
            }
        }

        /// <summary>
        /// Method for deleting a notice - RS
        /// </summary>
        /// <param name="noticeId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<dynamic> DeleteCircularNoticeAsync(int noticeId, int instituteId)
        {
            CircularNotice circularNotice = await _imsDbContext.CircularNotices.FirstOrDefaultAsync(x => x.Id == noticeId && x.InstituteId == instituteId);

            if (circularNotice == null)
            {
                return new { Message = "No notice exist with this id", HasError = true };
            }
            else
            {
                // Delete recipients
                List<CircularNoticeRecipient> circularNoticeRecipientsList = await _imsDbContext.CircularNoticeRecipients
                    .Where(x => x.CircularNoticeId == circularNotice.Id)
                    .ToListAsync();
                _imsDbContext.CircularNoticeRecipients.RemoveRange(circularNoticeRecipientsList);
                await _imsDbContext.SaveChangesAsync();

                // Delete notice
                _imsDbContext.CircularNotices.Remove(circularNotice);
                await _imsDbContext.SaveChangesAsync();

                return new { Message = "Notice deleted successfully", HasError = false };
            }
        }
        #endregion

        #region Private methods
        /// <summary>
        /// Private method for mapping notice and recipients - RS
        /// </summary>
        /// <param name="noticeId"></param>
        /// <param name="noticeRecipientsAcList"></param>
        /// <returns></returns>
        private async Task AddNoticeRecipientsAsync(int noticeId, List<CircularNoticeRecipientAc> noticeRecipientsAcList)
        {
            List<CircularNoticeRecipient> recipientsMappingList = new List<CircularNoticeRecipient>();
            foreach (CircularNoticeRecipientAc noticeRecipientAc in noticeRecipientsAcList)
            {
                recipientsMappingList.Add(new CircularNoticeRecipient
                {
                    RecipientType = noticeRecipientAc.RecipientType,
                    CircularNoticeId = noticeId,
                    RecipientId = noticeRecipientAc.RecipientId
                });
            }

            _imsDbContext.CircularNoticeRecipients.AddRange(recipientsMappingList);
            await _imsDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method for creating notification - RS
        /// </summary>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <param name="circularNotice"></param>
        /// <returns></returns>
        private async Task AddNotificationsAsync(int instituteId, ApplicationUser currentUser, CircularNoticeAc circularNotice)
        {
            NotificationAc notificationAc = new NotificationAc
            {
                NotificationDetails = circularNotice.Description,
                NotificationMessage = circularNotice.Message,
                NotificationUserMappingsList = new List<NotificationUserMappingAc>()
            };

            if (circularNotice.NoticeTo == NoticeToEnum.AllStaffs)
            {
                notificationAc.NotificationTo = NoticeToEnum.AllStaffs;
            }
            else if (circularNotice.NoticeTo == NoticeToEnum.AllStudents)
            {
                notificationAc.NotificationTo = NoticeToEnum.AllStudents;
            }
            else
            {
                notificationAc.NotificationTo = null;
                foreach (CircularNoticeRecipientAc recipient in circularNotice.CircularNoticeRecipientsList)
                {
                    notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                    {
                        UserId = recipient.RecipientId
                    });
                }
            }

            await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
        }
        #endregion
    }
}
