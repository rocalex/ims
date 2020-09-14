using IMS.DomainModel.ApplicationClasses.Hostel.ExpenseTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace IMS.Repository.Hostel.ExpenseTypeManagement
{
    public interface IExpenseTypeManagementRepository
    {
        Task<SharedLookUpResponse> AddExpenseTypeAsync(AddExpenseType addExpenseType, int institudeId);

        Task<List<ExpenseType>> GetExpenseTypesAsync(int instituteId);

        Task<SharedLookUpResponse> UpdateExpenseTypeAsync(UpdateExpenseType updateExpenseType, int instituteId);

        Task MigratePreviousDataAsync();
    }
}
