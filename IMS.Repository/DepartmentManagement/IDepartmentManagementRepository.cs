using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.DepartmentManagement
{
    public interface IDepartmentManagementRepository
    {
        /// <summary>
        /// Method for fetching the list of all departments
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<List<Department>> GetAllDepartmentsAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching department by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<Department> GetDepartmentByIdAsync(int id, ApplicationUser currentUser);

        /// <summary>
        /// Method for adding new department
        /// </summary>
        /// <param name="newDepartment"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddDepartmentAsync(Department newDepartment, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating department
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedMotherTongue"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> UpdateDepartmentAsync(int id, Department updatedDepartment, ApplicationUser currentUser);
    }
}
