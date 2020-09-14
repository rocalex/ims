using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.ApplicationClasses.StudentAttendanceManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteWeekOffManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.StudentAttendanceManagement
{
    public class StudentAttendanceManagementRepository : IStudentAttendanceManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteWeekOffManagementRepository _instituteWeekOffManagementRepository;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public StudentAttendanceManagementRepository(IMSDbContext iMSDbContext, IInstituteWeekOffManagementRepository
            instituteWeekOffManagementRepository, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteWeekOffManagementRepository = instituteWeekOffManagementRepository;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add or update attendance - SS
        /// </summary>
        /// <param name="studentAttendances">student attendance detail</param>
        /// <param name="loggedInUser">logged in user</param>
        public async Task AddStudentAttendanceAsync(AddStudentAttendanceManagementWrapperAc studentAttendances, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var academicYear = await _iMSDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.InstituteId == instituteId && x.IsActive);
            List<StudentAttendance> toBeDeleted = new List<StudentAttendance>();
            List<StudentAttendance> toBeAdded = new List<StudentAttendance>();
            foreach (var attendance in studentAttendances.Students)
            {
                toBeDeleted.AddRange(await _iMSDbContext.StudentAttendances.Where(x => x.StudentId == attendance.StudentId
                && x.AttendanceDate >= attendance.AttendanceDates.First() && x.AttendanceDate <= attendance.AttendanceDates.Last()
                && x.PeriodOrderId == studentAttendances.PeriodOrderId).ToListAsync());
                for (int i = 0; i < attendance.AttendanceDates.Count; i++)
                {
                    toBeAdded.Add(new StudentAttendance()
                    {
                        AttendanceDate = attendance.AttendanceDates[i],
                        AttendanceType = EnumHelperService.GetValueFromDescription<AttendanceType>(attendance.AttendanceType[i]),
                        CreatedOn = DateTime.UtcNow,
                        StudentId = attendance.StudentId,
                        PeriodOrderId = studentAttendances.PeriodOrderId,
                        UpdatedById = loggedInUser.Id,
                        UpdatedOn = DateTime.UtcNow,
                        AcademicYearId = academicYear?.Id
                    });
                }
            }
            _iMSDbContext.StudentAttendances.RemoveRange(toBeDeleted);
            _iMSDbContext.StudentAttendances.AddRange(toBeAdded);
            await _iMSDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method to get student details - SS
        /// </summary>
        /// <param name="getStudentAttendance">query data</param>
        /// <returns>list of student attendance</returns>
        public async Task<List<StudentAttendance>> GetStudentAttendanceAsync(GetStudentAttendanceManagementAc getStudentAttendance, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.AcademicYear.InstituteId == instituteId 
            && x.UserId == loggedInUser.Id);
            var attendances = await _iMSDbContext.StudentAttendances.Where(x => x.AttendanceDate >= getStudentAttendance.StartDate
            && x.AttendanceDate <= getStudentAttendance.EndDate && x.Student.CurrentClassId == getStudentAttendance.ClassId
            && x.Student.SectionId == getStudentAttendance.SectionId && x.PeriodOrderId == getStudentAttendance.PeriodOrderId).ToListAsync();
            if (academicYear != null)
                attendances = attendances.Where(x => x.AcademicYearId == academicYear.AcademicYearId).ToList();
            attendances.ForEach(x => x.AttendanceTypeDescription = EnumHelperService.GetDescription(x.AttendanceType));
            return attendances;
        }

        /// <summary>
        /// Method to get current academic year week off - SS
        /// </summary>
        /// <param name="applicationUser">logged in user</param>
        /// <returns>list of week off</returns>
        public async Task<List<InstituteWeekOffAc>> GetWeekOffsByCurrentAcademicYearIdAsync(ApplicationUser applicationUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(applicationUser.Id, true);
            var currentAcademicYear = await _iMSDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.InstituteId == instituteId && x.IsActive);
            if (currentAcademicYear != null)
                return await _instituteWeekOffManagementRepository.GetWeekOffsByAcademicYearIdAsync(currentAcademicYear.Id, applicationUser);
            else
                return new List<InstituteWeekOffAc>();
        }

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var institutes = await _iMSDbContext.Institutes.ToListAsync();
            foreach (var institute in institutes)
            {
                var academicYear = await _iMSDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.IsActive && x.InstituteId == institute.Id);
                var attendances = await _iMSDbContext.StudentAttendances.Where(x => x.Student.InstituteId == institute.Id).ToListAsync();
                attendances.ForEach(x =>
                {
                    if (x.AcademicYearId == null)
                        x.AcademicYearId = academicYear?.Id;
                });
                _iMSDbContext.StudentAttendances.UpdateRange(attendances);
                await _iMSDbContext.SaveChangesAsync();
            }
        }
        #endregion
    }
}
