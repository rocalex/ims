using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace IMS.Utility.ExceptionHandler
{
    public class GlobalExceptionHandler : IExceptionFilter
    {
        #region Private Varibale(s)
        private readonly ILogger _logger;
        #endregion

        #region Constructor
        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }
        #endregion

        #region Public Method(s)
        public void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            _logger.LogError("Error Message - " + exception.Message);
            _logger.LogError("Error StackTrace - " + exception.StackTrace);
            _logger.LogError(1, context.Exception, "Error", context.Exception.StackTrace);
        }
        #endregion
    }
}
