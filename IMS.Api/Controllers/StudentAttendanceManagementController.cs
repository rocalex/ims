using IMS.Api.ActionFilter;
using IMS.DomainModel.ApplicationClasses.ApiService;
using IMS.DomainModel.ApplicationClasses.ApiService.Student;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Api.Controllers
{
    [Route(BaseUrl)]
    public class StudentAttendanceManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public StudentAttendanceManagementController(UserManager<ApplicationUser> userManager, IMSDbContext iMSDbContext) : base(userManager, iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /**
        * @api {post} api/studentattendancemanagement/attendancebyid Request To Student Attendance By Student Id 
        * @apiName GetAttendanceByStudentId
        * @apiGroup Student Attendance Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiParam {Number} StudentId Student Id.
        * @apiParam {DateTime} StartDate Start Date.
        * @apiParam {DateTime} EndDate End Date.
        * @apiParamExample {json} Request-Example:
        *     {
        *       "StudentId" : 1,
        *       "StartDate" : "01-05-2019 00:00:00",
        *       "EndDate" : "31-05-2019 00:00:00"
        *     }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpPost("attendancebyid")]
        public async Task<IActionResult> GetAttendanceByStudentId([FromBody]GetAttendanceAc getAttendance)
        {
            var user = await GetLoggedInUserAsync();
            var student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.Id == getAttendance.StudentId);
            if (student == null)
                return NotFound(new ApiServiceResponse() { Status = -100, Message = "Student not found" });
            else
            {
                if (await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.InstituteId == student.InstituteId && x.UserId == user.Id))
                {
                    var attendance = await _iMSDbContext.StudentAttendances.Where(x => x.StudentId == getAttendance.StudentId
                    && x.AttendanceDate >= getAttendance.StartDate && x.AttendanceDate <= getAttendance.EndDate).ToListAsync();
                    return Ok(new ApiServiceResponse() { Status = 200, Message = "Success", ResultObj = attendance });
                }
                else
                    return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Un-authorized to get detail, you doesn't belong to student institute" });
            }
        }
        #endregion
    }
}
