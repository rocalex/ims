using System.Threading.Tasks;

namespace IMS.DomainModel.Seeds.SuperAdmin
{
    public interface ISuperAdminSeed
    {
        /// <summary>
        /// Method to seed default roles - SS
        /// </summary>
        Task AddOrUpdatesRolesAsync();

        /// <summary>
        /// Method to seed super admin - SS
        /// </summary>
        Task AddOrUpdateSuperAdminAsync();
    }
}
