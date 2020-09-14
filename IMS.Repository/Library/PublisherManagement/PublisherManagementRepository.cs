using IMS.DomainModel.ApplicationClasses.Library.BookManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Repository.Library.PublisherManagement
{
    public class PublisherManagementRepository : IPublisherManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public PublisherManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region
        public async Task<int> AddPublisherAsync(AddPublisher addPublisher)
        {
            var publisher = new Publisher()
            {
                Name = addPublisher.Name,
                Email = addPublisher.Email,
                Contract = addPublisher.Contract,
                Address = addPublisher.Address
            };
            iMSDbContext.Publishers.Add(publisher);
            await iMSDbContext.SaveChangesAsync();
            return publisher.Id;
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.Publishers.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Contract))
                    x.Contract = x.Name;
            });
            iMSDbContext.Publishers.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdatePublisherAsync(UpdatePublisher updatePublisher)
        {
            var publishers = await iMSDbContext.Publishers.Where(x => x.Id != updatePublisher.Id).ToListAsync();
            var isDuplicated = publishers.Any(x => x.Name.ToLowerInvariant() == updatePublisher.Name.ToLowerInvariant() && x.Email.ToLowerInvariant() == updatePublisher.Email.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Name and Email of Publisher, please use unique code" };
            else
            {
                var publisher = await iMSDbContext.Publishers.FirstAsync(x => x.Id == updatePublisher.Id);
                publisher.Name = updatePublisher.Name;
                publisher.Email = updatePublisher.Email;
                publisher.Address = updatePublisher.Address;
                publisher.Contract = updatePublisher.Contract;
                iMSDbContext.Publishers.Update(publisher);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Publisher updated successfully" };
            }
        }
        #endregion
    }
}
