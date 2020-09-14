using IMS.Api.ActionFilter;
using IMS.DomainModel.ApplicationClasses.ApiService;
using IMS.DomainModel.ApplicationClasses.ApiService.Authentication;
using IMS.DomainModel.ApplicationClasses.EmailService;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.EmailService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Api.Controllers
{
    [Route(BaseUrl)]
    public class LoginAuthenticationController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private static readonly Random random = new Random();
        private readonly IMSDbContext _iMSDbContext;
        private readonly IEmailService _emailService;
        private readonly EmailConfiguration _emailConfiguration;
        #endregion

        #region Constructor
        public LoginAuthenticationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            IMSDbContext iMSDbContext, IEmailService emailService, IOptions<EmailConfiguration> options) : base(userManager, iMSDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _iMSDbContext = iMSDbContext;
            _emailService = emailService;
            _emailConfiguration = options.Value;
        }
        #endregion

        #region Public Method(s)
        /**
        * @api {post} api/loginauthentication/login Request To Login 
        * @apiName LogInUserAsync
        * @apiGroup Login Management
        * @apiPermission auth-key
        * @apiParam {String} Username Username of customer.
        * @apiParam {String} Password Password of customer.
        * @apiParamExample {json} Request-Example:
        *     {
        *       "Username": "some@some.com",
        *       "Password": "Password"
        *     }
        */
        [HttpPost("login")]
        public async Task<IActionResult> LogInUserAsync([FromBody]UserPasswordLogIn logIn)
        {
            AuthenticationResponse response = new AuthenticationResponse();
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(logIn.Username);
                if (user != null)
                {
                    var login = await _signInManager.PasswordSignInAsync(user, logIn.Password, false, false);
                    if (login.Succeeded)
                    {
                        var code = RandomString();
                        _iMSDbContext.UserApiKeys.Add(new UserApiKey() { AuthToken = code, CreatedOn = DateTime.UtcNow, UserId = user.Id });
                        await _iMSDbContext.SaveChangesAsync();
                        response.Response = new LoggedInUserDetail() { Username = user.UserName, Id = user.Id, Name = user.Name, UserAuthToken = code };
                        return Ok(new ApiServiceResponse() { Status = 200, Message = "Success", ResultObj = response });
                    }
                    else
                    {
                        response.ErrorMessage = "Incorrect Password";
                        return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Incorrect Password", ResultObj = response });
                    }
                }
                else
                {
                    response.ErrorMessage = "Seems like you haven't register with this username";
                    return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Seems like you haven't register with this username", ResultObj = response });
                }
            }
            else
            {
                if (string.IsNullOrEmpty(logIn.Username))
                    response.ErrorMessage = "Username is required";
                else
                    response.ErrorMessage = "Password is required";
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = response.ErrorMessage, ResultObj = response });
            }
        }

        /**
        * @api {get} api/loginauthentication/logout Request To logout 
        * @apiName SignOut
        * @apiGroup Login Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpGet("logout")]
        public async Task<IActionResult> SignOut()
        {
            AuthenticationResponse response = new AuthenticationResponse();
            await _signInManager.SignOutAsync();
            foreach (var cookie in Request.Cookies.Keys)
            {
                Response.Cookies.Delete(cookie);
            }
            var user = await GetLoggedInUserAsync();
            var userToken = await _iMSDbContext.UserApiKeys.Where(x => x.UserId == user.Id).ToListAsync();
            _iMSDbContext.UserApiKeys.RemoveRange(userToken);
            await _iMSDbContext.SaveChangesAsync();
            response.Response = new { Message = "Logout successfully" };
            return Ok(new ApiServiceResponse() { Status = 200, Message = "Success", ResultObj = response });
        }

        /**
        * @api {get} api/loginauthentication/owndetail Request To get logged in user own detail 
        * @apiName LoggedInUserDetailAsync
        * @apiGroup Login Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpGet("owndetail")]
        public async Task<IActionResult> LoggedInUserDetailAsync()
        {
            var user = await LoggedInUserDetailAsync();
            return Ok(new ApiServiceResponse() { Status = 200, Message = "Success", ResultObj = user });
        }

        /**
        * @api {get} api/loginauthentication/forgetpassword/{userName} Request For Forget Password
        * @apiName ForgetPasswordAsync
        * @apiGroup Login Management
        * @apiPermission auth-key
        * @apiParam {String} userName Username.
        */
        [HttpGet("forgetpassword/{userName}")]
        public async Task<IActionResult> ForgetPasswordAsync(string userName)
        {
            if (string.IsNullOrEmpty(userName))
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Username can't be empty" });
            else
            {
                var user = await _userManager.FindByNameAsync(userName);
                if(user == null)
                    return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Invalid username" });
                else
                {
                    var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                    if (string.IsNullOrEmpty(user.Email))
                    {
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "MailTemplates");
                        RazorLightEngine engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
                        string resultFromFile = await engine.CompileRenderAsync("ForgotPasswordMail.cshtml", 
                            new ForgotPasswordMailAc { Name = user.Name, Code = code });
                        _emailService.SendMail(new EmailMessage()
                        {
                            Content = resultFromFile,
                            FromAddresses = new List<EmailAddress> { new EmailAddress { Address = _emailConfiguration.SmtpUsername, Name = "IMS SuperAdmin" } },
                            ToAddresses = new List<EmailAddress> { new EmailAddress { Address = user.Email, Name = user.Name } },
                            Subject = "Forgot Password"
                        });
                        return Ok(new ApiServiceResponse() { Status = 200, Message = "Code has been send to your email address to reset password" });
                    }
                    else
                        return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Message api yet to integrated. You can't change your password now" });
                    
                }
            }
        }

        /**
        * @api {post} api/loginauthentication/resetpassword Request To Reset password 
        * @apiName ResetPasswordAsync
        * @apiGroup Login Management
        * @apiPermission auth-key
        * @apiParam {String} Username Username of user.
        * @apiParam {String} Code Reset code of user.
        * @apiParam {String} Password Password of user.
        * @apiParam {String} ConfirmPassword Confirm password of user.
        * @apiParamExample {json} Request-Example:
        *     {
        *       "Username": "some@some.com",
        *       "Code": "sd4as54d5as45da4sd4a",
        *       "Password" : "Password",
        *       "ConfirmPassword" : "Password"
        *     }
        */
        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPasswordAsync([FromBody]ResetPasswordAc resetPassword)
        {
            if (string.IsNullOrEmpty(resetPassword.Username))
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Username can't be empty" });
            else if (string.IsNullOrEmpty(resetPassword.Code))
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Code can't be empty" });
            else if (string.IsNullOrEmpty(resetPassword.Password))
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Password can't be empty" });
            else if (string.IsNullOrEmpty(resetPassword.ConfirmPassword))
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Confirm password can't be empty" });
            else
            {
                if(resetPassword.Password != resetPassword.ConfirmPassword)
                    return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Password must be same as Confirm password" });
                else
                {
                    var user = await _userManager.FindByNameAsync(resetPassword.Username);
                    if (user == null)
                        return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Invalid username" });
                    else
                    {
                        var isSuccess = await _userManager.ResetPasswordAsync(user, resetPassword.Code, resetPassword.Password);
                        if (isSuccess.Succeeded)
                            return Ok(new ApiServiceResponse() { Status = 200, Message = "Password reset successfully" });
                        else
                            return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Invalid reset code" });
                    }
                }
            }
        }

        /**
        * @api {post} api/loginauthentication/changepassword Request To Change password 
        * @apiName ChangePasswordAsync
        * @apiGroup Login Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiParam {String} OldPassword Old password of user.
        * @apiParam {String} NewPassword New password code of user.
        * @apiParamExample {json} Request-Example:
        *     {
        *       "OldPassword" : "Password",
        *       "NewPassword" : "Password"
        *     }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody]DomainModel.ApplicationClasses.Authentication.ChangePasswordAc changePassword)
        {
            if (string.IsNullOrEmpty(changePassword.OldPassword))
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Old password can't be empty" });
            else if (string.IsNullOrEmpty(changePassword.NewPassword))
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "New password can't be empty" });
            else
            {
                var user = await GetLoggedInUserAsync();
                var result = await _userManager.ChangePasswordAsync(user, changePassword.OldPassword, changePassword.NewPassword);
                if (result.Succeeded)
                    return Ok(new ApiServiceResponse() { Status = 200, Message = "Password updated successfully" });
                else
                    return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Invalid old password" });
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
            return new string(Enumerable.Repeat(chars, 16).Select(s => s[random.Next(s.Length)]).ToArray());
        }
        #endregion
    }
}
