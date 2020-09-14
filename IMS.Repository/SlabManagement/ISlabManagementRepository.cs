using IMS.DomainModel.ApplicationClasses.SlabManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.SlabManagement
{
    public interface ISlabManagementRepository
    {
        /// <summary>
        /// Method to add Slab - SS
        /// </summary>
        /// <param name="addSlab">Slab</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddSlabAsync(AddSlabManagementAc addSlab, int instituteId);

        /// <summary>
        /// Method to get list of Slab by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Slab>> GetAllSlabAsync(int instiuteId);

        /// <summary>
        /// Method to update Slab - SS
        /// </summary>
        /// <param name="updateSlabManagement">Slab detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateSlabAsync(UpdateSlabManagementAc updateSlabManagement, int instituteId);
    }
}
