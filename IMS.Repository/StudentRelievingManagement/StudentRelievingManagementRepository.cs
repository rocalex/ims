using IMS.DomainModel.ApplicationClasses.StudentRelievingManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.StudentRelievingManagement
{
    public class StudentRelievingManagementRepository : IStudentRelievingManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public StudentRelievingManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add bulk student relieving details
        /// </summary>
        /// <param name="addStudentRelievings">student detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<StudentRelievingManagementResponse> AddStudentRelievingAsync(List<AddStudentRelievingManagementAc> addStudentRelievings, ApplicationUser loggedInUser)
        {
            List<StudentRelievingMapping> studentRelievingMappings = new List<StudentRelievingMapping>();
            foreach (var addStudentRelieving in addStudentRelievings)
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                studentRelievingMappings.Add(new StudentRelievingMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    Reason = addStudentRelieving.Reason,
                    RelievingDate = addStudentRelieving.RelievingDate,
                    StudentId = addStudentRelieving.StudentId,
                    StudentRelieving = EnumHelperService.GetValueFromDescription<StudentRelievingEnum>(addStudentRelieving.StudentRelieving),
                    UpdatedById = loggedInUser.Id,
                    UpdatedOn = DateTime.UtcNow
                });
            }
            _iMSDbContext.StudentRelievingMappings.AddRange(studentRelievingMappings);
            await _iMSDbContext.SaveChangesAsync();
            return new StudentRelievingManagementResponse() { Message = "Student details updated successfully", HasError = false };
        }

        /// <summary>
        /// Method to get all student from relieving table - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of student</returns>
        public async Task<List<StudentRelievingMapping>> GetAllStudentRelievingMappingsAsync(ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == loggedInUser.Id
            && x.AcademicYear.InstituteId == instituteId);
            var list = await _iMSDbContext.StudentRelievingMappings.Include(s=>s.Student).Where(x => x.Student.InstituteId == instituteId).ToListAsync();
            list.ForEach(x => x.StudentRelievingDescription = EnumHelperService.GetDescription(x.StudentRelieving));
            if (academicYear != null)
                list = list.Where(x => x.Student.CurrentAcademicYearId == academicYear.AcademicYearId).ToList();
            return list;
        }

        /// <summary>
        /// Method to update student relieving detail - SS
        /// </summary>
        /// <param name="updateStudentRelievings">updated detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<StudentRelievingManagementResponse> UpdateStudentRelievingAsync(UpdateStudentRelievingManagementAc updateStudentRelievings, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var student = await _iMSDbContext.StudentRelievingMappings.FirstOrDefaultAsync(x => x.Id == updateStudentRelievings.Id && x.Student.InstituteId == instituteId);
            if (student == null)
                return new StudentRelievingManagementResponse() { HasError = true, ErrorType = StudentRelievingManagementResponseType.StudentId, Message = "Student not found" };
            else
            {
                student.Reason = updateStudentRelievings.Reason;
                student.RelievingDate = updateStudentRelievings.RelievingDate;
                student.StudentRelieving = EnumHelperService.GetValueFromDescription<StudentRelievingEnum>(updateStudentRelievings.StudentRelieving);
                student.UpdatedOn = DateTime.UtcNow;
                student.UpdatedById = loggedInUser.Id;
                _iMSDbContext.StudentRelievingMappings.Update(student);
                await _iMSDbContext.SaveChangesAsync();
                return new StudentRelievingManagementResponse() { HasError = false, Message = "Student details updated successfully" };
            }
        }
        #endregion
    }
}
