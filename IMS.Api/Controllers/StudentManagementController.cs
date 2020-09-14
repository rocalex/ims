using IMS.Api.ActionFilter;
using IMS.DomainModel.ApplicationClasses.ApiService;
using IMS.DomainModel.ApplicationClasses.ApiService.StudentManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Api.Controllers
{
    [Route(BaseUrl)]
    public class StudentManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private static readonly Random random = new Random();
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public StudentManagementController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            IMSDbContext iMSDbContext) : base(userManager, iMSDbContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /**
        * @api {post} api/studentmmanagement/search Request To Get Student Detail
        * @apiName GetStudentDetailAsync
        * @apiGroup Student Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiParam {Number} InstituteId Institute Id.
        * @apiParam {Number} AcademicYearId Academic Year Id.
        * @apiParam {Number} ClassId Nullable Class Id.
        * @apiParam {Number} SectionId Nullable Section Id.
        * @apiParamExample {json} Request-Example:
        *     {
        *       "InstituteId": "1",
        *       "AcademicYearId": "1",
        *       "ClassId": null,
        *       "SectionId": null
        *     }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpPost("search")]
        public async Task<IActionResult> GetStudentDetailAsync([FromBody]GetStudentAc getStudent)
        {
            var students = await _iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == getStudent.InstituteId
            && x.CurrentAcademicYearId == getStudent.AcademicYearId).ToListAsync();
            if (getStudent.ClassId.HasValue)
                students = students.Where(x => x.CurrentClassId == getStudent.ClassId.Value).ToList();
            if (getStudent.SectionId.HasValue)
                students = students.Where(x => x.SectionId == getStudent.SectionId.Value).ToList();
            return Ok(new ApiServiceResponse() { Status = 200, Message = "Success", ResultObj = students });
        }
        #endregion
    }
}
