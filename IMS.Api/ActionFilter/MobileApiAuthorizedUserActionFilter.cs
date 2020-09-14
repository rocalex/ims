using IMS.DomainModel.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;

namespace IMS.Api.ActionFilter
{
    public class MobileApiAuthorizedUserActionFilter : ActionFilterAttribute
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public MobileApiAuthorizedUserActionFilter(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Override Method
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var key = context.HttpContext.Request.Headers.TryGetValue("auth-token", out StringValues authorizationToken);
            if (key)
            {
                var isAllowed = (_iMSDbContext.UserApiKeys.AnyAsync(x => x.AuthToken == authorizationToken[0])).Result;
                if (!isAllowed)
                {
                    context.HttpContext.Response.StatusCode = 401;
                    context.HttpContext.Response.Headers.Clear();
                    var wrongResult = new { Error = "UnAuthorized" };
                    context.Result = new JsonResult(wrongResult);
                }
            }
            else
            {
                context.HttpContext.Response.StatusCode = 401;
                context.HttpContext.Response.Headers.Clear();
                var wrongResult = new { Error = "UnAuthorized" };
                context.Result = new JsonResult(wrongResult);
            }
        }
        #endregion
    }
}
