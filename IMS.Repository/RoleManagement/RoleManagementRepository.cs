using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IMS.Repository.RoleManagement
{
    public class RoleManagementRepository : IRoleManagementRepository
    {
        #region Private Variable(s)
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        #endregion

        #region Constructor
        public RoleManagementRepository(RoleManager<IdentityRole> roleManager, IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add new role - SS
        /// </summary>
        /// <param name="roleName">role name</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<string> AddNewRoleAsync(string roleName, int instituteId)
        {
            await semaphore.WaitAsync();
            try
            {
                if (!(await _iMSDbContext.InstituteRoles.AnyAsync(x=>x.RoleName == roleName && x.InstituteId == instituteId)))
                {
                    _iMSDbContext.InstituteRoles.Add(new InstituteRole()
                    {
                        CreatedOn = DateTime.UtcNow,
                        InstituteId = instituteId,
                        RoleName = roleName
                    });
                    await _iMSDbContext.SaveChangesAsync();
                    return "Role added successfully";
                }
                else
                    return "Role name already exist";
            }
            finally
            {
                semaphore.Release();
            }
        }

        /// <summary>
        /// Method to get list of roles - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of roles</returns>
        public async Task<List<InstituteRole>> GetAllRolesAsync(int instituteId)
        {
            return (await _iMSDbContext.InstituteRoles.Where(x=>x.InstituteId == instituteId).ToListAsync());
        }
        #endregion
    }
}
