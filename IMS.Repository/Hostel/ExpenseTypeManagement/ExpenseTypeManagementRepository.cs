using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.Hostel.ExpenseTypeManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.ExpenseTypeManagement
{
    public class ExpenseTypeManagementRepository : IExpenseTypeManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ExpenseTypeManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<SharedLookUpResponse> AddExpenseTypeAsync(AddExpenseType addExpenseType, int institudeId)
        {
            if (!await iMSDbContext.ExpenseTypes.AnyAsync(x => x.InstituteId == institudeId && x.Code.ToLowerInvariant() == addExpenseType.Code.ToLowerInvariant()))
            {
                var expenseType = new ExpenseType()
                {
                    InstituteId = institudeId,
                    Name = addExpenseType.Name,
                    Code = addExpenseType.Code,
                    Description = addExpenseType.Description,
                    Active = addExpenseType.Active,
                    CreatedOn = DateTime.UtcNow
                };
                iMSDbContext.ExpenseTypes.Add(expenseType);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Expense Type added successfully" };
            }
            else
            {
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Expense Type with same code is already existed" };
            }
        }

        public async Task<List<ExpenseType>> GetExpenseTypesAsync(int instituteId)
        {
            return (await iMSDbContext.ExpenseTypes.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        public async Task MigratePreviousDataAsync()
        {
            var data = await iMSDbContext.ExpenseTypes.ToListAsync();
            data.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            iMSDbContext.ExpenseTypes.UpdateRange(data);
            await iMSDbContext.SaveChangesAsync();
        }

        public async Task<SharedLookUpResponse> UpdateExpenseTypeAsync(UpdateExpenseType updateExpenseType, int instituteId)
        {
            var expenseTypes = await iMSDbContext.ExpenseTypes.Where(x => x.InstituteId == instituteId && x.Id != updateExpenseType.Id).ToListAsync();
            var isDuplicated = expenseTypes.Any(x => x.Code.ToLowerInvariant() == updateExpenseType.Code.ToLowerInvariant());
            if (isDuplicated)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate Code of Expense Type, please use unique code" };
            else
            {
                var expenseType = await iMSDbContext.ExpenseTypes.FirstAsync(x => x.Id == updateExpenseType.Id);
                expenseType.Name = updateExpenseType.Name;
                expenseType.Code = updateExpenseType.Code;
                expenseType.Description = updateExpenseType.Description;
                expenseType.Active = updateExpenseType.Active;
                expenseType.CreatedOn = DateTime.UtcNow;
                iMSDbContext.ExpenseTypes.Update(expenseType);
                await iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Expense Type updated successfully" };
            }
        }
        #endregion
    }
}
