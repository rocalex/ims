using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Core.ActionFilter
{
    public class RequestResponseLoggingMiddleware
    {
        #region Private Variable(s)
        private readonly RequestDelegate next;
        private readonly ILogger _logger;
        #endregion

        #region Constructor
        public RequestResponseLoggingMiddleware(RequestDelegate next, ILogger<RequestResponseLoggingMiddleware> logger)
        {
            this.next = next;
            _logger = logger;
        }
        #endregion

        #region Public Method
        public async Task Invoke(HttpContext context)
        {
            context.Request.EnableRewind();

            var buffer = new byte[Convert.ToInt32(context.Request.ContentLength)];
            await context.Request.Body.ReadAsync(buffer, 0, buffer.Length);
            var requestBody = Encoding.UTF8.GetString(buffer);
            context.Request.Body.Seek(0, SeekOrigin.Begin);

            _logger.LogInformation(DateTime.UtcNow.ToString() + " Request body - " + requestBody);

            var originalBodyStream = context.Response.Body;

            using (var responseBody = new MemoryStream())
            {
                context.Response.Body = responseBody;

                await next(context);

                context.Response.Body.Seek(0, SeekOrigin.Begin);
                var response = await new StreamReader(context.Response.Body).ReadToEndAsync();
                context.Response.Body.Seek(0, SeekOrigin.Begin);

                _logger.LogInformation(DateTime.UtcNow.ToString() + " Response body - " + response);
                await responseBody.CopyToAsync(originalBodyStream);
            }
        }
        #endregion
    }
}
