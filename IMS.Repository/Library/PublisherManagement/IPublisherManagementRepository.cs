using IMS.DomainModel.ApplicationClasses.Library.BookManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Library.PublisherManagement
{
    public interface IPublisherManagementRepository
    {
        Task<int> AddPublisherAsync(AddPublisher addPublisher);


        Task<SharedLookUpResponse> UpdatePublisherAsync(UpdatePublisher updatePublisher);

        Task MigratePreviousDataAsync();
    }
}
