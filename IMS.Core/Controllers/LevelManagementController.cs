using IMS.DomainModel.ApplicationClasses.LevelManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.LevelManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
	[Authorize]
	[Route(BaseUrl)]
	public class LevelManagementController : BaseController
	{
		#region Private Variable(s)
		private const string BaseUrl = "api/[controller]";
		private readonly ILevelManagementRepository _levelManagementRepository;
		private readonly IMSDbContext _iMSDbContext;
		private readonly UserManager<ApplicationUser> _userManager;
		#endregion

		#region Constructor
		public LevelManagementController(ILevelManagementRepository levelManagementRepository, IMSDbContext iMSDbContext,
			UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
			: base(instituteUserMappingHelperService)
		{
			_levelManagementRepository = levelManagementRepository;
			_iMSDbContext = iMSDbContext;
			_userManager = userManager;
		}
		#endregion

		#region Public Method(s)
		[HttpPost("")]
		public async Task<IActionResult> AddLevelAsync([FromBody]AddLevelManagementAc addLevelManagement)
		{
			if (string.IsNullOrEmpty(addLevelManagement.Name.Trim()))
				return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Level name can't be null or empty" });
			if (string.IsNullOrEmpty(addLevelManagement.Code.Trim()))
				return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Level code can't be null or empty" });
			else
			{
				var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
				return Ok(await _levelManagementRepository.AddLevelAsync(addLevelManagement, loggedInUserInstituteId));
			}
		}

		[HttpGet("")]
		public async Task<IActionResult> GetAllLevelAsync()
		{
			var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
			return Ok(await _levelManagementRepository.GetAllLevelAsync(loggedInUserInstituteId));
		}

		[HttpGet("{levelId}")]
		public async Task<IActionResult> GetLevelDetailByIdAsync(int levelId)
		{
			var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
			var Level = await _iMSDbContext.Levels.FirstOrDefaultAsync(x => x.Id == levelId && x.InstituteId == loggedInUserInstituteId);
			if (Level != null)
				return Ok(Level);
			else
				return Ok(new { Message = "Level not found" });
		}

		[HttpPut("")]
		public async Task<IActionResult> UpdateLevelAsync([FromBody]UpdateLevelManagementAc updateLevelManagement)
		{
			if (string.IsNullOrEmpty(updateLevelManagement.Name.Trim()))
				return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Level name can't be null or empty" });
			if (string.IsNullOrEmpty(updateLevelManagement.Code.Trim()))
				return Ok(new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Level code can't be null or empty" });
			else
			{
				var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
				if (await _iMSDbContext.Levels.AnyAsync(x => x.Id == updateLevelManagement.LevelId && x.InstituteId == loggedInUserInstituteId))
				{
					return Ok(await _levelManagementRepository.UpdateLevelAsync(updateLevelManagement, loggedInUserInstituteId));
				}
				else
					return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Level not found" });
			}
		}
		#endregion
	}
}
