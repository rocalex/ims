using IMS.DomainModel.ApplicationClasses.FeeManagement;
using IMS.DomainModel.ApplicationClasses.StudentFeeManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using IMS.Utility.ExcelHelper;
using IMS.Utility.PdfHelper;
using Microsoft.EntityFrameworkCore;
using RazorLight;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.FeeManagement
{
    public class FeeManagementRepository : IFeeManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public FeeManagementRepository(IMSDbContext imsDbContext)
        {
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public methods

        #region Fee Component

        /// <summary>
        /// Method for fetching the list of all fee components - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<FeeComponent>> GetAllFeeComponentsAsync(int currentUserInstituteId)
        {
            return await _imsDbContext.FeeComponents.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
        }

        /// <summary>
        /// Method for fetching the details of a fee component by id - RS
        /// </summary>
        /// <param name="feeComponentId"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<FeeComponent> GetFeeComponentByIdAsync(int feeComponentId, int currentUserInstituteId)
        {
            return await _imsDbContext.FeeComponents.FirstOrDefaultAsync(x => x.Id == feeComponentId && x.InstituteId == currentUserInstituteId);
        }

        /// <summary>
        /// Method for adding new fee component - RS
        /// </summary>
        /// <param name="addedFeeComponent"></param>
        /// <param name="currentUser"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<dynamic> AddNewFeeComponentAsync(FeeComponent addedFeeComponent, ApplicationUser currentUser, int currentUserInstituteId)
        {
            if (await _imsDbContext.FeeComponents.AnyAsync(x => x.InstituteId == currentUserInstituteId && x.Name.ToLowerInvariant().Equals(addedFeeComponent.Name.ToLowerInvariant())))
            {
                return new { Message = "Fee Component already exist with this name", HasError = true };
            }
            else if(await _imsDbContext.FeeComponents.AnyAsync(x => x.InstituteId == currentUserInstituteId && x.Priority == addedFeeComponent.Priority && addedFeeComponent.Priority != 0))
            {
                return new { DuplicatePriorityMessage = "Fee Component already exist with this priority", HasError = true };
            }

            addedFeeComponent.InstituteId = currentUserInstituteId;
            addedFeeComponent.CreatedBy = currentUser.Id;
            addedFeeComponent.CreatedOn = DateTime.UtcNow;
            _imsDbContext.FeeComponents.Add(addedFeeComponent);
            await _imsDbContext.SaveChangesAsync();
            return new { Message = "Fee Component added successfully", HasError = false };
        }

        /// <summary>
        /// Method for updating an existing fee component - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedFeeComponent"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateFeeComponentAsync(int currentUserInstituteId, FeeComponent updatedFeeComponent)
        {
            FeeComponent existingFeeComponent = await _imsDbContext.FeeComponents.FirstOrDefaultAsync(x => x.Id == updatedFeeComponent.Id && x.InstituteId == currentUserInstituteId);

            if (existingFeeComponent == null)
            {
                return new { Message = "No fee component found with this id", HasError = true };
            }
            else if (await _imsDbContext.FeeComponents.AnyAsync(x => x.Id != updatedFeeComponent.Id && x.Name.ToLowerInvariant().Equals(updatedFeeComponent.Name.ToLower())))
            {
                return new { Message = "Fee Component already exist with this name", HasError = true };
            }
            else if (await _imsDbContext.FeeComponents.AnyAsync(x => x.Id != updatedFeeComponent.Id && x.InstituteId == currentUserInstituteId 
                && x.Priority == updatedFeeComponent.Priority && updatedFeeComponent.Priority != 0))
            {
                return new { DuplicatePriorityMessage = "Fee Component already exist with this priority", HasError = true };
            }

            existingFeeComponent.Name = updatedFeeComponent.Name;
            existingFeeComponent.FeeComponentType = updatedFeeComponent.FeeComponentType;
            existingFeeComponent.Priority = updatedFeeComponent.Priority;
            _imsDbContext.FeeComponents.Update(existingFeeComponent);
            await _imsDbContext.SaveChangesAsync();
            return new { Message = "Fee Component updated successfully", HasError = false };
        }

        #endregion

        #region Course Fee Terms

        /// <summary>
        /// Method for fetching the list of all institute classes for course fee terms - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<InstituteClass>> GetClassListForCourseFeeTermsAsync(int currentUserInstituteId)
        {
            return await _imsDbContext.InstituteClasses.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
        }

        /// <summary>
        /// Method for fetching the details of course fee term - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="courseFeeTermId"></param>
        /// <param name="termNumber"></param>
        /// <returns></returns>
        public async Task<List<CourseFeeTermDetailsAc>> GetDistributedFeeStructureAsync(int currentUserInstituteId, int courseFeeTermId, int termNumber)
        {
            List<CourseFeeTermDetails> courseFeeTermDetailsList = await _imsDbContext.CourseFeeTermDetails
                .Include(x => x.CourseFeeTerm)
                .Where(x => x.CourseFeeTermId == courseFeeTermId && x.CourseFeeTerm.InstituteId == currentUserInstituteId)
                .ToListAsync();

            courseFeeTermDetailsList = courseFeeTermDetailsList.Where(x => x.Term == termNumber).ToList();

            List<FeeComponent> feeComponentsList = await _imsDbContext.FeeComponents
                .Where(x => x.InstituteId == currentUserInstituteId && x.FeeComponentType == FeeComponentTypeEnum.ApplicableToAll)
                .ToListAsync();
            List<CourseFeeTermDetailsAc> courseFeeTermDetailsAcList = new List<CourseFeeTermDetailsAc>();

            foreach (FeeComponent feeComponent in feeComponentsList)
            {
                CourseFeeTermDetails existingDetail = courseFeeTermDetailsList.FirstOrDefault(x => x.FeeComponentId == feeComponent.Id);
                courseFeeTermDetailsAcList.Add(new CourseFeeTermDetailsAc
                {
                    Id = (existingDetail == null) ? 0 : existingDetail.Id,
                    Amount = (existingDetail == null) ? 0 : existingDetail.Amount,
                    CourseFeeTermId = (existingDetail == null) ? 0 : existingDetail.CourseFeeTermId,
                    FeeComponentId = feeComponent.Id,
                    FeeComponentName = feeComponent.Name,
                    Term = termNumber
                });
            }

            return courseFeeTermDetailsAcList;
        }

        /// <summary>
        /// Method for adding or updating course fee terms - RS
        /// </summary>
        /// <param name="courseFeeTermAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddOrUpdateCourseFeeTermsAsync(AddCourseFeeTermAc addCourseFeeTermAc, int currentUserInstituteId, ApplicationUser currentUser)
        {
            if (addCourseFeeTermAc.CourseFeeTermAc.Id == 0)
            {
                return await AddCourseFeeTermsAsync(addCourseFeeTermAc, currentUserInstituteId, currentUser);
            }
            else
            {
                return await UpdateCourseFeeTermsAsync(addCourseFeeTermAc, currentUserInstituteId, currentUser);
            }
        }

        #endregion

        #region Student Fee Report

        /// <summary>
        /// Method for generating the student fee report - RS
        /// </summary>
        /// <param name="feeManagementReportQueryAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<FeeManagementReportResponseAc> GenerateStudentFeeReportAsync(FeeManagementReportQueryAc feeManagementReportQueryAc, int currentUserInstituteId)
        {
            if (feeManagementReportQueryAc.StudentId != 0)
            {
                #region Set pdf data

                List<StudentFeeExcelReportAc> studentFeeExcelReportAcList = await GetStudentFeeDetailsForReportAsync(feeManagementReportQueryAc, currentUserInstituteId);
                StudentFeePdfReportAc studentFeePdfReportAc = new StudentFeePdfReportAc
                {
                    RollNumber = studentFeeExcelReportAcList.First().RollNumber,
                    AdmissionNumber = studentFeeExcelReportAcList.First().AdmissionNumber,
                    FirstName = studentFeeExcelReportAcList.First().FirstName,
                    LastName = studentFeeExcelReportAcList.First().LastName,
                    CurrentClass = studentFeeExcelReportAcList.First().CurrentClass,
                    Section = studentFeeExcelReportAcList.First().Section,
                    Religion = studentFeeExcelReportAcList.First().Religion,
                    IsActive = studentFeeExcelReportAcList.First().IsActive,
                    IsArchived = studentFeeExcelReportAcList.First().IsArchived
                };

                studentFeePdfReportAc.PaymentDetails = new List<StudentFeeExcelReportAc>();
                foreach (StudentFeeExcelReportAc studentFeeExcelReportAc in studentFeeExcelReportAcList)
                {
                    studentFeePdfReportAc.PaymentDetails.Add(new StudentFeeExcelReportAc
                    {
                        FeeComponentType = studentFeeExcelReportAc.FeeComponentType,
                        FeeComponent = studentFeeExcelReportAc.FeeComponent,
                        Term = studentFeeExcelReportAc.Term,
                        Amount = studentFeeExcelReportAc.Amount,
                        PaymentDate = studentFeeExcelReportAc.PaymentDate
                    });
                }

                #endregion

                #region Generate pdf

                string path = Path.Combine(Directory.GetCurrentDirectory(), "Views", "Home");
                RazorLightEngine engine = new RazorLightEngineBuilder().UseFilesystemProject(path).UseMemoryCachingProvider().Build();
                string resultFromFile = engine.CompileRenderAsync("StudentFeeReceiptPdf.cshtml", studentFeePdfReportAc).Result;

                string fileName = "Fee_Receipt_" + studentFeePdfReportAc.FirstName + "_" + DateTime.Now.Day.ToString("00") + "_" + DateTime.Now.Month.ToString("00") + "_" + DateTime.Now.Year.ToString("0000") + ".pdf";
                return new FeeManagementReportResponseAc
                {
                    FileName = fileName,
                    ResponseType = "application/pdf",
                    //FileByteArray = PdfHelperService.GeneratePdfFromHtml(resultFromFile, "Reports", fileName)
                    PdfHtmlString = resultFromFile
                };

                #endregion
            }
            else
            {
                List<StudentFeeExcelReportAc> studentFeeExcelReportAcList = await GetStudentFeeDetailsForReportAsync(feeManagementReportQueryAc, currentUserInstituteId);

                #region Generate file

                string fileName = "Fee_Report_" + DateTime.Now.Day.ToString("00") + "_" + DateTime.Now.Month.ToString("00") + "_" + DateTime.Now.Year.ToString("0000") + ".xlsx";
                return new FeeManagementReportResponseAc
                {
                    FileName = fileName,
                    ResponseType = "application/ms-excel",
                    FileByteArray = ExcelHelperService.GenerateExcelFromList(studentFeeExcelReportAcList, string.Empty)
                };

                #endregion
            }
        }

        #endregion

        #endregion

        #region Private methods

        /// <summary>
        /// Method for adding new course fee terms entry - RS
        /// </summary>
        /// <param name="addCourseFeeTermAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        private async Task<dynamic> AddCourseFeeTermsAsync(AddCourseFeeTermAc addCourseFeeTermAc, int currentUserInstituteId, ApplicationUser currentUser)
        {
            #region Add Course Fee Term

            CourseFeeTerm courseFeeTerm = new CourseFeeTerm
            {
                ClassId = addCourseFeeTermAc.CourseFeeTermAc.ClassId,
                AcademicYearId = addCourseFeeTermAc.CourseFeeTermAc.AcademicYearId,
                ReligionId = addCourseFeeTermAc.CourseFeeTermAc.ReligionId,
                LateFee = addCourseFeeTermAc.CourseFeeTermAc.LateFee,
                DueDate = addCourseFeeTermAc.CourseFeeTermAc.DueDate,
                InstituteId = currentUserInstituteId,
                CreatedBy = currentUser.Id,
                CreatedOn = DateTime.UtcNow
            };
            _imsDbContext.CourseFeeTerms.Add(courseFeeTerm);
            await _imsDbContext.SaveChangesAsync();

            #endregion

            #region Add Course Fee Term Details

            await AddCourseFeeDetailsAsync(addCourseFeeTermAc, courseFeeTerm.Id, currentUser);

            #endregion

            return new { Message = "Course fee term added successfully", HasError = false };
        }

        /// <summary>
        /// Method for updating existing course fee terms entry - RS
        /// </summary>
        /// <param name="addCourseFeeTermAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        private async Task<dynamic> UpdateCourseFeeTermsAsync(AddCourseFeeTermAc addCourseFeeTermAc, int currentUserInstituteId, ApplicationUser currentUser)
        {
            #region Update Course Fee Term

            CourseFeeTerm existingCourseFeeTerm = await _imsDbContext.CourseFeeTerms
                .FirstOrDefaultAsync(x => x.Id == addCourseFeeTermAc.CourseFeeTermAc.Id && x.InstituteId == currentUserInstituteId && x.AcademicYearId == addCourseFeeTermAc.CourseFeeTermAc.AcademicYearId);

            if (existingCourseFeeTerm == null)
            {
                return new { Message = "No course fee term entry found with this id", HasError = true };
            }

            existingCourseFeeTerm.ReligionId = addCourseFeeTermAc.CourseFeeTermAc.ReligionId;
            existingCourseFeeTerm.AcademicYearId = addCourseFeeTermAc.CourseFeeTermAc.AcademicYearId;
            existingCourseFeeTerm.ClassId = addCourseFeeTermAc.CourseFeeTermAc.ClassId;
            existingCourseFeeTerm.DueDate = addCourseFeeTermAc.CourseFeeTermAc.DueDate;
            existingCourseFeeTerm.LateFee = addCourseFeeTermAc.CourseFeeTermAc.LateFee;
            _imsDbContext.CourseFeeTerms.Update(existingCourseFeeTerm);
            await _imsDbContext.SaveChangesAsync();

            #endregion

            #region Update Course Fee Term Details

            List<CourseFeeTermDetails> existingCourseFeeTermDetailsList = await _imsDbContext.CourseFeeTermDetails
                .Where(x => x.CourseFeeTermId == existingCourseFeeTerm.Id && x.CourseFeeTerm.AcademicYearId == addCourseFeeTermAc.CourseFeeTermAc.AcademicYearId)
                .ToListAsync();
            if (addCourseFeeTermAc.Term != 0)
            {
                existingCourseFeeTermDetailsList = existingCourseFeeTermDetailsList.Where(x => x.Term == addCourseFeeTermAc.Term).ToList();
            }
            _imsDbContext.CourseFeeTermDetails.RemoveRange(existingCourseFeeTermDetailsList);
            await _imsDbContext.SaveChangesAsync();
            await AddCourseFeeDetailsAsync(addCourseFeeTermAc, existingCourseFeeTerm.Id, currentUser);

            #endregion

            return new { Message = "Course fee term entry updated successfully", HasError = false };
        }

        /// <summary>
        /// Method for adding course fee details - RS
        /// </summary>
        /// <param name="addCourseFeeTermAc"></param>
        /// <param name="courseFeeTermId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        private async Task AddCourseFeeDetailsAsync(AddCourseFeeTermAc addCourseFeeTermAc, int courseFeeTermId, ApplicationUser currentUser)
        {
            List<CourseFeeTermDetails> courseFeeTermDetailsList = new List<CourseFeeTermDetails>();
            InstituteClass instituteClass = await _imsDbContext.InstituteClasses.FirstAsync(x => x.Id == addCourseFeeTermAc.CourseFeeTermAc.ClassId);
            foreach (CourseFeeTermDetailsAc courseFeeTermDetailsAc in addCourseFeeTermAc.CourseFeeTermDetailsList)
            {
                if (addCourseFeeTermAc.Term != 0)
                {
                    courseFeeTermDetailsList.Add(new CourseFeeTermDetails
                    {
                        CourseFeeTermId = courseFeeTermId,
                        FeeComponentId = courseFeeTermDetailsAc.FeeComponentId,
                        Amount = courseFeeTermDetailsAc.Amount,
                        Term = addCourseFeeTermAc.Term,
                        CreatedBy = currentUser.Id,
                        CreatedOn = DateTime.UtcNow
                    });
                }
                else
                {
                    for (int i = 0; i < instituteClass.NumberOfFeeTerms; i++)
                    {
                        courseFeeTermDetailsList.Add(new CourseFeeTermDetails
                        {
                            CourseFeeTermId = courseFeeTermId,
                            FeeComponentId = courseFeeTermDetailsAc.FeeComponentId,
                            Amount = courseFeeTermDetailsAc.Amount,
                            Term = i + 1,
                            CreatedBy = currentUser.Id,
                            CreatedOn = DateTime.UtcNow
                        });
                    }
                }
            }
            _imsDbContext.CourseFeeTermDetails.AddRange(courseFeeTermDetailsList);
            await _imsDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method for fetching the student fee details for generating the reports - RS
        /// </summary>
        /// <param name="feeManagementReportQueryAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        private async Task<List<StudentFeeExcelReportAc>> GetStudentFeeDetailsForReportAsync(FeeManagementReportQueryAc feeManagementReportQueryAc, int currentUserInstituteId)
        {
            List<StudentFeeExcelReportAc> studentFeeExcelReportAcList = new List<StudentFeeExcelReportAc>();

            List<StudentBasicInformation> studentsList = await _imsDbContext.StudentBasicInformation
                .Include(x => x.Religion)
                .Include(x => x.CurrentClass)
                .Include(x => x.SectionMap)
                .Where(x => x.InstituteId == currentUserInstituteId)
                .ToListAsync();

            List<StudentFeeComponent> studentFeeComponentList = await _imsDbContext.StudentFeeComponents
                .Include(x => x.IndividualOrDiscountFeeComponent)
                .Include(x => x.StudentFee)
                .ThenInclude(x => x.StudentFeeComponents)
                .ToListAsync();

            #region Apply queries

            if (feeManagementReportQueryAc.ReligionId != 0)
            {
                studentsList = studentsList.Where(x => x.ReligionId == feeManagementReportQueryAc.ReligionId).ToList();
            }
            if (feeManagementReportQueryAc.ClassId != 0)
            {
                studentsList = studentsList.Where(x => x.CurrentClassId == feeManagementReportQueryAc.ClassId).ToList();
            }
            if (feeManagementReportQueryAc.SectionId != 0)
            {
                studentsList = studentsList.Where(x => x.SectionId == feeManagementReportQueryAc.SectionId).ToList();
            }
            if (feeManagementReportQueryAc.StudentId != 0)
            {
                studentsList = studentsList.Where(x => x.Id == feeManagementReportQueryAc.StudentId).ToList();
            }

            #endregion

            foreach (StudentBasicInformation studentBasicInformation in studentsList)
            {
                if (studentFeeComponentList.Count == 0)
                {
                    studentFeeExcelReportAcList.Add(new StudentFeeExcelReportAc
                    {
                        AdmissionNumber = studentBasicInformation.AdmissionNumber,
                        RollNumber = studentBasicInformation.RollNumber,
                        FirstName = studentBasicInformation.FirstName,
                        LastName = studentBasicInformation.LastName,
                        IsActive = studentBasicInformation.IsActive.ToString(),
                        IsArchived = studentBasicInformation.IsArchived.ToString(),
                        CurrentClass = studentBasicInformation.CurrentClass?.Name,
                        Section = studentBasicInformation.SectionMap?.Name,
                        Religion = studentBasicInformation.Religion?.Name
                    });
                }
                else
                {
                    foreach (StudentFeeComponent studentFeeComponent in studentFeeComponentList)
                    {
                        if (studentFeeComponent.StudentFee.StudentId == studentBasicInformation.Id)
                        {
                            studentFeeExcelReportAcList.Add(new StudentFeeExcelReportAc
                            {
                                AdmissionNumber = studentBasicInformation.AdmissionNumber,
                                RollNumber = studentBasicInformation.RollNumber,
                                FirstName = studentBasicInformation.FirstName,
                                LastName = studentBasicInformation.LastName,
                                IsActive = studentBasicInformation.IsActive.ToString(),
                                IsArchived = studentBasicInformation.IsArchived.ToString(),
                                CurrentClass = studentBasicInformation.CurrentClass?.Name,
                                Section = studentBasicInformation.SectionMap?.Name,
                                Religion = studentBasicInformation.Religion?.Name,
                                FeeComponent = studentFeeComponent.IndividualOrDiscountFeeComponent.Name,
                                FeeComponentType = EnumHelperService.GetDescription(studentFeeComponent.IndividualOrDiscountFeeComponent.FeeComponentType),
                                Amount = studentFeeComponent.Amount,
                                Term = studentFeeComponent.TermOrderId,
                                PaymentDate = studentFeeComponent.StudentFee.UpdatedOn.ToString("dd-MM-yyyy")
                            });
                        }
                        else
                        {
                            studentFeeExcelReportAcList.Add(new StudentFeeExcelReportAc
                            {
                                AdmissionNumber = studentBasicInformation.AdmissionNumber,
                                RollNumber = studentBasicInformation.RollNumber,
                                FirstName = studentBasicInformation.FirstName,
                                LastName = studentBasicInformation.LastName,
                                IsActive = studentBasicInformation.IsActive.ToString(),
                                IsArchived = studentBasicInformation.IsArchived.ToString(),
                                CurrentClass = studentBasicInformation.CurrentClass?.Name,
                                Section = studentBasicInformation.SectionMap?.Name,
                                Religion = studentBasicInformation.Religion?.Name,
                                FeeComponent = studentFeeComponent.IndividualOrDiscountFeeComponent.Name,
                                FeeComponentType = EnumHelperService.GetDescription(studentFeeComponent.IndividualOrDiscountFeeComponent.FeeComponentType),
                                Amount = 0,
                                Term = 0,
                                PaymentDate = "-"
                            });
                        }
                    }
                }
            }

            return studentFeeExcelReportAcList.Distinct().OrderBy(x => x.RollNumber).ThenBy(x => x.FeeComponent).ToList();
        }

        #endregion
    }
}
