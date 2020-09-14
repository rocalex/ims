using IMS.DomainModel.ApplicationClasses.Authentication;
using IMS.DomainModel.ApplicationClasses.EmailService;
using IMS.DomainModel.ApplicationClasses.NotificationManagement;
using IMS.DomainModel.ApplicationClasses.TimeTableManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.NotificationManagement;
using IMS.Repository.StaffActivityManagement;
using IMS.Repository.TimeTableManagement;
using IMS.Utility.EmailService;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace IMS.Repository.UserManagement
{
    public class UserManagementRepository : IUserManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailService _emailService;
        private readonly EmailConfiguration _emailConfiguration;
        private readonly SystemRoles _systemRoles;
        private readonly StringConstants _stringConstants;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly ITimeTableManagementRepository _timeTableManagementRepository;
        private readonly INotificationManagementRepository _notificationManagementRepository;
        private readonly IStaffActivityManagementRepository _staffActivityManagementRepository;

        #endregion

        #region Constructor

        public UserManagementRepository(IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager,
            IEmailService emailService,
            IOptions<EmailConfiguration> emailConfiguration,
            IOptions<SystemRoles> systemRoles,
            IOptions<StringConstants> stringConstants,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            ITimeTableManagementRepository timeTableManagementRepository,
            INotificationManagementRepository notificationManagementRepository,
            IStaffActivityManagementRepository staffActivityManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
            _emailService = emailService;
            _emailConfiguration = emailConfiguration.Value;
            _systemRoles = systemRoles.Value;
            _stringConstants = stringConstants.Value;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _timeTableManagementRepository = timeTableManagementRepository;
            _notificationManagementRepository = notificationManagementRepository;
            _staffActivityManagementRepository = staffActivityManagementRepository;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of users
        /// </summary>
        /// <returns></returns>
        public async Task<List<UserAc>> GetAllUsersAsync(ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            List<ApplicationUser> usersList = await _iMSDbContext.Users.ToListAsync();

            List<UserAc> usersAcList = new List<UserAc>();

            foreach (ApplicationUser user in usersList)
            {
                List<UserGroupMapping> userGroupMappingsList = await _iMSDbContext.UserGroupMapping.Include(x => x.UserGroup).Where(x => x.UserId.Equals(user.Id)).ToListAsync();
                Institute userInstitute = (await _iMSDbContext.UserInstituteMappings.Include(x => x.Institute).FirstOrDefaultAsync(x => x.UserId.Equals(user.Id) && x.InstituteId == currentUserInstituteId))?.Institute;
                if (userGroupMappingsList.Count > 0)
                {
                    if (userInstitute != null)
                        usersAcList.Add(new UserAc
                        {
                            Id = user.Id,
                            Name = user.Name,
                            InstituteId = userInstitute.Id,
                            Institute = userInstitute.Name,
                            Email = user.Email,
                            UserGroupIdList = userGroupMappingsList.Select(x => x.UserGroupId).ToList(),
                            UserGroup = string.Join(", ", userGroupMappingsList.Select(x => x.UserGroup.Name))
                        });
                }
            }

            return usersAcList;
        }

        /// <summary>
        /// Method for fetching a particular user by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<UserAc> GetUserByIdAsync(string userId)
        {
            ApplicationUser user = await _iMSDbContext.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));

            if (user != null)
            {
                List<UserGroupMapping> userGroupMappingsList = await _iMSDbContext.UserGroupMapping.Include(x => x.UserGroup).Where(x => x.UserId.Equals(user.Id)).ToListAsync();
                Institute userInstitute = (await _iMSDbContext.UserInstituteMappings.Include(x => x.Institute).FirstOrDefaultAsync(x => x.UserId.Equals(user.Id))).Institute;
                return new UserAc
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    InstituteId = userInstitute.Id,
                    Institute = userInstitute.Name,
                    UserGroupIdList = userGroupMappingsList.Select(x => x.UserGroupId).ToList(),
                    UserGroup = string.Join(", ", userGroupMappingsList.Select(x => x.UserGroup.Name))
                };
            }

            return new UserAc();
        }

        /// <summary>
        /// Method for adding a new user
        /// </summary>
        /// <param name="newUserAc"></param>
        /// <returns></returns>
        public async Task AddNewUserAsync(AddUserAc newUserAc, ApplicationUser currentUser)
        {
            // Add new user
            ApplicationUser newUser = new ApplicationUser
            {
                Name = newUserAc.Name,
                Email = newUserAc.Email,
                UserName = newUserAc.Email,
                CreatedOn = DateTime.UtcNow,
                CreatedBy = currentUser.Id
            };
            await _userManager.CreateAsync(newUser, newUserAc.Password);

            // Add user institute
            UserInstituteMapping userInstituteMapping = new UserInstituteMapping
            {
                InstituteId = newUserAc.InstituteId,
                UserId = newUser.Id,
                CreatedOn = DateTime.UtcNow
            };
            _iMSDbContext.UserInstituteMappings.Add(userInstituteMapping);
            await _iMSDbContext.SaveChangesAsync();

            // Add user role
            foreach (int userGroupId in newUserAc.UserGroupIdList)
            {
                UserGroup userGroup = await _iMSDbContext.UserGroups.FirstOrDefaultAsync(x => x.Id == userGroupId);
                if (userGroup != null)
                {
                    UserGroupMapping userRolesMapping = new UserGroupMapping
                    {
                        UserGroupId = userGroup.Id,
                        UserId = newUser.Id,
                        CreatedOn = DateTime.UtcNow
                    };
                    _iMSDbContext.UserGroupMapping.Add(userRolesMapping);
                    await _iMSDbContext.SaveChangesAsync();
                }
            }

            // Send welcome mail to the created user
            if (newUserAc.Email != null)
            {
                await SendWelcomeMail(new WelcomeMailToUserAc { Name = newUserAc.Name, Password = newUserAc.Password }, newUserAc.Email, newUserAc.Name);
            }
        }

        /// <summary>
        /// Method for updating an existing user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedUserAc"></param>
        /// <returns></returns>
        public async Task UpdateUserAsync(string id, UpdateUserAc updatedUserAc, ApplicationUser currentUser)
        {
            // Update user details
            ApplicationUser existingUser = _iMSDbContext.Users.First(x => x.Id.Equals(id));
            existingUser.UpdatedBy = currentUser.Id;
            existingUser.UpdatedOn = DateTime.UtcNow;
            existingUser.Name = updatedUserAc.Name;
            await _userManager.UpdateAsync(existingUser);

            // Add user institute
            UserInstituteMapping existingUserInstituteMapping = await _iMSDbContext.UserInstituteMappings.FirstOrDefaultAsync(x => x.UserId == id && x.InstituteId == updatedUserAc.InstituteId);
            if (existingUserInstituteMapping == null)
            {
                UserInstituteMapping userInstituteMapping = new UserInstituteMapping
                {
                    InstituteId = updatedUserAc.InstituteId,
                    UserId = existingUser.Id,
                    CreatedOn = DateTime.UtcNow
                };
                _iMSDbContext.UserInstituteMappings.Add(userInstituteMapping);
                await _iMSDbContext.SaveChangesAsync();
            }

            // Update user role, if updated
            List<UserGroupMapping> userRolesMappingsList = await _iMSDbContext.UserGroupMapping.Where(x => x.UserId.Equals(existingUser.Id)).ToListAsync();
            _iMSDbContext.UserGroupMapping.RemoveRange(userRolesMappingsList);
            await _iMSDbContext.SaveChangesAsync();

            foreach (int userGroupId in updatedUserAc.UserGroupIdList)
            {
                UserGroup userGroup = await _iMSDbContext.UserGroups.FirstOrDefaultAsync(x => x.Id == userGroupId);
                if (userGroup != null)
                {
                    UserGroupMapping userRolesMapping = new UserGroupMapping
                    {
                        UserGroupId = userGroup.Id,
                        UserId = existingUser.Id,
                        CreatedOn = DateTime.UtcNow
                    };
                    _iMSDbContext.UserGroupMapping.Add(userRolesMapping);
                    await _iMSDbContext.SaveChangesAsync();
                }
            }
        }

        /// <summary>
        /// Medhod for sending the Forgot Password Email
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task SendForgotPasswordEmailAsync(ApplicationUser user)
        {
            // Initiate forgot password
            user.ForgotPasswordInitiated = true;
            await _userManager.UpdateAsync(user);

            // Send email
            string passwordGenerationToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            passwordGenerationToken = HttpUtility.UrlEncode(passwordGenerationToken);
            string forgotPasswordLink = string.Format("{0}Home/ResetPassword?id={1}&token={2}", _stringConstants.WebsiteUrl, user.Id, passwordGenerationToken);

            string path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
            RazorLightEngine engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
            string resultFromFile = await engine.CompileRenderAsync("ForgotPasswordMail.cshtml", new ForgotPasswordMailAc { Name = user.Name, ForgotPasswordLink = forgotPasswordLink });

            _emailService.SendMail(new EmailMessage()
            {
                Content = resultFromFile,
                Subject = "Forgot Password",
                FromAddresses = new List<EmailAddress> { new EmailAddress { Address = _emailConfiguration.SmtpUsername, Name = "IMS SuperAdmin" } },
                ToAddresses = new List<EmailAddress> { new EmailAddress { Address = user.Email, Name = user.Name } }
            });
        }

        /// <summary>
        /// Method for resetting the forgotten password
        /// </summary>
        /// <param name="forgotPasswordResetAc"></param>
        /// <returns></returns>
        public async Task<bool> ResetForgotPassword(ForgotPasswordResetAc forgotPasswordResetAc)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(forgotPasswordResetAc.UserId);

            // Update password
            IdentityResult result = await _userManager.ResetPasswordAsync(user, forgotPasswordResetAc.PasswordGenerationToken, forgotPasswordResetAc.Password);

            if (result.Succeeded)
            {
                // Update user
                user.ForgotPasswordInitiated = false;
                await _userManager.UpdateAsync(user);
            }

            return result.Succeeded;
        }

        /// <summary>
        /// Method for updating the details of logged in user
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedUserAc"></param>
        /// <returns></returns>
        public async Task UpdateLoggedInUserProfileDetails(UpdateUserAc updatedUserAc, ApplicationUser currentUser)
        {
            ApplicationUser existingUser = _iMSDbContext.Users.First(x => x.Id.Equals(currentUser.Id));
            existingUser.UpdatedBy = currentUser.Id;
            existingUser.UpdatedOn = DateTime.UtcNow;
            existingUser.Name = updatedUserAc.Name;
            await _userManager.UpdateAsync(existingUser);

            #region Set bell notification

            if (!await _userManager.IsInRoleAsync(currentUser, "SuperAdmin"))
            {
                // To the recipient
                NotificationAc notificationAc = new NotificationAc
                {
                    NotificationMessage = "Profile Updated",
                    NotificationTo = null,
                    NotificationDetails = "You have successfully updated your profile",
                    NotificationUserMappingsList = new List<NotificationUserMappingAc>
                    {
                        new NotificationUserMappingAc
                        {
                            UserId = currentUser.Id
                        }
                    }
                };

                int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
                await _notificationManagementRepository.AddNotificationAsync(notificationAc, currentUserInstituteId, currentUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

                // To the admin
                if (!await _userManager.IsInRoleAsync(currentUser, "Admin"))
                {
                    string instituteAdminId = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == currentUserInstituteId)).AdminId;

                    notificationAc.NotificationDetails = string.Format("{0} has updated profile", currentUser.Name);
                    notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                    {
                        UserId = instituteAdminId
                    });

                    await _notificationManagementRepository.AddNotificationAsync(notificationAc, currentUserInstituteId, currentUser);
                }
            }

            #endregion
        }

        /// <summary>
        /// Method for fetching the dashboard data of a logged in, non-admin user - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<UserDashboardAc> GetLoggedInUserDashboard(ApplicationUser currentUser, int academicYearId)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            UserDashboardAc userDashboardAc = new UserDashboardAc();

            StudentBasicInformation studentUser = await _iMSDbContext.StudentBasicInformation
                .Include(x => x.CurrentClass)
                .Include(x => x.SectionMap)
                .Include(x => x.Nationality)
                .Include(x => x.Religion)
                .FirstOrDefaultAsync(x => x.InstituteId == currentUserInstituteId && x.UserId.Equals(currentUser.Id));


            StaffBasicPersonalInformation staffUser = await _iMSDbContext.StaffBasicPersonalInformation
                .Include(x => x.Nationality)
                .Include(x => x.Religion)
                .FirstOrDefaultAsync(x => x.InstituteId == currentUserInstituteId && x.UserId.Equals(currentUser.Id));

            List<StudentBasicInformation> totalStudents = await _iMSDbContext.StudentBasicInformation
                    .Where(x => x.InstituteId == currentUserInstituteId && x.IsActive).ToListAsync();

            if (studentUser != null)
            {
                userDashboardAc.Name = studentUser.FirstName + ' ' + studentUser.MiddleName + ' ' + studentUser.LastName;
                userDashboardAc.Nationality = studentUser.Nationality?.Name;
                userDashboardAc.Institute = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == currentUserInstituteId)).Name;
                userDashboardAc.PhoneNumber = studentUser.MobileNumber;
                userDashboardAc.Email = studentUser.FamilyRelationEmail;
                userDashboardAc.Religion = studentUser.Religion?.Name;
                userDashboardAc.Class = studentUser.CurrentClass?.Name;
                userDashboardAc.Section = studentUser.SectionMap?.Name;
                userDashboardAc.PersonalImage = studentUser.PersonalImage;
                userDashboardAc.RollNumber = studentUser.RollNumber;
                userDashboardAc.ClassStudentCount = totalStudents.Where(x => x.CurrentClassId == studentUser.CurrentClassId).Count();
                userDashboardAc.InstituteStudentCount = totalStudents.Count;
                userDashboardAc.TimeTableDetails = await _timeTableManagementRepository.GetTimeTableDetailsAsync(studentUser.CurrentClassId, studentUser.SectionId.Value, academicYearId, currentUserInstituteId);
                userDashboardAc.UserDashboardType = UserDashboardTypeEnum.Student;
                userDashboardAc.ActivityList = await _staffActivityManagementRepository.GetActivitiesForStudentAsync(currentUserInstituteId, studentUser.Id);
            }
            else if (staffUser != null)
            {
                userDashboardAc.Name = staffUser.FirstName + ' ' + staffUser.MiddleName + ' ' + staffUser.LastName;
                userDashboardAc.Nationality = staffUser.Nationality?.Name;
                userDashboardAc.Institute = (await _iMSDbContext.Institutes.FirstAsync(x => x.Id == currentUserInstituteId)).Name;
                userDashboardAc.PhoneNumber = staffUser.MobileNumber;
                userDashboardAc.Email = staffUser.Email;
                userDashboardAc.Religion = staffUser.Religion?.Name;
                userDashboardAc.PersonalImage = staffUser.PersonalImage;
                userDashboardAc.EmployeeId = staffUser.EmployeeId;
                userDashboardAc.UserDashboardType = UserDashboardTypeEnum.Staff;
                userDashboardAc.ClassList = await _iMSDbContext.InstituteClasses.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
                userDashboardAc.SectionsList = await _iMSDbContext.Sections.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
                userDashboardAc.ActivityList = await _staffActivityManagementRepository.GetActivitiesForStaffAsync(currentUserInstituteId, staffUser.Id);
                userDashboardAc.InstituteStudentCount = totalStudents.Count;
            }

            return userDashboardAc;
        }

        #endregion

        #region Private methods

        /// <summary>
        /// Method for sending email on user creation
        /// </summary>
        /// <param name="welcomeMailToUserAc"></param>
        /// <param name="email"></param>
        /// <param name="userName"></param>
        /// <returns></returns>
        private async Task SendWelcomeMail(WelcomeMailToUserAc welcomeMailToUserAc, string email, string userName)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
            var engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
            string resultFromFile = await engine.CompileRenderAsync("WelcomeMailToUser.cshtml", welcomeMailToUserAc);

            _emailService.SendMail(new EmailMessage()
            {
                Content = resultFromFile,
                Subject = "Welcome To IMS",
                FromAddresses = new List<EmailAddress> { new EmailAddress() { Address = _emailConfiguration.SmtpUsername, Name = "IMS SuperAdmin" } },
                ToAddresses = new List<EmailAddress> { new EmailAddress() { Address = email, Name = userName } }
            });
        }

        #endregion
    }
}