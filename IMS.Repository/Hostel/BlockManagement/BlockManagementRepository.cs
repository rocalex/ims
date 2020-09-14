using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Hostel.BlockManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.BlockManagement
{
    public class BlockManagementRepository : IBlockManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public BlockManagementRepository(IMSDbContext _imsDbContext)

        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        public async Task<SharedLookUpResponse> AddComponentAsync(AddBlockAc addComponent, int institudeId)
        {
            if (!await iMSDbContext.HostelBlocks.AnyAsync(x => x.InstituteId == institudeId && x.Name.ToLowerInvariant() == addComponent.Name.ToLowerInvariant()))
            {
                var hostelBlock = new HostelBlock()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = institudeId,
                    Name = addComponent.Name,
                    FloorAmount = addComponent.FloorAmount,
                    Description = addComponent.Description,
                    Status = addComponent.Status,
                    HostelId = addComponent.HostelId
                };
                iMSDbContext.HostelBlocks.Add(hostelBlock);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Hostel Block added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Hostel Block with same name is already existed" };
            }
        }

        public async Task<List<HostelBlock>> GetComponentsAsync(int instituteId)
        {
            return (await iMSDbContext.HostelBlocks.Include(s => s.Hostel).Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.HostelBlocks.ToListAsync();
            iMSDbContext.HostelBlocks.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateComponentAsync(UpdateBlockAc updateComponentAc, int instituteId)
        {
            var hostelBlocks = await iMSDbContext.HostelBlocks.Where(x => x.InstituteId == instituteId && x.Id != updateComponentAc.Id).ToListAsync();
            var isDuplicated = hostelBlocks.Any(x => x.Name.ToLowerInvariant() == updateComponentAc.Name.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Component Group, please use unique code" };
            else
            {
                var hostelBlock = await iMSDbContext.HostelBlocks.FirstAsync(x => x.Id == updateComponentAc.Id);
                hostelBlock.Name = updateComponentAc.Name;
                hostelBlock.FloorAmount = updateComponentAc.FloorAmount;
                hostelBlock.Description = updateComponentAc.Description;
                hostelBlock.Status = updateComponentAc.Status;
                iMSDbContext.HostelBlocks.Update(hostelBlock);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Hostel Block updated successfully" };
            }
        }
    }
}
