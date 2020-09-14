using IMS.DomainModel.ApplicationClasses.EmailService;
using IMS.DomainModel.ApplicationClasses.TemplateManagement;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.EventManagement;
using IMS.Utility.EmailService;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using IMS.Utility.SmsService;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace IMS.Repository.TemplateManagement
{
    public class TemplateManagementRepository : ITemplateManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly TemplateManagementTypes _templateManagementTypes;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly IEmailService _emailService;
        private readonly ISmsService _smsService;
        private readonly IEventManagementRepository _eventManagementRepository;
        #endregion

        #region Constructor
        public TemplateManagementRepository(IMSDbContext iMSDbContext,
            IOptions<TemplateManagementTypes> templateManagementTypes,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IEmailService emailService, ISmsService smsService,
            IEventManagementRepository eventManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _templateManagementTypes = templateManagementTypes.Value;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _emailService = emailService;
            _smsService = smsService;
            _eventManagementRepository = eventManagementRepository;
        }
        #endregion

        #region Public methods
        /// <summary>
        /// Method for adding a new template - RS
        /// </summary>
        /// <param name="addedTemplate"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddOrUpdateTemplateAsync(AddTemplateAc addedTemplate, ApplicationUser currentUser)
        {
            if (string.IsNullOrEmpty(addedTemplate.Name.Trim()))
                return new { HasError = true, Message = "Name can't be empty" };
            else if (string.IsNullOrEmpty(addedTemplate.Format.Trim()))
                return new { HasError = true, Message = "Format can't be empty" };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
                var template = await _iMSDbContext.Templates.FirstOrDefaultAsync(x => x.TemplateFormat ==
                EnumHelperService.GetValueFromDescription<TemplateFormatEnum>(addedTemplate.TemplateFormat) && x.InstituteId == instituteId
                && x.TemplateFeatureType == EnumHelperService.GetValueFromDescription<TemplateFeatureEnum>(addedTemplate.TemplateFeatureType)
                && x.TemplateType == EnumHelperService.GetValueFromDescription<TemplateTypeEnum>(addedTemplate.TemplateType));
                if (template == null)
                {
                    template = new Template
                    {
                        CreatedOn = DateTime.UtcNow,
                        EmailBcc = addedTemplate.EmailBcc,
                        EmailSubject = addedTemplate.EmailSubject,
                        To = addedTemplate.To,
                        Name = addedTemplate.Name,
                        TemplateFormat = EnumHelperService.GetValueFromDescription<TemplateFormatEnum>(addedTemplate.TemplateFormat),
                        TemplateFeatureType = EnumHelperService.GetValueFromDescription<TemplateFeatureEnum>(addedTemplate.TemplateFeatureType),
                        TemplateType = EnumHelperService.GetValueFromDescription<TemplateTypeEnum>(addedTemplate.TemplateType),
                        Format = addedTemplate.Format,
                        InstituteId = instituteId
                    };
                    _iMSDbContext.Templates.Add(template);
                    await _iMSDbContext.SaveChangesAsync();
                }
                else
                {
                    template.EmailBcc = addedTemplate.EmailBcc;
                    template.EmailSubject = addedTemplate.EmailSubject;
                    template.To = addedTemplate.To;
                    template.Name = addedTemplate.Name;
                    template.Format = addedTemplate.Format;
                    _iMSDbContext.Templates.Add(template);
                    await _iMSDbContext.SaveChangesAsync();
                }
                return new { HasError = false, Message = "Template updated successfully" };
            }
        }

        /// <summary>
        /// Method to get template - SS
        /// </summary>
        /// <param name="getTemplate">query params</param>
        /// <param name="instituteId">institute id</param>
        /// <returns></returns>
        public async Task<Template> GetTemplateAsync(GetTemplateAc getTemplate, int instituteId)
        {
            var template = await _iMSDbContext.Templates.FirstOrDefaultAsync(x => x.TemplateFormat ==
            EnumHelperService.GetValueFromDescription<TemplateFormatEnum>(getTemplate.TemplateFormat) && x.InstituteId == instituteId
            && x.TemplateFeatureType == EnumHelperService.GetValueFromDescription<TemplateFeatureEnum>(getTemplate.TemplateFeatureType)
            && x.TemplateType == EnumHelperService.GetValueFromDescription<TemplateTypeEnum>(getTemplate.TemplateType));
            return template;
        }

        /// <summary>
        /// Method to trigger mail or message using templates - SS
        /// </summary>
        /// <param name="instituteId">instituteId</param>
        /// <param name="templateType">templateType</param>
        /// <param name="templateFormat">templateFormat</param>
        /// <param name="data">data as object</param>
        /// <param name="password">password, default null</param>
        public async Task TriggerMailOrMessageAsync(int instituteId, TemplateTypeEnum templateType, TemplateFormatEnum templateFormat,
            object data, string password = null)
        {
            var template = await _iMSDbContext.Templates.FirstOrDefaultAsync(x => x.InstituteId == instituteId && x.TemplateType == templateType
            && x.TemplateFormat == templateFormat);
            if(template != null)
            {
                var message = GetMailOrMessageBody(template, data, password);
                var recipients = GetRecipients(template, data, instituteId);
                if(template.TemplateFormat == TemplateFormatEnum.Email)
                {
                    var emailConfiguration = await _iMSDbContext.AdministrationEmailConfigurations.Include(s=>s.Institute).FirstOrDefaultAsync(x => x.InstituteId == instituteId);
                    if (emailConfiguration != null)
                    {
                        var path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
                        var engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
                        string resultFromFile = await engine.CompileRenderAsync("Template.cshtml", new TemplateHtmlData() { Data = message });
                        var bcc = new List<EmailAddress>();
                        var emailBccs = template.EmailBcc.Split(',');
                        foreach (var emailBcc in emailBccs)
                        {
                            bcc.Add(new EmailAddress()
                            {
                                Address = emailBcc,
                                Name = emailBcc
                            });
                        }
                        var to = new List<EmailAddress>();
                        var tos = template.EmailBcc.Split(',');
                        foreach (var emaolTo in tos)
                        {
                            to.Add(new EmailAddress()
                            {
                                Address = emaolTo,
                                Name = emaolTo
                            });
                        }
                        var email = new EmailMessage()
                        {
                            BccAddresses = bcc,
                            Content = resultFromFile,
                            ToAddresses = to,
                            FromAddresses = new List<EmailAddress>() { new EmailAddress() { Name = emailConfiguration.Institute.Name, Address = emailConfiguration.MailUserName} },
                            Subject = template.EmailSubject
                        };
                        _emailService.SendMail(email);
                    }
                }
                else
                {
                    await _smsService.SendSms(recipients, message);
                }

                await AddEventReportDetail(template, data, instituteId);
            }
        }
        #endregion

        #region Private Method(s)

        /// <summary>
        /// Method to parse data from format to message - SS
        /// </summary>
        /// <param name="template">template</param>
        /// <param name="data">data object</param>
        /// <param name="password">password, default null</param>
        /// <returns></returns>
        private string GetMailOrMessageBody(Template template, object data, string password = null)
        {
            var message = template.Format;

            #region Replacement of Parameters with data for message

            switch (template.TemplateType)
            {
                case TemplateTypeEnum.ChangePassword:
                    {
                        var user = data as ApplicationUser;
                        message = message.Replace("@Name", user.Name);
                        message = message.Replace("@Password", password);
                    }
                    break;
                case TemplateTypeEnum.FeePaymentAdd:
                    {
                        var feeReceipt = data as FeeReceipt;
                        message = message.Replace("@ReceiptNumber", feeReceipt.ReceiptNumber);
                        message = message.Replace("@ReceiptDate", feeReceipt.ReceiptDate.Date.ToShortDateString());
                        message = message.Replace("@Student", feeReceipt.Student.FirstName + " " + feeReceipt.Student.LastName);
                        message = message.Replace("@ReceiptType", EnumHelperService.GetDescription(feeReceipt.ReceiptType));
                        message = message.Replace("@ChallanNumber", feeReceipt.ChallanNumber);
                        message = message.Replace("@Amount", feeReceipt.Amount.ToString());
                        message = message.Replace("@LateFee", feeReceipt.LateFee.ToString());
                        message = message.Replace("@Total", feeReceipt.Total.ToString());
                        message = message.Replace("@Total", (feeReceipt.Term == 0) ? "All" : feeReceipt.Term.ToString());
                    }
                    break;
                case TemplateTypeEnum.FeePaymentReminder:
                    {
                        var feeReceipt = data as FeeReceipt;
                        message = message.Replace("@ReceiptNumber", feeReceipt.ReceiptNumber);
                        message = message.Replace("@ReceiptDate", feeReceipt.ReceiptDate.Date.ToShortDateString());
                        message = message.Replace("@Student", feeReceipt.Student.FirstName + " " + feeReceipt.Student.LastName);
                        message = message.Replace("@ReceiptType", EnumHelperService.GetDescription(feeReceipt.ReceiptType));
                        message = message.Replace("@ChallanNumber", feeReceipt.ChallanNumber);
                        message = message.Replace("@Amount", feeReceipt.Amount.ToString());
                        message = message.Replace("@LateFee", feeReceipt.LateFee.ToString());
                        message = message.Replace("@Total", feeReceipt.Total.ToString());
                        message = message.Replace("@Total", (feeReceipt.Term == 0) ? "All" : feeReceipt.Term.ToString());
                    }
                    break;
                case TemplateTypeEnum.ForgotPassword:
                    {
                        var user = data as ApplicationUser;
                        message = message.Replace("@Name", user.Name);
                        message = message.Replace("@Password", password);
                    }
                    break;
                case TemplateTypeEnum.StaffAdd:
                    {
                        var staff = data as StaffBasicPersonalInformation;
                        message = message.Replace("@EmployeeId", staff.EmployeeId);
                        message = message.Replace("@FirstName", staff.FirstName);
                        message = message.Replace("@LastName", staff.LastName);
                        message = message.Replace("@Gender", staff.Gender.Name);
                        message = message.Replace("@Institute", staff.Institute.Name);
                        message = message.Replace("@PermanentAddress", staff.PermanentAddress);
                        message = message.Replace("@PermanentCity", staff.PermanentCity.Name);
                        message = message.Replace("@MobileNumber", staff.MobileNumber);
                        message = message.Replace("@PresentAddress", staff.PresentAddress);
                        message = message.Replace("@PresentCity", staff.PresentCity.Name);
                        message = message.Replace("@Email", staff.User.Email);
                        message = message.Replace("@Password", password);
                    }
                    break;
                case TemplateTypeEnum.StaffDelete:
                    {
                        var staff = data as StaffBasicPersonalInformation;
                        message = message.Replace("@EmployeeId", staff.EmployeeId);
                        message = message.Replace("@FirstName", staff.FirstName);
                        message = message.Replace("@LastName", staff.LastName);
                        message = message.Replace("@Gender", staff.Gender.Name);
                        message = message.Replace("@Institute", staff.Institute.Name);
                        message = message.Replace("@PermanentAddress", staff.PermanentAddress);
                        message = message.Replace("@PermanentCity", staff.PermanentCity.Name);
                        message = message.Replace("@MobileNumber", staff.MobileNumber);
                        message = message.Replace("@PresentAddress", staff.PresentAddress);
                        message = message.Replace("@PresentCity", staff.PresentCity.Name);
                        message = message.Replace("@Email", staff.User.Email);
                    }
                    break;
                case TemplateTypeEnum.StaffEdit:
                    {
                        var staff = data as StaffBasicPersonalInformation;
                        message = message.Replace("@EmployeeId", staff.EmployeeId);
                        message = message.Replace("@FirstName", staff.FirstName);
                        message = message.Replace("@LastName", staff.LastName);
                        message = message.Replace("@Gender", staff.Gender.Name);
                        message = message.Replace("@Institute", staff.Institute.Name);
                        message = message.Replace("@PermanentAddress", staff.PermanentAddress);
                        message = message.Replace("@PermanentCity", staff.PermanentCity.Name);
                        message = message.Replace("@MobileNumber", staff.MobileNumber);
                        message = message.Replace("@PresentAddress", staff.PresentAddress);
                        message = message.Replace("@PresentCity", staff.PresentCity.Name);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveAdd:
                    {
                        var leave = data as StaffLeave;
                        message = message.Replace("@Staff", leave.Staff.FirstName + " " + leave.Staff.LastName);
                        message = message.Replace("@FromDate", leave.FromDate.Date.ToShortDateString());
                        message = message.Replace("@EndDate", leave.EndDate.Date.ToShortDateString());
                        message = message.Replace("@LeaveType", leave.LeaveType.Name);
                        message = message.Replace("@Reason", leave.Reason);
                        message = message.Replace("@LeaveStatus", leave.LeaveStatus.Name);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveApproveReject:
                    {
                        var leave = data as StaffLeave;
                        message = message.Replace("@Staff", leave.Staff.FirstName + " " + leave.Staff.LastName);
                        message = message.Replace("@FromDate", leave.FromDate.Date.ToShortDateString());
                        message = message.Replace("@EndDate", leave.EndDate.Date.ToShortDateString());
                        message = message.Replace("@LeaveType", leave.LeaveType.Name);
                        message = message.Replace("@Reason", leave.Reason);
                        message = message.Replace("@LeaveStatus", leave.LeaveStatus.Name);
                        message = message.Replace("@ApproveOrRejectedBy", leave.ApprovedBy.Name);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveEdit:
                    {
                        var leave = data as StaffLeave;
                        message = message.Replace("@Staff", leave.Staff.FirstName + " " + leave.Staff.LastName);
                        message = message.Replace("@FromDate", leave.FromDate.Date.ToShortDateString());
                        message = message.Replace("@EndDate", leave.EndDate.Date.ToShortDateString());
                        message = message.Replace("@LeaveType", leave.LeaveType.Name);
                        message = message.Replace("@Reason", leave.Reason);
                        message = message.Replace("@LeaveStatus", leave.LeaveStatus.Name);
                    }
                    break;
                case TemplateTypeEnum.StudentAdd:
                    {
                        var student = data as StudentBasicInformation;
                        message = message.Replace("@RollNumber", student.RollNumber);
                        message = message.Replace("@AdmissionDate", student.AdmissionDate.Date.ToShortDateString());
                        message = message.Replace("@AdmissionNumber", student.AdmissionNumber);
                        message = message.Replace("@AdmissionClass", student.AdmissionClass.Name);
                        message = message.Replace("@Password", password);
                        message = message.Replace("@CurrentClass", student.CurrentClass.Name);
                        message = message.Replace("@Section", student.SectionMap.Name);
                        message = message.Replace("@CurrentAcademicYear", student.CurrentAcademicYear.AcademicYearCode);
                        message = message.Replace("@FirstLanguage", student.FirstLanguage.Name);
                        message = message.Replace("@SecondLanguage", student.SecondLanguage.Name);
                        message = message.Replace("@FirstName", student.FirstName);
                        message = message.Replace("@LastName", student.LastName);
                        message = message.Replace("@DateOfBirth", student.DateOfBirth.Date.ToShortDateString());
                        message = message.Replace("@Gender", student.Gender.Name);
                        message = message.Replace("@FeeChallanNumber", student.FeeChallanNumber);
                        message = message.Replace("@FamilyRelationName", student.FamilyRelationName);
                        message = message.Replace("@FamilyRelationMobileNumber", student.FamilyRelationMobileNumber);
                        message = message.Replace("@PermanentAddress", student.PermanentAddress);
                        message = message.Replace("@PermanentCity", student.PermanentCity.Name);
                        message = message.Replace("@MobileNumber", student.MobileNumber);
                        message = message.Replace("@PresentAddress", student.PresentAddress);
                        message = message.Replace("@PresentCity", student.PresentCity.Name);
                        message = message.Replace("@Institute", student.Institute.Name);
                    }
                    break;
                case TemplateTypeEnum.StudentDelete:
                    {
                        var student = data as StudentBasicInformation;
                        message = message.Replace("@RollNumber", student.RollNumber);
                        message = message.Replace("@AdmissionDate", student.AdmissionDate.Date.ToShortDateString());
                        message = message.Replace("@AdmissionNumber", student.AdmissionNumber);
                        message = message.Replace("@AdmissionClass", student.AdmissionClass.Name);
                        message = message.Replace("@CurrentClass", student.CurrentClass.Name);
                        message = message.Replace("@Section", student.SectionMap.Name);
                        message = message.Replace("@CurrentAcademicYear", student.CurrentAcademicYear.AcademicYearCode);
                        message = message.Replace("@FirstLanguage", student.FirstLanguage.Name);
                        message = message.Replace("@SecondLanguage", student.SecondLanguage.Name);
                        message = message.Replace("@FirstName", student.FirstName);
                        message = message.Replace("@LastName", student.LastName);
                        message = message.Replace("@DateOfBirth", student.DateOfBirth.Date.ToShortDateString());
                        message = message.Replace("@Gender", student.Gender.Name);
                        message = message.Replace("@FeeChallanNumber", student.FeeChallanNumber);
                        message = message.Replace("@FamilyRelationName", student.FamilyRelationName);
                        message = message.Replace("@FamilyRelationMobileNumber", student.FamilyRelationMobileNumber);
                        message = message.Replace("@PermanentAddress", student.PermanentAddress);
                        message = message.Replace("@PermanentCity", student.PermanentCity.Name);
                        message = message.Replace("@MobileNumber", student.MobileNumber);
                        message = message.Replace("@PresentAddress", student.PresentAddress);
                        message = message.Replace("@PresentCity", student.PresentCity.Name);
                        message = message.Replace("@Institute", student.Institute.Name);
                    }
                    break;
                case TemplateTypeEnum.StudentEdit:
                    {
                        var student = data as StudentBasicInformation;
                        message = message.Replace("@RollNumber", student.RollNumber);
                        message = message.Replace("@AdmissionDate", student.AdmissionDate.Date.ToShortDateString());
                        message = message.Replace("@AdmissionNumber", student.AdmissionNumber);
                        message = message.Replace("@AdmissionClass", student.AdmissionClass.Name);
                        message = message.Replace("@CurrentClass", student.CurrentClass.Name);
                        message = message.Replace("@Section", student.SectionMap.Name);
                        message = message.Replace("@CurrentAcademicYear", student.CurrentAcademicYear.AcademicYearCode);
                        message = message.Replace("@FirstLanguage", student.FirstLanguage.Name);
                        message = message.Replace("@SecondLanguage", student.SecondLanguage.Name);
                        message = message.Replace("@FirstName", student.FirstName);
                        message = message.Replace("@LastName", student.LastName);
                        message = message.Replace("@DateOfBirth", student.DateOfBirth.Date.ToShortDateString());
                        message = message.Replace("@Gender", student.Gender.Name);
                        message = message.Replace("@FeeChallanNumber", student.FeeChallanNumber);
                        message = message.Replace("@FamilyRelationName", student.FamilyRelationName);
                        message = message.Replace("@FamilyRelationMobileNumber", student.FamilyRelationMobileNumber);
                        message = message.Replace("@PermanentAddress", student.PermanentAddress);
                        message = message.Replace("@PermanentCity", student.PermanentCity.Name);
                        message = message.Replace("@MobileNumber", student.MobileNumber);
                        message = message.Replace("@PresentAddress", student.PresentAddress);
                        message = message.Replace("@PresentCity", student.PresentCity.Name);
                        message = message.Replace("@Institute", student.Institute.Name);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveAdd:
                    {
                        var leave = data as StudentLeave;
                        message = message.Replace("@Student", leave.Student.FirstName + " " + leave.Student.LastName);
                        message = message.Replace("@FromDate", leave.FromDate.Date.ToShortDateString());
                        message = message.Replace("@EndDate", leave.EndDate.Date.ToShortDateString());
                        message = message.Replace("@LeaveType", leave.LeaveType.Name);
                        message = message.Replace("@Reason", leave.Reason);
                        message = message.Replace("@LeaveStatus", leave.LeaveStatus.Name);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveApproveReject:
                    {
                        var leave = data as StudentLeave;
                        message = message.Replace("@Student", leave.Student.FirstName + " " + leave.Student.LastName);
                        message = message.Replace("@FromDate", leave.FromDate.Date.ToShortDateString());
                        message = message.Replace("@EndDate", leave.EndDate.Date.ToShortDateString());
                        message = message.Replace("@LeaveType", leave.LeaveType.Name);
                        message = message.Replace("@Reason", leave.Reason);
                        message = message.Replace("@LeaveStatus", leave.LeaveStatus.Name);
                        message = message.Replace("@ApproveOrRejectedBy", leave.ApprovedBy.FirstName + " " + leave.ApprovedBy.LastName);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveEdit:
                    {
                        var leave = data as StudentLeave;
                        message = message.Replace("@Student", leave.Student.FirstName + " " + leave.Student.LastName);
                        message = message.Replace("@FromDate", leave.FromDate.Date.ToShortDateString());
                        message = message.Replace("@EndDate", leave.EndDate.Date.ToShortDateString());
                        message = message.Replace("@LeaveType", leave.LeaveType.Name);
                        message = message.Replace("@Reason", leave.Reason);
                        message = message.Replace("@LeaveStatus", leave.LeaveStatus.Name);
                    }
                    break;
                case TemplateTypeEnum.TimeTable:
                    {
                        var timeTable = data as TimeTable;
                        message = message.Replace("@Class", timeTable.Class.Name);
                        message = message.Replace("@Section", timeTable.Section.Name);
                        message = message.Replace("@AcademicYear", timeTable.AcademicYear.AcademicYearCode);
                        message = message.Replace("@PeriodCount", timeTable.PeriodCount.ToString());
                        message = message.Replace("@PeriodDuration", timeTable.PeriodDuration.ToString());
                        message = message.Replace("@Class", timeTable.PeriodStartTime);
                    }
                    break;
            }

            #endregion

            return message;
        }

        /// <summary>
        /// Method to parse data from to for message and mail - SS
        /// </summary>
        /// <param name="template">template</param>
        /// <param name="data">data as object</param>
        /// <returns>to for mail and message</returns>
        private string GetRecipients(Template template, object data, int instituteId)
        {
            var message = template.To;

            #region Replacement of Parameters with data for recipients

            switch (template.TemplateType)
            {
                case TemplateTypeEnum.ChangePassword:
                    {
                        var user = data as ApplicationUser;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@Email", user.Email);
                        else
                            message = message.Replace("@MobileNumber", user.PhoneNumber);
                    }
                    break;
                case TemplateTypeEnum.FeePaymentAdd:
                    {
                        var feeReceipt = data as FeeReceipt;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StudentEmail", feeReceipt.Student.FamilyRelationEmail);
                        else
                            message = message.Replace("@StudentMobileNumber", feeReceipt.Student.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.FeePaymentReminder:
                    {
                        var feeReceipt = data as FeeReceipt;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StudentEmail", feeReceipt.Student.FamilyRelationEmail);
                        else
                            message = message.Replace("@StudentMobileNumber", feeReceipt.Student.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.ForgotPassword:
                    {
                        var user = data as ApplicationUser;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@Email", user.Email);
                        else
                            message = message.Replace("@MobileNumber", user.PhoneNumber);
                    }
                    break;
                case TemplateTypeEnum.StaffAdd:
                    {
                        var staff = data as StaffBasicPersonalInformation;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StaffEmail", staff.User.Email);
                        else
                            message = message.Replace("@StaffMobileNumber", staff.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StaffDelete:
                    {
                        var staff = data as StaffBasicPersonalInformation;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StaffEmail", staff.User.Email);
                        else
                            message = message.Replace("@StaffMobileNumber", staff.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StaffEdit:
                    {
                        var staff = data as StaffBasicPersonalInformation;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StaffEmail", staff.User.Email);
                        else
                            message = message.Replace("@StaffMobileNumber", staff.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveAdd:
                    {
                        var leave = data as StaffLeave;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@AdminEmail", leave.ApprovedBy.Email);
                        else
                            message = message.Replace("@AdminMobileNumber", leave.ApprovedBy.PhoneNumber);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveApproveReject:
                    {
                        var leave = data as StaffLeave;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StaffEmail", leave.Staff.User.Email);
                        else
                            message = message.Replace("@StaffMobileNumber", leave.Staff.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveEdit:
                    {
                        var leave = data as StaffLeave;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@AdminEmail", leave.ApprovedBy.Email);
                        else
                            message = message.Replace("@AdminMobileNumber", leave.ApprovedBy.PhoneNumber);
                    }
                    break;
                case TemplateTypeEnum.StudentAdd:
                    {
                        var student = data as StudentBasicInformation;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StudentEmail", student.FamilyRelationEmail);
                        else
                            message = message.Replace("@StudentMobileNumber", student.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StudentDelete:
                    {
                        var student = data as StudentBasicInformation;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StudentEmail", student.FamilyRelationEmail);
                        else
                            message = message.Replace("@StudentMobileNumber", student.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StudentEdit:
                    {
                        var student = data as StudentBasicInformation;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StudentEmail", student.FamilyRelationEmail);
                        else
                            message = message.Replace("@StudentMobileNumber", student.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveAdd:
                    {
                        var leave = data as StudentLeave;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StaffEmail", leave.ApprovedBy.Email);
                        else
                            message = message.Replace("@StaffMobileNumber", leave.ApprovedBy.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveApproveReject:
                    {
                        var leave = data as StudentLeave;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StudentEmail", leave.Student.FamilyRelationEmail);
                        else
                            message = message.Replace("@StudentMobileNumber", leave.Student.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveEdit:
                    {
                        var leave = data as StudentLeave;
                        if (template.TemplateFormat == TemplateFormatEnum.Email)
                            message = message.Replace("@StaffEmail", leave.ApprovedBy.Email);
                        else
                            message = message.Replace("@StaffMobileNumber", leave.ApprovedBy.MobileNumber);
                    }
                    break;
                case TemplateTypeEnum.TimeTable:
                    {
                        //var timeTable = JsonConvert.DeserializeObject<TimeTable>(JsonConvert.SerializeObject(data));
                        // Pending
                    }
                    break;
            }

            #endregion

            return message;
        }

        /// <summary>
        /// Method for adding event report details
        /// </summary>
        /// <param name="template"></param>
        /// <param name="data"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        private async Task AddEventReportDetail(Template template, object data, int instituteId)
        {
            switch (template.TemplateType)
            {
                case TemplateTypeEnum.ChangePassword:
                    {
                        ApplicationUser user = data as ApplicationUser;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("{0} updated password", user.Name),
                            EnumHelperService.GetDescription(template.TemplateType), user.Name, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.FeePaymentAdd:
                    {
                        FeeReceipt feeReceipt = data as FeeReceipt;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, "Fee payment added", EnumHelperService.GetDescription(template.TemplateType),
                            feeReceipt.Student.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.FeePaymentReminder:
                    {
                        FeeReceipt feeReceipt = data as FeeReceipt;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, "Fee payment reminder sent", EnumHelperService.GetDescription(template.TemplateType),
                            feeReceipt.Student.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.ForgotPassword:
                    {
                        ApplicationUser user = data as ApplicationUser;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("{0} updated password", user.Name), EnumHelperService.GetDescription(template.TemplateType),
                            user.Name, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StaffAdd:
                    {
                        StaffBasicPersonalInformation staff = data as StaffBasicPersonalInformation;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("New staff ({0}) added", staff.FirstName), 
                            EnumHelperService.GetDescription(template.TemplateType), staff.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StaffDelete:
                    {
                        StaffBasicPersonalInformation staff = data as StaffBasicPersonalInformation;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Staff ({0}) deleted", staff.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), staff.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StaffEdit:
                    {
                        StaffBasicPersonalInformation staff = data as StaffBasicPersonalInformation;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Staff ({0}) details updated", staff.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), staff.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveAdd:
                    {
                        StaffLeave leave = data as StaffLeave;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Leave added for the staff {0}", leave.Staff.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), leave.Staff.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveApproveReject:
                    {
                        StaffLeave leave = data as StaffLeave;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Leave updated for the staff {0}", leave.Staff.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), leave.Staff.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StaffLeaveEdit:
                    {
                        StaffLeave leave = data as StaffLeave;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Leave updated for the staff {0}", leave.Staff.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), leave.Staff.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StudentAdd:
                    {
                        StudentBasicInformation student = data as StudentBasicInformation;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("New student ({0}) added", student.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), student.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StudentDelete:
                    {
                        StudentBasicInformation student = data as StudentBasicInformation;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Student ({0}) deleted", student.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), student.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StudentEdit:
                    {
                        StudentBasicInformation student = data as StudentBasicInformation;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Student ({0}) details updated", student.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), student.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveAdd:
                    {
                        StudentLeave leave = data as StudentLeave;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Leave added for the student {0}", leave.Student.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), leave.Student.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveApproveReject:
                    {
                        StudentLeave leave = data as StudentLeave;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Leave updated for the student {0}", leave.Student.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), leave.Student.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.StudentLeaveEdit:
                    {
                        StudentLeave leave = data as StudentLeave;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Leave updated for the student {0}", leave.Student.FirstName),
                            EnumHelperService.GetDescription(template.TemplateType), leave.Student.FirstName, template.TemplateFormat);
                    }
                    break;
                case TemplateTypeEnum.TimeTable:
                    {
                        TimeTable timeTable = data as TimeTable;
                        await _eventManagementRepository.AddEventReportInfoAsync(instituteId, string.Format("Timetable added for class {0}", timeTable.Class.Name),
                            EnumHelperService.GetDescription(template.TemplateType), string.Empty, template.TemplateFormat);
                    }
                    break;
            }
        }

        #endregion
    }
}
