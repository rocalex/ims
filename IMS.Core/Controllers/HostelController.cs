using IMS.DomainModel.ApplicationClasses.Hostel.HostelManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Hostel.HostelManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class HostelController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IHostelManagementRepository hostelManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public HostelController(
            IHostelManagementRepository hostelManagementRepository,
            IMSDbContext iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService
            ): base(instituteUserMappingHelperService)
        {
            this.hostelManagementRepository = hostelManagementRepository;
            this.iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Methods
        [HttpGet("")] 
        public async Task<IActionResult> GetAllHostelAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await hostelManagementRepository.GetHostelsAsync(instituteId));
        }

        [HttpGet("additional")]
        public async Task<IActionResult> GetAllStudentsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var students = await iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var country = await iMSDbContext.AdministrationCountries.Where(x => x.InstituteId == instituteId).ToListAsync();
            var state = await iMSDbContext.AdministrationStates.Include(s => s.Country).Where(x => x.Country.InstituteId == instituteId).ToListAsync();
            var city = await iMSDbContext.AdministrationCities.Include(s => s.State).Where(x => x.State.Country.InstituteId == instituteId).ToListAsync();
            var result = new InitialDataForHostel()
            {
                Students = students,
                Country = country,
                State = state,
                City = city
            };
            return Ok(result);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddHostelAc addHostelAc)
        {
            if (string.IsNullOrEmpty(addHostelAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Hostel name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addHostelAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Hostel code can't be null or empty"
                });
            else
                return Ok(await hostelManagementRepository.AddHostelAsync(addHostelAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{hostelId}")]
        public async Task<IActionResult> GetHostelDetailById(int hostelId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.Hostels.Include(s => s.City).FirstOrDefaultAsync(x => x.Id == hostelId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Hostel Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateHostelAc updateHostelAc)
        {
            if (string.IsNullOrEmpty(updateHostelAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Hostel name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateHostelAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Hostel code can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.Hostels.AnyAsync(x => x.Id == updateHostelAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await hostelManagementRepository.UpdateHostelAsync(updateHostelAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Hostel not found" });
            }
        }
        #endregion
    }
}
