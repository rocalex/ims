using IMS.DomainModel.ApplicationClasses.RouteManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.RouteManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class RouteManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IRouteManagementRepository _routeManagementRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public RouteManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IRouteManagementRepository routeManagementRepository, IMSDbContext
            imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _routeManagementRepository = routeManagementRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddRouteAsync([FromBody]AddRouteManagementAc addRoute)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _routeManagementRepository.AddRouteAsync(addRoute, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetRoutesAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _routeManagementRepository.GetRoutesAsync(instituteId));
        }

        [HttpGet("{routeId}")]
        public async Task<IActionResult> GetRouteAsync(int routeId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var route = await _imsDbContext.Routes.FirstOrDefaultAsync(x => x.Id == routeId && x.InstituteId == instituteId);
            if (route != null)
            {
                var list = await _imsDbContext.RouteStageMappings.OrderByDescending(s=>s.OrderId).Where(x => x.RouteId == routeId).ToListAsync();
                list.Reverse();
                route.RouteStageMappings = list;
                return Ok(route);
            }
            else
                return Ok(new { Message = "Route not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateRouteAsync([FromBody]UpdateRouteManagementAc updateRoute)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _routeManagementRepository.UpdateRouteAsync(updateRoute, user));
        }

        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var stages = await _imsDbContext.TransportationStages.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { stages });
        }
        #endregion
    }
}
