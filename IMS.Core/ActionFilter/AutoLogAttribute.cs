using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;

namespace IMS.Core.ActionFilter
{
    public class AutoLogAttribute : ActionFilterAttribute
    {
        #region Private Variable(s)
        private readonly ILogger _logger;
        #endregion

        #region Constructor
        public AutoLogAttribute(ILogger<AutoLogAttribute> logger)
        {
            _logger = logger;
        }
        #endregion

        #region Override Method
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var request = context.HttpContext.Request;
            _logger.LogInformation(DateTime.UtcNow.ToString() + " Request to path - " + request.Path.Value);
            _logger.LogInformation(DateTime.UtcNow.ToString() + " Request to controller/method - " + context.Controller.ToString());
            base.OnActionExecuting(context);
        }
        #endregion
    }
}
