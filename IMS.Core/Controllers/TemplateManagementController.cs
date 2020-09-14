using IMS.DomainModel.ApplicationClasses.TemplateManagement;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.TemplateManagement;
using IMS.Repository.UserGroupManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class TemplateManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITemplateManagementRepository _templateManagementRepository;
        private readonly IUserGroupManagementRepository _userGroupManagementRepository;
        #endregion

        #region Constructor
        public TemplateManagementController(UserManager<ApplicationUser> userManager,
            ITemplateManagementRepository templateManagementRepository,
            IUserGroupManagementRepository userGroupManagementRepository,
            IInstituteUserMappingHelperService instituteUserMappingHelperService): base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _templateManagementRepository = templateManagementRepository;
            _userGroupManagementRepository = userGroupManagementRepository;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddOrUpdateTemplateAsync([FromBody]AddTemplateAc addedTemplate)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _templateManagementRepository.AddOrUpdateTemplateAsync(addedTemplate, user));
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetTemplateAsync([FromBody]GetTemplateAc getTemplate)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _templateManagementRepository.GetTemplateAsync(getTemplate, instituteId));
        }

        [HttpGet("initialdata")]
        public IActionResult GetInitialDataAsync()
        {
            List<string> templateFormats = new List<string>();
            foreach (var format in EnumHelperService.GetEnumValuesList<TemplateFormatEnum>())
            {
                templateFormats.Add(EnumHelperService.GetDescription(format));
            }
            List<string> templateFeatureTypes = new List<string>();
            foreach (var feature in EnumHelperService.GetEnumValuesList<TemplateFeatureEnum>())
            {
                templateFeatureTypes.Add(EnumHelperService.GetDescription(feature));
            }
            List<string> templateTypes = new List<string>();
            foreach (var type in EnumHelperService.GetEnumValuesList<TemplateTypeEnum>())
            {
                templateTypes.Add(EnumHelperService.GetDescription(type));
            }
            return Ok(new { templateFormats, templateFeatureTypes, templateTypes });
        }
        #endregion
    }
}
