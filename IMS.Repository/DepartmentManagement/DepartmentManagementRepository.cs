using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.DepartmentManagement
{
    public class DepartmentManagementRepository : IDepartmentManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public DepartmentManagementRepository(IMSDbContext imsDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _imsDbContext = imsDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all departments
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<List<Department>> GetAllDepartmentsAsync(ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return await _imsDbContext.Departments.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync();
        }

        /// <summary>
        /// Method for fetching department by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<Department> GetDepartmentByIdAsync(int id, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return (await _imsDbContext.Departments.FirstOrDefaultAsync(x => x.Id == id && x.InstituteId == currentUserInstituteId));
        }

        /// <summary>
        /// Method for adding new department
        /// </summary>
        /// <param name="newDepartment"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddDepartmentAsync(Department newDepartment, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            if (await _imsDbContext.Departments.AnyAsync(x => x.DepartmentName.ToLowerInvariant().Equals(newDepartment.DepartmentName.ToLowerInvariant())
                 && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Department name already exists", HasError = true };
            }
            else if (await _imsDbContext.Departments.AnyAsync(x => x.Code.ToLowerInvariant().Equals(newDepartment.Code.ToLowerInvariant())
                 && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Department code already exists", HasError = true };
            }

            newDepartment.InstituteId = currentUserInstituteId;
            newDepartment.CreatedBy = currentUser.Id;
            newDepartment.CreatedOn = DateTime.UtcNow;
            _imsDbContext.Departments.Add(newDepartment);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Department added successfully" };
        }

        /// <summary>
        /// Method for updating department
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedDepartment"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateDepartmentAsync(int id, Department updatedDepartment, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            Department department = await GetDepartmentByIdAsync(id, currentUser);
            if (department == null)
            {
                return new { Message = "No department exists with this id", HasError = true };
            }
            else if (await _imsDbContext.Departments.AnyAsync(x => x.DepartmentName.ToLowerInvariant().Equals(updatedDepartment.DepartmentName.ToLowerInvariant())
                 && x.Id != id && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Department name already exists", HasError = true };
            }
            else if (await _imsDbContext.Departments.AnyAsync(x => x.Code.ToLowerInvariant().Equals(updatedDepartment.Code.ToLowerInvariant())
                 && x.Id != id && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Department code already exists", HasError = true };
            }

            department.DepartmentName = updatedDepartment.DepartmentName;
            department.Code = updatedDepartment.Code;
            department.Description = updatedDepartment.Description;
            department.UpdatedBy = currentUser.Id;
            department.UpdatedAt = DateTime.UtcNow;
            _imsDbContext.Departments.Update(department);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Department updated successfully" };
        }

        #endregion

        #region Private methods



        #endregion
    }
}
