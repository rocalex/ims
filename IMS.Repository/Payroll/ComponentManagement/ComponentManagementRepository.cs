using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Payroll.ComponentManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Payroll.ComponentManagement
{
    public class ComponentManagementRepository : IComponentManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ComponentManagementRepository(IMSDbContext _imsDBContext)
        {
            iMSDbContext = _imsDBContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddComponentAc addComponent, int instituteId)
        {
            if (!await iMSDbContext.PayrollComponents.AnyAsync(x => x.InstituteId == instituteId && x.Name.ToLowerInvariant() == addComponent.Name.ToLowerInvariant()))
            {
                var component = new PayrollComponent()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addComponent.Name,
                    ShortName = addComponent.ShortName,
                    SequenceNo = addComponent.SequenceNo,
                    GroupId = addComponent.GroupId,
                    IsPayslip = addComponent.IsPayslip,
                    IsBasic = addComponent.IsBasic,
                    Others = addComponent.Others,
                    Description = addComponent.Description,
                    Status = addComponent.Status
                };
                iMSDbContext.PayrollComponents.Add(component);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Component Group added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Component with same Name is already existed" };
            }
        }

        public async Task<List<PayrollComponent>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.PayrollComponents.Include(s => s.Group).Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.PayrollComponents.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.ShortName))
                    x.ShortName = x.Name;
            });
            iMSDbContext.PayrollComponents.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateComponentAc updateComponentAc, int instituteId)
        {
            var component = await iMSDbContext.PayrollComponents.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = component.Any(x => x.Name.ToLowerInvariant() == updateComponentAc.Name.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Component Group, please use unique code" };
            else
            {
                var componentUpdate = await iMSDbContext.PayrollComponents.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentUpdate.Name = updateComponentAc.Name;
                componentUpdate.Description = updateComponentAc.Description;
                componentUpdate.Status = updateComponentAc.Status;
                componentUpdate.ShortName = updateComponentAc.ShortName; ;
                componentUpdate.Others = updateComponentAc.Others;
                componentUpdate.IsPayslip = updateComponentAc.IsPayslip;
                componentUpdate.IsBasic = updateComponentAc.IsBasic;
                componentUpdate.GroupId = updateComponentAc.GroupId;
                componentUpdate.SequenceNo = updateComponentAc.SequenceNo;
                iMSDbContext.PayrollComponents.Update(componentUpdate);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Component Group updated successfully" };
            }
        }
        #endregion
    }
}
