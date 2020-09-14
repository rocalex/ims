using IMS.DomainModel.ApplicationClasses.StudentFeeManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IMS.Repository.StudentFeeManagement
{
    public class StudentFeeManagementRepository : IStudentFeeManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        #endregion

        #region Constructor
        public StudentFeeManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to update student fee - SS
        /// </summary>
        /// <param name="studentFeeComponents">student fee components</param>
        /// <param name="studentFeeId">student fee id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<StudentFeeResponse> UpdateStudentFeeAsync(List<StudentFeeComponent> studentFeeComponents, int studentFeeId, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var studentFee = await _iMSDbContext.StudentFees.FirstOrDefaultAsync(x => x.Id == studentFeeId && x.Student.InstituteId == instituteId);
            if (studentFee == null)
                return new StudentFeeResponse() { HasError = true, Message = "Student not found" };
            else
            {
                studentFee.UpdatedById = loggedInUser.Id;
                studentFee.UpdatedOn = DateTime.UtcNow;
                _iMSDbContext.StudentFees.Update(studentFee);
                _iMSDbContext.StudentFeeComponents.UpdateRange(studentFeeComponents);
                await _iMSDbContext.SaveChangesAsync();
                return new StudentFeeResponse() { HasError = false, Message = "Student fee detail updated successfully" };
            }
        }

        /// <summary>
        /// Method to get student fee detail - SS
        /// </summary>
        /// <param name="studentId">student id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<StudentFeeResponse> GetStudentFeeAsync(int studentId, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            var student = await _iMSDbContext.StudentBasicInformation.FirstOrDefaultAsync(x => x.Id == studentId && x.InstituteId == instituteId);
            if (student == null)
                return new StudentFeeResponse() { HasError = true, Message = "Student not found" };
            else
            {
                var studentFee = await _iMSDbContext.StudentFees.FirstOrDefaultAsync(x => x.StudentId == studentId && x.ClassId == student.CurrentClassId);
                if (studentFee == null)
                {
                    studentFee = new StudentFee() { CreatedOn = DateTime.UtcNow, ClassId = student.CurrentClassId, StudentId = studentId, UpdatedById = loggedInUser.Id, UpdatedOn = DateTime.UtcNow };
                    _iMSDbContext.StudentFees.Add(studentFee);
                    await _iMSDbContext.SaveChangesAsync();
                }
                await SeedDataForStudentFeeAsync(studentFee.Id);
                studentFee = await _iMSDbContext.StudentFees.Include(s => s.Student).Include(s => s.StudentFeeComponents).FirstAsync(x => x.Id == studentFee.Id);
                var components = await _iMSDbContext.FeeComponents.Where(x => x.FeeComponentType == FeeComponentTypeEnum.Individual
                || x.FeeComponentType == FeeComponentTypeEnum.Deduction).ToListAsync();
                return new StudentFeeResponse()
                {
                    HasError = false,
                    Data = new
                    {
                        StudentFee = studentFee,
                        Discount = components.Where(x => x.FeeComponentType == FeeComponentTypeEnum.Deduction).ToList(),
                        Individual = components.Where(x => x.FeeComponentType == FeeComponentTypeEnum.Individual).ToList(),
                    }
                };
            }
        }
        #endregion

        #region Private Method(s)
        /// <summary>
        /// Method to seed data for student fee component - SS
        /// </summary>
        /// <param name="studentFeeId">student fee id</param>
        /// <returns></returns>
        private async Task SeedDataForStudentFeeAsync(int studentFeeId)
        {
            await semaphore.WaitAsync();
            try
            {
                var studentFee = await _iMSDbContext.StudentFees.Include(s => s.Class).Include(s => s.StudentFeeComponents).FirstAsync(x => x.Id == studentFeeId);
                var components = await _iMSDbContext.FeeComponents.Where(x => x.FeeComponentType == FeeComponentTypeEnum.Individual
                || x.FeeComponentType == FeeComponentTypeEnum.Deduction).ToListAsync();
                List<StudentFeeComponent> studentFeeComponents = new List<StudentFeeComponent>();
                foreach (var component in components)
                {
                    for (int term = 1; term <= studentFee.Class.NumberOfFeeTerms; term++)
                    {
                        if (!studentFee.StudentFeeComponents.Any(x => x.IndividualOrDiscountFeeComponentId == component.Id && x.TermOrderId == term))
                        {
                            studentFeeComponents.Add(new StudentFeeComponent()
                            {
                                Amount = 0.0,
                                CreatedOn = DateTime.UtcNow,
                                IndividualOrDiscountFeeComponentId = component.Id,
                                StudentFeeId = studentFeeId,
                                TermOrderId = term
                            });
                        }
                    }
                }
                if (studentFeeComponents.Count != 0)
                {
                    _iMSDbContext.StudentFeeComponents.AddRange(studentFeeComponents);
                    await _iMSDbContext.SaveChangesAsync();
                }
            }
            finally
            {
                semaphore.Release();
            }
        }
        #endregion
    }
}