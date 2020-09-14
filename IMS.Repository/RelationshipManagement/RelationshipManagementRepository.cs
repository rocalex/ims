using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.RelationshipManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.RelationshipManagement
{
    public class RelationshipManagementRepository : IRelationshipManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public RelationshipManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Relationship - SS
        /// </summary>
        /// <param name="name">name of Relationship</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddRelationshipAsync(AddRelationshipManagementAc addRelationship, int instituteId)
        {
            if (!await _iMSDbContext.Relationships.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addRelationship.Code.ToLowerInvariant()))
            {
                var relationship = new Relationship()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addRelationship.Name,
                    Code = addRelationship.Code,
                    Description = addRelationship.Description,
                    Status = true
                };
                _iMSDbContext.Relationships.Add(relationship);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Relationship added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Relationship with the same code is already exist" };
        }

        /// <summary>
        /// Method to get list of Relationship by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Relationship>> GetAllRelationshipAsync(int instiuteId)
        {
            return (await _iMSDbContext.Relationships.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Relationship - SS
        /// </summary>
        /// <param name="updateRelationshipManagement">Relationship detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateRelationshipAsync(UpdateRelationshipManagementAc updateRelationshipManagement, int instituteId)
        {
            var relationships = await _iMSDbContext.Relationships.Where(x => x.InstituteId == instituteId && x.Id != updateRelationshipManagement.RelationshipId).ToListAsync();
            var isDuplicate = relationships.Any(x => x.Code.ToLowerInvariant() == updateRelationshipManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of relationship. Please use unique code" };
            else
            {
                var relationship = await _iMSDbContext.Relationships.FirstAsync(x => x.Id == updateRelationshipManagement.RelationshipId);
                relationship.Name = updateRelationshipManagement.Name;
                relationship.Code = updateRelationshipManagement.Code;
                relationship.Description = updateRelationshipManagement.Description;
                relationship.Status = updateRelationshipManagement.Status;
                _iMSDbContext.Relationships.Update(relationship);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Relationship updated successfully" };
            }
        }

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var datas = await _iMSDbContext.Relationships.ToListAsync();
            datas.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.Relationships.UpdateRange(datas);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
