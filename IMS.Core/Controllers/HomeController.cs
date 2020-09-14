using IMS.DomainModel.ApplicationClasses.Authentication;
using IMS.DomainModel.ApplicationClasses.NotificationManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.NotificationManagement;
using IMS.Repository.TemplateManagement;
using IMS.Repository.UserManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    public class HomeController : Controller
    {
        #region Private Variable(s)
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMSDbContext _iMSDbContext;
        private readonly IUserManagementRepository _userManagementRepository;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly INotificationManagementRepository _notificationManagementRepository;
        private readonly ITemplateManagementRepository _templateManagementRepository;
        #endregion

        #region Constructor
        public HomeController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IMSDbContext iMSDbContext,
            IUserManagementRepository userManagementRepository,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            INotificationManagementRepository notificationManagementRepository,
            ITemplateManagementRepository templateManagementRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _iMSDbContext = iMSDbContext;
            _userManagementRepository = userManagementRepository;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _notificationManagementRepository = notificationManagementRepository;
            _templateManagementRepository = templateManagementRepository;
        }
        #endregion

        #region Public Method(s)

        public async Task<IActionResult> Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
                if (await _userManager.IsInRoleAsync(user, "SuperAdmin"))
                    ViewData["Role"] = "SuperAdmin";
                else
                {
                    ViewData["Role"] = "Admin";
                    var selectedInstitute = await _iMSDbContext.UserInstituteMappings.FirstOrDefaultAsync(x => x.UserId == user.Id && x.IsActive);
                    if (selectedInstitute != null)
                    {
                        var institute = await _iMSDbContext.Institutes.FirstAsync(x => x.Id == selectedInstitute.InstituteId);
                        if (institute.AdminId != user.Id)
                        {
                            if (await _iMSDbContext.DriverMasters.AnyAsync(x => x.UserId == user.Id && x.InstituteId == institute.Id))
                                ViewData["Role"] = "Driver";
                            else if (await _iMSDbContext.StudentBasicInformation.AnyAsync(x => x.InstituteId == selectedInstitute.InstituteId
                             && x.UserId == user.Id) || await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x =>
                              x.InstituteId == selectedInstitute.InstituteId && x.UserId == user.Id))
                                ViewData["Role"] = "User";
                            else
                                ViewData["Role"] = "Admin";
                        }
                    }
                }
                return View();
            }
            else
                return RedirectToAction("LogIn");
        }

        public IActionResult Error()
        {
            return View();
        }

        [HttpGet]
        public IActionResult LogIn()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> LogIn(UserPassword userPassword)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(userPassword.Email);
                if (user != null)
                {
                    var success = await _signInManager.PasswordSignInAsync(user, userPassword.Password, true, false);
                    if (success.Succeeded)
                        return RedirectToAction("Index", "Home");
                    else
                        ModelState.AddModelError("Password", "Incorrect Password");
                }
                else
                    ModelState.AddModelError("Email", "Incorrect Email");
            }
            return View(userPassword);
        }

        [HttpGet]
        public async Task<IActionResult> LogOut()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var mapping = await _iMSDbContext.UserInstituteMappings.Where(x => x.UserId == user.Id).ToListAsync();
            mapping.ForEach(x => x.IsActive = false);
            _iMSDbContext.UserInstituteMappings.UpdateRange(mapping);
            await _iMSDbContext.SaveChangesAsync();
            await _signInManager.SignOutAsync();
            return RedirectToAction("LogIn");
        }

        /// <summary>
        /// Method for updating user password
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("api/password/update")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordAc changePasswordAc)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
                if (await _userManager.CheckPasswordAsync(currentUser, changePasswordAc.NewPassword))
                {
                    return Ok(new { Message = "Can't set the existing password as new password", HasError = true });
                }

                IdentityResult result = await _userManager.ChangePasswordAsync(currentUser, changePasswordAc.OldPassword, changePasswordAc.NewPassword);

                string message = result.Succeeded ? "Password updated successfully" : "Incorrect old password";
                if (result.Succeeded)
                {
                    #region Send Mail/Message

                    var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.ChangePassword,
                        TemplateFormatEnum.Email, currentUser);
                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.ChangePassword,
                        TemplateFormatEnum.Sms, currentUser);

                    #endregion

                    #region Set bell notification

                    if (!await _userManager.IsInRoleAsync(currentUser, "SuperAdmin"))
                    {
                        // To the recipient
                        NotificationAc notificationAc = new NotificationAc
                        {
                            NotificationMessage = "Password Updated",
                            NotificationTo = null,
                            NotificationDetails = "You have successfully changed your password",
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

                            notificationAc.NotificationDetails = string.Format("{0} has changed password", currentUser.Name);
                            notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                            {
                                UserId = instituteAdminId
                            });

                            await _notificationManagementRepository.AddNotificationAsync(notificationAc, currentUserInstituteId, currentUser);
                        }
                    }

                    #endregion
                }
                return Ok(new { Message = message, HasError = !result.Succeeded });
            }
            else if (string.IsNullOrEmpty(changePasswordAc.OldPassword))
            {
                return Ok(new { Message = "Old Password can not be null or empty", HasError = true });
            }
            else
            {
                return Ok(new { Message = "Password can not be null or empty", HasError = true });
            }
        }

        [HttpGet]
        public IActionResult ForgotPassword()
        {
            return View(new UserAc { IsForgotPasswordMailSent = false });
        }

        [HttpPost]
        public async Task<IActionResult> ForgotPassword(UserAc userAc)
        {
            if (string.IsNullOrEmpty(userAc.Email))
            {
                ModelState.AddModelError("Email", "Email can not be null or empty");
            }
            else
            {
                ApplicationUser user = await _userManager.FindByEmailAsync(userAc.Email);
                if (user == null)
                {
                    ModelState.AddModelError("Email", "User does not exist");
                }
                else
                {
                    await _userManagementRepository.SendForgotPasswordEmailAsync(user);
                    userAc.IsForgotPasswordMailSent = true;
                }
            }

            return View(userAc);
        }

        [HttpGet]
        public async Task<IActionResult> ResetPassword(string id, string token)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(id);
            if (user == null || user.ForgotPasswordInitiated == null || !user.ForgotPasswordInitiated.Value)
            {
                return RedirectToAction("Error");
            }
            else
            {
                return View(new ForgotPasswordResetAc { UserId = id, PasswordGenerationToken = token });
            }
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(ForgotPasswordResetAc forgotPasswordResetAc)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("Password", "Password can not be null or empty");
            }
            else if (!forgotPasswordResetAc.Password.Equals(forgotPasswordResetAc.ConfirmPassword))
            {
                ModelState.AddModelError("ConfirmPassword", "Passwords do not match");
            }
            else
            {
                bool isSuccess = await _userManagementRepository.ResetForgotPassword(forgotPasswordResetAc);

                if (isSuccess)
                {
                    return RedirectToAction("Login");
                }
                ModelState.AddModelError("Password", "Something went wrong");
            }

            return View(forgotPasswordResetAc);
        }

        [Authorize]
        [HttpGet("api/home/owndetail")]
        public async Task<IActionResult> GetLoggedInUserDetailAsync()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (!await _userManager.IsInRoleAsync(user, "SuperAdmin"))
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(user.Id, true);
                var userGroups = await _iMSDbContext.UserGroupMapping.Where(x => x.UserId == user.Id && x.UserGroup.InstituteId == instituteId).Select(s => s.UserGroupId).ToListAsync();
                var permissions = await _iMSDbContext.UserGroupFeatures.Where(x => userGroups.Contains(x.UserGroupId)).ToListAsync();
                var allNotifications = await _notificationManagementRepository.GetNotificationsForCurrentUserAsync(user.Id, instituteId, false);

                bool isAdminUser = !(await _iMSDbContext.StudentBasicInformation.AnyAsync(x => x.InstituteId == instituteId && x.UserId == user.Id)
                    || await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.InstituteId == instituteId && x.UserId == user.Id));
                return Ok(new { user, permissions, isAdminUser, allNotifications });
            }
            else
                return Ok(new { user });

        }

        [HttpGet("api/home/isstaff")]
        public async Task<IActionResult> IsLoggedInUserIsStaffAsync()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(user.Id, true);
            var staff = await _iMSDbContext.StaffBasicPersonalInformation.FirstOrDefaultAsync(x => x.UserId == user.Id && x.InstituteId == instituteId);
            return Ok(new { isStaff = (staff != null), staff });
        }

        [Authorize]
        [HttpGet("api/home/permission/{parent}/{child}/{type}")]
        public async Task<IActionResult> CheckPermission(UserGroupFeatureParentEnum parent, UserGroupFeatureChildEnum child, string type)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(user.Id, true);
            var userGroups = await _iMSDbContext.UserGroupMapping.Where(x => x.UserId == user.Id && x.UserGroup.InstituteId == instituteId).Select(s => s.UserGroupId).ToListAsync();
            var permissions = await _iMSDbContext.UserGroupFeatures.Where(x => userGroups.Contains(x.UserGroupId)).ToListAsync();
            var permission = permissions.FirstOrDefault(x => x.UserGroupFeatureParent == parent && x.UserGroupFeatureChild == child);
            if (permission != null)
            {
                switch (type)
                {
                    case "Add": return Ok(permission.CanAdd);
                    case "Edit": return Ok(permission.CanEdit);
                    case "View": return Ok(permission.CanView);
                    case "Delete": return Ok(permission.CanDelete);
                    default: return Ok(false);
                }
            }
            else
                return Ok(false);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpGet("api/home/resourcefile/{file}")]
        public IActionResult ReadResourceFile(string file)
        {
            var fileName = (file == "English") ? "en.json" : "ar.json";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets", "i18n", fileName);
            var fileData = System.IO.File.ReadAllText(filePath);
            return Ok(fileData);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPut("api/home/resourcefile/{file}")]
        public IActionResult ReadResourceFile([FromBody]object data, string file)
        {
            var fileName = (file == "English") ? "en.json" : "ar.json";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assets", "i18n", fileName);
            System.IO.File.WriteAllText(filePath, data.ToString());
            return Ok();
        }
        #endregion
    }
}
