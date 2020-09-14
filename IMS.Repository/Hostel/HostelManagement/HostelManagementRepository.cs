using IMS.DomainModel.ApplicationClasses.Hostel.HostelManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Payroll.ComponentGroupManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.HostelManagement
{
    public class HostelManagementRepository : IHostelManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public HostelManagementRepository(IMSDbContext _iMSDbContext)
        {
            this.iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods

        public async Task<SharedLookUpResponse> AddHostelAsync(AddHostelAc addHostel, int instituteId)
        {
            if (!await iMSDbContext.Hostels.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addHostel.Code.ToLowerInvariant() && x.Name.ToLowerInvariant() == addHostel.Name.ToLowerInvariant()))
            {
                var hostel = new IMS.DomainModel.Models.Hostel()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addHostel.Name,
                    Code = addHostel.Code,
                    HostelType = addHostel.HostelType,
                    HostelCautionDeposit = addHostel.HostelCautionDeposit,
                    ContactMobile = addHostel.ContactMobile,
                    ContactPerson = addHostel.ContactPerson,
                    CountryId = addHostel.CountryId,
                    StateId = addHostel.StateId,
                    CityId = addHostel.CityId,
                    ZipCode = addHostel.ZipCode,
                    Address1 = addHostel.Address1,
                    Address2 = addHostel.Address2,
                    PlaceName = addHostel.PlaceName,
                    Status = addHostel.Status
                };
                var insertObject = iMSDbContext.Hostels.Add(hostel);
                foreach(var studentId in addHostel.AssignMembers)
                {
                    var assignMember = new HostelStudentAssign()
                    {
                        StudentId = studentId,
                        HostelId = insertObject.Entity.Id
                    };
                    iMSDbContext.HostelStudentAssign.Add(assignMember);
                }
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Hostel added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Hostel with same code is already existed" };
            }
        }

        public async Task<List<IMS.DomainModel.Models.Hostel>> GetHostelsAsync(int instituteId)
        {
            return (await iMSDbContext.Hostels.Include(s => s.City).Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.Hostels.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.Hostels.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateHostelAsync(UpdateHostelAc updateHostelAc, int instituteId)
        {
            var componentGroups = await iMSDbContext.Hostels.Where(x => x.InstituteId == instituteId && x.Id != updateHostelAc.Id).ToListAsync();
            var isDuplicated = componentGroups.Any(x => x.Code.ToLowerInvariant() == updateHostelAc.Code.ToLowerInvariant() && x.Name.ToLowerInvariant() == updateHostelAc.Name.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Hostel, please use unique code" };
            else
            {
                var hostel = await iMSDbContext.Hostels.FirstAsync(x => x.Id == updateHostelAc.Id);
                hostel.Name = updateHostelAc.Name;
                hostel.Code = updateHostelAc.Code;
                hostel.HostelType = updateHostelAc.HostelType;
                hostel.ContactMobile = updateHostelAc.ContactMobile;
                hostel.ContactPerson = updateHostelAc.ContactPerson;
                hostel.CountryId = updateHostelAc.CountryId;
                hostel.StateId = updateHostelAc.StateId;
                hostel.CityId = updateHostelAc.CityId;
                hostel.ZipCode = updateHostelAc.ZipCode;
                hostel.Address1 = updateHostelAc.Address1;
                hostel.Address2 = updateHostelAc.Address2;
                hostel.HostelCautionDeposit = updateHostelAc.HostelCautionDeposit;
                hostel.PlaceName = updateHostelAc.PlaceName;
                hostel.Status = updateHostelAc.Status;
                iMSDbContext.Hostels.Update(hostel);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Hostel updated successfully" };
            }
        }
        #endregion
    }
}
