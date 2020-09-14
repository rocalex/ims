using IMS.DomainModel.ApplicationClasses.Hostel.MessManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.MessManagement
{
    public class MessManagementRepository : IMessManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public MessManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddComponentAsync(AddRequest addComponents, int instituteId)
        {
            var isValid = false;
            foreach (AddMessStudentMapping addComponent in addComponents.Mappings)
            {
                if (!string.IsNullOrEmpty(addComponent.CardNumber) && !string.IsNullOrEmpty(addComponent.Duration))
                {
                    isValid = true;
                }
            }
            var isExist = await iMSDbContext.MessManages.AnyAsync(x => x.HostelId == addComponents.HostelId && x.FromDate == addComponents.FromDate && x.ToDate == addComponents.ToDate && x.InstituteId == instituteId);

            if(isValid)
            {
                var messManage = new MessManage();
                if(isExist)
                {
                    messManage = await iMSDbContext.MessManages.FirstAsync(x => x.HostelId == addComponents.HostelId && x.FromDate == addComponents.FromDate && x.ToDate == addComponents.ToDate && x.InstituteId == instituteId);
                    var oldEntries = await iMSDbContext.MessManageStudentMappings.Where(x => x.MessManageId == messManage.Id && x.InstituteId == instituteId).ToListAsync();
                    iMSDbContext.MessManageStudentMappings.RemoveRange(oldEntries);
                    await iMSDbContext.SaveChangesAsync();
                } else
                {
                    var name = addComponents.FromDate.Month + "_" + addComponents.FromDate.Day + "_" + addComponents.FromDate.Year + "_to_" + addComponents.ToDate.Month + "_" + addComponents.ToDate.Day + "_" + addComponents.ToDate.Year;
                    messManage = new MessManage()
                    {
                        InstituteId = instituteId,
                        HostelId = addComponents.HostelId,
                        FromDate = addComponents.FromDate,
                        ToDate = addComponents.ToDate,
                        Name = name
                    };
                    iMSDbContext.MessManages.Add(messManage);
                    await iMSDbContext.SaveChangesAsync();
                }
                foreach (AddMessStudentMapping addComponent in addComponents.Mappings)
                {
                    if (!string.IsNullOrEmpty(addComponent.CardNumber) && !string.IsNullOrEmpty(addComponent.Duration))
                    {
                        var mapping = new MessManageStudentMapping()
                        {
                            MessManageId = messManage.Id,
                            StudentId = addComponent.StudentId,
                            CardNumber = addComponent.CardNumber,
                            Duration = addComponent.Duration,
                            InstituteId = instituteId
                        };
                        iMSDbContext.MessManageStudentMappings.Add(mapping);
                        await iMSDbContext.SaveChangesAsync();
                    }
                }
            }
            else
            {
                if(isExist)
                {
                    var oldEntries = await iMSDbContext.MessManages.Where(x => x.FromDate == addComponents.FromDate && x.ToDate == addComponents.ToDate && x.HostelId == addComponents.HostelId && x.InstituteId == instituteId).ToListAsync();
                    iMSDbContext.MessManages.RemoveRange(oldEntries);
                    await iMSDbContext.SaveChangesAsync();
                }
            }
            return new SharedLookUpResponse() { HasError = false, Message = "Mess Manage added successfully" };
        }

        public async Task<List<MessManageStudentMapping>> GetComponentsAsync(int instituteId, int hostelId, DateTime fromDate, DateTime toDate)
        {
            var students = await iMSDbContext.StudentBasicInformation.Where(x => x.InstituteId == instituteId).ToListAsync();
            var results = new List<MessManageStudentMapping>();
            foreach(StudentBasicInformation student in students)
            {
                var isExist = await iMSDbContext.MessManageStudentMappings.AnyAsync(x => x.InstituteId == instituteId && x.MessManage.HostelId == hostelId && x.StudentId == student.Id && x.MessManage.FromDate == fromDate && x.MessManage.ToDate == toDate);
                if(isExist)
                {
                    var result = await iMSDbContext.MessManageStudentMappings.Include(x => x.MessManage).Include(x => x.MessManage.Hostel).FirstAsync(x => x.InstituteId == instituteId && x.StudentId == student.Id && x.MessManage.HostelId == hostelId && x.MessManage.FromDate == fromDate && x.MessManage.ToDate == toDate);
                    results.Add(result);
                }
                else
                {
                    results.Add(new MessManageStudentMapping()
                    {
                        StudentId = student.Id,
                        Student = student,
                        CardNumber = null,
                        Duration = null
                    });
                }
            }
            return results;
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.MessManages.ToListAsync();
            iMSDbContext.MessManages.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }
        #endregion
    }
}
