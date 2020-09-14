using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Utility.InstituteUserMappingHelper
{
    public class InstituteUserMappingHelperService : IInstituteUserMappingHelperService
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public InstituteUserMappingHelperService(IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager)
        {
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to get current user institute id - SS
        /// </summary>
        /// <param name="userIdOrName">user id or user name</param>
        /// <returns>selected institute id</returns>
        public async Task<int> GetUserCurrentSelectedInstituteIdAsync(string userIdOrName, bool isUserId)
        {
            var user = new ApplicationUser();
            if (isUserId)
                user = await _userManager.FindByIdAsync(userIdOrName);
            else
                user = await _userManager.FindByNameAsync(userIdOrName);
            return (await _iMSDbContext.UserInstituteMappings.FirstAsync(x => x.UserId == user.Id && x.IsActive)).InstituteId;
        }
        #endregion
    }
}
