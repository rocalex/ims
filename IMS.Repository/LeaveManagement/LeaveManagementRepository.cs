using IMS.DomainModel.ApplicationClasses.LeaveManagement;
using IMS.DomainModel.ApplicationClasses.NotificationManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.NotificationManagement;
using IMS.Repository.TemplateManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.LeaveManagement
{
    public class LeaveManagementRepository : ILeaveManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private readonly ITemplateManagementRepository _templateManagementRepository;
        private readonly INotificationManagementRepository _notificationManagementRepository;
        #endregion

        #region Constructor
        public LeaveManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService,
            ITemplateManagementRepository templateManagementRepository,
            INotificationManagementRepository notificationManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _templateManagementRepository = templateManagementRepository;
            _notificationManagementRepository = notificationManagementRepository;
        }
        #endregion

        #region Public Method(s)

        #region Student

        /// <summary>
        /// Method to apply student leave - SS
        /// </summary>
        /// <param name="addStudentLeave">leave detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        public async Task<StudentLeaveResponse> AddStudentLeaveAsync(AddStudentLeaveAc addStudentLeave, int instituteId, ApplicationUser currentUser)
        {
            if (string.IsNullOrEmpty(addStudentLeave.Reason.Trim()))
                return new StudentLeaveResponse() { HasError = true, Message = "Leave reason can't be empty", ErrorType = StudentLeaveResponseType.Reason };
            else
            {
                if (!await _iMSDbContext.StudentBasicInformation.AnyAsync(x => x.Id == addStudentLeave.StudentId && x.InstituteId == instituteId))
                    return new StudentLeaveResponse() { HasError = true, Message = "Student not found", ErrorType = StudentLeaveResponseType.StudentId };
                else
                {
                    if (!await _iMSDbContext.LeaveTypes.AnyAsync(x => x.Id == addStudentLeave.LeaveTypeId && x.InstituteId == instituteId))
                        return new StudentLeaveResponse() { HasError = true, Message = "Leave type not found", ErrorType = StudentLeaveResponseType.LeaveTypeId };
                    else
                    {
                        if (!await _iMSDbContext.LeaveStatuses.AnyAsync(x => x.Id == addStudentLeave.StatusId && x.InstituteId == instituteId))
                            return new StudentLeaveResponse() { HasError = true, Message = "Status not found", ErrorType = StudentLeaveResponseType.StatusId };
                        else
                        {
                            if (!await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.Id == addStudentLeave.ApprovedById && x.InstituteId == instituteId))
                                return new StudentLeaveResponse() { HasError = true, Message = "Staff not found", ErrorType = StudentLeaveResponseType.ApprovedById };
                            else
                            {
                                var currentAcademicYear = await _iMSDbContext.InstituteAcademicYears.FirstAsync(x => x.IsActive && x.InstituteId == instituteId);
                                var leave = new StudentLeave()
                                {
                                    ApprovedById = addStudentLeave.ApprovedById,
                                    CreatedOn = DateTime.UtcNow,
                                    EndDate = addStudentLeave.EndDate,
                                    FromDate = addStudentLeave.FromDate,
                                    LeaveTypeId = addStudentLeave.LeaveTypeId,
                                    StatusId = addStudentLeave.StatusId,
                                    Reason = addStudentLeave.Reason,
                                    StudentId = addStudentLeave.StudentId,
                                    AcademicYearId = currentAcademicYear.Id
                                };
                                _iMSDbContext.StudentLeaves.Add(leave);
                                await _iMSDbContext.SaveChangesAsync();

                                #region Send Mail/Message

                                leave = await _iMSDbContext.StudentLeaves.Include(s => s.Student).Include(s => s.LeaveType)
                                    .Include(s => s.LeaveStatus).Include(s => s.ApprovedBy).FirstAsync(x => x.Id == leave.Id);
                                await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentLeaveAdd,
                                    TemplateFormatEnum.Email, leave);
                                await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentLeaveAdd,
                                    TemplateFormatEnum.Sms, leave);

                                #endregion

                                await SendBellNotificationsForStudentsLeavesAsync(currentUser, addStudentLeave.LeaveTypeId, addStudentLeave.StudentId, instituteId);

                                return new StudentLeaveResponse() { HasError = false, Message = "Leave applied succesfully" };
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Method to get list of student leaves - SS
        /// </summary>
        /// <param name="loggedInUser">loggedInUser</param>
        /// <returns></returns>
        public async Task<List<StudentLeave>> GetStudentLeavesAsync(ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var currentAcademicYear = await _iMSDbContext.SelectedAcademicYears.FirstAsync(x => x.UserId == loggedInUser.Id
            && x.AcademicYear.InstituteId == instituteId);
            return await _iMSDbContext.StudentLeaves.Include(s => s.ApprovedBy).Include(s => s.LeaveStatus).Include(s => s.Student)
                .Include(s => s.LeaveType).Where(x => x.Student.InstituteId == instituteId && x.AcademicYearId == currentAcademicYear.AcademicYearId).ToListAsync();
        }

        /// <summary>
        /// Method to update applied student leave - SS
        /// </summary>
        /// <param name="updateStudentLeave">leave detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        public async Task<StudentLeaveResponse> UpdateStudentLeaveAsync(UpdateStudentLeaveAc updateStudentLeave, int instituteId, ApplicationUser currentUser)
        {
            if (string.IsNullOrEmpty(updateStudentLeave.Reason.Trim()))
                return new StudentLeaveResponse() { HasError = true, Message = "Leave reason can't be empty", ErrorType = StudentLeaveResponseType.Reason };
            else
            {
                if (!await _iMSDbContext.StudentBasicInformation.AnyAsync(x => x.Id == updateStudentLeave.StudentId && x.InstituteId == instituteId))
                    return new StudentLeaveResponse() { HasError = true, Message = "Student not found", ErrorType = StudentLeaveResponseType.StudentId };
                else
                {
                    if (!await _iMSDbContext.LeaveTypes.AnyAsync(x => x.Id == updateStudentLeave.LeaveTypeId && x.InstituteId == instituteId))
                        return new StudentLeaveResponse() { HasError = true, Message = "Leave type not found", ErrorType = StudentLeaveResponseType.LeaveTypeId };
                    else
                    {
                        if (!await _iMSDbContext.LeaveStatuses.AnyAsync(x => x.Id == updateStudentLeave.StatusId && x.InstituteId == instituteId))
                            return new StudentLeaveResponse() { HasError = true, Message = "Status not found", ErrorType = StudentLeaveResponseType.StatusId };
                        else
                        {
                            if (!await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.Id == updateStudentLeave.ApprovedById && x.InstituteId == instituteId))
                                return new StudentLeaveResponse() { HasError = true, Message = "Staff not found", ErrorType = StudentLeaveResponseType.ApprovedById };
                            else
                            {
                                var leave = await _iMSDbContext.StudentLeaves.FirstOrDefaultAsync(x => x.Id == updateStudentLeave.Id && x.Student.InstituteId == instituteId);
                                if (leave == null)
                                    return new StudentLeaveResponse() { HasError = true, Message = "Leave not found", ErrorType = StudentLeaveResponseType.Id };
                                else
                                {
                                    leave.EndDate = updateStudentLeave.EndDate;
                                    leave.FromDate = updateStudentLeave.FromDate;
                                    leave.LeaveTypeId = updateStudentLeave.LeaveTypeId;
                                    leave.Reason = updateStudentLeave.Reason;
                                    _iMSDbContext.StudentLeaves.Update(leave);
                                    await _iMSDbContext.SaveChangesAsync();

                                    #region Send Mail/Message

                                    leave = await _iMSDbContext.StudentLeaves.Include(s => s.Student).Include(s => s.LeaveType)
                                        .Include(s => s.LeaveStatus).Include(s => s.ApprovedBy).FirstAsync(x => x.Id == leave.Id);
                                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentLeaveEdit,
                                        TemplateFormatEnum.Email, leave);
                                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StudentLeaveEdit,
                                        TemplateFormatEnum.Sms, leave);

                                    #endregion

                                    await SendBellNotificationsForStudentsLeavesAsync(currentUser, updateStudentLeave.LeaveTypeId, updateStudentLeave.StudentId, instituteId);

                                    return new StudentLeaveResponse() { HasError = false, Message = "Applied leave updated succesfully" };
                                }
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Method for sending bell notification when a student's leave is approved - RS
        /// </summary>
        /// <param name="leaveApprovedByUser"></param>
        /// <param name="studentLeave"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task SendBellNotificationsForStudentLeaveApproveRejectAsync(ApplicationUser leaveApprovedByUser, StudentLeave studentLeave, int instituteId)
        {
            StaffBasicPersonalInformation staffUser = await _iMSDbContext.StaffBasicPersonalInformation
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.UserId == leaveApprovedByUser.Id);

            LeaveType leaveType = await _iMSDbContext.LeaveTypes.FirstAsync(x => x.Id == studentLeave.LeaveTypeId);
            StudentBasicInformation leaveForStudent = (await _iMSDbContext.StudentBasicInformation
                .Include(x => x.User)
                .Include(x => x.CurrentClass)
                .ThenInclude(x => x.ClassTeacher)
                .ThenInclude(x => x.User)
                .Include(x => x.Institute)
                .FirstAsync(x => x.Id == studentLeave.StudentId));

            NotificationAc notificationAc = new NotificationAc
            {
                NotificationMessage = leaveType.Name,
                NotificationTo = null,
                NotificationUserMappingsList = new List<NotificationUserMappingAc>()
            };

            // For Student
            notificationAc.NotificationDetails = string.Format("Your {0} has been updated", leaveType.Name);
            notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
            {
                UserId = leaveForStudent.UserId
            });

            await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, leaveApprovedByUser);
            notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

            // For the leave approver
            notificationAc.NotificationDetails = string.Format("You have updated the {0} request of {1} of class {2}",
                        leaveType.Name, leaveForStudent.FirstName, leaveForStudent.CurrentClass.Name);
            notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
            {
                UserId = leaveApprovedByUser.Id
            });

            await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, leaveApprovedByUser);
            notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

            // Approved by the admin (For Class Teacher)
            if (staffUser == null && leaveForStudent.CurrentClass.ClassTeacherId.HasValue)
            {
                notificationAc.NotificationDetails = string.Format("The {0} request of {1} of class {2} has been updated",
                    leaveType.Name, leaveForStudent.FirstName, leaveForStudent.CurrentClass.Name);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = leaveForStudent.CurrentClass.ClassTeacher?.UserId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, leaveApprovedByUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();
            }
            // Approved by the staff (For admin)
            else if(staffUser != null)
            {
                notificationAc.NotificationDetails = string.Format("The {0} request of {1} of class {2} has been updated by {3}",
                    leaveType.Name, leaveForStudent.FirstName, leaveForStudent.CurrentClass.Name, staffUser.FirstName);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = leaveForStudent.Institute.AdminId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, leaveApprovedByUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();
            }
        }

        #endregion

        #region Staff

        /// <summary>
        /// Method to apply Staff leave - SS
        /// </summary>
        /// <param name="addStaffLeave">leave detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        public async Task<StaffLeaveResponse> AddStaffLeaveAsync(AddStaffLeaveAc addStaffLeave, int instituteId, ApplicationUser currentUser)
        {
            if (string.IsNullOrEmpty(addStaffLeave.Reason.Trim()))
                return new StaffLeaveResponse() { HasError = true, Message = "Leave reason can't be empty", ErrorType = StaffLeaveResponseType.Reason };
            else
            {
                if (!await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.Id == addStaffLeave.StaffId && x.InstituteId == instituteId))
                    return new StaffLeaveResponse() { HasError = true, Message = "Staff not found", ErrorType = StaffLeaveResponseType.StaffId };
                else
                {
                    if (!await _iMSDbContext.LeaveTypes.AnyAsync(x => x.Id == addStaffLeave.LeaveTypeId && x.InstituteId == instituteId))
                        return new StaffLeaveResponse() { HasError = true, Message = "Leave type not found", ErrorType = StaffLeaveResponseType.LeaveTypeId };
                    else
                    {
                        if (!await _iMSDbContext.LeaveStatuses.AnyAsync(x => x.Id == addStaffLeave.StatusId && x.InstituteId == instituteId))
                            return new StaffLeaveResponse() { HasError = true, Message = "Status not found", ErrorType = StaffLeaveResponseType.StatusId };
                        else
                        {
                            if (!await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.UserId == addStaffLeave.ApprovedById && x.InstituteId == instituteId))
                                return new StaffLeaveResponse() { HasError = true, Message = "Staff not found", ErrorType = StaffLeaveResponseType.ApprovedById };
                            else
                            {
                                var currentAcademicYear = await _iMSDbContext.InstituteAcademicYears.FirstAsync(x => x.IsActive && x.InstituteId == instituteId);
                                var leave = new StaffLeave()
                                {
                                    ApprovedById = addStaffLeave.ApprovedById,
                                    CreatedOn = DateTime.UtcNow,
                                    EndDate = addStaffLeave.EndDate,
                                    FromDate = addStaffLeave.FromDate,
                                    LeaveTypeId = addStaffLeave.LeaveTypeId,
                                    StatusId = addStaffLeave.StatusId,
                                    Reason = addStaffLeave.Reason,
                                    StaffId = addStaffLeave.StaffId,
                                    AcademicYearId = currentAcademicYear.Id
                                };
                                _iMSDbContext.StaffLeaves.Add(leave);
                                await _iMSDbContext.SaveChangesAsync();

                                #region Send Mail/Message

                                leave = await _iMSDbContext.StaffLeaves.Include(s => s.Staff).Include(s => s.LeaveType)
                                    .Include(s => s.LeaveStatus).Include(s => s.ApprovedBy).FirstAsync(x => x.Id == leave.Id);
                                await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffLeaveAdd,
                                    TemplateFormatEnum.Email, leave);
                                await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffLeaveAdd,
                                    TemplateFormatEnum.Sms, leave);

                                #endregion

                                await SendBellNotificationsForStaffssLeavesAsync(currentUser, addStaffLeave.LeaveTypeId, addStaffLeave.StaffId, instituteId);

                                return new StaffLeaveResponse() { HasError = false, Message = "Leave applied succesfully" };
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Method to get list of Staff leaves - SS
        /// </summary>
        /// <param name="loggedInUser">loggedInUser</param>
        /// <returns></returns>
        public async Task<List<StaffLeave>> GetStaffLeavesAsync(ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var currentAcademicYear = await _iMSDbContext.SelectedAcademicYears.FirstAsync(x => x.UserId == loggedInUser.Id 
            && x.AcademicYear.InstituteId == instituteId);
            return await _iMSDbContext.StaffLeaves.Include(s => s.ApprovedBy).Include(s => s.LeaveStatus).Include(s => s.Staff)
                .Include(s => s.LeaveType).Where(x => x.Staff.InstituteId == instituteId && x.AcademicYearId == currentAcademicYear.AcademicYearId).ToListAsync();
        }

        /// <summary>
        /// Method to update applied Staff leave - SS
        /// </summary>
        /// <param name="updateStaffLeave">leave detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        public async Task<StaffLeaveResponse> UpdateStaffLeaveAsync(UpdateStaffLeaveAc updateStaffLeave, int instituteId, ApplicationUser currentUser)
        {
            if (string.IsNullOrEmpty(updateStaffLeave.Reason.Trim()))
                return new StaffLeaveResponse() { HasError = true, Message = "Leave reason can't be empty", ErrorType = StaffLeaveResponseType.Reason };
            else
            {
                if (!await _iMSDbContext.StaffBasicPersonalInformation.AnyAsync(x => x.Id == updateStaffLeave.StaffId && x.InstituteId == instituteId))
                    return new StaffLeaveResponse() { HasError = true, Message = "Staff not found", ErrorType = StaffLeaveResponseType.StaffId };
                else
                {
                    if (!await _iMSDbContext.LeaveTypes.AnyAsync(x => x.Id == updateStaffLeave.LeaveTypeId && x.InstituteId == instituteId))
                        return new StaffLeaveResponse() { HasError = true, Message = "Leave type not found", ErrorType = StaffLeaveResponseType.LeaveTypeId };
                    else
                    {
                        if (!await _iMSDbContext.LeaveStatuses.AnyAsync(x => x.Id == updateStaffLeave.StatusId && x.InstituteId == instituteId))
                            return new StaffLeaveResponse() { HasError = true, Message = "Status not found", ErrorType = StaffLeaveResponseType.StatusId };
                        else
                        {
                            if (!await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.UserId == updateStaffLeave.ApprovedById && x.InstituteId == instituteId))
                                return new StaffLeaveResponse() { HasError = true, Message = "Staff not found", ErrorType = StaffLeaveResponseType.ApprovedById };
                            else
                            {
                                var leave = await _iMSDbContext.StaffLeaves.FirstOrDefaultAsync(x => x.Id == updateStaffLeave.Id && x.Staff.InstituteId == instituteId);
                                if (leave == null)
                                    return new StaffLeaveResponse() { HasError = true, Message = "Leave not found", ErrorType = StaffLeaveResponseType.Id };
                                else
                                {
                                    leave.EndDate = updateStaffLeave.EndDate;
                                    leave.FromDate = updateStaffLeave.FromDate;
                                    leave.LeaveTypeId = updateStaffLeave.LeaveTypeId;
                                    leave.Reason = updateStaffLeave.Reason;
                                    _iMSDbContext.StaffLeaves.Update(leave);
                                    await _iMSDbContext.SaveChangesAsync();

                                    #region Send Mail/Message

                                    leave = await _iMSDbContext.StaffLeaves.Include(s => s.Staff).Include(s => s.LeaveType)
                                        .Include(s => s.LeaveStatus).Include(s => s.ApprovedBy).FirstAsync(x => x.Id == leave.Id);
                                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffLeaveEdit,
                                        TemplateFormatEnum.Email, leave);
                                    await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.StaffLeaveEdit,
                                        TemplateFormatEnum.Sms, leave);

                                    #endregion

                                    await SendBellNotificationsForStaffssLeavesAsync(currentUser, leave.LeaveTypeId, leave.StaffId, instituteId);

                                    return new StaffLeaveResponse() { HasError = false, Message = "Applied leave updated succesfully" };
                                }
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// Method for sending bell notification when a staff's leave is approved - RS
        /// </summary>
        /// <param name="leaveApprovedByUser"></param>
        /// <param name="staffLeave"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task SendBellNotificationForStaffLeaveApproveRejectAsync(ApplicationUser leaveApprovedByUser, StaffLeave staffLeave, int instituteId)
        {
            LeaveType leaveType = await _iMSDbContext.LeaveTypes.FirstAsync(x => x.Id == staffLeave.LeaveTypeId);
            StaffBasicPersonalInformation leaveForStaff = (await _iMSDbContext.StaffBasicPersonalInformation
                .Include(x => x.User)
                .Include(x => x.Institute)
                .FirstAsync(x => x.Id == staffLeave.StaffId));

            NotificationAc notificationAc = new NotificationAc
            {
                NotificationMessage = leaveType.Name,
                NotificationTo = null,
                NotificationUserMappingsList = new List<NotificationUserMappingAc>()
            };

            // For Staff
            notificationAc.NotificationDetails = string.Format("Your {0} has been updated", leaveType.Name);
            notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
            {
                UserId = leaveForStaff.UserId
            });

            await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, leaveApprovedByUser);
            notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

            // For the leave approver
            notificationAc.NotificationDetails = string.Format("You have updated the {0} request of {1}",
                        leaveType.Name, leaveForStaff.FirstName);
            notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
            {
                UserId = leaveApprovedByUser.Id
            });

            await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, leaveApprovedByUser);
        }

        #endregion

        #endregion

        #region Private Methods

        /// <summary>
        /// Method for sending bell notification for students' leaves - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="leaveTypeId"></param>
        /// <param name="leaveForStudentId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        private async Task SendBellNotificationsForStudentsLeavesAsync(ApplicationUser currentUser, int leaveTypeId, int leaveForStudentId, int instituteId)
        {
            StudentBasicInformation studentUser = await _iMSDbContext.StudentBasicInformation
                .Include(x => x.User)
                .Include(x => x.CurrentClass)
                .ThenInclude(x => x.ClassTeacher)
                .ThenInclude(x => x.User)
                .Include(x => x.Institute)
                .FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

            LeaveType leaveType = await _iMSDbContext.LeaveTypes.FirstAsync(x => x.Id == leaveTypeId);
            StudentBasicInformation leaveForStudent = (await _iMSDbContext.StudentBasicInformation
                .Include(x => x.User)
                .Include(x => x.CurrentClass)
                .ThenInclude(x => x.ClassTeacher)
                .ThenInclude(x => x.User)
                .Include(x => x.Institute)
                .FirstAsync(x => x.Id == leaveForStudentId));

            NotificationAc notificationAc = new NotificationAc
            {
                NotificationMessage = leaveType.Name,
                NotificationTo = null,
                NotificationUserMappingsList = new List<NotificationUserMappingAc>()
            };

            // Created by the admin
            if (studentUser == null)
            {
                // For Student
                notificationAc.NotificationDetails = string.Format("Your {0} has been applied successfully", leaveType.Name);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = leaveForStudent.UserId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

                // For Class Teacher
                if (leaveForStudent.CurrentClass.ClassTeacherId.HasValue)
                {
                    notificationAc.NotificationDetails = string.Format("{0} has been applied from {1} of class {2}",
                        leaveType.Name, leaveForStudent.FirstName, leaveForStudent.CurrentClass.Name);
                    notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                    {
                        UserId = leaveForStudent.CurrentClass.ClassTeacher?.UserId
                    });

                    await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
                }
            }
            // Created by the student
            else
            {
                // For Student
                notificationAc.NotificationDetails = string.Format("Your {0} has been applied successfully", leaveType.Name);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = studentUser.UserId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

                // For Class Teacher
                if (studentUser.CurrentClass.ClassTeacherId.HasValue)
                {
                    notificationAc.NotificationDetails = string.Format("New {0} request from {1} of class {2}",
                        leaveType.Name, studentUser.FirstName, studentUser.CurrentClass.Name);
                    notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                    {
                        UserId = studentUser.CurrentClass.ClassTeacher?.UserId
                    });

                    await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
                    notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();
                }

                // For Admin
                notificationAc.NotificationDetails = string.Format("New {0} request from {1} of class {2}",
                        leaveType.Name, studentUser.FirstName, studentUser.CurrentClass.Name);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = studentUser.Institute.AdminId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
            }
        }

        /// <summary>
        /// Method for sending bell botification for staffs' leaves - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <param name="leaveTypeId"></param>
        /// <param name="leaveForStaffId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        private async Task SendBellNotificationsForStaffssLeavesAsync(ApplicationUser currentUser, int leaveTypeId, int leaveForStaffId, int instituteId)
        {
            StaffBasicPersonalInformation staffUser = await _iMSDbContext.StaffBasicPersonalInformation
                .Include(x => x.User)
                .Include(x => x.Institute)
                .FirstOrDefaultAsync(x => x.UserId == currentUser.Id);

            LeaveType leaveType = await _iMSDbContext.LeaveTypes.FirstAsync(x => x.Id == leaveTypeId);
            StaffBasicPersonalInformation leaveForStaff = (await _iMSDbContext.StaffBasicPersonalInformation
                .Include(x => x.User)
                .Include(x => x.Institute)
                .FirstAsync(x => x.Id == leaveForStaffId));

            NotificationAc notificationAc = new NotificationAc
            {
                NotificationMessage = leaveType.Name,
                NotificationTo = null,
                NotificationUserMappingsList = new List<NotificationUserMappingAc>()
            };

            // Created by the admin
            if (staffUser == null)
            {
                // For Staff
                notificationAc.NotificationDetails = string.Format("Your {0} has been applied successfully", leaveType.Name);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = leaveForStaff.UserId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();
            }
            // Created by the Staff
            else
            {
                // For Staff
                notificationAc.NotificationDetails = string.Format("Your {0} has been applied successfully", leaveType.Name);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = staffUser.UserId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
                notificationAc.NotificationUserMappingsList = new List<NotificationUserMappingAc>();

                // For Admin
                notificationAc.NotificationDetails = string.Format("New {0} request from {1}", leaveType.Name, staffUser.FirstName);
                notificationAc.NotificationUserMappingsList.Add(new NotificationUserMappingAc
                {
                    UserId = staffUser.Institute.AdminId
                });

                await _notificationManagementRepository.AddNotificationAsync(notificationAc, instituteId, currentUser);
            }
        }

        #endregion
    }
}
