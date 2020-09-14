using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.DesignationManagement
{
    public interface IDesignationManagementRepository
    {
        /// <summary>
        /// Method for fetching the list of all departments
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<List<Designation>> GetAllDesignationsAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching department by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<Designation> GetDesignationByIdAsync(int id, ApplicationUser currentUser);

        /// <summary>
        /// Method for adding new department
        /// </summary>
        /// <param name="newDesignation"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddDesignationAsync(Designation newDesignation, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating department
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedMotherTongue"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> UpdateDesignationAsync(int id, Designation updatedDesignation, ApplicationUser currentUser);
    }
}
