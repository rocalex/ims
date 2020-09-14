using IMS.Api.ActionFilter;
using IMS.DomainModel.ApplicationClasses.ApiService;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace IMS.Api.Controllers
{
    [Route(BaseUrl)]
    public class InstitutemManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private static readonly Random random = new Random();
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public InstitutemManagementController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            IMSDbContext iMSDbContext) : base(userManager, iMSDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /**
        * @api {get} api/institutemanagement/{instituteId} Request To Get Institute Detail by Id
        * @apiName GetInsituteDetailAsync
        * @apiGroup Institute Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiParam {Number} instituteId Institute Id.
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpGet("{instituteId}")]
        public async Task<IActionResult> GetInsituteDetailAsync(int instituteId)
        {
            var institute = await _iMSDbContext.Institutes.FirstOrDefaultAsync(x => x.Id == instituteId);
            if (institute == null)
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Institute not found", ResultObj = new { Message = "Institute not found" } });
            else
                return Ok(new ApiServiceResponse() { Status = 200, Message = "Success", ResultObj = institute });
        }
        #endregion
    }
}
