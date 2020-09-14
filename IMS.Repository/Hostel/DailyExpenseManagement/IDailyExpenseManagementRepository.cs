using IMS.DomainModel.ApplicationClasses.Hostel.DailyExpenseManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.DailyExpenseManagement
{
    public interface IDailyExpenseManagementRepository
    {
        Task<dynamic> AddComponentAsync(AddDailyExpense[] addComponent, int instituteId);

        Task<List<DailyExpense>> GetComponentsAsync(int instituteId, SearchDailyExpenseRequest request);
    }
}
