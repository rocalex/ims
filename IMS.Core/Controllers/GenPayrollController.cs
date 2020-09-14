using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class GenPayrollController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        #endregion
    }
}