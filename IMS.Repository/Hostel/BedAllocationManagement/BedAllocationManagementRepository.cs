using IMS.DomainModel.ApplicationClasses.Hostel.BedAllocationManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.BedAllocationManagement
{
    public class BedAllocationManagementRepository : IBedAllocationManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public BedAllocationManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddBedAllocation[] addComponent, int floorNo, int instituteId)
        {
            var oldAllocation = await iMSDbContext.BedAllocations.Where(x => x.Bed.Room.FloorNo == floorNo).ToListAsync();
            iMSDbContext.BedAllocations.RemoveRange(oldAllocation);
            await iMSDbContext.SaveChangesAsync();

            for (var i=0; i<addComponent.Length; i++)
            {
                if (addComponent[i].BedNo == 0 || addComponent[i].StudentId == 0 || await iMSDbContext.BedAllocations.AnyAsync(x => x.InstituteId == instituteId && x.BedId == addComponent[i].BedNo && x.StudentId == addComponent[i].StudentId))
                {
                    continue;
                }
                var componentGroup = new BedAllocation()
                {
                    InstituteId = instituteId,
                    BedId = addComponent[i].BedNo,
                    StudentId = addComponent[i].StudentId,
                    Status = addComponent[i].StatusId
                };
                iMSDbContext.BedAllocations.Add(componentGroup);
            }
            await iMSDbContext.SaveChangesAsync();
            return new SharedLookUpResponse() { HasError = false, Message = "Bed Allocation added successfully" };
        }

        public async Task<List<BedAllocation>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.BedAllocations.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateBedAllocation updateComponentAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.BedAllocations.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.BedId == updateComponentAc.BedId && x.StudentId == updateComponentAc.StudentId);
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate allocation of Bed Allocation, please use unique code" };
            else
            {
                var componentGroup = await iMSDbContext.BedAllocations.FirstAsync(x => x.Id == updateComponentAc.Id);
                componentGroup.BedId = updateComponentAc.BedId;
                componentGroup.StudentId = updateComponentAc.StudentId;
                componentGroup.Status = updateComponentAc.Status;
                iMSDbContext.BedAllocations.Update(componentGroup);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Bed Allocation updated successfully" };
            }
        }
        #endregion
    }
}
