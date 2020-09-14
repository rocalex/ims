using IMS.Api.ActionFilter;
using IMS.DomainModel.ApplicationClasses.ApiService;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.StaffActivityManagement;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Api.Controllers
{
    [Route(BaseUrl)]
    public class ActivityManagementController : BaseController
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMSDbContext _iMSDbContext;
        private readonly IStaffActivityManagementRepository _staffActivityManagementRepository;

        #endregion

        #region Constructor

        public ActivityManagementController(UserManager<ApplicationUser> userManager,
            IMSDbContext iMSDbContext,
            IStaffActivityManagementRepository staffActivityManagementRepository)
            : base(userManager, iMSDbContext)
        {
            _userManager = userManager;
            _iMSDbContext = iMSDbContext;
            _staffActivityManagementRepository = staffActivityManagementRepository;
        }

        #endregion

        #region Public Method(s)

        /**
        * @api {get} api/activitymanagement/staff Request To Get Activities For All Staffs
        * @apiName GetActivitiesForAllStaffsAsync
        * @apiGroup Activity Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiSuccessExample {json} Success-Response:
        *   HTTP/1.1 200 OK
        *     {
        *       {
        *          "status": 200,
        *          "message": "Success",
        *          "resultObj": [
        *            {
        *              "name": "Activity 1",
        *              "description": "Activity 1",
        *              "startDate": "2019-04-30T18:30:00",
        *              "endDate": "2019-05-07T18:30:00",
        *              "isActive": true,
        *              "instituteId": 1,
        *              "meetingAgendaId": 1,
        *              "activityStatusId": 1,
        *              "location": "Vadodara",
        *              "startTime": "12:00 am",
        *              "endTime": "12:00 am",
        *              "institute": null,
        *              "meetingAgenda": {
        *                "name": "Agenda 1",
        *                "code": "MA_01",
        *                "status": true,
        *                "description": null,
        *                "instituteId": 1,
        *                "institute": null,
        *                "id": 1,
        *                "createdOn": "2019-04-30T12:27:46.8203204"
        *              },
        *              "activityStatus": {
        *                "name": "Open",
        *                "code": "Open",
        *                "status": true,
        *                "description": null,
        *                "instituteId": 1,
        *                "institute": null,
        *                "id": 1,
        *                "createdOn": "2019-05-01T04:46:25.6707294"
        *              },
        *              "id": 6,
        *              "createdOn": "2019-05-01T12:12:15.8186504"
        *            }
        *          ]
        *        }
        *     }
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *      {
        *          "Status": -100,
        *          "Message": "Un-authorized to get detail, you doesn't belong to this institute"
        *      }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpGet("staff")]
        public async Task<IActionResult> GetActivitiesForAllStaffsAsync()
        {
            ApplicationUser currentUser = await GetLoggedInUserAsync();
            UserInstituteMapping userInstituteMapping = await _iMSDbContext.UserInstituteMappings.FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

            if (userInstituteMapping == null)
            {
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Un-authorized to get detail, you doesn't belong to this institute" });
            }
            else
            {
                List<StaffActivity> staffActivityList = await _staffActivityManagementRepository.GetActivitiesForStaffAsync(userInstituteMapping.InstituteId, null);

                return Ok(new ApiServiceResponse { Status = 200, Message = "Success", ResultObj = staffActivityList });
            }
        }

        /**
        * @api {get} api/activitymanagement/student Request To Get Activities For All Students
        * @apiName GetActivitiesForAllStudentsAsync
        * @apiGroup Activity Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiSuccessExample {json} Success-Response:
        *   HTTP/1.1 200 OK
        *     {
        *         "status": 200,
        *         "message": "Success",
        *         "resultObj": [
        *           {
        *             "name": "Activity 1",
        *             "description": "Activity 1",
        *             "startDate": "2019-04-30T18:30:00",
        *             "endDate": "2019-05-07T18:30:00",
        *             "isActive": true,
        *             "instituteId": 1,
        *             "meetingAgendaId": 1,
        *             "activityStatusId": 1,
        *             "location": "Vadodara",
        *             "startTime": "12:00 am",
        *             "endTime": "12:00 am",
        *             "institute": null,
        *             "meetingAgenda": {
        *               "name": "Agenda 1",
        *               "code": "MA_01",
        *               "status": true,
        *               "description": null,
        *               "instituteId": 1,
        *               "institute": null,
        *               "id": 1,
        *               "createdOn": "2019-04-30T12:27:46.8203204"
        *             },
        *             "activityStatus": {
        *               "name": "Open",
        *               "code": "Open",
        *               "status": true,
        *               "description": null,
        *               "instituteId": 1,
        *               "institute": null,
        *               "id": 1,
        *               "createdOn": "2019-05-01T04:46:25.6707294"
        *             },
        *             "id": 6,
        *             "createdOn": "2019-05-01T12:12:15.8186504"
        *           },
        *           ...
        *         ]
        *       }
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *      {
        *          "Status": -100,
        *          "Message": "Un-authorized to get detail, you doesn't belong to this institute"
        *      }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpGet("student")]
        public async Task<IActionResult> GetActivitiesForAllStudentsAsync()
        {
            ApplicationUser currentUser = await GetLoggedInUserAsync();
            UserInstituteMapping userInstituteMapping = await _iMSDbContext.UserInstituteMappings.FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

            if (userInstituteMapping == null)
            {
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Un-authorized to get detail, you doesn't belong to this institute" });
            }
            else
            {
                List<StaffActivity> studentActivityList = await _staffActivityManagementRepository.GetActivitiesForStudentAsync(userInstituteMapping.InstituteId, null);

                return Ok(new ApiServiceResponse { Status = 200, Message = "Success", ResultObj = studentActivityList });
            }
        }

        /**
        * @api {get} api/activitymanagement/staff/{staffId} Request To Get Activities For A Particular Staff
        * @apiName GetActivitiesForParticularStaffAsync
        * @apiGroup Activity Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiParam {Number} staffId Staff Id.
        * @apiSuccessExample {json} Success-Response:
        *   HTTP/1.1 200 OK
        *   {
        *     "status": 200,
        *     "message": "Success",
        *     "resultObj": [
        *       {
        *         "name": "Activity 1",
        *         "description": "Activity 1",
        *         "startDate": "2019-04-30T18:30:00",
        *         "endDate": "2019-05-07T18:30:00",
        *         "isActive": true,
        *         "instituteId": 1,
        *         "meetingAgendaId": 1,
        *         "activityStatusId": 1,
        *         "location": "Vadodara",
        *         "startTime": "12:00 am",
        *         "endTime": "12:00 am",
        *         "institute": null,
        *         "meetingAgenda": {
        *           "name": "Agenda 1",
        *           "code": "MA_01",
        *           "status": true,
        *           "description": null,
        *           "instituteId": 1,
        *           "institute": null,
        *           "id": 1,
        *           "createdOn": "2019-04-30T12:27:46.8203204"
        *         },
        *         "activityStatus": {
        *           "name": "Open",
        *           "code": "Open",
        *           "status": true,
        *           "description": null,
        *           "instituteId": 1,
        *           "institute": null,
        *           "id": 1,
        *           "createdOn": "2019-05-01T04:46:25.6707294"
        *         },
        *         "id": 6,
        *         "createdOn": "2019-05-01T12:12:15.8186504"
        *       },
        *       ...
        *     ]
        *   }
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *      {
        *          "Status": -100,
        *          "Message": "Un-authorized to get detail, you doesn't belong to this institute"
        *      }
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 404 Not Found
        *      {
        *          "Status": -100,
        *          "Message": "Staff not found"
        *      }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpGet("staff/{staffId}")]
        public async Task<IActionResult> GetActivitiesForParticularStaffAsync(int staffId)
        {
            ApplicationUser user = await GetLoggedInUserAsync();
            StaffBasicPersonalInformation staff = await _iMSDbContext.StaffBasicPersonalInformation.FirstOrDefaultAsync(x => x.Id == staffId);
            if (staff == null)
            {
                return NotFound(new ApiServiceResponse() { Status = -100, Message = "Staff not found" });
            }
            else
            {
                if (await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.InstituteId == staff.InstituteId && x.UserId == user.Id))
                {
                    List<StaffActivity> staffActivityList = await _staffActivityManagementRepository.GetActivitiesForStaffAsync(staff.InstituteId.Value, staffId);

                    return Ok(new ApiServiceResponse { Status = 200, Message = "Success", ResultObj = staffActivityList });
                }
                else
                {
                    return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Un-authorized to get detail, you doesn't belong to this institute" });
                }
            }
        }

        /**
        * @api {get} api/activitymanagement/student/{studentId} Request To Get Activities For A Particular Student
        * @apiName GetActivitiesForParticularStudentAsync
        * @apiGroup Activity Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiParam {Number} studentId Student Id.
        * @apiSuccessExample {json} Success-Response:
        *   HTTP/1.1 200 OK
        *   {
        *     "status": 200,
        *     "message": "Success",
        *     "resultObj": [
        *       {
        *         "name": "Activity 1",
        *         "description": "Activity 1",
        *         "startDate": "2019-04-30T18:30:00",
        *         "endDate": "2019-05-07T18:30:00",
        *         "isActive": true,
        *         "instituteId": 1,
        *         "meetingAgendaId": 1,
        *         "activityStatusId": 1,
        *         "location": "Vadodara",
        *         "startTime": "12:00 am",
        *         "endTime": "12:00 am",
        *         "institute": null,
        *         "meetingAgenda": {
        *           "name": "Agenda 1",
        *           "code": "MA_01",
        *           "status": true,
        *           "description": null,
        *           "instituteId": 1,
        *           "institute": null,
        *           "id": 1,
        *           "createdOn": "2019-04-30T12:27:46.8203204"
        *         },
        *         "activityStatus": {
        *           "name": "Open",
        *           "code": "Open",
        *           "status": true,
        *           "description": null,
        *           "instituteId": 1,
        *           "institute": null,
        *           "id": 1,
        *           "createdOn": "2019-05-01T04:46:25.6707294"
        *         },
        *         "id": 6,
        *         "createdOn": "2019-05-01T12:12:15.8186504"
        *       },
        *       ...
        *     ]
        *   }
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *      {
        *          "Status": -100,
        *          "Message": "Un-authorized to get detail, you doesn't belong to this institute"
        *      }
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 404 Not Found
        *      {
        *          "Status": -100,
        *          "Message": "Student not found"
        *      }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetActivitiesForParticularStudentAsync(int studentId)
        {
            ApplicationUser user = await GetLoggedInUserAsync();
            StudentBasicInformation student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.Id == studentId);
            if (student == null)
            {
                return NotFound(new ApiServiceResponse() { Status = -100, Message = "Student not found" });
            }
            else
            {
                if (await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.InstituteId == student.InstituteId && x.UserId == user.Id))
                {
                    List<StaffActivity> studentActivityList = await _staffActivityManagementRepository.GetActivitiesForStudentAsync(student.InstituteId.Value, studentId);

                    return Ok(new ApiServiceResponse { Status = 200, Message = "Success", ResultObj = studentActivityList });
                }
                else
                {
                    return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Un-authorized to get detail, you doesn't belong to this institute" });
                }
            }
        }

        #endregion
    }
}
