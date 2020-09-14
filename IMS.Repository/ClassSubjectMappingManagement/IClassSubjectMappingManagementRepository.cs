using IMS.DomainModel.ApplicationClasses;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.ClassSubjectMappingManagement
{
    public interface IClassSubjectMappingManagementRepository
    {
        /// <summary>
        /// Method for fetching the class-subject mappings by class id
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<Tuple<List<StaffBasicPersonalInformation>, List<ClassSubjectMappingAc>>> GetClassSubjectMappingByClassIdAsync(int classId, ApplicationUser currentUser);

        /// <summary>
        /// Method for bulk updating class-subject mappings
        /// </summary>
        /// <param name="classSubjectMappingsList"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> BulkUpdateClassSubjectMapping(List<ClassSubjectMappingAc> classSubjectMappingsList, ApplicationUser currentUser);
    }
}
