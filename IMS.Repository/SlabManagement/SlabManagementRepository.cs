using IMS.DomainModel.ApplicationClasses.SlabManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.SlabManagement
{
    public class SlabManagementRepository : ISlabManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public SlabManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Slab - SS
        /// </summary>
        /// <param name="name">name of Slab</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddSlabAsync(AddSlabManagementAc addSlab, int instituteId)
        {
            if (!await _iMSDbContext.Slabs.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addSlab.Code.ToLowerInvariant()))
            {
                var Slab = new Slab()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addSlab.Name,
                    Code = addSlab.Code,
                    Description = addSlab.Description,
                    Status = true
                };
                _iMSDbContext.Slabs.Add(Slab);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Slab added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Slab with the same name is already exist" };
        }

        /// <summary>
        /// Method to get list of Slab by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Slab>> GetAllSlabAsync(int instiuteId)
        {
            return (await _iMSDbContext.Slabs.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Slab - SS
        /// </summary>
        /// <param name="updateSlabManagement">Slab detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateSlabAsync(UpdateSlabManagementAc updateSlabManagement, int instituteId)
        {
            var Slabs = await _iMSDbContext.Slabs.Where(x => x.InstituteId == instituteId && x.Id != updateSlabManagement.SlabId).ToListAsync();
            var isDuplicate = Slabs.Any(x => x.Code.ToLowerInvariant() == updateSlabManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Slab. Please use unique code" };
            else
            {
                var Slab = await _iMSDbContext.Slabs.FirstAsync(x => x.Id == updateSlabManagement.SlabId);
                Slab.Name = updateSlabManagement.Name;
                Slab.Code = updateSlabManagement.Code;
                Slab.Description = updateSlabManagement.Description;
                Slab.Status = updateSlabManagement.Status;
                _iMSDbContext.Slabs.Update(Slab);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Slab updated successfully" };
            }
        }
        #endregion
    }
}
