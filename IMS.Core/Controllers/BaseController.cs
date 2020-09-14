using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    public class BaseController : Controller
    {
        #region Private Variable(s)
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public BaseController(IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        public async Task<int> GetUserCurrentSelectedInstituteIdAsync()
        {
            return await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(User.Identity.Name, false);
        }
        #endregion
    }
}
