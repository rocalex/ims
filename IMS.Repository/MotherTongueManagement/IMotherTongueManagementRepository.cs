using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.MotherTongueManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.MotherTongueManagement
{
    public interface IMotherTongueManagementRepository
    {
        /// <summary>
        /// Method for fetching the list of all mother tongues
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<List<MotherTongueAc>> GetAllMotherTonguesAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching mother tongue by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<MotherTongueAc> GetMotherTongueByIdAsync(int id, ApplicationUser currentUser);

        /// <summary>
        /// Method for adding new mother tongue
        /// </summary>
        /// <param name="newMotherTongue"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<SharedLookUpResponse> AddMotherTongueAsync(MotherTongueAc newMotherTongueAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating mother tongue
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedMotherTongue"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<SharedLookUpResponse> UpdateMotherTongueAsync(int id, MotherTongueAc updatedMotherTongueAc, ApplicationUser currentUser);
    }
}
