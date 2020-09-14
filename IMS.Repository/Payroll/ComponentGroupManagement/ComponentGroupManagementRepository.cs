using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Payroll.ComponentGroupManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Payroll.ComponentGroupManagement
{
    public class ComponentGroupManagementRepository : IComponentGroupManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ComponentGroupManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentGroupAsync(AddComponentGroupAc addComponentGroup, int instituteId)
        {
            if(!await iMSDbContext.ComponentGroups.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addComponentGroup.Code.ToLowerInvariant())) {
                var componentGroup = new ComponentGroup()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addComponentGroup.Name,
                    Code = addComponentGroup.Code,
                    Description = addComponentGroup.Description,
                    Status = addComponentGroup.Status
                };
                iMSDbContext.ComponentGroups.Add(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Component Group added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Component Group with same code is already existed" };
            }
        }

        public async Task<List<ComponentGroup>> GetComponentGroupsAsync(int instituteId)
        {
            return (await iMSDbContext.ComponentGroups.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.ComponentGroups.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.ComponentGroups.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentGroupAsync(UpdateComponentGroupAc updateComponentGroupAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.ComponentGroups.Where(x => x.InstituteId == instituteId && x.Id != updateComponentGroupAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.Code.ToLowerInvariant() == updateComponentGroupAc.Code.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Component Group, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.ComponentGroups.FirstAsync(x => x.Id == updateComponentGroupAc.Id);
                componentGroup.Name = updateComponentGroupAc.Name;
                componentGroup.Code = updateComponentGroupAc.Code;
                componentGroup.Description = updateComponentGroupAc.Description;
                componentGroup.Status = updateComponentGroupAc.Status;
                iMSDbContext.ComponentGroups.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Component Group updated successfully" };
            }
        }
        #endregion
    }
}
