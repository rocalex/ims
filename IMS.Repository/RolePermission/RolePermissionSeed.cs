using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.UserGroupManagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.RolePermission
{
    public class RolePermissionSeed : IRolePermissionSeed
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly RolesPermission _rolesPermission;
        private readonly IUserGroupManagementRepository _userGroupManagementRepository;
        #endregion

        #region Constructor
        public RolePermissionSeed(IMSDbContext iMSDbContext, IOptions<RolesPermission> options,
            IUserGroupManagementRepository userGroupManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _rolesPermission = options.Value;
            _userGroupManagementRepository = userGroupManagementRepository;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to seed permission - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        public async Task SeedPermissionAsync(int instituteId)
        {
            List<UserGroup> userGroups = new List<UserGroup>();
            var roles = await _iMSDbContext.UserGroups.Where(x => x.InstituteId == instituteId).ToListAsync();
            foreach (var role in _rolesPermission.Roles)
            {
                if (!roles.Any(x => x.Code == role))
                {
                    userGroups.Add(new UserGroup()
                    {
                        CanDelete = false,
                        CreatedOn = DateTime.UtcNow,
                        Code = role,
                        Description = role,
                        InstituteId = instituteId,
                        Name = role
                    });
                }
            }
            if (userGroups.Count != 0)
            {
                _iMSDbContext.UserGroups.AddRange(userGroups);
                await _iMSDbContext.SaveChangesAsync();
            }
            var admin = await _iMSDbContext.UserGroups.FirstAsync(x => x.Code == "Admin" && x.InstituteId == instituteId);
            await _userGroupManagementRepository.SeedingUserGroupFeaturesAsync(admin.Id);
        }

        /// <summary>
        /// Method to seed role in user group/permission table - SS
        /// </summary>
        public async Task AddUserGroupDefaultAsync()
        {
            var institutes = await _iMSDbContext.Institutes.Select(s=>s.Id).ToListAsync();   
            foreach (var institute in institutes)
            {
                await SeedPermissionAsync(institute);
            }
        }
        #endregion
    }
}
