using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.RelationshipManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.RelationshipManagement
{
    public interface IRelationshipManagementRepository
    {
        /// <summary>
        /// Method to add Relationship - SS
        /// </summary>
        /// <param name="name">name of Relationship</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddRelationshipAsync(AddRelationshipManagementAc addRelationship, int instituteId);

        /// <summary>
        /// Method to get list of Relationship by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Relationship>> GetAllRelationshipAsync(int instiuteId);

        /// <summary>
        /// Method to update Relationship - SS
        /// </summary>
        /// <param name="updateRelationshipManagement">Relationship detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateRelationshipAsync(UpdateRelationshipManagementAc updateRelationshipManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
