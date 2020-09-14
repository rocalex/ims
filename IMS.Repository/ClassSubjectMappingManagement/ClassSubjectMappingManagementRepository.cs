using IMS.DomainModel.ApplicationClasses;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteSubjectManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.ClassSubjectMappingManagement
{
    public class ClassSubjectMappingManagementRepository : IClassSubjectMappingManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly IInstituteSubjectManagementRepository _instituteSubjectManagementRepository;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public ClassSubjectMappingManagementRepository(IMSDbContext imsDbContext,
            IInstituteSubjectManagementRepository instituteSubjectManagementRepository,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _imsDbContext = imsDbContext;
            _instituteSubjectManagementRepository = instituteSubjectManagementRepository;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the class-subject mappings by class id
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<Tuple<List<StaffBasicPersonalInformation>, List<ClassSubjectMappingAc>>> GetClassSubjectMappingByClassIdAsync(int classId, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            List<ClassSubjectMappingAc> classSubjectMappingListAc = new List<ClassSubjectMappingAc>();

            InstituteClass instituteClass = await _imsDbContext.InstituteClasses.FirstAsync(x => x.Id == classId);

            List<InstituteClassSubjectMapping> classSubjectMappingsList = await _imsDbContext.InstituteClassSubjectMappings
                .Include(x => x.InstituteClass)
                .Include(x => x.InstituteSubject)
                .Include(x => x.Faculty.User)
                .Include(x => x.AlternateFaculty.User)
                .Where(x => x.ClassId == classId && x.InstituteClass.InstituteId == currentUserInstituteId && x.InstituteSubject.InstituteId == currentUserInstituteId).ToListAsync();

            List<InstituteSubject> subjectsList = await _instituteSubjectManagementRepository.GetAllInstituteSubjectsAsync(currentUserInstituteId);
            List<StaffBasicPersonalInformation> facultiesList = await _imsDbContext.StaffBasicPersonalInformation
                .Where(x => x.InstituteId == currentUserInstituteId && x.IsTeachingStaff)
                .ToListAsync();

            // Find mappings
            foreach (InstituteSubject subject in subjectsList)
            {
                ClassSubjectMappingAc classSubjectMappingAc = new ClassSubjectMappingAc
                {
                    ClassId = classId,
                    ClassName = instituteClass.Name,
                    SubjectId = subject.Id,
                    SubjectName = subject.Name,
                    IsMapped = classSubjectMappingsList.Any(x => x.ClassId == classId && x.SubjectId == subject.Id)
                };

                if (classSubjectMappingAc.IsMapped)
                {
                    InstituteClassSubjectMapping classSubjectMapping = classSubjectMappingsList.First(x => x.ClassId == classId && x.SubjectId == subject.Id);
                    classSubjectMappingAc.Id = classSubjectMapping.Id;
                    classSubjectMappingAc.FacultyId = classSubjectMapping.FacultyId;
                    classSubjectMappingAc.AlternateFacultyId = classSubjectMapping.AlternateFacultyId;
                    classSubjectMappingAc.FacultyName = classSubjectMapping.Faculty.FirstName;
                    classSubjectMappingAc.AlternateFacultyName = classSubjectMapping.AlternateFaculty.FirstName;
                }

                classSubjectMappingListAc.Add(classSubjectMappingAc);
            }

            return new Tuple<List<StaffBasicPersonalInformation>, List<ClassSubjectMappingAc>>(facultiesList, classSubjectMappingListAc);
        }

        /// <summary>
        /// Method for bulk updating class-subject mappings
        /// </summary>
        /// <param name="classSubjectMappingsList"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> BulkUpdateClassSubjectMapping(List<ClassSubjectMappingAc> classSubjectMappingsList, ApplicationUser currentUser)
        {
            List<InstituteClassSubjectMapping> addedClassSubjectMappings = new List<InstituteClassSubjectMapping>();
            List<InstituteClassSubjectMapping> updatedClassSubjectMappings = new List<InstituteClassSubjectMapping>();
            List<InstituteClassSubjectMapping> removedClassSubjectMappings = new List<InstituteClassSubjectMapping>();

            foreach (ClassSubjectMappingAc classSubjectMappingAc in classSubjectMappingsList)
            {
                InstituteClassSubjectMapping classSubjectMapping = await _imsDbContext.InstituteClassSubjectMappings
                    .FirstOrDefaultAsync(x => x.Id == classSubjectMappingAc.Id);

                // Add new mapping
                if (classSubjectMapping == null)
                {
                    addedClassSubjectMappings.Add(new InstituteClassSubjectMapping
                    {
                        ClassId = classSubjectMappingAc.ClassId,
                        SubjectId = classSubjectMappingAc.SubjectId,
                        FacultyId = classSubjectMappingAc.FacultyId,
                        AlternateFacultyId = classSubjectMappingAc.AlternateFacultyId,
                        CreatedOn = DateTime.UtcNow
                    });
                }
                else
                {
                    // Remove existing mapping
                    if (!classSubjectMappingAc.IsMapped)
                    {
                        removedClassSubjectMappings.Add(classSubjectMapping);
                    }
                    // Update existing mapping
                    else
                    {
                        classSubjectMapping.FacultyId = classSubjectMappingAc.FacultyId;
                        classSubjectMapping.AlternateFacultyId = classSubjectMappingAc.AlternateFacultyId;
                        updatedClassSubjectMappings.Add(classSubjectMapping);
                    }
                }
            }

            _imsDbContext.InstituteClassSubjectMappings.AddRange(addedClassSubjectMappings);
            _imsDbContext.InstituteClassSubjectMappings.UpdateRange(updatedClassSubjectMappings);
            _imsDbContext.InstituteClassSubjectMappings.RemoveRange(removedClassSubjectMappings);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Class and subjects mapped successfully" };
        }

        #endregion

        #region Private methods



        #endregion
    }
}
