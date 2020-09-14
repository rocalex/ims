using IMS.Api.ActionFilter;
using IMS.DomainModel.ApplicationClasses.ApiService;
using IMS.DomainModel.ApplicationClasses.ApiService.TimeTableManagement;
using IMS.DomainModel.ApplicationClasses.TimeTableManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.TimeTableManagement;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Api.Controllers
{
    [Route(BaseUrl)]
    public class TimeTableManagementController : BaseController
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMSDbContext _iMSDbContext;
        private readonly ITimeTableManagementRepository _timeTableManagementRepository;

        #endregion

        #region Constructor

        public TimeTableManagementController(UserManager<ApplicationUser> userManager,
            IMSDbContext iMSDbContext,
            ITimeTableManagementRepository timeTableManagementRepository)
            : base(userManager, iMSDbContext)
        {
            _userManager = userManager;
            _iMSDbContext = iMSDbContext;
            _timeTableManagementRepository = timeTableManagementRepository;
        }

        #endregion

        #region Public Method(s)

        /**
        * @api {post} api/timetablemanagement/details/student Request To Get Time Tables For Students/Admins
        * @apiName GetTimeTableDetailsAsync
        * @apiGroup TimeTable Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiParam {Number} InstituteId Institute Id.
        * @apiParam {Number} AcademicYearId Academic Year Id.
        * @apiParam {Number} ClassId Class Id.
        * @apiParam {Number} SectionId Section Id.
        * @apiParamExample {json} Request-Example:
        *     {
        *       "InstituteId": 1,
        *       "AcademicYearId": 1,
        *       "ClassId": 1,
        *       "SectionId": 1,
        *       "StaffId": null
        *     }
        * @apiSuccessExample {json} Success-Response:
        *   HTTP/1.1 200 OK
        *     {
        *        "status": 200,
        *        "message": "Success",
        *        "resultObj": {
        *          "timeTable": {
        *            "id": 2005,
        *            "classId": 2,
        *            "sectionId": 1,
        *            "academicYearId": 2,
        *            "periodCount": 2,
        *            "periodDuration": 30,
        *            "periodStartTime": "10:00 am",
        *            "breaksCount": 1
        *          },
        *          "timeTableSubjectDetailsList": [
        *            {
        *              "weekDaysEnum": 0,
        *              "weekDaysEnumString": "Monday",
        *              "timeTableWeekDaySubjectList": [
        *                {
        *                  "id": 2126,
        *                  "timeTableId": 2005,
        *                  "subjectId": 3,
        *                  "subjectName": "Hindi",
        *                  "subjectCode": "HND-101",
        *                  "weekDaysEnum": 0,
        *                  "weekDaysEnumString": "Monday",
        *                  "periodNumber": 1,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 2127,
        *                  "timeTableId": 2005,
        *                  "subjectId": 3,
        *                  "subjectName": "Hindi",
        *                  "subjectCode": "HND-101",
        *                  "weekDaysEnum": 0,
        *                  "weekDaysEnumString": "Monday",
        *                  "periodNumber": 2,
        *                  "isBreakPeriod": true,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 2128,
        *                  "timeTableId": 2005,
        *                  "subjectId": 3,
        *                  "subjectName": "Hindi",
        *                  "subjectCode": "HND-101",
        *                  "weekDaysEnum": 0,
        *                  "weekDaysEnumString": "Monday",
        *                  "periodNumber": 3,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                }
        *              ]
        *            },
        *            {
        *              "weekDaysEnum": 1,
        *              "weekDaysEnumString": "Tuesday",
        *              "timeTableWeekDaySubjectList": [
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 1,
        *                  "weekDaysEnumString": "Tuesday",
        *                  "periodNumber": 1,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 1,
        *                  "weekDaysEnumString": "Tuesday",
        *                  "periodNumber": 2,
        *                  "isBreakPeriod": true,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 1,
        *                  "weekDaysEnumString": "Tuesday",
        *                  "periodNumber": 3,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                }
        *              ]
        *            },
        *            {
        *              "weekDaysEnum": 2,
        *              "weekDaysEnumString": "Wednesday",
        *              "timeTableWeekDaySubjectList": [
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 2,
        *                  "weekDaysEnumString": "Wednesday",
        *                  "periodNumber": 1,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 2,
        *                  "weekDaysEnumString": "Wednesday",
        *                  "periodNumber": 2,
        *                  "isBreakPeriod": true,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 2,
        *                  "weekDaysEnumString": "Wednesday",
        *                  "periodNumber": 3,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                }
        *              ]
        *            },
        *            {
        *              "weekDaysEnum": 3,
        *              "weekDaysEnumString": "Thursday",
        *              "timeTableWeekDaySubjectList": [
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 3,
        *                  "weekDaysEnumString": "Thursday",
        *                  "periodNumber": 1,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 3,
        *                  "weekDaysEnumString": "Thursday",
        *                  "periodNumber": 2,
        *                  "isBreakPeriod": true,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 3,
        *                  "weekDaysEnumString": "Thursday",
        *                  "periodNumber": 3,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                }
        *              ]
        *            },
        *            {
        *              "weekDaysEnum": 4,
        *              "weekDaysEnumString": "Friday",
        *              "timeTableWeekDaySubjectList": [
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 4,
        *                  "weekDaysEnumString": "Friday",
        *                  "periodNumber": 1,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 4,
        *                  "weekDaysEnumString": "Friday",
        *                  "periodNumber": 2,
        *                  "isBreakPeriod": true,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 4,
        *                  "weekDaysEnumString": "Friday",
        *                  "periodNumber": 3,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                }
        *              ]
        *            },
        *            {
        *              "weekDaysEnum": 5,
        *              "weekDaysEnumString": "Saturday",
        *              "timeTableWeekDaySubjectList": [
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 5,
        *                  "weekDaysEnumString": "Saturday",
        *                  "periodNumber": 1,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 5,
        *                  "weekDaysEnumString": "Saturday",
        *                  "periodNumber": 2,
        *                  "isBreakPeriod": true,
        *                  "timeTableWeekDaySubjectList": null
        *                },
        *                {
        *                  "id": 0,
        *                  "timeTableId": 0,
        *                  "subjectId": 0,
        *                  "subjectName": null,
        *                  "subjectCode": null,
        *                  "weekDaysEnum": 5,
        *                  "weekDaysEnumString": "Saturday",
        *                  "periodNumber": 3,
        *                  "isBreakPeriod": false,
        *                  "timeTableWeekDaySubjectList": null
        *                }
        *              ]
        *            }
        *          ],
        *          "timeTableBreakDetailsList": [
        *            {
        *              "id": 3041,
        *              "timeTableId": 2005,
        *              "breakDuration": 15,
        *              "breakAfterPeriod": 1
        *            }
        *          ]
        *        }
        *     }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpPost("details/student")]
        public async Task<IActionResult> GetTimeTableDetailsAsync([FromBody] GetTimeTableAc getTimeTableAc)
        {
            AddTimeTableAc timeTableDetails = await _timeTableManagementRepository.GetTimeTableDetailsAsync(getTimeTableAc.ClassId, getTimeTableAc.SectionId, getTimeTableAc.AcademicYearId, getTimeTableAc.InstituteId);

            return Ok(new ApiServiceResponse { Status = 200, Message = "Success", ResultObj = timeTableDetails });
        }

        /**
        * @api {post} api/timetablemanagement/details/staff Request To Get Time Tables For Staffs
        * @apiName GetTimeTableDetailsForStaffAsync
        * @apiGroup TimeTable Management
        * @apiPermission auth-key
        * @apiPermission auth-token
        * @apiParam {Number} InstituteId Institute Id.
        * @apiParam {Number} AcademicYearId Academic Year Id.
        * @apiParam {Number} ClassId Class Id.
        * @apiParam {Number} SectionId Section Id.
        * @apiParam {Number} StaffId Nullable Staff Id.
        * @apiParamExample {json} Request-Example:
        *     {
        *       "InstituteId": 1,
        *       "AcademicYearId": 1,
        *       "ClassId": 1,
        *       "SectionId": 1,
        *       "StaffId": 1
        *     }
        * @apiSuccessExample {json} Success-Response:
        *   HTTP/1.1 200 OK
        *     {
        *       "status": 200,
        *       "message": "Success",
        *       "resultObj": {
        *         "timeTable": {
        *           "id": 2005,
        *           "classId": 2,
        *           "sectionId": 1,
        *           "academicYearId": 2,
        *           "periodCount": 2,
        *           "periodDuration": 30,
        *           "periodStartTime": "10:00 am",
        *           "breaksCount": 1
        *         },
        *         "timeTableSubjectDetailsList": [
        *           {
        *             "subjectId": 0,
        *             "subjectName": "-",
        *             "subjectCode": "-",
        *             "weekDaysEnum": 0,
        *             "weekDaysEnumString": "Monday",
        *             "periodNumber": 0,
        *             "isBreakPeriod": false,
        *             "timeTableWeekDaySubjectList": [
        *               {
        *                 "id": 2126,
        *                 "timeTableId": 2005,
        *                 "subjectId": 3,
        *                 "subjectName": "Hindi",
        *                 "subjectCode": "HND-101",
        *                 "weekDaysEnum": 0,
        *                 "weekDaysEnumString": "Monday",
        *                 "periodNumber": 1,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 2127,
        *                 "timeTableId": 2005,
        *                 "subjectId": 3,
        *                 "subjectName": "Hindi",
        *                 "subjectCode": "HND-101",
        *                 "weekDaysEnum": 0,
        *                 "weekDaysEnumString": "Monday",
        *                 "periodNumber": 2,
        *                 "isBreakPeriod": true,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 2128,
        *                 "timeTableId": 2005,
        *                 "subjectId": 3,
        *                 "subjectName": "Hindi",
        *                 "subjectCode": "HND-101",
        *                 "weekDaysEnum": 0,
        *                 "weekDaysEnumString": "Monday",
        *                 "periodNumber": 3,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               }
        *             ]
        *           },
        *           {
        *             "subjectId": 0,
        *             "subjectName": "-",
        *             "subjectCode": "-",
        *             "weekDaysEnum": 1,
        *             "weekDaysEnumString": "Tuesday",
        *             "periodNumber": 0,
        *             "isBreakPeriod": false,
        *             "timeTableWeekDaySubjectList": [
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 1,
        *                 "weekDaysEnumString": "Tuesday",
        *                 "periodNumber": 1,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 1,
        *                 "weekDaysEnumString": "Tuesday",
        *                 "periodNumber": 2,
        *                 "isBreakPeriod": true,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 1,
        *                 "weekDaysEnumString": "Tuesday",
        *                 "periodNumber": 3,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               }
        *             ]
        *           },
        *           {
        *             "subjectId": 0,
        *             "subjectName": "-",
        *             "subjectCode": "-",
        *             "weekDaysEnum": 2,
        *             "weekDaysEnumString": "Wednesday",
        *             "periodNumber": 0,
        *             "isBreakPeriod": false,
        *             "timeTableWeekDaySubjectList": [
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 2,
        *                 "weekDaysEnumString": "Wednesday",
        *                 "periodNumber": 1,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 2,
        *                 "weekDaysEnumString": "Wednesday",
        *                 "periodNumber": 2,
        *                 "isBreakPeriod": true,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 2,
        *                 "weekDaysEnumString": "Wednesday",
        *                 "periodNumber": 3,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               }
        *             ]
        *           },
        *           {
        *             "subjectId": 0,
        *             "subjectName": "-",
        *             "subjectCode": "-",
        *             "weekDaysEnum": 3,
        *             "weekDaysEnumString": "Thursday",
        *             "periodNumber": 0,
        *             "isBreakPeriod": false,
        *             "timeTableWeekDaySubjectList": [
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 3,
        *                 "weekDaysEnumString": "Thursday",
        *                 "periodNumber": 1,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 3,
        *                 "weekDaysEnumString": "Thursday",
        *                 "periodNumber": 2,
        *                 "isBreakPeriod": true,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 3,
        *                 "weekDaysEnumString": "Thursday",
        *                 "periodNumber": 3,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               }
        *             ]
        *           },
        *           {
        *             "subjectId": 0,
        *             "subjectName": "-",
        *             "subjectCode": "-",
        *             "weekDaysEnum": 4,
        *             "weekDaysEnumString": "Friday",
        *             "periodNumber": 0,
        *             "isBreakPeriod": false,
        *             "timeTableWeekDaySubjectList": [
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 4,
        *                 "weekDaysEnumString": "Friday",
        *                 "periodNumber": 1,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 4,
        *                 "weekDaysEnumString": "Friday",
        *                 "periodNumber": 2,
        *                 "isBreakPeriod": true,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 4,
        *                 "weekDaysEnumString": "Friday",
        *                 "periodNumber": 3,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               }
        *             ]
        *           },
        *           {
        *             "subjectId": 0,
        *             "subjectName": "-",
        *             "subjectCode": "-",
        *             "weekDaysEnum": 5,
        *             "weekDaysEnumString": "Saturday",
        *             "periodNumber": 0,
        *             "isBreakPeriod": false,
        *             "timeTableWeekDaySubjectList": [
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 5,
        *                 "weekDaysEnumString": "Saturday",
        *                 "periodNumber": 1,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 5,
        *                 "weekDaysEnumString": "Saturday",
        *                 "periodNumber": 2,
        *                 "isBreakPeriod": true,
        *                 "timeTableWeekDaySubjectList": null
        *               },
        *               {
        *                 "id": 0,
        *                 "timeTableId": 0,
        *                 "subjectId": 0,
        *                 "subjectName": null,
        *                 "subjectCode": null,
        *                 "weekDaysEnum": 5,
        *                 "weekDaysEnumString": "Saturday",
        *                 "periodNumber": 3,
        *                 "isBreakPeriod": false,
        *                 "timeTableWeekDaySubjectList": null
        *               }
        *             ]
        *           }
        *         ],
        *         "timeTableBreakDetailsList": [
        *           {
        *             "id": 3041,
        *             "timeTableId": 2005,
        *             "breakDuration": 15,
        *             "breakAfterPeriod": 1
        *           }
        *         ]
        *       }
        *     }
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 404 Not Found
        *      {
        *          "Status": -100,
        *          "Message": "Staff not found"
        *      }
        * @apiErrorExample {json} Error-Response:
        *     HTTP/1.1 400 Bad Request
        *      {
        *          "Status": -100,
        *          "Message": "Staff Id can't be empty"
        *      }
        */
        [ServiceFilter(typeof(MobileApiAuthorizedUserActionFilter))]
        [HttpPost("details/staff")]
        public async Task<IActionResult> GetTimeTableDetailsForStaffAsync([FromBody] GetTimeTableAc getTimeTableAc)
        {
            if (!getTimeTableAc.StaffId.HasValue || getTimeTableAc.StaffId.Value == 0)
            {
                return BadRequest(new ApiServiceResponse() { Status = -100, Message = "Staff Id can't be empty" });
            }
            else
            {
                StaffBasicPersonalInformation staff = await _iMSDbContext.StaffBasicPersonalInformation.FirstOrDefaultAsync(x => x.Id == getTimeTableAc.StaffId.Value);
                if (staff == null)
                {
                    return NotFound(new ApiServiceResponse() { Status = -100, Message = "Staff not found" });
                }

                AddTimeTableAc timeTableDetails =
                    await _timeTableManagementRepository.GetTimeTableForStaffAsync(getTimeTableAc.ClassId, getTimeTableAc.SectionId, getTimeTableAc.StaffId.Value, getTimeTableAc.AcademicYearId, getTimeTableAc.InstituteId);

                return Ok(new ApiServiceResponse { Status = 200, Message = "Success", ResultObj = timeTableDetails });
            }
        }

        #endregion
    }
}
