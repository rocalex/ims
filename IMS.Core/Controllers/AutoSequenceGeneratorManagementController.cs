using IMS.Core.ActionFilter;
using IMS.DomainModel.ApplicationClasses.AutoSequenceGeneratorManagement;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.AutoSequenceGeneratorManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class AutoSequenceGeneratorManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IAutoSequenceGeneratorManagementRepository _autoSequenceGeneratorManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public AutoSequenceGeneratorManagementController(IAutoSequenceGeneratorManagementRepository autoSequenceGeneratorManagementRepository,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _autoSequenceGeneratorManagementRepository = autoSequenceGeneratorManagementRepository;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPut("")]
        public async Task<IActionResult> UpdateAutoSequenceGeneratorAsync([FromBody]UpdateAutoSequenceGeneratorManagementAc updateAutoSequence)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _autoSequenceGeneratorManagementRepository.UpdateAutoSequenceGeneratorAsync(updateAutoSequence, loggedInUser));
        }

        [HttpGet("{generatorType}")]
        public async Task<IActionResult> GetSequenceGeneratorsAsync(string generatorType)
        {
            var loggedInUser = await _userManager.FindByNameAsync(User.Identity.Name);
            var generatorTypeEnum = EnumHelperService.GetValueFromDescription<AutoSequenceGeneratorTypeEnum>(generatorType);
            return Ok(await _autoSequenceGeneratorManagementRepository.GetSequenceGeneratorsAsync(loggedInUser, generatorTypeEnum));
        }

        [HttpGet("generator/{typeEnum}")]
        public async Task<IActionResult> GetAutoSequenceNumberByTypeAndInstituteIdAsync(string typeEnum)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var generatorTypeEnum = EnumHelperService.GetValueFromDescription<AutoSequenceGeneratorTypeEnum>(typeEnum);
            return Ok(await _autoSequenceGeneratorManagementRepository.GetAutoSequenceNumberByTypeAndInstituteIdAsync(instituteId, generatorTypeEnum));
        }
        #endregion
    }
}
