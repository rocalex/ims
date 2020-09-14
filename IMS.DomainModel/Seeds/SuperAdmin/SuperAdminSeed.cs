using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;

namespace IMS.DomainModel.Seeds.SuperAdmin
{
    public class SuperAdminSeed : ISuperAdminSeed
    {
        #region Private Variable(s)
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SystemRoles _systemRoles;
        private readonly AppSettings.SuperAdmin _superAdmin;
        #endregion

        #region Constructor
        public SuperAdminSeed(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, IOptions<SystemRoles> systemRoles,
            IOptions<AppSettings.SuperAdmin> superAdmin)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _systemRoles = systemRoles.Value;
            _superAdmin = superAdmin.Value;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to seed default roles - SS
        /// </summary>
        public async Task AddOrUpdatesRolesAsync()
        {
            foreach (var role in _systemRoles.Roles)
            {
                var roleDetail = await _roleManager.FindByNameAsync(role);
                if (roleDetail == null)
                {
                    await _roleManager.CreateAsync(new IdentityRole()
                    {
                        Name = role,
                        NormalizedName = role.ToUpper(),
                        ConcurrencyStamp = Guid.NewGuid().ToString()
                    });
                }
                else
                {
                    roleDetail.Name = role;
                    roleDetail.NormalizedName = role.ToUpper();
                    await _roleManager.UpdateAsync(roleDetail);
                }
            }
        }

        /// <summary>
        /// Method to seed super admin - SS
        /// </summary>
        public async Task AddOrUpdateSuperAdminAsync()
        {
            var superAdmin = await _userManager.FindByEmailAsync(_superAdmin.Email);
            if (superAdmin == null)
            {
                superAdmin = new ApplicationUser()
                {
                    Email = _superAdmin.Email,
                    UserName = _superAdmin.Email,
                    Name = _superAdmin.Name,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    Id = null,
                    CreatedOn = DateTime.UtcNow,
                    UpdatedOn = DateTime.UtcNow
                };
                var success = await _userManager.CreateAsync(superAdmin, _superAdmin.Password);
                await _userManager.AddToRoleAsync(superAdmin, _systemRoles.Roles[0]);
            }
            else
            {
                superAdmin.Name = _superAdmin.Name;
                superAdmin.Email = superAdmin.Email;
                superAdmin.UserName = superAdmin.Email;
                superAdmin.UpdatedOn = DateTime.UtcNow;
                var code = await _userManager.GeneratePasswordResetTokenAsync(superAdmin);
                await _userManager.ResetPasswordAsync(superAdmin, code, _superAdmin.Password);
            }
        }
        #endregion
    }
}
