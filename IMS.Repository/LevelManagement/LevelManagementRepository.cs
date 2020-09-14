using IMS.DomainModel.ApplicationClasses.LevelManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.LevelManagement
{
    public class LevelManagementRepository : ILevelManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public LevelManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add Level - SS
        /// </summary>
        /// <param name="name">name of Level</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddLevelAsync(AddLevelManagementAc addLevel, int instituteId)
        {
            if (!await _iMSDbContext.Levels.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addLevel.Code.ToLowerInvariant()))
            {
                var level = new Level()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addLevel.Name,
					Code = addLevel.Code,
					Description = addLevel.Description,
					Status = true
                };
                _iMSDbContext.Levels.Add(level);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Level added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Level with the same name is already exist" };
        }

        /// <summary>
        /// Method to get list of Level by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<Level>> GetAllLevelAsync(int instiuteId)
        {
            return (await _iMSDbContext.Levels.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update Level - SS
        /// </summary>
        /// <param name="updateLevelManagement">Level detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateLevelAsync(UpdateLevelManagementAc updateLevelManagement, int instituteId)
        {
            var levels = await _iMSDbContext.Levels.Where(x => x.InstituteId == instituteId && x.Id != updateLevelManagement.LevelId).ToListAsync();
            var isDuplicate = levels.Any(x => x.Code.ToLowerInvariant() == updateLevelManagement.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Duplicate name of level. Please use unique name" };
            else
            {
                var level = await _iMSDbContext.Levels.FirstAsync(x => x.Id == updateLevelManagement.LevelId);
                level.Name = updateLevelManagement.Name;
				level.Code = updateLevelManagement.Code;
				level.Description = updateLevelManagement.Description;
				level.Status = updateLevelManagement.Status;
				_iMSDbContext.Levels.Update(level);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Level updated successfully" };
            }
        }

		/// <summary>
		/// Method to migrated previous data(s) - SS
		/// </summary>
		public async Task MigratedPreviousDataAsync()
		{
			var datas = await _iMSDbContext.Levels.ToListAsync();
			datas.ForEach(x =>
			{
				if (string.IsNullOrEmpty(x.Code))
					x.Code = x.Name;
			});
			_iMSDbContext.Levels.UpdateRange(datas);
			await _iMSDbContext.SaveChangesAsync();
		}
		#endregion
	}
}
