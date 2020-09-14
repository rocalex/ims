using IMS.DomainModel.ApplicationClasses.StudentRouteMapping;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.StudentRouteMapping;
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
    public class StudentRouteMappingController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IStudentRouteMappingRepository _studentRouteMappingRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public StudentRouteMappingController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IStudentRouteMappingRepository studentRouteMappingRepository, IMSDbContext
            imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _studentRouteMappingRepository = studentRouteMappingRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddOrUpdateStudentRouteMappingAsync([FromBody]AddOrUpdateStudentRouteMappingAc studentRouteMapping)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _studentRouteMappingRepository.AddOrUpdateStudentRouteMappingAsync(studentRouteMapping, user));
        }

        [HttpGet("{routeId}")]
        public async Task<IActionResult> GetStudentByRouteIdAsync(int routeId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (await _imsDbContext.Routes.AnyAsync(x => x.Id == routeId && x.InstituteId == instituteId))
                return Ok(await _studentRouteMappingRepository.GetStudentByRouteIdAsync(routeId));
            else
                return Ok(new { Message = "Route not found" });
        }
        #endregion
    }
}
