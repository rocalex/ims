using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using System.Threading.Tasks;

namespace IMS.Api.Controllers
{
    public class BaseController : Controller
    {
        #region Private Variable(s)
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public BaseController(UserManager<ApplicationUser> userManager, IMSDbContext iMSDbContext)
        {
            _userManager = userManager;
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        public async Task<ApplicationUser> GetLoggedInUserAsync()
        {
            var token = Request.Headers.TryGetValue("auth-token", out StringValues authorizationToken);
            var userToken = await _iMSDbContext.UserApiKeys.FirstAsync(x => x.AuthToken == authorizationToken[0]);
            return (await _userManager.FindByIdAsync(userToken.UserId));
        }
        #endregion
    }
}
