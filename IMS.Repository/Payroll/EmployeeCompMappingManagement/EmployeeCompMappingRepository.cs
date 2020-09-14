using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Payroll.EmployeeCompMappingManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Payroll.EmployeeCompMappingManagement
{
    public class EmployeeCompMappingRepository : IEmployeeCompMappingRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public EmployeeCompMappingRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddEmployeeCompMapping addComponent, int instituteId)
        {
            if (!await iMSDbContext.EmployeeCompMappings.AnyAsync(x => x.InstituteId == instituteId && x.ComponentId == addComponent.ComponentId && x.StaffId == addComponent.StaffId))
            {
                var componentGroup = new EmployeeCompMapping()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    ComponentId = addComponent.ComponentId,
                    ComponentTypeId = addComponent.ComponentTypeId,
                    StaffId = addComponent.StaffId,
                    Formula = addComponent.Formula,
                    Operator = addComponent.Operator,
                    Amount = addComponent.Amount
                };
                iMSDbContext.EmployeeCompMappings.Add(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Employee Component Mapping added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Employee Component Mapping with same info is already existed" };
            }
        }

        public async Task<List<EmployeeCompMapping>> GetComponentsAsync(int staffId, int instituteId)
        {
            return (await iMSDbContext.EmployeeCompMappings.Include(s => s.Component).Where(x => x.InstituteId == instituteId && x.StaffId == staffId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.EmployeeCompMappings.ToListAsync();
            iMSDbContext.EmployeeCompMappings.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateEmployeeCompMapping updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.EmployeeCompMappings.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.ComponentId == updateComponentAc.ComponentId && x.StaffId == updateComponentAc.StaffId && x.Operator == updateComponentAc.Operator && x.Amount == updateComponentAc.Amount);
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate info of Employee Component Mapping, please use unique code" };
            else
            {
                var employeeCompMapping = await iMSDbContext.EmployeeCompMappings.FirstAsync(x => x.Id == updateComponentAc.Id);
                employeeCompMapping.StaffId = updateComponentAc.StaffId;
                employeeCompMapping.ComponentId = updateComponentAc.ComponentId;
                employeeCompMapping.ComponentTypeId = updateComponentAc.ComponentTypeId;
                employeeCompMapping.Formula = updateComponentAc.Formula;
                employeeCompMapping.Amount = updateComponentAc.Amount;
                employeeCompMapping.Operator = updateComponentAc.Operator;
                iMSDbContext.EmployeeCompMappings.Update(employeeCompMapping);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Employee Component Mapping updated successfully" };
            }
            #endregion
        }
    }
}
