using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.RoleManagement
{
    public interface IRoleManagementRepository
    {
        /// <summary>
        /// Method to add new role - SS
        /// </summary>
        /// <param name="roleName">role name</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<string> AddNewRoleAsync(string roleName, int instituteId);

        /// <summary>
        /// Method to get list of roles - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of roles</returns>
        Task<List<InstituteRole>> GetAllRolesAsync(int instituteId);
    }
}
