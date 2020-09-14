using System.Threading.Tasks;

namespace IMS.Repository.RolePermission
{
    public interface IRolePermissionSeed
    {
        /// <summary>
        /// Method to seed permission - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        Task SeedPermissionAsync(int instituteId);

        /// <summary>
        /// Method to seed role in user group/permission table - SS
        /// </summary>
        Task AddUserGroupDefaultAsync();
    }
}
