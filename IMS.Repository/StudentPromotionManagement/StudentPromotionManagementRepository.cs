using IMS.DomainModel.ApplicationClasses.StudentPromotionManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.StudentPromotionManagement
{
    public class StudentPromotionManagementRepository : IStudentPromotionManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public StudentPromotionManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add student promotion - SS
        /// </summary>
        /// <param name="addStudentPromotions">student detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<StudentPromotionManagementResponse> AddStudentPromotionAsync(List<AddStudentPromotionManagementAc>
            addStudentPromotions, ApplicationUser loggedInUser)
        {
            List<StudentPromotionMapping> studentPromotions = new List<StudentPromotionMapping>();
            var studentIds = addStudentPromotions.Select(x => x.StudentId).ToList();
            var students = await _iMSDbContext.StudentBasicInformation.Where(x => studentIds.Contains(x.Id)).ToListAsync();
            foreach (var student in addStudentPromotions)
            {
                var basicStudent = students.First(x => x.Id == student.StudentId);
                studentPromotions.Add(new StudentPromotionMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    CurrentClassId = student.CurrentClassId,
                    CurrentSectionId = student.CurrentSectionId,
                    PromotedToClassId = student.PromotedToClassId,
                    PromotedToSectionId = student.PromotedToSectionId,
                    Remark = student.Remark,
                    StudentId = student.StudentId,
                    UpdatedById = loggedInUser.Id,
                    UpdatedOn = DateTime.UtcNow
                });
                basicStudent.CurrentClassId = student.PromotedToClassId;
                basicStudent.SectionId = student.PromotedToSectionId;
            }
            if(studentPromotions.Count != 0)
            {
                _iMSDbContext.StudentPromotionMappings.AddRange(studentPromotions);
                _iMSDbContext.StudentBasicInformation.UpdateRange(students);
                await _iMSDbContext.SaveChangesAsync();
            }
            return new StudentPromotionManagementResponse() { HasError = false, Message = "Student detail updated successfully" };
        }

        /// <summary>
        /// Method to get list of student promotion - SS
        /// </summary>
        /// <param name="loggedInUser">loggedInUser</param>
        /// <returns>list of promoted student</returns>
        public async Task<List<StudentPromotionMapping>> GetAllStudentPromotionAsync(ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var academicYear = await _iMSDbContext.SelectedAcademicYears.FirstOrDefaultAsync(x => x.UserId == loggedInUser.Id
            && x.AcademicYear.InstituteId == instituteId);
            var list = (await _iMSDbContext.StudentPromotionMappings.Include(a => a.Student).Include(a => a.CurrentClass)
                .Include(a => a.CurrentSection).Include(a => a.PromotedToClass).Include(a => a.PromotedToSection)
                .Where(x => x.Student.InstituteId == instituteId).ToListAsync());
            if (academicYear != null)
                list = list.Where(x => x.Student.CurrentAcademicYearId == academicYear.AcademicYearId).ToList();
            return list;
        }

        /// <summary>
        /// Method to update student promotion - SS
        /// </summary>
        /// <param name="updateStudentPromotion">student detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>respose</returns>
        public async Task<StudentPromotionManagementResponse> UpdateStudentPromotionAsync(UpdateStudentPromotionManagementAc 
            updateStudentPromotion, ApplicationUser loggedInUser)
        {
            var student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.Id == updateStudentPromotion.StudentId);
            if (student != null)
            {
                var promotion = await _iMSDbContext.StudentPromotionMappings.FirstOrDefaultAsync(x => x.Id == updateStudentPromotion.Id);
                if(promotion == null)
                    return new StudentPromotionManagementResponse() { HasError = true, Message = "Student not found", ErrorType = StudentPromotionManagementResponseType.StudentId };
                else
                {
                    student.CurrentClassId = updateStudentPromotion.PromotedToClassId;
                    student.SectionId = updateStudentPromotion.PromotedToSectionId;
                    promotion.PromotedToClassId = updateStudentPromotion.PromotedToClassId;
                    promotion.PromotedToSectionId = updateStudentPromotion.PromotedToSectionId;
                    promotion.UpdatedById = loggedInUser.Id;
                    promotion.UpdatedOn = DateTime.UtcNow;
                    promotion.Remark = updateStudentPromotion.Remark;
                    _iMSDbContext.StudentBasicInformation.Update(student);
                    _iMSDbContext.StudentPromotionMappings.Update(promotion);
                    await _iMSDbContext.SaveChangesAsync();
                    return new StudentPromotionManagementResponse() { HasError = false, Message = "Student detail updated successfully" };
                }
            }
            else
                return new StudentPromotionManagementResponse() { HasError = true, Message = "Student not found", ErrorType = StudentPromotionManagementResponseType.StudentId };
        }
        #endregion
    }
}
