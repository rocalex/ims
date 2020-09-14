using IMS.DomainModel.ApplicationClasses.Hostel.DailyExpenseManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.Hostel.DailyExpenseManagement
{
    public class DailyExpenseManagementRepository : IDailyExpenseManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public DailyExpenseManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }
        #endregion

        #region Public Methods
        public async Task<dynamic> AddComponentAsync(AddDailyExpense[] addComponents, int instituteId)
        {
            var oldEntries = await iMSDbContext.DailyExpenses.Where(x => x.MessManageId == addComponents[0].MessManageId && x.ExpenseTypeId == addComponents[0].ExpenseTypeId && x.InstituteId == instituteId).ToListAsync();
            iMSDbContext.RemoveRange(oldEntries);
            await iMSDbContext.SaveChangesAsync();
            var results = new List<dynamic>();
            foreach (AddDailyExpense addComponent in addComponents)
            {
                if (!string.IsNullOrEmpty(addComponent.BillNo) && !string.IsNullOrEmpty(addComponent.Particulars) && addComponent.Amount != 0)
                {
                    var dailyExpense = new DailyExpense()
                    {
                        InstituteId = instituteId,
                        MessManageId = addComponent.MessManageId,
                        ExpenseTypeId = addComponent.ExpenseTypeId,
                        Amount = addComponent.Amount,
                        Description = addComponent.Description,
                        BillNo = addComponent.BillNo,
                        ProofUrl = addComponent.ProofUrl,
                        Particulars = addComponent.Particulars,
                        Date = addComponent.Date
                    };
                    iMSDbContext.DailyExpenses.Add(dailyExpense);
                    await iMSDbContext.SaveChangesAsync();
                    results.Add(dailyExpense);
                } else
                {
                    results.Add(addComponent);
                }
            }
            return new { HasError = false, Result = results, Message = "Daily Expenses added successfully" };
        }

        public async Task<List<DailyExpense>> GetComponentsAsync(int instituteId, SearchDailyExpenseRequest request)
        {
            var results = new List<DailyExpense>();
            var messManage = await iMSDbContext.MessManages.FirstAsync(x => x.Id == request.MessManageId);
            foreach (DateTime day in EachDay(messManage.FromDate, messManage.ToDate))
            {
                var isExist = await iMSDbContext.DailyExpenses.AnyAsync(x => x.MessManageId == request.MessManageId && x.ExpenseTypeId == request.ExpenseTypeId && x.InstituteId == instituteId && x.Date == day);
                if(isExist)
                {
                    results.Add(await iMSDbContext.DailyExpenses.Include(x => x.MessManage).FirstAsync(x => x.MessManageId == request.MessManageId && x.ExpenseTypeId == request.ExpenseTypeId && x.InstituteId == instituteId && x.Date == day));
                }
                else
                {
                    results.Add(new DailyExpense()
                    {
                        InstituteId = instituteId,
                        MessManageId = request.MessManageId,
                        ExpenseTypeId = request.ExpenseTypeId,
                        Date = day
                    });
                }
            }
            return results;
        }
        #endregion

        public IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }
    }
}
