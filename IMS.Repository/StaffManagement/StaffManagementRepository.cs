using EFCore.BulkExtensions;
using IMS.DomainModel.ApplicationClasses.StaffManagement;
using IMS.DomainModel.ApplicationClasses.VisualChartData;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.StaffActivityManagement;
using IMS.Repository.StaffPlannerManagement;
using IMS.Repository.TemplateManagement;
using IMS.Repository.UserGroupManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.ExcelHelper;
using IMS.Utility.ImageStorageHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IMS.Repository.StaffManagement
{
    public class StaffManagementRepository : IStaffManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly Random random = new Random();
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly IImageStorageHelperService _imageStorageHelperService;
        private SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        private readonly IStaffActivityManagementRepository _staffActivityManagementRepository;
        private readonly IStaffPlannerManagementRepository _staffPlannerManagementRepository;
        private readonly IUserGroupManagementRepository _userGroupManagementRepository;
        private readonly ITemplateManagementRepository _templateManagementRepository;
        #endregion

        #region Constructor
        public StaffManagementRepository(IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager,
            IInstituteUserMappingHelperService instituteUserMappingHelperService, IImageStorageHelperService imageStorageHelperService,
            IStaffActivityManagementRepository staffActivityManagementRepository, IStaffPlannerManagementRepository
            staffPlannerManagementRepository, IUserGroupManagementRepository userGroupManagementRepository,
            ITemplateManagementRepository templateManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _imageStorageHelperService = imageStorageHelperService;
            _staffActivityManagementRepository = staffActivityManagementRepository;
            _staffPlannerManagementRepository = staffPlannerManagementRepository;
            _userGroupManagementRepository = userGroupManagementRepository;
            _templateManagementRepository = templateManagementRepository;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add staff detail - SS
        /// </summary>
        /// <param name="addStaff">staff detail</param>
        /// <param name="loggedInUser">logged in user detail</param>
        /// <returns>response</returns>
        public async Task<StaffManagementResponse> AddStaffDetailAsync(AddStaffManagementAc addStaff, ApplicationUser loggedInUser)
        {
            await semaphore.WaitAsync();
            try
            {
                if (string.IsNullOrEmpty(addStaff.Email.Trim()))
                    return new StaffManagementResponse() { ErrorType = StaffManagementResponseType.Email, HasError = true, Message = "Email address can't be empty" };
                else
                {
                    var user = await _userManager.FindByEmailAsync(addStaff.Email);
                    var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                    bool isUserExist = false;
                    if (user != null)
                        isUserExist = await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.UserId == user.Id && x.InstituteId == instituteId);
                    if (!isUserExist)
                    {
                        if (await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.EmployeeId == addStaff.EmployeeId))
                        {
                            var autoSequence = await _iMSDbContext.AutoSequenceGenerators.Include(s => s.AutoSequenceGeneratorDataTypes)
                                .Include(d => d.Institute).FirstOrDefaultAsync(x => x.InstituteId == instituteId
                                && x.AutoSequenceGeneratorType == AutoSequenceGeneratorTypeEnum.EmployeeId);
                            if (autoSequence == null)
                                return new StaffManagementResponse() { Message = "Employee id already exist. Please use unique id", HasError = true, ErrorType = StaffManagementResponseType.EmployeeId };
                            else
                            {
                                addStaff.EmployeeId = await GenerateEmployeeIdAsync(autoSequence);
                            }
                        }
                        if (string.IsNullOrEmpty(addStaff.FirstName.Trim()))
                            return new StaffManagementResponse() { Message = "First name can't be empty", HasError = true, ErrorType = StaffManagementResponseType.FirstName };
                        else if (string.IsNullOrEmpty(addStaff.LastName.Trim()))
                            return new StaffManagementResponse() { Message = "Last name can't be empty", HasError = true, ErrorType = StaffManagementResponseType.LastName };
                        else if (string.IsNullOrEmpty(addStaff.PermanentAddress.Trim()))
                            return new StaffManagementResponse() { Message = "Permanent address can't be empty", HasError = true, ErrorType = StaffManagementResponseType.PermanentAddress };
                        else if (string.IsNullOrEmpty(addStaff.MobileNumber.Trim()))
                            return new StaffManagementResponse() { Message = "Mobile number can't be empty", HasError = true, ErrorType = StaffManagementResponseType.MobileNumber };
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
                                    Email = addStaff.Email,
                                    UserName = addStaff.Email,
                                    Name = addStaff.FirstName + (string.IsNullOrEmpty(addStaff.MiddleName.Trim()) ? " " : addStaff.MiddleName + " ") + addStaff.LastName,
                                    UpdatedOn = DateTime.UtcNow,
                                    UpdatedBy = loggedInUser.Id
                                };
                                await _userManager.CreateAsync(user, password);
                            }
                            else
                            {
                                if (await _iMSDbContext.Institutes.AnyAsync(x => x.Id == instituteId && x.AdminId == user.Id))
                                    return new StaffManagementResponse() { HasError = true, ErrorType = StaffManagementResponseType.Email, Message = "Email address is already linked up with admin. Admin can't be staff" };
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

                            #region Add Staff
                            var staff = new StaffBasicPersonalInformation()
                            {
                                AlternatePhoneNumber = addStaff.AlternatePhoneNumber,
                                BloodGroupId = addStaff.BloodGroupId,
                                CasteId = addStaff.CasteId,
                                CreatedOn = DateTime.UtcNow,
                                DateOfBirth = addStaff.DateOfBirth,
                                DateOfJoining = addStaff.DateOfJoining,
                                DesignationId = addStaff.DesignationId,
                                EmployeeId = addStaff.EmployeeId,
                                FirstName = addStaff.FirstName,
                                GenderId = addStaff.GenderId,
                                IdentificationMarks = addStaff.IdentificationMarks,
                                IsPresentAddressIsSameAsPermanent = addStaff.IsPresentAddressIsSameAsPermanent,
                                IsTeachingStaff = addStaff.IsTeachingStaff,
                                LastName = addStaff.LastName,
                                MaritalStatusId = addStaff.MaritalStatusId,
                                MiddleName = addStaff.MiddleName,
                                MobileNumber = addStaff.MobileNumber,
                                MotherTongueId = addStaff.MotherTongueId,
                                NationalityId = addStaff.NationalityId,
                                PassportExpireDate = addStaff.PassportExpireDate,
                                PassportIssuedCountryId = addStaff.PassportIssuedCountryId,
                                PassportIssuedDate = addStaff.PassportIssuedDate,
                                PassportNumber = addStaff.PassportNumber,
                                PermanentAddress = addStaff.PermanentAddress,
                                PermanentCityId = addStaff.PermanentCityId,
                                PermanentZipcode = addStaff.PermanentZipcode,
                                PresentAddress = addStaff.PresentAddress,
                                PresentCityId = addStaff.PresentCityId,
                                PresentZipcode = addStaff.PresentZipcode,
                                Qualification = addStaff.Qualification,
                                ReligionId = addStaff.ReligionId,
                                SocialSecurityNumber = addStaff.SocialSecurityNumber,
                                TeachingStaffId = addStaff.TeachingStaffId,
                                UserId = user.Id,
                                InstituteId = instituteId,
                                IsArchived = false
                            };
                            _iMSDbContext.StaffBasicPersonalInformation.Add(staff);
                            await _iMSDbContext.SaveChangesAsync();
                            #endregion

                            #region Add Staff Experience

                            List<StaffExperienceMapping> staffExperiences = new List<StaffExperienceMapping>();
                            foreach (var experience in addStaff.AddStaffExperienceMappings)
                            {
                                staffExperiences.Add(new StaffExperienceMapping()
                                {
                                    CreatedOn = DateTime.UtcNow,
                                    EndDate = experience.EndDate,
                                    InstituteName = experience.InstituteName,
                                    StaffId = staff.Id,
                                    StartDate = experience.StartDate
                                });
                            }
                            if (staffExperiences.Count != 0)
                            {
                                _iMSDbContext.StaffExperiences.AddRange(staffExperiences);
                                await _iMSDbContext.SaveChangesAsync();
                            }

                            #endregion

                            #region Add Staff Departments Mappings

                            List<StaffDepartmentMapping> staffDepartments = new List<StaffDepartmentMapping>();

                            foreach (int departmentId in addStaff.DepartmentsIdList)
                            {
                                staffDepartments.Add(new StaffDepartmentMapping
                                {
                                    CreatedOn = DateTime.Now,
                                    DepartmentId = departmentId,
                                    StaffId = staff.Id
                                });
                            }

                            if (staffDepartments.Count != 0)
                            {
                                _iMSDbContext.StaffDepartmentMappings.AddRange(staffDepartments);
                                await _iMSDbContext.SaveChangesAsync();
                            }

                            #endregion

                            #region Send Mail/Message
                            staff = await _iMSDbContext.StaffBasicPersonalInformation.Include(s => s.Gender).Include(s => s.PermanentCity)
                                .Include(s => s.PresentCity).Include(s => s.Institute).Include(s=>s.User).FirstAsync(x => x.Id == staff.Id);
                            await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffAdd,
                                TemplateFormatEnum.Email, staff, password);
                            await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffAdd,
                                TemplateFormatEnum.Sms, staff, password);
                            #endregion
                            await _userGroupManagementRepository.AddStudentOrStaffInUserGroupAsync(user.Id, false, instituteId);
                            return new StaffManagementResponse() { HasError = false, Message = "Staff added successfully", StaffId = staff.Id };
                        }
                    }
                    else
                        return new StaffManagementResponse() { Message = "Staff with this email already exist", HasError = true, ErrorType = StaffManagementResponseType.Email };
                }
            }
            finally
            {
                semaphore.Release();
            }
        }

        /// <summary>
        /// Method to get initial data for add and edit staff - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>bundle of initial data</returns>
        public async Task<InitialDataForAddOrEditStaffBundle> GetInitialDataForAddOrEditStaffAsync(int instituteId)
        {
            return new InitialDataForAddOrEditStaffBundle()
            {
                BloodGroups = await _iMSDbContext.BloodGroups.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Castes = await _iMSDbContext.Castes.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Cities = await _iMSDbContext.AdministrationCities.Where(x => x.State.Country.InstituteId == instituteId).ToListAsync(),
                Countries = await _iMSDbContext.AdministrationCountries.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Designations = await _iMSDbContext.Designations.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Genders = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync(),
                MotherTongues = await _iMSDbContext.MotherTongues.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Nationalities = await _iMSDbContext.InstituteNationalities.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Religions = await _iMSDbContext.Religions.Where(x => x.InstituteId == instituteId).ToListAsync(),
                Departments = await _iMSDbContext.Departments.Where(x => x.InstituteId == instituteId).ToListAsync(),
                MaritalStatuses = await _iMSDbContext.MaritalStatuses.Where(x => x.InstituteId == instituteId).ToListAsync(),
                TeachingStaffs = await _iMSDbContext.TeachingStaffs.Where(x => x.InstituteId == instituteId).ToListAsync()
            };
        }

        /// <summary>
        /// Method to update staff - SS
        /// </summary>
        /// <param name="updateStaff">staff detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<StaffManagementResponse> UpdateStaffAsync(UpdateStaffManagementAc updateStaff, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId &&
            x.Id != updateStaff.Id).ToListAsync();
            if (!staffs.Any(x => x.EmployeeId == updateStaff.EmployeeId))
            {
                if (string.IsNullOrEmpty(updateStaff.FirstName.Trim()))
                    return new StaffManagementResponse() { Message = "First name can't be empty", HasError = true, ErrorType = StaffManagementResponseType.FirstName };
                else if (string.IsNullOrEmpty(updateStaff.LastName.Trim()))
                    return new StaffManagementResponse() { Message = "Last name can't be empty", HasError = true, ErrorType = StaffManagementResponseType.LastName };
                else if (string.IsNullOrEmpty(updateStaff.PermanentAddress.Trim()))
                    return new StaffManagementResponse() { Message = "Permanent address can't be empty", HasError = true, ErrorType = StaffManagementResponseType.PermanentAddress };
                else if (string.IsNullOrEmpty(updateStaff.MobileNumber.Trim()))
                    return new StaffManagementResponse() { Message = "Mobile number can't be empty", HasError = true, ErrorType = StaffManagementResponseType.MobileNumber };
                else
                {
                    #region Update Staff
                    var staff = await _iMSDbContext.StaffBasicPersonalInformation.FirstAsync(x => x.Id == updateStaff.Id);
                    staff.AlternatePhoneNumber = updateStaff.AlternatePhoneNumber;
                    staff.BloodGroupId = updateStaff.BloodGroupId;
                    staff.CasteId = updateStaff.CasteId;
                    staff.CreatedOn = DateTime.UtcNow;
                    staff.DateOfBirth = updateStaff.DateOfBirth;
                    staff.DateOfJoining = updateStaff.DateOfJoining;
                    staff.DesignationId = updateStaff.DesignationId;
                    staff.EmployeeId = updateStaff.EmployeeId;
                    staff.FirstName = updateStaff.FirstName;
                    staff.GenderId = updateStaff.GenderId;
                    staff.IdentificationMarks = updateStaff.IdentificationMarks;
                    staff.IsPresentAddressIsSameAsPermanent = updateStaff.IsPresentAddressIsSameAsPermanent;
                    staff.IsTeachingStaff = updateStaff.IsTeachingStaff;
                    staff.LastName = updateStaff.LastName;
                    staff.MaritalStatusId = updateStaff.MaritalStatusId;
                    staff.MiddleName = updateStaff.MiddleName;
                    staff.MobileNumber = updateStaff.MobileNumber;
                    staff.MotherTongueId = updateStaff.MotherTongueId;
                    staff.NationalityId = updateStaff.NationalityId;
                    staff.PassportExpireDate = updateStaff.PassportExpireDate;
                    staff.PassportIssuedCountryId = updateStaff.PassportIssuedCountryId;
                    staff.PassportIssuedDate = updateStaff.PassportIssuedDate;
                    staff.PassportNumber = updateStaff.PassportNumber;
                    staff.PermanentAddress = updateStaff.PermanentAddress;
                    staff.PermanentCityId = updateStaff.PermanentCityId;
                    staff.PermanentZipcode = updateStaff.PermanentZipcode;
                    staff.PresentAddress = updateStaff.PresentAddress;
                    staff.PresentCityId = updateStaff.PresentCityId;
                    staff.PresentZipcode = updateStaff.PresentZipcode;
                    staff.Qualification = updateStaff.Qualification;
                    staff.ReligionId = updateStaff.ReligionId;
                    staff.SocialSecurityNumber = updateStaff.SocialSecurityNumber;
                    staff.TeachingStaffId = updateStaff.TeachingStaffId;
                    _iMSDbContext.StaffBasicPersonalInformation.Update(staff);
                    await _iMSDbContext.SaveChangesAsync();
                    #endregion

                    #region Remove Previous Image(s)
                    var previousImages = await _iMSDbContext.StaffGalleryMappings.Where(x => updateStaff.GalleryImageToDelete.Contains(x.Id)).ToListAsync();
                    foreach (var image in previousImages)
                    {
                        File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.ImageUrl));
                    }
                    if (previousImages.Count != 0)
                    {
                        _iMSDbContext.StaffGalleryMappings.RemoveRange(previousImages);
                        await _iMSDbContext.SaveChangesAsync();
                    }
                    #endregion

                    #region Add Staff Experience

                    var experiences = await _iMSDbContext.StaffExperiences.Where(x => x.StaffId == updateStaff.Id).ToListAsync();
                    if (experiences.Count != 0)
                    {
                        _iMSDbContext.StaffExperiences.RemoveRange(experiences);
                        await _iMSDbContext.SaveChangesAsync();
                    }
                    List<StaffExperienceMapping> staffExperiences = new List<StaffExperienceMapping>();
                    foreach (var experience in updateStaff.AddStaffExperienceMappings)
                    {
                        staffExperiences.Add(new StaffExperienceMapping()
                        {
                            CreatedOn = DateTime.UtcNow,
                            EndDate = experience.EndDate,
                            InstituteName = experience.InstituteName,
                            StaffId = staff.Id,
                            StartDate = experience.StartDate
                        });
                    }
                    if (staffExperiences.Count != 0)
                    {
                        _iMSDbContext.StaffExperiences.AddRange(staffExperiences);
                        await _iMSDbContext.SaveChangesAsync();
                    }

                    #endregion

                    #region Add Staff Departments Mappings

                    List<StaffDepartmentMapping> staffDepartmentMappings = await _iMSDbContext.StaffDepartmentMappings.Where(x => x.StaffId == updateStaff.Id).ToListAsync();
                    if (staffDepartmentMappings.Count != 0)
                    {
                        _iMSDbContext.StaffDepartmentMappings.RemoveRange(staffDepartmentMappings);
                        await _iMSDbContext.SaveChangesAsync();
                    }

                    List<StaffDepartmentMapping> staffDepartments = new List<StaffDepartmentMapping>();

                    foreach (int departmentId in updateStaff.DepartmentsIdList)
                    {
                        staffDepartments.Add(new StaffDepartmentMapping
                        {
                            CreatedOn = DateTime.Now,
                            DepartmentId = departmentId,
                            StaffId = staff.Id
                        });
                    }

                    if (staffDepartments.Count != 0)
                    {
                        _iMSDbContext.StaffDepartmentMappings.AddRange(staffDepartments);
                        await _iMSDbContext.SaveChangesAsync();
                    }

                    #endregion

                    #region Send Mail/Message
                    staff = await _iMSDbContext.StaffBasicPersonalInformation.Include(s => s.Gender).Include(s => s.PermanentCity)
                        .Include(s => s.PresentCity).Include(s => s.Institute).Include(s => s.User).FirstAsync(x => x.Id == staff.Id);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffEdit,
                        TemplateFormatEnum.Email, staff);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffEdit,
                        TemplateFormatEnum.Sms, staff);
                    #endregion
                    return new StaffManagementResponse() { HasError = false, Message = "Staff update successfully" };
                }
            }
            else
                return new StaffManagementResponse() { Message = "Employee id already exist. Please use unique id", HasError = true, ErrorType = StaffManagementResponseType.EmployeeId };
        }

        /// <summary>
        /// Method to upload staff image - SS
        /// </summary>
        /// <param name="files">files of images</param>
        /// <param name="staffId">staff id</param>
        /// <param name="instituteId">institute id</param>
        public async Task AddOrUpdateStaffImageAsync(IFormFileCollection files, int staffId, int instituteId)
        {
            var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var image = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Staff");
            if (image.Count != 0)
            {
                var staff = await _iMSDbContext.StaffBasicPersonalInformation.FirstAsync(x => x.Id == staffId);
                if (!string.IsNullOrEmpty(staff.PersonalImage))
                    File.Delete(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", staff.PersonalImage));
                staff.PersonalImage = image[0];
                _iMSDbContext.StaffBasicPersonalInformation.Update(staff);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method to add or update staff gallery - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="staffId">staff id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns></returns>
        public async Task AddOrUpdateStaffGalleryAsync(IFormFileCollection files, int staffId, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var images = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Gallery");
            if (images.Count != 0)
            {
                var gallery = new List<StaffGalleryMapping>();
                foreach (var image in images)
                {
                    gallery.Add(new StaffGalleryMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        ImageUrl = image,
                        StaffId = staffId,
                        UpdatedById = loggedInUser.Id,
                        UpdateOn = DateTime.UtcNow
                    });
                }
                _iMSDbContext.StaffGalleryMappings.AddRange(gallery);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method to add or update staff document - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="staffId">staff id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <param name="addStaffDocuments">documnets details</param>
        public async Task AddOrUpdateStaffDocumentsAsync(IFormFileCollection files, int staffId, ApplicationUser loggedInUser,
            List<AddStaffDocumentMappingAc> addStaffDocuments)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var instituteName = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == instituteId)).Name;
            var images = await _imageStorageHelperService.UploadBlobDataAsync(files, instituteName, "Document");
            if (images.Count != 0)
            {
                var gallery = new List<StaffDocumentMapping>();
                for (int i = 0; i < images.Count; i++)
                {
                    gallery.Add(new StaffDocumentMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        ExpiredDate = addStaffDocuments[i].ExpiredDate,
                        FileType = EnumHelperService.GetValueFromDescription<FileTypeEnum>(addStaffDocuments[i].FileType),
                        FileUrl = images[i],
                        MetaData = addStaffDocuments[i].MetaData,
                        StaffId = staffId,
                        Name = addStaffDocuments[i].Name
                    });
                }
                _iMSDbContext.StaffDocumentMappings.AddRange(gallery);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method for fetching the dashboard details of the staffs for logged in admin - RS
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<StaffManagementDashboardDetailsAc> GetStaffManagementDashboardDetailsAsync(int instituteId, ApplicationUser currentUser)
        {
            #region Staffs

            List<StaffBasicPersonalInformation> staffsList = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();

            #endregion

            #region Religion Staff Percentage (Pie chart data)

            List<Religion> religionsList = await _iMSDbContext.Religions.Where(x => x.InstituteId == instituteId).ToListAsync();
            List<ReligionWiseStudentStaffPercentageAc> religionWiseStaffPercentagesList = new List<ReligionWiseStudentStaffPercentageAc>();
            foreach (Religion religion in religionsList)
            {
                religionWiseStaffPercentagesList.Add(new ReligionWiseStudentStaffPercentageAc
                {
                    ReligionName = religion.Name + "(" + staffsList.Where(x => x.ReligionId == religion.Id).ToList().Count + ")",
                    Percentage = staffsList.Count == 0 ? 0 
                        : (staffsList.Where(x => x.ReligionId == religion.Id).ToList().Count * 100) / staffsList.Count,
                    StudentStaffCount = staffsList.Where(x => x.ReligionId == religion.Id).ToList().Count
                });
            }

            #endregion

            #region Class Staff Percentage (Bar chart data)

            List<InstituteClass> classesList = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            List<InstituteClassSubjectMapping> instituteClassSubjectMappingsList = await _iMSDbContext.InstituteClassSubjectMappings.ToListAsync();
            List<ClassWiseStudentStaffPercentageAc> classWiseStaffPercentagesList = new List<ClassWiseStudentStaffPercentageAc>();
            foreach (InstituteClass instituteClass in classesList)
            {
                int staffsInClassCount = instituteClassSubjectMappingsList.Where(x => x.ClassId == instituteClass.Id).Select(x => x.Faculty).Distinct().ToList().Count;
                classWiseStaffPercentagesList.Add(new ClassWiseStudentStaffPercentageAc
                {
                    ClassName = instituteClass.Name + "(" + staffsInClassCount + ")",
                    Percentage = staffsList.Count == 0 ? 0
                        : (staffsInClassCount * 100) / staffsList.Count,
                    StudentStaffCount = staffsInClassCount
                });
            }

            #endregion

            #region Active/Inactive Staffs Percentage (Bar chart data)

            List<ActiveInactiveStudentStaffPercentageAc> activeInactiveStaffPercentagesList = new List<ActiveInactiveStudentStaffPercentageAc>
            {
                new ActiveInactiveStudentStaffPercentageAc
                {
                    Activity = "Active(" + staffsList.Where(x => !x.IsArchived).ToList().Count + ")",
                    Percentage = staffsList.Count == 0 ? 0
                        : (staffsList.Where(x => !x.IsArchived).ToList().Count * 100) / staffsList.Count,
                    StudentStaffCount = staffsList.Where(x => !x.IsArchived).ToList().Count
                },
                new ActiveInactiveStudentStaffPercentageAc
                {
                    Activity = "Inactive(" + staffsList.Where(x => x.IsArchived).ToList().Count + ")",
                    Percentage = staffsList.Count == 0 ? 0
                        : (staffsList.Where(x => x.IsArchived).ToList().Count * 100) / staffsList.Count,
                    StudentStaffCount = staffsList.Where(x => x.IsArchived).ToList().Count
                }
            };

            #endregion

            #region Gender Wise Staff Percentage (Doughnut chart data)

            List<Gender> gendersList = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync();
            List<GenderWiseStudentStaffPercentageAc> genderWisetaffPercentagesList = new List<GenderWiseStudentStaffPercentageAc>();
            foreach (Gender gender in gendersList)
            {
                genderWisetaffPercentagesList.Add(new GenderWiseStudentStaffPercentageAc
                {
                    Gender = gender.Name + "(" + staffsList.Where(x => x.GenderId == gender.Id).ToList().Count + ")",
                    Percentage = staffsList.Count == 0 ? 0
                        : (staffsList.Where(x => x.GenderId == gender.Id).ToList().Count * 100) / staffsList.Count,
                    StudentStaffCount = staffsList.Where(x => x.GenderId == gender.Id).ToList().Count
                });
            }

            #endregion

            #region Teaching Type Wise Staff Percentage (Doughnut chart data)

            List<TeachingStaff> teachingTypes = await _iMSDbContext.TeachingStaffs.Where(x => x.InstituteId == instituteId).ToListAsync();
            List<TeachingTypeWiseStudentStaffPercentageAc> teachingTypeWisetaffPercentagesList = new List<TeachingTypeWiseStudentStaffPercentageAc>();
            foreach (TeachingStaff teachingType in teachingTypes)
            {
                teachingTypeWisetaffPercentagesList.Add(new TeachingTypeWiseStudentStaffPercentageAc
                {
                    TeachingType = teachingType.Name + "(" + staffsList.Where(x => x.TeachingStaffId == teachingType.Id).ToList().Count + ")",
                    Percentage = staffsList.Count == 0 ? 0
                        : (staffsList.Where(x => x.TeachingStaffId == teachingType.Id).ToList().Count * 100) / staffsList.Count,
                    StudentStaffCount = staffsList.Where(x => x.TeachingStaffId == teachingType.Id).ToList().Count
                });
            }

            #endregion

            #region Nationality Wise Staff Percentage (Pie chart data)

            List<InstituteNationality> nationalities = await _iMSDbContext.InstituteNationalities.Where(x => x.InstituteId == instituteId).ToListAsync();
            List<NationalityWiseStudentStaffPercentageAc> nationalityWisetaffPercentagesList = new List<NationalityWiseStudentStaffPercentageAc>();
            foreach (InstituteNationality nationality in nationalities)
            {
                nationalityWisetaffPercentagesList.Add(new NationalityWiseStudentStaffPercentageAc
                {
                    NationalityName = nationality.Name + "(" + staffsList.Where(x => x.NationalityId == nationality.Id).ToList().Count + ")",
                    Percentage = staffsList.Count == 0 ? 0
                        : (staffsList.Where(x => x.NationalityId == nationality.Id).ToList().Count * 100) / staffsList.Count,
                    StudentStaffCount = staffsList.Where(x => x.NationalityId == nationality.Id).ToList().Count
                });
            }

            #endregion

            #region Activities (Calendar view data)

            List<StaffActivity> activityList = await _staffActivityManagementRepository.GetActivitiesForStaffAsync(instituteId, null);

            #endregion

            #region Planner (Calendar view data)

            List<StaffPlanner> staffPlansList = await _iMSDbContext.StaffPlanners
                .Where(x => x.InstituteId == instituteId && x.IsActive)
                .Include(x => x.Staff)
                .ToListAsync();

            #endregion

            return new StaffManagementDashboardDetailsAc()
            {
                StaffsList = staffsList,
                ReligionWiseStaffPercentagesList = religionWiseStaffPercentagesList,
                ClassWiseStaffPercentagesList = classWiseStaffPercentagesList,
                ActiveInactiveStaffsPercentageList = activeInactiveStaffPercentagesList,
                GenderWiseStaffPercentageList = genderWisetaffPercentagesList,
                TeachingTypeWiseStaffPercentageList = teachingTypeWisetaffPercentagesList,
                NationalityWiseStaffPercentagesList = nationalityWisetaffPercentagesList,
                ActivityList = activityList,
                StaffPlansList = staffPlansList
            };
        }

        /// <summary>
        /// Method to import excel to add staff - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <param name="formFile">form file excel</param>
        /// <param name="loggedInUserId">logged in user</param>
        /// <returns>message</returns>
        public async Task<string> ImportStaffFromExcelAsync(int instituteId, IFormFile formFile, string loggedInUserId)
        {
            try
            {
                #region Previous Data(s)
                var users = await _iMSDbContext.Users.ToListAsync();
                var genders = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync();
                var maritalStatuses = await _iMSDbContext.MaritalStatuses.Where(x => x.InstituteId == instituteId).ToListAsync();
                var designations = await _iMSDbContext.Designations.Where(x => x.InstituteId == instituteId).ToListAsync();
                var cities = await _iMSDbContext.AdministrationCities.Where(x => x.State.Country.InstituteId == instituteId).ToListAsync();
                #endregion

                var excelData = ExcelHelperService.ReadDataFromExcel(formFile);
                if (excelData.Count != 0)
                {
                    if (excelData.Count < 1000)
                    {
                        #region Excel Data(s)
                        var excelGenders = new List<string>();
                        var excelMaritalStatuses = new List<string>();
                        var excelDesignations = new List<string>();
                        var excelCities = new List<string>();
                        for (int i = 0; i < excelData.Count; i++)
                        {
                            excelGenders.Add(excelData[i][3]);
                            excelMaritalStatuses.Add(excelData[i][4]);
                            excelDesignations.Add(excelData[i][7]);
                            excelCities.Add(excelData[i][9]);
                        }
                        #endregion

                        #region Difference and Bulk Add
                        #region Difference
                        var genderToAdd = excelGenders.ConvertAll(x => x.ToLowerInvariant())
                            .Except((genders.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var maritalStatusesToAdd = excelMaritalStatuses.ConvertAll(x => x.ToLowerInvariant())
                            .Except((maritalStatuses.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var designationsToAdd = excelDesignations.ConvertAll(x => x.ToLowerInvariant())
                            .Except((designations.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
                        var citiesToAdd = excelCities.ConvertAll(x => x.ToLowerInvariant())
                            .Except((cities.Select(x => x.Code).ToList()).ConvertAll(x => x.ToLowerInvariant())).ToList();
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

                        #region Designations
                        List<Designation> designationsNewData = new List<Designation>();
                        designationsToAdd.ForEach(x =>
                        {
                            designationsNewData.Add(new Designation()
                            {
                                Code = x,
                                Description = x,
                                InstituteId = instituteId,
                                DesignationName = x,
                                UpdatedAt = DateTime.UtcNow,
                                CreatedBy = loggedInUserId,
                                UpdatedBy = loggedInUserId,
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
                            if (genderNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(genderNewData);
                            if (maritalStatusNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(maritalStatusNewData);
                            if (designationsNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(designationsNewData);
                            if (cityNewData.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(cityNewData);
                            transaction.Commit();
                        }
                        #endregion
                        #endregion

                        #region Previous Data(s)
                        genders = await _iMSDbContext.Genders.Where(x => x.InstituteId == instituteId).ToListAsync();
                        maritalStatuses = await _iMSDbContext.MaritalStatuses.Where(x => x.InstituteId == instituteId).ToListAsync();
                        designations = await _iMSDbContext.Designations.Where(x => x.InstituteId == instituteId).ToListAsync();
                        cities = await _iMSDbContext.AdministrationCities.Where(x => x.State.Country.InstituteId == instituteId).ToListAsync();
                        #endregion

                        #region Bulk Staff
                        var previousStaffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
                        List<StaffBasicPersonalInformation> staffs = new List<StaffBasicPersonalInformation>();
                        List<UserInstituteMapping> userInstituteMappings = new List<UserInstituteMapping>();
                        foreach (var staff in excelData)
                        {
                            var user = users.FirstOrDefault(x => x.Email == staff[11]);
                            if (user == null)
                            {
                                var password = "itech1@3";
                                user = new ApplicationUser() { UpdatedBy = loggedInUserId, Name = staff[0] + " " + staff[1], CreatedBy = loggedInUserId, CreatedOn = DateTime.UtcNow, UpdatedOn = DateTime.UtcNow, Email = staff[11], UserName = staff[11] };
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
                            if (!previousStaffs.Any(x => x.EmployeeId.ToLowerInvariant() == staff[6].ToLowerInvariant()))
                                staffs.Add(new StaffBasicPersonalInformation()
                                {
                                    FirstName = staff[0],
                                    LastName = staff[1],
                                    DateOfBirth = DateTime.Parse(staff[2]),
                                    GenderId = genders.First(x => x.Code.ToLowerInvariant() == staff[3].ToLowerInvariant()).Id,
                                    MaritalStatusId = maritalStatuses.First(x => x.Code.ToLowerInvariant() == staff[4].ToLowerInvariant()).Id,
                                    DateOfJoining = DateTime.Parse(staff[5]),
                                    EmployeeId = staff[6],
                                    DesignationId = designations.First(x => x.Code.ToLowerInvariant() == staff[7].ToLowerInvariant()).Id,
                                    PermanentAddress = staff[8],
                                    PermanentCityId = cities.First(x => x.Code.ToLowerInvariant() == staff[9].ToLowerInvariant()).Id,
                                    PresentCityId = cities.First(x => x.Code.ToLowerInvariant() == staff[9].ToLowerInvariant()).Id,
                                    MobileNumber = staff[10],
                                    UserId = user.Id,
                                    IsPresentAddressIsSameAsPermanent = true,
                                    InstituteId = instituteId
                                });
                        }
                        staffs = staffs.GroupBy(x => x.EmployeeId).Select(g => g.First()).ToList();
                        using (var transaction = await _iMSDbContext.Database.BeginTransactionAsync())
                        {
                            if (staffs.Count != 0)
                                await _iMSDbContext.BulkInsertAsync(staffs);
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
        /// Method to generate employee id - SS
        /// </summary>
        /// <param name="autoSequence"></param>
        /// <returns></returns>
        private async Task<string> GenerateEmployeeIdAsync(AutoSequenceGenerator autoSequence)
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
                            var count = await _iMSDbContext.StaffBasicPersonalInformation.CountAsync();
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
