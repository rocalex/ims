using IMS.DomainModel.AppSettings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;

namespace IMS.Api.ActionFilter
{
    public class MobileApiActionFilter : ActionFilterAttribute
    {
        #region Private Variable(s)
        private readonly AuthorizationKey _authorizationKey;
        #endregion

        #region Constructor
        public MobileApiActionFilter(IOptions<AuthorizationKey> options)
        {
            _authorizationKey = options.Value;
        }
        #endregion

        #region Override Method
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var key = context.HttpContext.Request.Headers.TryGetValue("auth-key", out StringValues authorizationToken);
            if (authorizationToken[0] != _authorizationKey.Key)
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
