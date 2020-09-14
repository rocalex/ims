using EFCore.BulkExtensions;
using IMS.DomainModel.ApplicationClasses;
using IMS.DomainModel.ApplicationClasses.EmailService;
using IMS.DomainModel.ApplicationClasses.StudentManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.ApplicationClasses.VisualChartData;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.FeeReceiptManagement;
using IMS.Repository.FeeRefundManagement;
using IMS.Repository.StaffActivityManagement;
using IMS.Repository.StudentPromotionManagement;
using IMS.Repository.StudentRelievingManagement;
using IMS.Repository.TemplateManagement;
using IMS.Repository.UserGroupManagement;
using IMS.Utility.EmailService;
using IMS.Utility.EnumHelper;
using IMS.Utility.ExcelHelper;
using IMS.Utility.ImageStorageHelper;
using IMS.Utility.InstituteUserMappingHelper;
using IMS.Utility.SmsService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IMS.Repository.StudentManagement
{
    public class StudentManagementRepository : IStudentManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly Random random = new Random();
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly IImageStorageHelperService _imageStorageHelperService;
        private readonly IEmailService _emailService;
        private readonly EmailConfiguration _emailConfiguration;
        private readonly ISmsService _smsService;
        private readonly SmsConfiguration _smsConfiguration;
        private SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        private readonly IStudentRelievingManagementRepository _studentRelievingManagementRepository;
        private readonly IStudentPromotionManagementRepository _studentPromotionManagementRepository;
        private readonly IFeeReceiptManagementRepository _feeReceiptManagementRepository;
        private readonly IFeeRefundManagementRepository _feeRefundManagementRepository;
        private readonly IUserGroupManagementRepository _userGroupManagementRepository;
        private readonly IStaffActivityManagementRepository _staffActivityManagementRepository;
        private readonly ITemplateManagementRepository _templateManagementRepository;
        #endregion

        #region Constructor
        public StudentManagementRepository(IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            IImageStorageHelperService imageStorageHelperService,
            IEmailService emailService,
            IOptions<EmailConfiguration> emailConfiguration,
            ISmsService smsService,
            IOptions<SmsConfiguration> smsConfiguration,
            IStudentRelievingManagementRepository studentRelievingManagementRepository,
            IStudentPromotionManagementRepository studentPromotionManagementRepository,
            IFeeReceiptManagementRepository feeReceiptManagementRepository,
            IFeeRefundManagementRepository feeRefundManagementRepository,
            IUserGroupManagementRepository userGroupManagementRepository,
            IStaffActivityManagementRepository staffActivityManagementRepository,
            ITemplateManagementRepository templateManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _imageStorageHelperService = imageStorageHelperService;
            _emailService = emailService;
            _emailConfiguration = emailConfiguration.Value;
            _smsService = smsService;
            _smsConfiguration = smsConfiguration.Value;
            _studentRelievingManagementRepository = studentRelievingManagementRepository;
            _studentPromotionManagementRepository = studentPromotionManagementRepository;
            _feeReceiptManagementRepository = feeReceiptManagementRepository;
            _feeRefundManagementRepository = feeRefundManagementRepository;
            _userGroupManagementRepository = userGroupManagementRepository;
            _staffActivityManagementRepository = staffActivityManagementRepository;
            _templateManagementRepository = templateManagementRepository;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add student detail - SS
        /// </summary>
        /// <param name="addStudent">student detail</param>
        /// <param name="loggedInUser">logged in user detail</param>
        /// <returns>response</returns>
        public async Task<StudentManagementResponse> AddStudentAsync(AddStudentManagementAc addStudent, ApplicationUser loggedInUser)
        {
            await semaphore.WaitAsync();
            try
            {
                if (string.IsNullOrEmpty(addStudent.MobileNumber.Trim()))
                    return new StudentManagementResponse() { HasError = true, Message = "Mobile number can't be empty", ErrorType = StudentManagementResponseType.MobileNumber };
                else
                {
                    var user = await _userManager.FindByNameAsync(addStudent.MobileNumber);
                    var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                    bool isUserExist = false;
                    if (user != null)
                        isUserExist = await _iMSDbContext.StudentBasicInformation.AnyAsync(x => x.UserId == user.Id && x.InstituteId == instituteId);
                    if (!isUserExist)
                    {
                        if (await _iMSDbContext.StudentBasicInformation.AnyAsync(x => x.RollNumber == addStudent.RollNumber))
                        {
                            var autoSequence = await _iMSDbContext.AutoSequenceGenerators.Include(s => s.AutoSequenceGeneratorDataTypes)
                                    .Include(d => d.Institute).FirstOrDefaultAsync(x => x.InstituteId == instituteId
                                    && x.AutoSequenceGeneratorType == AutoSequenceGeneratorTypeEnum.RollNumber);
                            if (autoSequence == null)
                                return new StudentManagementResponse() { HasError = true, Message = "Student with same roll number already exist", ErrorType = StudentManagementResponseType.RollNumber };
                            else
                                addStudent.RollNumber = await GenerateRollNumberAsync(autoSequence);
                        }
                        if (string.IsNullOrEmpty(addStudent.FirstName.Trim()))
                            return new StudentManagementResponse() { Message = "First name can't be empty", HasError = true, ErrorType = StudentManagementResponseType.FirstName };
                        else if (string.IsNullOrEmpty(addStudent.LastName.Trim()))
                            return new StudentManagementResponse() { Message = "Last name can't be empty", HasError = true, ErrorType = StudentManagementResponseType.LastName };
                        else if (string.IsNullOrEmpty(addStudent.RollNumber.Trim()))
                            return new StudentManagementResponse() { Message = "Roll number can't be empty", HasError = true, ErrorType = StudentManagementResponseType.RollNumber };
                        else if (string.IsNullOrEmpty(addStudent.AdmissionNumber.Trim()))
                            return new StudentManagementResponse() { Message = "Admission number can't be empty", HasError = true, ErrorType = StudentManagementResponseType.AdmissionNumber };
                        else if (string.IsNullOrEmpty(addStudent.FeeChallanNumber.Trim()))
                            return new StudentManagementResponse() { Message = "Fee challan number can't be empty", HasError = true, ErrorType = StudentManagementResponseType.FeeChallanNumber };
                        else if (string.IsNullOrEmpty(addStudent.MotherName.Trim()))
                            return new StudentManagementResponse() { Message = "Mother name can't be empty", HasError = true, ErrorType = StudentManagementResponseType.MotherName };
                        else if (string.IsNullOrEmpty(addStudent.FamilyRelationName.Trim()))
                            return new StudentManagementResponse() { Message = "Name of family member can't be empty", HasError = true, ErrorType = StudentManagementResponseType.FamilyRelationName };
                        else if (string.IsNullOrEmpty(addStudent.FamilyRelationMobileNumber.Trim()))
                            return new StudentManagementResponse() { Message = "Mobile number of family member can't be empty", HasError = true, ErrorType = StudentManagementResponseType.FamilyRelationMobileNumber };
                        else if (string.IsNullOrEmpty(addStudent.PermanentAddress.Trim()))
                            return new StudentManagementResponse() { Message = "Permanent address can't be empty", HasError = true, ErrorType = StudentManagementResponseType.PermanentAddress };
                        else
                        {
                            #region Add User
                            var password = "itech1@3";
                            if (user == null)
                            {
                                user = new ApplicationUser()
                                {
                                    CreatedBy = loggedInUser.Id,
                                    CreatedOn = DateTime.UtcNow,
                                    UserName = addStudent.MobileNumber,
                                    Name = addStudent.FirstName + (string.IsNullOrEmpty(addStudent.MiddleName.Trim()) ? " " : addStudent.MiddleName + " ") + addStudent.LastName,
                                    UpdatedOn = DateTime.UtcNow,
                                    UpdatedBy = loggedInUser.Id
                                };
                                await _userManager.CreateAsync(user, password);
                            }
                            _iMSDbContext.UserInstituteMappings.Add(new UserInstituteMapping()
                            {
                                CreatedOn = DateTime.UtcNow,
                                InstituteId = instituteId,
                                IsActive = false,
                                UserId = user.Id
                            });
                            await _iMSDbContext.SaveChangesAsync();
                            #endregion
                            #region Add Student
                            var student = new StudentBasicInformation()
                            {
                                AdmissionClassId = addStudent.AdmissionClassId,
                                AdmissionDate = addStudent.AdmissionDate,
                                AdmissionNumber = addStudent.AdmissionNumber,
                                AlternatePhoneNumber = addStudent.AlternatePhoneNumber,
                                BloodGroupId = addStudent.BloodGroupId,
                                CasteId = addStudent.CasteId,
                                ComingBy = addStudent.ComingBy,
                                ComingPlace = addStudent.ComingPlace,
                                CreatedOn = DateTime.UtcNow,
                                CurrentAcademicYearId = addStudent.CurrentAcademicYearId,
                                CurrentClassId = addStudent.CurrentClassId,
                                DateOfBirth = addStudent.DateOfBirth,
                                FamilyRelationEmail = addStudent.FamilyRelationEmail,
                                FamilyRelationMobileNumber = addStudent.FamilyRelationMobileNumber,
                                FamilyRelationMonthlyIncome = addStudent.FamilyRelationMonthlyIncome,
                                FamilyRelationName = addStudent.FamilyRelationName,
                                FamilyRelationOccupationId = addStudent.FamilyRelationOccupationId,
                                FamilyRelationType = addStudent.FamilyRelationType,
                                FeeChallanNumber = addStudent.FeeChallanNumber,
                                FirstLanguageId = addStudent.FirstLanguageId,
                                FirstName = addStudent.FirstName,
                                GenderId = addStudent.GenderId,
                                IdentificationMarks = addStudent.IdentificationMarks,
                                IsPhysicallyHandicapped = addStudent.IsPhysicallyHandicapped,
                                IsPresentAddressIsSameAsPermanent = addStudent.IsPresentAddressIsSameAsPermanent,
                                LastName = addStudent.LastName,
                                MaritalStatusId = addStudent.MaritalStatusId,
                                MiddleName = addStudent.MiddleName,
                                MobileNumber = addStudent.MobileNumber,
                                MotherName = addStudent.MotherName,
                                MotherTongueId = addStudent.MotherTongueId,
                                NationalityId = addStudent.NationalityId,
                                PassportExpireDate = addStudent.PassportExpireDate,
                                PassportIssuedCountryId = addStudent.PassportIssuedCountryId,
                                PassportIssuedDate = addStudent.PassportIssuedDate,
                                PassportNumber = addStudent.PassportNumber,
                                PermanentAddress = addStudent.PermanentAddress,
                                PermanentCityId = addStudent.PermanentCityId,
                                PermanentZipcode = addStudent.PermanentZipcode,
                                PresentAddress = addStudent.PresentAddress,
                                PresentCityId = addStudent.PresentCityId,
                                PresentZipcode = addStudent.PresentZipcode,
                                RelievingClassId = addStudent.RelievingClassId,
                                RelievingDate = addStudent.RelievingDate,
                                RelievingReason = addStudent.RelievingReason,
                                RelievingType = addStudent.RelievingType,
                                ReligionId = addStudent.ReligionId,
                                RollNumber = addStudent.RollNumber,
                                SchoolApplicationNumber = addStudent.SchoolApplicationNumber,
                                SecondLanguageId = addStudent.SecondLanguageId,
                                SectionId = addStudent.SectionId,
                                SocialSecurityNumber = addStudent.SocialSecurityNumber,
                                TCDate = addStudent.TCDate,
                                TCNumber = addStudent.TCNumber,
                                UserId = user.Id,
                                InstituteId = instituteId,
                                IsArchived = false,
                                IsActive = true
                            };
                            _iMSDbContext.StudentBasicInformation.Add(student);
                            await _iMSDbContext.SaveChangesAsync();
                            #endregion
                            #region Add Student Prior Education
                            var priorEducation = new List<StudentPriorEducation>();
                            addStudent.StudentPriorEducations.ForEach(x =>
                            {
                                priorEducation.Add(new StudentPriorEducation()
                                {
                                    CreatedOn = DateTime.UtcNow,
                                    FromDate = x.FromDate,
                                    InstituteName = x.InstituteName,
                                    StudentId = student.Id,
                                    ToDate = x.ToDate
                                });
                            });
                            _iMSDbContext.StudentPriorEducations.AddRange(priorEducation);
                            #endregion
                            #region Add Student Sport
                            var sports = new List<StudentSport>();
                            addStudent.StudentSports.ForEach(x =>
                            {
                                sports.Add(new StudentSport()
                                {
                                    CreatedOn = DateTime.UtcNow,
                                    LevelId = x.LevelId,
                                    SportId = x.SportId,
                                    StudentId = student.Id
                                });
                            });
                            _iMSDbContext.StudentSports.AddRange(sports);
                            #endregion
                            #region Add Student Award
                            var awards = new List<StudentAward>();
                            addStudent.StudentAwards.ForEach(x =>
                            {
                                awards.Add(new StudentAward()
                                {
                                    AwardName = x.AwardName,
                                    CreatedOn = DateTime.UtcNow,
                                    InstituteName = x.InstituteName,
                                    StudentId = student.Id
                                });
                            });
                            _iMSDbContext.StudentAwards.AddRange(awards);
                            #endregion
                            #region Add Student Discipline
                            var disciplines = new List<Disciplinary>();
                            addStudent.StudentDisciplines.ForEach(x =>
                            {
                                disciplines.Add(new Disciplinary()
                                {
                                    CreatedOn = DateTime.UtcNow,
                                    StudentId = student.Id,
                                    Date = x.Date,
                                    Description = x.Description,
                                    Remarks = x.Remarks,
                                    StatusId = x.StatusId,
                                    Subject = x.Subject,
                                    UpdatedById = loggedInUser.Id,
                                    UpdatedOn = DateTime.UtcNow
                                });
                            });
                            _iMSDbContext.Disciplinaries.AddRange(disciplines);
                            #endregion
                            await _iMSDbContext.SaveChangesAsync();
                            await _userGroupManagementRepository.AddStudentOrStaffInUserGroupAsync(user.Id, true, instituteId);
                            #region Send Mail/Message
                            student = await _iMSDbContext.StudentBasicInformation.Include(s => s.AdmissionClass).Include(s => s.CurrentClass)
                                .Include(s => s.SectionMap).Include(s => s.CurrentAcademicYear).Include(s => s.FirstLanguage)
                                .Include(s => s.SecondLanguage).Include(s => s.Gender).Include(s => s.PermanentCity)
                                .Include(s => s.PresentCity).Include(s => s.Institute).FirstAsync(x => x.Id == student.Id);
                            await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentAdd,
                                TemplateFormatEnum.Email, student, password);
                            await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentAdd,
                                TemplateFormatEnum.Sms, student, password);
                            #endregion
                            return new StudentManagementResponse() { HasError = false, Message = "Student details updated successfully", StudentId = student.Id };
                        }
                    }
                    else
                        return new StudentManagementResponse() { HasError = true, Message = "Student with same mobile number already exist", ErrorType = StudentManagementResponseType.MobileNumber };
                }
            }
            finally
            {
                semaphore.Release();
            }
        }

        /// <summary>
        /// Method to get initial data for add and edit student - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>bundle of initial data</returns>
        public async Task<InitialDataForAddOrEditStudentBundle> GetInitialDataForAddOrEditStudentBundleAsync(int instituteId)
        {
            return new InitialDataForAddOrEditStudentBundle()
            {
                BloodGroups = await _iMSDbContext.BloodGroups.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Castes = await _iMSDbContext.Castes.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Cities = await _iMSDbContext.AdministrationCities.Where(x => x.State.Country.InstituteId == instituteId).ToListAsync(),
                Countries = await _iMSDbContext.AdministrationCountries.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Genders = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync(),
                MotherTongues = await _iMSDbContext.MotherTongues.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Nationalities = await _iMSDbContext.InstituteNationalities.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Religions = await _iMSDbContext.Religions.Where(x => x.InstituteId == instituteId).ToListAsync(),
                AcademicYears = await _iMSDbContext.InstituteAcademicYears.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Languages = await _iMSDbContext.InstituteLanguageMasters.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Occupations = await _iMSDbContext.Occupations.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Levels = await _iMSDbContext.Levels.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Sports = await _iMSDbContext.SportDetails.Where(x => x.InstituteId == instituteId).ToListAsync(),
                MaritalStatuses = await _iMSDbContext.MaritalStatuses.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Statuses = await _iMSDbContext.DisciplinaryStatuses.Where(x => x.InstituteId == instituteId).ToListAsync()
            };
        }

        /// <summary>
        /// Method to update student - SS
        /// </summary>
        /// <param name="updateStudent">student detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<StudentManagementResponse> UpdateStudentAsync(UpdateStudentManagementAc updateStudent, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == instituteId
            && x.Id != updateStudent.Id).ToListAsync();
            if (!students.Any(x => x.RollNumber == updateStudent.RollNumber))
            {
                if (string.IsNullOrEmpty(updateStudent.FirstName.Trim()))
                    return new StudentManagementResponse() { Message = "First name can't be empty", HasError = true, ErrorType = StudentManagementResponseType.FirstName };
                else if (string.IsNullOrEmpty(updateStudent.LastName.Trim()))
                    return new StudentManagementResponse() { Message = "Last name can't be empty", HasError = true, ErrorType = StudentManagementResponseType.LastName };
                else if (string.IsNullOrEmpty(updateStudent.RollNumber.Trim()))
                    return new StudentManagementResponse() { Message = "Roll number can't be empty", HasError = true, ErrorType = StudentManagementResponseType.RollNumber };
                else if (string.IsNullOrEmpty(updateStudent.AdmissionNumber.Trim()))
                    return new StudentManagementResponse() { Message = "Admission number can't be empty", HasError = true, ErrorType = StudentManagementResponseType.AdmissionNumber };
                else if (string.IsNullOrEmpty(updateStudent.FeeChallanNumber.Trim()))
                    return new StudentManagementResponse() { Message = "Fee challan number can't be empty", HasError = true, ErrorType = StudentManagementResponseType.FeeChallanNumber };
                else if (string.IsNullOrEmpty(updateStudent.MotherName.Trim()))
                    return new StudentManagementResponse() { Message = "Mother name can't be empty", HasError = true, ErrorType = StudentManagementResponseType.MotherName };
                else if (string.IsNullOrEmpty(updateStudent.FamilyRelationName.Trim()))
                    return new StudentManagementResponse() { Message = "Name of family member can't be empty", HasError = true, ErrorType = StudentManagementResponseType.FamilyRelationName };
                else if (string.IsNullOrEmpty(updateStudent.FamilyRelationMobileNumber.Trim()))
                    return new StudentManagementResponse() { Message = "Mobile number of family member can't be empty", HasError = true, ErrorType = StudentManagementResponseType.FamilyRelationMobileNumber };
                else if (string.IsNullOrEmpty(updateStudent.PermanentAddress.Trim()))
                    return new StudentManagementResponse() { Message = "Permanent address can't be empty", HasError = true, ErrorType = StudentManagementResponseType.PermanentAddress };
                else
                {
                    #region Update Student
                    var student = await _iMSDbContext.StudentBasicInformation.FirstAsync(x => x.Id == updateStudent.Id);
                    student.AdmissionClassId = updateStudent.AdmissionClassId;
                    student.AdmissionDate = updateStudent.AdmissionDate;
                    student.AdmissionNumber = updateStudent.AdmissionNumber;
                    student.AlternatePhoneNumber = updateStudent.AlternatePhoneNumber;
                    student.BloodGroupId = updateStudent.BloodGroupId;
                    student.CasteId = updateStudent.CasteId;
                    student.ComingBy = updateStudent.ComingBy;
                    student.ComingPlace = updateStudent.ComingPlace;
                    student.CurrentAcademicYearId = updateStudent.CurrentAcademicYearId;
                    student.CurrentClassId = updateStudent.CurrentClassId;
                    student.DateOfBirth = updateStudent.DateOfBirth;
                    student.FamilyRelationEmail = updateStudent.FamilyRelationEmail;
                    student.FamilyRelationMobileNumber = updateStudent.FamilyRelationMobileNumber;
                    student.FamilyRelationMonthlyIncome = updateStudent.FamilyRelationMonthlyIncome;
                    student.FamilyRelationName = updateStudent.FamilyRelationName;
                    student.FamilyRelationOccupationId = updateStudent.FamilyRelationOccupationId;
                    student.FamilyRelationType = updateStudent.FamilyRelationType;
                    student.FeeChallanNumber = updateStudent.FeeChallanNumber;
                    student.FirstLanguageId = updateStudent.FirstLanguageId;
                    student.FirstName = updateStudent.FirstName;
                    student.GenderId = updateStudent.GenderId;
                    student.IdentificationMarks = updateStudent.IdentificationMarks;
                    student.IsPhysicallyHandicapped = updateStudent.IsPhysicallyHandicapped;
                    student.IsPresentAddressIsSameAsPermanent = updateStudent.IsPresentAddressIsSameAsPermanent;
                    student.LastName = updateStudent.LastName;
                    student.MaritalStatusId = updateStudent.MaritalStatusId;
                    student.MiddleName = updateStudent.MiddleName;
                    student.MotherName = updateStudent.MotherName;
                    student.MotherTongueId = updateStudent.MotherTongueId;
                    student.NationalityId = updateStudent.NationalityId;
                    student.PassportExpireDate = updateStudent.PassportExpireDate;
                    student.PassportIssuedCountryId = updateStudent.PassportIssuedCountryId;
                    student.PassportIssuedDate = updateStudent.PassportIssuedDate;
                    student.PassportNumber = updateStudent.PassportNumber;
                    student.PermanentAddress = updateStudent.PermanentAddress;
                    student.PermanentCityId = updateStudent.PermanentCityId;
                    student.PermanentZipcode = updateStudent.PermanentZipcode;
                    student.PresentAddress = updateStudent.PresentAddress;
                    student.PresentCityId = updateStudent.PresentCityId;
                    student.PresentZipcode = updateStudent.PresentZipcode;
                    student.RelievingClassId = updateStudent.RelievingClassId;
                    student.RelievingDate = updateStudent.RelievingDate;
                    student.RelievingReason = updateStudent.RelievingReason;
                    student.RelievingType = updateStudent.RelievingType;
                    student.ReligionId = updateStudent.ReligionId;
                    student.RollNumber = updateStudent.RollNumber;
                    student.SchoolApplicationNumber = updateStudent.SchoolApplicationNumber;
                    student.SecondLanguageId = updateStudent.SecondLanguageId;
                    student.SectionId = updateStudent.SectionId;
                    student.SocialSecurityNumber = updateStudent.SocialSecurityNumber;
                    student.TCDate = updateStudent.TCDate;
                    student.TCNumber = updateStudent.TCNumber;
                    _iMSDbContext.StudentBasicInformation.Update(student);
                    await _iMSDbContext.SaveChangesAsync();
                    #endregion
                    #region Remove Previous Image(s)
                    var previousImages = await _iMSDbContext.StudentGalleryMappings.Where(x => updateStudent.GalleryImageToDelete.Contains(x.Id)).ToListAsync();
                    foreach (var image in previousImages)
                    {
                        File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.ImageUrl));
                    }
                    if (previousImages.Count != 0)
                    {
                        _iMSDbContext.StudentGalleryMappings.RemoveRange(previousImages);
                        await _iMSDbContext.SaveChangesAsync();
                    }
                    #endregion
                    #region Remove Previous Document(s)
                    var previousDocuments = await _iMSDbContext.StudentDocumentMappings.Where(x => updateStudent.DocumentToDelete.Contains(x.Id)).ToListAsync();
                    foreach (var image in previousDocuments)
                    {
                        File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.FileUrl));
                    }
                    if (previousDocuments.Count != 0)
                    {
                        _iMSDbContext.StudentDocumentMappings.RemoveRange(previousDocuments);
                        await _iMSDbContext.SaveChangesAsync();
                    }
                    #endregion
                    #region Delete Previous One
                    var priorEducations = await _iMSDbContext.StudentPriorEducations.Where(x => x.StudentId == student.Id).ToListAsync();
                    _iMSDbContext.StudentPriorEducations.RemoveRange(priorEducations);
                    var sports = await _iMSDbContext.StudentSports.Where(x => x.StudentId == student.Id).ToListAsync();
                    _iMSDbContext.StudentSports.RemoveRange(sports);
                    var awards = await _iMSDbContext.StudentAwards.Where(x => x.StudentId == student.Id).ToListAsync();
                    _iMSDbContext.StudentAwards.RemoveRange(awards);
                    var disciplines = await _iMSDbContext.Disciplinaries.Where(x => x.StudentId == student.Id).ToListAsync();
                    _iMSDbContext.Disciplinaries.RemoveRange(disciplines);
                    await _iMSDbContext.SaveChangesAsync();
                    #endregion
                    #region Add Student Prior Education
                    var priorEducation = new List<StudentPriorEducation>();
                    updateStudent.StudentPriorEducations.ForEach(x =>
                    {
                        priorEducation.Add(new StudentPriorEducation()
                        {
                            CreatedOn = DateTime.UtcNow,
                            FromDate = x.FromDate,
                            InstituteName = x.InstituteName,
                            StudentId = student.Id,
                            ToDate = x.ToDate
                        });
                    });
                    _iMSDbContext.StudentPriorEducations.AddRange(priorEducation);
                    #endregion
                    #region Add Student Sport
                    sports = new List<StudentSport>();
                    updateStudent.StudentSports.ForEach(x =>
                    {
                        sports.Add(new StudentSport()
                        {
                            CreatedOn = DateTime.UtcNow,
                            LevelId = x.LevelId,
                            SportId = x.SportId,
                            StudentId = student.Id
                        });
                    });
                    _iMSDbContext.StudentSports.AddRange(sports);
                    #endregion
                    #region Add Student Award
                    awards = new List<StudentAward>();
                    updateStudent.StudentAwards.ForEach(x =>
                    {
                        awards.Add(new StudentAward()
                        {
                            AwardName = x.AwardName,
                            CreatedOn = DateTime.UtcNow,
                            InstituteName = x.InstituteName,
                            StudentId = student.Id
                        });
                    });
                    _iMSDbContext.StudentAwards.AddRange(awards);
                    #endregion
                    #region Add Student Discipline
                    disciplines = new List<Disciplinary>();
                    updateStudent.StudentDisciplines.ForEach(x =>
                    {
                        disciplines.Add(new Disciplinary()
                        {
                            CreatedOn = DateTime.UtcNow,
                            StudentId = student.Id,
                            Date = x.Date,
                            Description = x.Description,
                            Remarks = x.Remarks,
                            StatusId = x.StatusId,
                            Subject = x.Subject,
                            UpdatedById = loggedInUser.Id,
                            UpdatedOn = DateTime.UtcNow
                        });
                    });
                    _iMSDbContext.Disciplinaries.AddRange(disciplines);
                    #endregion
                    #region Send Mail/Message
                    student = await _iMSDbContext.StudentBasicInformation.Include(s => s.AdmissionClass).Include(s => s.CurrentClass)
                        .Include(s => s.SectionMap).Include(s => s.CurrentAcademicYear).Include(s => s.FirstLanguage)
                        .Include(s => s.SecondLanguage).Include(s => s.Gender).Include(s => s.PermanentCity)
                        .Include(s => s.PresentCity).Include(s => s.Institute).FirstAsync(x => x.Id == student.Id);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentEdit,
                        TemplateFormatEnum.Email, student);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentEdit,
                        TemplateFormatEnum.Sms, student);
                    #endregion
                    await _iMSDbContext.SaveChangesAsync();
                    return new StudentManagementResponse() { HasError = false, Message = "Student added successfully" };
                }
            }
            else
                return new StudentManagementResponse() { HasError = true, Message = "Student with same roll number already exist", ErrorType = StudentManagementResponseType.RollNumber };
        }

        /// <summary>
        /// Method to upload student image - SS
        /// </summary>
        /// <param name="files">files of images</param>
        /// <param name="studentId">student id</param>
        /// <param name="instituteId">institute id</param>
        public async Task AddOrUpdateStaffImageAsync(IFormFileCollection files, int studentId, int instituteId)
        {
            var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var image = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Student");
            if (image.Count != 0)
            {
                var student = await _iMSDbContext.StudentBasicInformation.FirstAsync(x => x.Id == studentId);
                if (!string.IsNullOrEmpty(student.PersonalImage))
                    File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", student.PersonalImage));
                student.PersonalImage = image[0];
                _iMSDbContext.StudentBasicInformation.Update(student);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method to add or update student gallery - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="studentId">student id</param>
        /// <param name="loggedInUser">logged in user</param>
        public async Task AddOrUpdateStudentGalleryAsync(IFormFileCollection files, int studentId, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var images = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Gallery");
            if (images.Count != 0)
            {
                var gallery = new List<StudentGalleryMapping>();
                foreach (var image in images)
                {
                    gallery.Add(new StudentGalleryMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        ImageUrl = image,
                        StudentId = studentId,
                        UpdatedById = loggedInUser.Id,
                        UpdateOn = DateTime.UtcNow
                    });
                }
                _iMSDbContext.StudentGalleryMappings.AddRange(gallery);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method to add or update student document - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="studentId">student id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <param name="addStudentDocuments">documnets details</param>
        public async Task AddOrUpdateStudentDocumentsAsync(IFormFileCollection files, int studentId, ApplicationUser loggedInUser,
            List<AddStudentDocumentMappingAc> addStudentDocuments)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var images = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Document");
            if (images.Count != 0)
            {
                var gallery = new List<StudentDocumentMapping>();
                for (int i = 0; i < images.Count; i++)
                {
                    gallery.Add(new StudentDocumentMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        ExpiredDate = addStudentDocuments[i].ExpiredDate,
                        FileType = EnumHelperService.GetValueFromDescription<FileTypeEnum>(addStudentDocuments[i].FileType),
                        FileUrl = images[i],
                        MetaData = addStudentDocuments[i].MetaData,
                        StudentId = studentId,
                        Name = addStudentDocuments[i].Name
                    });
                }
                _iMSDbContext.StudentDocumentMappings.AddRange(gallery);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method for archiving a student - RS
        /// </summary>
        /// <param name="studentId"></param>
        /// <returns></returns>
        public async Task<dynamic> ArchiveStudentAsync(int studentId, int instituteId)
        {
            StudentBasicInformation student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.Id == studentId && x.InstituteId == instituteId);
            if (student == null)
            {
                return new { Message = "Staff not found", HasError = true };
            }

            student.IsArchived = true;
            _iMSDbContext.StudentBasicInformation.Update(student);
            await _iMSDbContext.SaveChangesAsync();
            #region Send Mail/Message
            student = await _iMSDbContext.StudentBasicInformation.Include(s => s.AdmissionClass).Include(s => s.CurrentClass)
                .Include(s => s.SectionMap).Include(s => s.CurrentAcademicYear).Include(s => s.FirstLanguage)
                .Include(s => s.SecondLanguage).Include(s => s.Gender).Include(s => s.PermanentCity)
                .Include(s => s.PresentCity).Include(s => s.Institute).FirstAsync(x => x.Id == student.Id);
            await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentDelete,
                TemplateFormatEnum.Email, student);
            await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentDelete,
                TemplateFormatEnum.Sms, student);
            #endregion
            return new { Message = "Student archived successfully", HasError = false };
        }

        /// <summary>
        /// Method for fetching the user details of a student - RS
        /// </summary>
        /// <param name=""></param>
        /// <param name=""></param>
        /// <returns></returns>
        public async Task<UserAc> GetStudentUserDetailsAsync(int studentId, int loggedInUserInstituteId)
        {
            StudentBasicInformation student = await _iMSDbContext.StudentBasicInformation
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == studentId && x.InstituteId == loggedInUserInstituteId);

            if (student != null)
            {
                return new UserAc
                {
                    Id = student.User?.Id,
                    Name = student.User?.Name,
                    Email = student.User?.Email,
                    PhoneNumber = student.MobileNumber
                };
            }
            else
                return new UserAc();
        }

        /// <summary>
        /// Method for sending manual notifications to the students - RS
        /// </summary>
        /// <param name="studentNotificationAc"></param>
        /// <param name="currentUser"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<NotificationErrorAc> SendNotificationAsync(StudentNotificationAc studentNotificationAc, ApplicationUser currentUser, int instituteId)
        {
            if (studentNotificationAc.NotificationType == TemplateFormatEnum.Email)
            {
                NotificationErrorAc result = await SendManualNotificationEmail(studentNotificationAc, currentUser);
                if (!result.HasError)
                {
                    StudentNotificationDetails studentNotificationDetails = new StudentNotificationDetails
                    {
                        StudentId = studentNotificationAc.StudentId,
                        NotificationType = studentNotificationAc.NotificationType,
                        Email = studentNotificationAc.Email,
                        PhoneNumber = studentNotificationAc.PhoneNumber,
                        Subject = studentNotificationAc.Subject,
                        Message = studentNotificationAc.Message,
                        SentAt = DateTime.UtcNow,
                        SentBy = currentUser.Id,
                        InstituteId = instituteId
                    };
                    _iMSDbContext.StudentNotificationDetails.Add(studentNotificationDetails);
                    await _iMSDbContext.SaveChangesAsync();
                }
                return result;
            }
            else if (studentNotificationAc.NotificationType == TemplateFormatEnum.Sms)
            {
                if (_smsConfiguration.IsSmsSendingEnabled)
                {
                    NotificationErrorAc result = await SendManualNotificationSms(studentNotificationAc);
                    if (!result.HasError)
                    {
                        StudentNotificationDetails studentNotificationDetails = new StudentNotificationDetails
                        {
                            StudentId = studentNotificationAc.StudentId,
                            NotificationType = studentNotificationAc.NotificationType,
                            Email = studentNotificationAc.Email,
                            PhoneNumber = studentNotificationAc.PhoneNumber,
                            Subject = studentNotificationAc.Subject,
                            Message = studentNotificationAc.Message,
                            SentAt = DateTime.UtcNow,
                            SentBy = currentUser.Id,
                            InstituteId = instituteId
                        };
                        _iMSDbContext.StudentNotificationDetails.Add(studentNotificationDetails);
                        await _iMSDbContext.SaveChangesAsync();
                    }
                    return result;
                }
                return new NotificationErrorAc { Message = "We are currently not available for sending SMS", HasError = true };
            }

            return new NotificationErrorAc { Message = "Please select a valid notification type", HasError = true };
        }

        /// <summary>
        /// Method for fetching the list of all student articles - RS
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<List<StudentArticles>> GetAllStudentsArticlesAsync(int instituteId)
        {
            return await _iMSDbContext.StudentArticles
                .Include(x => x.SubmittedByStudent)
                .Where(x => x.SubmittedByStudent.InstituteId == instituteId)
                .OrderByDescending(x => x.IsApproved)
                .ToListAsync();
        }

        /// <summary>
        /// Method for approving an article - RS
        /// </summary>
        /// <param name="articleId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<dynamic> ApproveStudentArticleAsync(int articleId, int instituteId)
        {
            StudentArticles studentArticle = await _iMSDbContext.StudentArticles.FirstOrDefaultAsync(x => x.Id == articleId);

            if (studentArticle == null)
            {
                return new { Message = "No article exist with this id", HasError = true };
            }
            else
            {
                studentArticle.IsApproved = true;
                _iMSDbContext.StudentArticles.Update(studentArticle);
                await _iMSDbContext.SaveChangesAsync();

                return new { Message = "Article approved", HasError = false };
            }
        }

        /// <summary>
        /// Method for fetching the dashboard details of the students for logged in admin - RS
        /// </summary>
        /// <param name="currentUser">currentUser</param>
        /// <returns></returns>
        public async Task<StudentManagementDashboardDetailsAc> GetStudentManagementDashboardDetailsAsync(ApplicationUser currentUser)
        {
            var currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            List<StudentBasicInformation> allStudentsList = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == currentUser.Id
            && x.AcademicYear.InstituteId == currentUserInstituteId);
            if (academicYear != null)
                allStudentsList = allStudentsList.Where(x => x.CurrentAcademicYearId == academicYear.AcademicYearId).ToList();
            #region Active Students
            List<StudentBasicInformation> studentBasicInformation = new List<StudentBasicInformation>();
            List<StudentBasicInformation> students = allStudentsList.Where(x => x.InstituteId == currentUserInstituteId && x.IsActive).ToList();
            List<int> relievedStudentIds = await _iMSDbContext.StudentRelievingMappings.Where(x => x.Student.InstituteId == currentUserInstituteId).Select(x => x.StudentId).ToListAsync();
            students.ForEach(x =>
            {
                if (!relievedStudentIds.Contains(x.Id))
                    studentBasicInformation.Add(x);
            });
            #endregion

            #region Inactive Students

            List<StudentBasicInformation> inactiveStudentsList = allStudentsList.Where(x => x.InstituteId == currentUserInstituteId && !x.IsActive).ToList();

            #endregion

            #region Relieved Students

            List<StudentRelievingMapping> relievedStudentsList = await _studentRelievingManagementRepository.GetAllStudentRelievingMappingsAsync(currentUser);
            relievedStudentsList = relievedStudentsList.Where(x => x.StudentRelieving == StudentRelievingEnum.Termination).ToList();
            if (academicYear != null)
                relievedStudentsList = relievedStudentsList.Where(x => x.Student.CurrentAcademicYearId == academicYear.AcademicYearId).ToList();
            #endregion

            #region Religion Student Percentage (Pie chart data)

            List<Religion> religionsList = await _iMSDbContext.Religions.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<ReligionWiseStudentStaffPercentageAc> religionWiseStudentPercentagesList = new List<ReligionWiseStudentStaffPercentageAc>();
            foreach (Religion religion in religionsList)
            {
                religionWiseStudentPercentagesList.Add(new ReligionWiseStudentStaffPercentageAc
                {
                    ReligionName = religion.Name + "(" + allStudentsList.Where(x => x.ReligionId == religion.Id).ToList().Count + ")",
                    Percentage = allStudentsList.Count == 0 ? 0
                        : (allStudentsList.Where(x => x.ReligionId == religion.Id).ToList().Count * 100) / allStudentsList.Count,
                    StudentStaffCount = allStudentsList.Where(x => x.ReligionId == religion.Id).ToList().Count
                });
            }

            #endregion

            #region Class Student Percentage (Bar chart data)

            List<InstituteClass> classesList = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<ClassWiseStudentStaffPercentageAc> classWiseStudentPercentagesList = new List<ClassWiseStudentStaffPercentageAc>();
            foreach (InstituteClass instituteClass in classesList)
            {
                classWiseStudentPercentagesList.Add(new ClassWiseStudentStaffPercentageAc
                {
                    ClassName = instituteClass.Name + "(" + allStudentsList.Where(x => x.CurrentClassId == instituteClass.Id).ToList().Count + ")",
                    Percentage = allStudentsList.Count == 0 ? 0
                        : (allStudentsList.Where(x => x.CurrentClassId == instituteClass.Id).ToList().Count * 100) / allStudentsList.Count,
                    StudentStaffCount = allStudentsList.Where(x => x.CurrentClassId == instituteClass.Id).ToList().Count
                });
            }

            #endregion

            #region Active/Inactive Students (Bar chart data)

            List<ActiveInactiveStudentStaffPercentageAc> activeInactiveStudentPercentagesList = new List<ActiveInactiveStudentStaffPercentageAc>
            {
                new ActiveInactiveStudentStaffPercentageAc
                {
                    Activity = "Active(" + studentBasicInformation.Count + ")",
                    Percentage = allStudentsList.Count == 0 ? 0
                        : (studentBasicInformation.Count * 100) / allStudentsList.Count,
                    StudentStaffCount = studentBasicInformation.Count
                },
                new ActiveInactiveStudentStaffPercentageAc
                {
                    Activity = "Inactive(" + inactiveStudentsList.Count + ")",
                    Percentage = allStudentsList.Count == 0 ? 0
                        : (inactiveStudentsList.Count * 100) / allStudentsList.Count,
                    StudentStaffCount = inactiveStudentsList.Count
                }
            };

            #endregion

            #region Gender Wise Student Percentage (Doughnut chart data)

            List<Gender> gendersList = await _iMSDbContext.Genders.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
            List<GenderWiseStudentStaffPercentageAc> genderWiseStudentPercentagesList = new List<GenderWiseStudentStaffPercentageAc>();
            foreach (Gender gender in gendersList)
            {
                genderWiseStudentPercentagesList.Add(new GenderWiseStudentStaffPercentageAc
                {
                    Gender = gender.Name + "(" + allStudentsList.Where(x => x.GenderId == gender.Id).ToList().Count + ")",
                    Percentage = allStudentsList.Count == 0 ? 0
                        : (allStudentsList.Where(x => x.GenderId == gender.Id).ToList().Count * 100) / allStudentsList.Count,
                    StudentStaffCount = allStudentsList.Where(x => x.GenderId == gender.Id).ToList().Count
                });
            }

            #endregion

            #region Total Fee Collected

            double totalFeeCollected = (await _feeReceiptManagementRepository.GetAllFeeReceiptsAsync(currentUserInstituteId)).Sum(x => x.Total);

            #endregion

            #region Total Fee Refunded

            double totalFeeRefunded = (await _feeRefundManagementRepository.GetAllFeeRefundsAsync(currentUserInstituteId)).Sum(x => x.Amount);

            #endregion

            #region Activities (Calendar view data)

            List<StaffActivity> activityList = await _staffActivityManagementRepository.GetActivitiesForStudentAsync(currentUserInstituteId, null);

            #endregion

            return new StudentManagementDashboardDetailsAc
            {
                ReligionWiseStudentPercentagesList = religionWiseStudentPercentagesList,
                ClassWiseStudentPercentagesList = classWiseStudentPercentagesList,
                ActiveInactiveStudentPercentagesList = activeInactiveStudentPercentagesList,
                GenderWiseStudentPercentagesList = genderWiseStudentPercentagesList,
                TotalStudentsCount = studentBasicInformation.Count + inactiveStudentsList.Count,
                ActiveStudentsCount = studentBasicInformation.Count,
                InActiveStudentsCount = inactiveStudentsList.Count,
                TerminatedStudentsCount = relievedStudentsList.Count,
                TotalFeeCollected = totalFeeCollected,
                TotalFeeRefunded = totalFeeRefunded,
                ActivityList = activityList
            };
        }

        /// <summary>
        /// Method to add bulk student from excel - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <param name="formFile">excel file</param>
        /// <param name="loggedInUserId">logged in user</param>
        /// <returns>message</returns>
        public async Task<string> ImportStudentFromExcelAsync(int instituteId, IFormFile formFile, string loggedInUserId)
        {
            try
            {
                #region Previous Data(s)
                var users = await _iMSDbContext.Users.ToListAsync();
                var classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
                var sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
                var academicYears = await _iMSDbContext.InstituteAcademicYears.Where(x => x.InstituteId == instituteId).ToListAsync();
                var languages = await _iMSDbContext.InstituteLanguageMasters.Where(x => x.InstituteId == instituteId).ToListAsync();
                var genders = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync();
                var maritalStatuses = await _iMSDbContext.MaritalStatuses.Where(x => x.InstituteId == instituteId).ToListAsync();
                var cities = await _iMSDbContext.AdministrationCities.Where(x => x.State.Country.InstituteId == instituteId).ToListAsync();
                #endregion

                var excelData = ExcelHelperService.ReadDataFromExcel(formFile);
                if (excelData.Count != 0)
                {
                    if (excelData.Count < 1000)
                    {
                        #region Excel Data(s)
                        var excelClasses = new List<string>();
                        var excelSections = new List<string>();
                        var excelAcademicYears = new List<string>();
                        var excelLanguages = new List<string>();
                        var excelGenders = new List<string>();
                        var excelMaritalStatuses = new List<string>();
                        var excelCities = new List<string>();
                        for (int i = 0; i < excelData.Count; i++)
                        {
                            excelClasses.Add(excelData[i][3]);
                            excelClasses.Add(excelData[i][4]);
                            excelSections.Add(excelData[i][5]);
                            excelAcademicYears.Add(excelData[i][6]);
                            excelLanguages.Add(excelData[i][7]);
                            excelLanguages.Add(excelData[i][8]);
                            excelGenders.Add(excelData[i][12]);
                            excelMaritalStatuses.Add(excelData[i][13]);
                            excelCities.Add(excelData[i][19]);
                        }
                        #endregion

                        #region Difference and Bulk Add
                        #region Difference
                        var classesToAdd = excelClasses.ConvertAll(x => x.ToLowerInvariant())
                            .Except((classes.Select(x => x.GroupCode).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var sectionToAdd = excelSections.ConvertAll(x => x.ToLowerInvariant())
                            .Except((sections.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var academicYearsToAdd = excelAcademicYears.ConvertAll(x => x.ToLowerInvariant())
                            .Except((academicYears.Select(x => x.AcademicYearCode).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var languagesToAdd = excelLanguages.ConvertAll(x => x.ToLowerInvariant())
                            .Except((languages.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var genderToAdd = excelGenders.ConvertAll(x => x.ToLowerInvariant())
                            .Except((genders.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var maritalStatusesToAdd = excelMaritalStatuses.ConvertAll(x => x.ToLowerInvariant())
                            .Except((maritalStatuses.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var citiesToAdd = excelCities.ConvertAll(x => x.ToLowerInvariant())
                            .Except((cities.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        #endregion

                        #region Class
                        List<InstituteClass> classNewData = new List<InstituteClass>();
                        classesToAdd.ForEach(x =>
                        {
                            classNewData.Add(new InstituteClass()
                            {
                                GroupCode = x,
                                DurationUnit = InstituteClassDurationUnitEnum.Days,
                                ClassOrder = 0,
                                Duration = 0,
                                NumberOfFeeTerms = 1,
                                InstituteId = instituteId,
                                Name = x,
                                CreatedOn = DateTime.UtcNow,
                            });
                        });
                        #endregion

                        #region Section
                        List<Section> sectionNewData = new List<Section>();
                        sectionToAdd.ForEach(x =>
                        {
                            sectionNewData.Add(new Section()
                            {
                                Code = x,
                                Description = x,
                                InstituteId = instituteId,
                                Name = x,
                                Status = true,
                                CreatedOn = DateTime.UtcNow,
                            });
                        });
                        #endregion

                        #region Academic Year
                        List<InstituteAcademicYear> academicYearNewData = new List<InstituteAcademicYear>();
                        academicYearsToAdd.ForEach(x =>
                        {
                            academicYearNewData.Add(new InstituteAcademicYear()
                            {
                                AcademicYearCode = x,
                                ChallanStartingNumber = "default",
                                CreatedBy = loggedInUserId,
                                FromDate = DateTime.UtcNow,
                                ToDate = DateTime.UtcNow.AddYears(1),
                                UpdatedBy = loggedInUserId,
                                InstituteId = instituteId,
                                UpdatedOn = DateTime.UtcNow,
                                CreatedOn = DateTime.UtcNow,
                            });
                        });
                        #endregion

                        #region Language
                        List<DomainModel.Models.InstituteLanguageMaster> languageNewData = new List<DomainModel.Models.InstituteLanguageMaster>();
                        languagesToAdd.ForEach(x =>
                        {
                            languageNewData.Add(new DomainModel.Models.InstituteLanguageMaster()
                            {
                                Code = x,
                                InstituteId = instituteId,
                                Name = x,
                                Status = true,
                                Description = x,
                                CreatedOn = DateTime.UtcNow,
                            });
                        });
                        #endregion

                        #region Gender
                        List<Gender> genderNewData = new List<Gender>();
                        genderToAdd.ForEach(x =>
                        {
                            genderNewData.Add(new Gender()
                            {
                                Code = x,
                                Description = x,
                                InstituteId = instituteId,
                                Name = x,
                                Status = true,
                                CreatedOn = DateTime.UtcNow,
                            });
                        });
                        #endregion

                        #region Marital Statuses
                        List<MaritalStatus> maritalStatusNewData = new List<MaritalStatus>();
                        maritalStatusesToAdd.ForEach(x =>
                        {
                            maritalStatusNewData.Add(new MaritalStatus()
                            {
                                Code = x,
                                Description = x,
                                InstituteId = instituteId,
                                Name = x,
                                Status = true,
                                CreatedOn = DateTime.UtcNow,
                            });
                        });
                        #endregion

                        #region City
                        List<AdministrationCity> cityNewData = new List<AdministrationCity>();
                        if (citiesToAdd.Count != 0)
                        {
                            var country = new AdministrationCountry() { Code = "Default", CreatedOn = DateTime.UtcNow, Description = "Default", Name = "Default", Status = true, InstituteId = instituteId };
                            _iMSDbContext.AdministrationCountries.Add(country);
                            await _iMSDbContext.SaveChangesAsync();
                            var state = new AdministrationState() { Code = "Default", CountryId = country.Id, CreatedOn = DateTime.UtcNow, Description = "Default", Name = "Default", Status = true };
                            _iMSDbContext.AdministrationStates.Add(state);
                            await _iMSDbContext.SaveChangesAsync();
                            citiesToAdd.ForEach(x =>
                            {
                                cityNewData.Add(new AdministrationCity()
                                {
                                    Code = x,
                                    Description = x,
                                    Name = x,
                                    StateId = state.Id,
                                    Status = true,
                                    CreatedOn = DateTime.UtcNow,
                                });
                            });
                        }
                        #endregion

                        #region Look up Data Bulk Entrty
                        using (var transaction = await _iMSDbContext.Database.BeginTransactionAsync())
                        {
                            if (classNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(classNewData);
                            if (sectionNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(sectionNewData);
                            if (academicYearNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(academicYearNewData);
                            if (languageNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(languageNewData);
                            if (genderNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(genderNewData);
                            if (maritalStatusNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(maritalStatusNewData);
                            if (cityNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(cityNewData);
                            transaction.Commit();
                        }
                        #endregion
                        #endregion

                        #region Previous Data(s)
                        classes = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
                        sections = await _iMSDbContext.Sections.Where(x => x.InstituteId == instituteId).ToListAsync();
                        academicYears = await _iMSDbContext.InstituteAcademicYears.Where(x => x.InstituteId == instituteId).ToListAsync();
                        languages = await _iMSDbContext.InstituteLanguageMasters.Where(x => x.InstituteId == instituteId).ToListAsync();
                        genders = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync();
                        maritalStatuses = await _iMSDbContext.MaritalStatuses.Where(x => x.InstituteId == instituteId).ToListAsync();
                        cities = await _iMSDbContext.AdministrationCities.Where(x => x.State.Country.InstituteId == instituteId).ToListAsync();
                        #endregion

                        #region Bulk Student
                        var previousStudent = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
                        List<StudentBasicInformation> students = new List<StudentBasicInformation>();
                        List<UserInstituteMapping> userInstituteMappings = new List<UserInstituteMapping>();
                        foreach (var student in excelData)
                        {
                            var user = users.FirstOrDefault(x => x.UserName == student[20]);
                            if (user == null)
                            {
                                var password = "itech1@3";
                                user = new ApplicationUser() { UpdatedBy = loggedInUserId, Name = student[9] + " " + student[10], CreatedBy = loggedInUserId, CreatedOn = DateTime.UtcNow, UpdatedOn = DateTime.UtcNow, UserName = student[20] };
                                await _userManager.CreateAsync(user, password);
                            }
                            if (!await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.InstituteId == instituteId && x.UserId == user.Id))
                                userInstituteMappings.Add(new UserInstituteMapping()
                                {
                                    CreatedOn = DateTime.UtcNow,
                                    InstituteId = instituteId,
                                    IsActive = false,
                                    UserId = user.Id
                                });
                            if (!previousStudent.Any(x => x.RollNumber.ToLowerInvariant() == student[0].ToLowerInvariant()))
                                students.Add(new StudentBasicInformation()
                                {
                                    RollNumber = student[0],
                                    AdmissionDate = DateTime.Parse(student[1]),
                                    AdmissionNumber = student[2],
                                    AdmissionClassId = classes.First(x => x.GroupCode.ToLowerInvariant() == student[3].ToLowerInvariant()).Id,
                                    CurrentClassId = classes.First(x => x.GroupCode.ToLowerInvariant() == student[4].ToLowerInvariant()).Id,
                                    SectionId = sections.First(x => x.Code.ToLowerInvariant() == student[5].ToLowerInvariant()).Id,
                                    CurrentAcademicYearId = academicYears.First(x => x.AcademicYearCode.ToLowerInvariant() == student[6].ToLowerInvariant()).Id,
                                    FirstLanguageId = languages.First(x => x.Code.ToLowerInvariant() == student[7].ToLowerInvariant()).Id,
                                    SecondLanguageId = languages.First(x => x.Code.ToLowerInvariant() == student[8].ToLowerInvariant()).Id,
                                    FirstName = student[9],
                                    LastName = student[10],
                                    DateOfBirth = DateTime.Parse(student[11]),
                                    GenderId = genders.First(x => x.Code.ToLowerInvariant() == student[12].ToLowerInvariant()).Id,
                                    MaritalStatusId = maritalStatuses.First(x => x.Code.ToLowerInvariant() == student[13].ToLowerInvariant()).Id,
                                    FeeChallanNumber = student[14],
                                    FamilyRelationName = student[15],
                                    FamilyRelationType = FamilyRelationTypeEnum.Father,
                                    MotherName = student[16],
                                    FamilyRelationMobileNumber = student[17],
                                    PermanentAddress = student[18],
                                    PermanentCityId = cities.First(x => x.Code.ToLowerInvariant() == student[19].ToLowerInvariant()).Id,
                                    PresentCityId = cities.First(x => x.Code.ToLowerInvariant() == student[19].ToLowerInvariant()).Id,
                                    IsPresentAddressIsSameAsPermanent = true,
                                    MobileNumber = student[20],
                                    UserId = user.Id,
                                    CreatedOn = DateTime.UtcNow,
                                    InstituteId = instituteId,
                                    IsActive = true,
                                    IsArchived = false,
                                    IsPhysicallyHandicapped = false
                                });
                        }
                        students = students.GroupBy(x => x.RollNumber).Select(g => g.First()).ToList();
                        using (var transaction = await _iMSDbContext.Database.BeginTransactionAsync())
                        {
                            if (students.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(students);
                            if (userInstituteMappings.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(userInstituteMappings);
                            transaction.Commit();
                        }
                        #endregion
                        return "Data saved successfully";
                    }
                    else
                        return "Data exceeded. Please make sure workbook should not contain more than 1000 records";
                }
                else
                    return "Empty excel";
            }
            catch (Exception)
            {
                return "Error in format or data in excel";
            }
        }
        #endregion

        #region Private Method(s)

        /// <summary>
        /// Method generate random alphanumeric strings - SS
        /// </summary>
        /// <returns>Random alphanumeric strings</returns>
        private string RandomString()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 10).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        /// <summary>
        /// Method for sending notification emails to the student - RS
        /// </summary>
        /// <returns></returns>
        private async Task<NotificationErrorAc> SendManualNotificationEmail(StudentNotificationAc studentNotificationAc, ApplicationUser currentUser)
        {
            StudentBasicInformation student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.Id == studentNotificationAc.StudentId);
            if (student != null)
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
                RazorLightEngine engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
                string resultFromFile = await engine.CompileRenderAsync("NotificationEmailToStudent.cshtml", studentNotificationAc);

                _emailService.SendMail(new EmailMessage()
                {
                    Content = resultFromFile,
                    Subject = studentNotificationAc.Subject,
                    FromAddresses = new List<EmailAddress> { new EmailAddress() { Address = currentUser.Email, Name = currentUser.Name } },
                    ToAddresses = new List<EmailAddress> { new EmailAddress() { Address = studentNotificationAc.Email, Name = student.FirstName } }
                });

                return new NotificationErrorAc { Message = "Email sent", HasError = false };
            }
            else
            {
                return new NotificationErrorAc { Message = "Student not found", HasError = true };
            }
        }

        /// <summary>
        /// Method for sending notification SMS to the student - RS
        /// </summary>
        /// <returns></returns>
        private async Task<NotificationErrorAc> SendManualNotificationSms(StudentNotificationAc studentNotificationAc)
        {
            StudentBasicInformation student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.Id == studentNotificationAc.StudentId);
            if (student != null)
            {
                string messageBody = string.Format("Hello {0}. {1}", student.FirstName, studentNotificationAc.Message);
                return (await _smsService.SendSms(studentNotificationAc.PhoneNumber, messageBody));
            }
            else
            {
                return new NotificationErrorAc { Message = "Student not found", HasError = true };
            }
        }

        /// <summary>
        /// Method to generate roll number - SS
        /// </summary>
        /// <param name="autoSequence"></param>
        /// <returns></returns>
        private async Task<string> GenerateRollNumberAsync(AutoSequenceGenerator autoSequence)
        {
            string value = string.Empty;
            var selected = autoSequence.AutoSequenceGeneratorDataTypes.OrderByDescending(x => x.OrderId).Where(x => x.IsSelected).ToList();
            selected.Reverse();
            for (int i = 0; i < selected.Count; i++)
            {
                var data = selected[i];
                switch (data.Name)
                {
                    case "Institute":
                        {
                            value += autoSequence.Institute.Name.Substring(0, (autoSequence.Institute.Name.Length >= data.Length ? data.Length : autoSequence.Institute.Name.Length));
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Day":
                        {
                            value += DateTime.UtcNow.DayOfWeek.GetDescription();
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Month":
                        {
                            value += DateTime.UtcNow.Month;
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Year":
                        {
                            value += DateTime.UtcNow.Year;
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Date":
                        {
                            value += DateTime.UtcNow.Day;
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Text":
                        {
                            value += autoSequence.CustomText.Substring(0, data.Length);
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Sequence Number":
                        {
                            var count = await _iMSDbContext.StudentBasicInformation.CountAsync();
                            count++;
                            var length = "D" + data.Length;
                            value += count.ToString(length);
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                }
            }
            return value;
        }

        /// <summary>
        /// Method to send mail to institute admin welcome mail - SS
        /// </summary>
        /// <param name="welcomeMailToAdmin">contain password for institute admin</param>
        /// <param name="email">email of institute admin</param>
        //private async Task SendMail(WelcomeMailToAdminAc welcomeMailToAdmin, string email)
        //{
        //    var path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
        //    var engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
        //    string resultFromFile = await engine.CompileRenderAsync("WelcomeMailToAdmin.cshtml", welcomeMailToAdmin);
        //    _emailService.SendMail(new EmailMessage()
        //    {
        //        Content = resultFromFile,
        //        Subject = "Welcome To IMS",
        //        FromAddresses = new List<EmailAddress>() { new EmailAddress() { Address = _emailConfiguration.SmtpUsername, Name = "IMS SuperAdmin" } },
        //        ToAddresses = new List<EmailAddress>() { new EmailAddress() { Address = email, Name = "Admin" } }
        //    });
        //}


        #endregion
    }
}
