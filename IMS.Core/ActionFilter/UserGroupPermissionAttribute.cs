using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

namespace IMS.Core.ActionFilter
{
    public class UserGroupPermissionAttribute : ActionFilterAttribute
    {
        #region Private Variable(s)
        private IMSDbContext _iMSDbContext;
        private UserManager<ApplicationUser> _userManager;
        private IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public UserGroupPermissionAttribute()
        {
        }
        #endregion

        #region Properties
        public UserGroupFeatureChildEnum UserGroupFeatureChild { get; set; }
        private ActionFilterType ActionFilterType { get; set; }
        #endregion

        #region Override Method
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            _iMSDbContext = context.HttpContext.RequestServices.GetService<IMSDbContext>();
            _userManager = context.HttpContext.RequestServices.GetService<UserManager<ApplicationUser>>();
            _instituteUserMappingHelperService = context.HttpContext.RequestServices.GetService<IInstituteUserMappingHelperService>();
            switch (context.HttpContext.Request.Method)
            {
                case "GET": ActionFilterType = ActionFilterType.View; break;
                case "POST": ActionFilterType = ActionFilterType.Add; break;
                case "PUT": ActionFilterType = ActionFilterType.Edit; break;
                case "DELETE": ActionFilterType = ActionFilterType.Delete; break;
            };
            var instituteId = _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(context.HttpContext.User.Identity.Name, false).Result;
            var userId = (_userManager.FindByNameAsync(context.HttpContext.User.Identity.Name).Result).Id;
            var userGroups = (_iMSDbContext.UserGroupMapping.Where(x => x.UserId == userId).Select(x => x.UserGroup.Id).ToListAsync()).Result;
            var permissions = _iMSDbContext.UserGroupFeatures.Where(x => userGroups.Contains(x.UserGroupId)).ToList();
            var permission = permissions.FirstOrDefault(x => x.UserGroupFeatureChild == UserGroupFeatureChild);
            if (permission == null)
            {
                context.HttpContext.Response.StatusCode = 401;
                context.HttpContext.Response.Headers.Clear();
                var wrongResult = new { Error = "UnAuthorized" };
                context.Result = new JsonResult(wrongResult);
            }
            else
            {
                var isAllowed = false;
                switch (context.HttpContext.Request.Method)
                {
                    case "GET": isAllowed = permission.CanView; break;
                    case "POST": isAllowed = permission.CanAdd; break;
                    case "PUT": isAllowed = permission.CanEdit; break;
                    case "DELETE": isAllowed = permission.CanDelete; break;
                };
                if (!isAllowed)
                {
                    context.HttpContext.Response.StatusCode = 401;
                    context.HttpContext.Response.Headers.Clear();
                    var wrongResult = new { Error = "UnAuthorized" };
                    context.Result = new JsonResult(wrongResult);
                }
            }
        }
        #endregion
    }

    public enum ActionFilterType
    {
        Add,
        Edit,
        View,
        Delete
    }
}
