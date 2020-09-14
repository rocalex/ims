using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.RelationshipManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.RelationshipManagement;
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
    public class RelationshipManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IRelationshipManagementRepository _relationshipManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public RelationshipManagementController(IRelationshipManagementRepository relationshipManagementRepository, IMSDbContext iMSDbContext,
            UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _relationshipManagementRepository = relationshipManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddRelationshipAsync([FromBody]AddRelationshipManagementAc addRelationshipManagement)
        {
            if (string.IsNullOrEmpty(addRelationshipManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Relationship name can't be empty" });
            else if (string.IsNullOrEmpty(addRelationshipManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Relationship code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _relationshipManagementRepository.AddRelationshipAsync(addRelationshipManagement, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllRelationshipAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _relationshipManagementRepository.GetAllRelationshipAsync(loggedInUserInstituteId));
        }

        [HttpGet("{relationshipId}")]
        public async Task<IActionResult> GetRelationshipDetailByIdAsync(int relationshipId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var Relationship = await _iMSDbContext.Relationships.FirstOrDefaultAsync(x => x.Id == relationshipId && x.InstituteId == loggedInUserInstituteId);
            if (Relationship != null)
                return Ok(Relationship);
            else
                return Ok(new { Message = "Relationship not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateRelationshipAsync([FromBody]UpdateRelationshipManagementAc updateRelationshipManagement)
        {
            if (string.IsNullOrEmpty(updateRelationshipManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Name, Message = "Relationship name can't be empty" });
            else if (string.IsNullOrEmpty(updateRelationshipManagement.Name.Trim()))
                return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Relationship code can't be empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.Relationships.AnyAsync(x => x.Id == updateRelationshipManagement.RelationshipId && x.InstituteId == loggedInUserInstituteId))
                    return Ok(await _relationshipManagementRepository.UpdateRelationshipAsync(updateRelationshipManagement, loggedInUserInstituteId));
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Relationship not found" });
            }
        }
        #endregion
    }
}
