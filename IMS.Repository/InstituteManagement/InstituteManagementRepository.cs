using IMS.DomainModel.ApplicationClasses.EmailService;
using IMS.DomainModel.ApplicationClasses.InstituteManagement;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.DisciplinaryStatusManagement;
using IMS.Repository.InstituteLanguageMasterManagement;
using IMS.Repository.RolePermission;
using IMS.Repository.TeachingStaffManagement;
using IMS.Utility.EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteManagement
{
    public class InstituteManagementRepository : IInstituteManagementRepository
    {
        #region Private Variable(s)
        private static Random random = new Random();
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SuperAdmin _superAdmin;
        private readonly IEmailService _emailService;
        private readonly EmailConfiguration _emailConfiguration;
        private readonly ITeachingStaffManagementRepository _teachingStaffManagementRepository;
        private readonly IRolePermissionSeed _rolePermissionSeed;
        private readonly IDisciplinaryStatusManagementRepository _disciplinaryStatusManagementRepository;
        #endregion

        #region Constructor
        public InstituteManagementRepository(IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager, IOptions<SuperAdmin> superAdmin,
            IEmailService emailService, IOptions<EmailConfiguration> emailConfiguration,
            ITeachingStaffManagementRepository teachingStaffManagementRepository, IRolePermissionSeed rolePermissionSeed,
            IDisciplinaryStatusManagementRepository disciplinaryStatusManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
            _superAdmin = superAdmin.Value;
            _emailService = emailService;
            _emailConfiguration = emailConfiguration.Value;
            _teachingStaffManagementRepository = teachingStaffManagementRepository;
            _rolePermissionSeed = rolePermissionSeed;
            _disciplinaryStatusManagementRepository = disciplinaryStatusManagementRepository;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add institute - SS
        /// </summary>
        /// <param name="addInstitute">institute information</param>
        public async Task AddInstituteAsync(AddInstituteAc addInstitute)
        {
            var user = await _userManager.FindByEmailAsync(addInstitute.InstituteAdminEmail);
            var isUserExist = (user != null);
            var randomPassword = RandomString();
            var superAdmin = await _userManager.FindByEmailAsync(_superAdmin.Email);
            if (!isUserExist)
            {
                user = new ApplicationUser()
                {
                    CreatedOn = DateTime.UtcNow,
                    UpdatedOn = DateTime.UtcNow,
                    CreatedBy = superAdmin.Id,
                    UpdatedBy = superAdmin.Id,
                    Name = "Admin",
                    Email = addInstitute.InstituteAdminEmail,
                    UserName = addInstitute.InstituteAdminEmail
                };
                await _userManager.CreateAsync(user, randomPassword);
            }
            await _userManager.AddToRoleAsync(user, "Admin");
            var institute = new Institute()
            {
                CreatedOn = DateTime.UtcNow,
                Name = addInstitute.InstituteName,
                Address = addInstitute.Address,
                Code = addInstitute.Code,
                Location = addInstitute.Location,
                AdminId = user.Id,
                Latitude = addInstitute.Latitude,
                Longitude = addInstitute.Longitude
            };
            _iMSDbContext.Institutes.Add(institute);
            await _iMSDbContext.SaveChangesAsync();
            #region User Institute Mapping
            var userInstituteMapping = new UserInstituteMapping()
            {
                CreatedOn = DateTime.UtcNow,
                InstituteId = institute.Id,
                UserId = user.Id,
                IsActive = false
            };
            _iMSDbContext.UserInstituteMappings.Add(userInstituteMapping);
            await _iMSDbContext.SaveChangesAsync();
            List<UserInstituteMapping> users = new List<UserInstituteMapping>();
            foreach (var userId in addInstitute.Users)
            {
                if (!await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.InstituteId == institute.Id && x.UserId == userId))
                {
                    var userEmail = (await _iMSDbContext.Users.FirstAsync(x => x.Id == userId)).Email;
                    users.Add(new UserInstituteMapping()
                    {
                        CreatedOn = DateTime.UtcNow,
                        InstituteId = institute.Id,
                        IsActive = false,
                        UserId = userId
                    });
                    if(!string.IsNullOrEmpty(userEmail))
                    await SendMailForExistingUser(new WelcomeMailToAdminAc() { Password = randomPassword, InstituteName = institute.Name }, userEmail, institute.Id);
                }
            }
            _iMSDbContext.UserInstituteMappings.AddRange(users);
            await _iMSDbContext.SaveChangesAsync();
            #endregion
            var mapping = new List<InstituteBccCcEmailMapping>();
            addInstitute.Bcc.ForEach(x =>
            {
                mapping.Add(new InstituteBccCcEmailMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    Email = x,
                    InstituteId = institute.Id,
                    IsBcc = true
                });
            });
            addInstitute.Cc.ForEach(x =>
            {
                mapping.Add(new InstituteBccCcEmailMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    Email = x,
                    InstituteId = institute.Id,
                    IsBcc = false
                });
            });
            if (mapping.Count != 0)
            {
                _iMSDbContext.InstituteBccCcEmailMappings.AddRange(mapping);
                await _iMSDbContext.SaveChangesAsync();
            }
            await _teachingStaffManagementRepository.SeedTeachingStaffAsync(institute.Id);
            await _rolePermissionSeed.SeedPermissionAsync(institute.Id);
            await _disciplinaryStatusManagementRepository.SeedDisciplinaryStatusAsync(institute.Id);
            var adminUserGroup = await _iMSDbContext.UserGroups.FirstAsync(x => x.Code == "Admin");
            _iMSDbContext.UserGroupMapping.Add(new UserGroupMapping() { CreatedOn = DateTime.UtcNow, UserGroupId = adminUserGroup.Id, UserId = user.Id});
            await _iMSDbContext.SaveChangesAsync();
            if (!isUserExist)
                await SendMailForNewUser(new WelcomeMailToAdminAc() { Password = randomPassword, InstituteName = institute.Name }, addInstitute.InstituteAdminEmail, institute.Id);
            else
                await SendMailForExistingUser(new WelcomeMailToAdminAc() { Password = randomPassword, InstituteName = institute.Name }, addInstitute.InstituteAdminEmail, institute.Id);
        }

        /// <summary>
        /// Method to get all institute details - SS
        /// </summary>
        /// <returns>list of institute</returns>
        public async Task<List<GetInstituteDetailAc>> GetAllInstituteAsync()
        {
            var adminRole = await _iMSDbContext.Roles.FirstAsync(x => x.Name == "Admin");
            var adminUserIds = await _iMSDbContext.UserRoles.Where(x => x.RoleId == adminRole.Id).Select(d => d.UserId).ToListAsync();
            var adminUser = await _iMSDbContext.UserInstituteMappings.Include(s=>s.User).Where(x => adminUserIds.Contains(x.UserId)).ToListAsync();
            var institutes = await _iMSDbContext.Institutes.ToListAsync();
            List<GetInstituteDetailAc> instituteDetails = new List<GetInstituteDetailAc>();
            foreach (var institute in institutes)
            {
                instituteDetails.Add(new GetInstituteDetailAc()
                {
                    Admin = (adminUser.First(x => x.InstituteId == institute.Id)).User,
                    CreatedOn = institute.CreatedOn,
                    Id = institute.Id,
                    Name = institute.Name,
                    Address = institute.Address,
                    Code = institute.Code,
                    Location = institute.Location
                });
            }
            return instituteDetails;
        }

        /// <summary>
        /// Method to migrated existing data - SS
        /// </summary>
        public async Task MigratingExistingDataAsync()
        {
            var institutes = await _iMSDbContext.Institutes.ToListAsync();
            var userInstituteMappings = await _iMSDbContext.UserInstituteMappings.ToListAsync();
            var adminRoleId = (await _iMSDbContext.Roles.FirstAsync(x => x.Name == "Admin")).Id;
            var admins = await _iMSDbContext.UserRoles.Where(x=>x.RoleId == adminRoleId).Select(x=>x.UserId).ToListAsync();
            foreach (var institute in institutes)
            {
                if (string.IsNullOrEmpty(institute.AdminId))
                {
                    var userIds = userInstituteMappings.Where(x => x.InstituteId == institute.Id).Select(s => s.UserId).ToList();
                    if (userIds.Count != 0)
                    {
                        var userId = userIds.Where(x => admins.Contains(x)).ToList();
                        if (userId.Count != 0)
                            institute.AdminId = userId[0];
                        else
                            institute.AdminId = userIds[0];
                    }
                }
            }
            _iMSDbContext.Institutes.UpdateRange(institutes);
            await _iMSDbContext.SaveChangesAsync();
            var instituteAdminIds = institutes.Select(x => x.AdminId).ToList();
            var staffs = await _iMSDbContext.StaffBasicPersonalInformation.Where(x => instituteAdminIds.Contains(x.UserId)).ToListAsync();
            if(staffs.Count != 0)
            {
                _iMSDbContext.StaffBasicPersonalInformation.RemoveRange(staffs);
                await _iMSDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method for fetching the list of all institutes mapped with the logged in user - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<List<GetInstituteDetailAc>> GetAllLoggedInUserInstitutesAsync(ApplicationUser currentUser)
        {
            List<Institute> institutes = await _iMSDbContext.UserInstituteMappings
                .Include(x => x.Institute)
                .Where(x => x.UserId == currentUser.Id)
                .Select(x => x.Institute)
                .ToListAsync();

            List<GetInstituteDetailAc> instituteDetails = new List<GetInstituteDetailAc>();
            foreach (var institute in institutes)
            {
                instituteDetails.Add(new GetInstituteDetailAc()
                {
                    Admin = currentUser,
                    CreatedOn = institute.CreatedOn,
                    Id = institute.Id,
                    Name = institute.Name,
                    Address = institute.Address,
                    Code = institute.Code,
                    Location = institute.Location
                });
            }
            return instituteDetails;
        }

        /// <summary>
        /// Method to update institue - SS
        /// </summary>
        /// <param name="updateInstitute">institute detail</param>
        /// <returns>response</returns>
        public async Task<InstituteResponseAc> UpdateInstituteAsync(UpdateInstituteAc updateInstitute)
        {
            var institute = await _iMSDbContext.Institutes.FirstOrDefaultAsync(x => x.Id == updateInstitute.Id);
            if (institute != null)
            {
                institute.Address = updateInstitute.Address;
                institute.Latitude = updateInstitute.Latitude;
                institute.Longitude = updateInstitute.Longitude;
                institute.Location = updateInstitute.Location;
                _iMSDbContext.Institutes.Update(institute);
                await _iMSDbContext.SaveChangesAsync();
                return new InstituteResponseAc() { HasError = false, Message = "Institute updated successfully" };
            }
            else
                return new InstituteResponseAc() { HasError = true, Message = "Institute not found", ErrorType = InstituteResponseType.Id };
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
        /// Method to send mail to institute admin welcome mail - SS
        /// </summary>
        /// <param name="welcomeMailToAdmin">contain password for institute admin</param>
        /// <param name="email">email of institute admin</param>
        private async Task SendMailForNewUser(WelcomeMailToAdminAc welcomeMailToAdmin, string email, int instituteId)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
            var engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
            string resultFromFile = await engine.CompileRenderAsync("WelcomeMailToAdmin.cshtml", welcomeMailToAdmin);
            var emails = await _iMSDbContext.InstituteBccCcEmailMappings.Where(x => x.InstituteId == instituteId).ToListAsync();
            var bcc = new List<EmailAddress>();
            var bccEmails = emails.Where(x => x.IsBcc).ToList();
            bccEmails.ForEach(x =>
            {
                bcc.Add(new EmailAddress() { Address = x.Email, Name = "Admin" });
            });
            var cc = new List<EmailAddress>();
            var ccEmails = emails.Where(x => !x.IsBcc).ToList();
            ccEmails.ForEach(x =>
            {
                cc.Add(new EmailAddress() { Address = x.Email, Name = "Admin" });
            });
            _emailService.SendMail(new EmailMessage()
            {
                Content = resultFromFile,
                Subject = "Welcome To IMS",
                FromAddresses = new List<EmailAddress>() { new EmailAddress() { Address = _emailConfiguration.SmtpUsername, Name = "IMS SuperAdmin" } },
                ToAddresses = new List<EmailAddress>() { new EmailAddress() { Address = email, Name = "Admin" } },
                BccAddresses = bcc,
                CcAddresses = cc
            });
        }

        /// <summary>
        /// Method to send mail to institute admin welcome mail - SS
        /// </summary>
        /// <param name="welcomeMailToAdmin">contain password for institute admin</param>
        /// <param name="email">email of institute admin</param>
        private async Task SendMailForExistingUser(WelcomeMailToAdminAc welcomeMailToAdmin, string email, int instituteId)
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
            var engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
            string resultFromFile = await engine.CompileRenderAsync("WelcomeMailToAdminForExistingUser.cshtml", welcomeMailToAdmin);
            var emails = await _iMSDbContext.InstituteBccCcEmailMappings.Where(x => x.InstituteId == instituteId).ToListAsync();
            var bcc = new List<EmailAddress>();
            var bccEmails = emails.Where(x => x.IsBcc).ToList();
            bccEmails.ForEach(x =>
            {
                bcc.Add(new EmailAddress() { Address = x.Email, Name = "Admin" });
            });
            var cc = new List<EmailAddress>();
            var ccEmails = emails.Where(x => !x.IsBcc).ToList();
            ccEmails.ForEach(x =>
            {
                cc.Add(new EmailAddress() { Address = x.Email, Name = "Admin" });
            });
            _emailService.SendMail(new EmailMessage()
            {
                Content = resultFromFile,
                Subject = "Welcome To IMS",
                FromAddresses = new List<EmailAddress>() { new EmailAddress() { Address = _emailConfiguration.SmtpUsername, Name = "IMS SuperAdmin" } },
                ToAddresses = new List<EmailAddress>() { new EmailAddress() { Address = email, Name = "Admin" } },
                BccAddresses = bcc,
                CcAddresses = cc
            });
        }
        #endregion
    }
}
