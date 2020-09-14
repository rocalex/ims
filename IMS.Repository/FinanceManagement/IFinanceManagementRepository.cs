using IMS.DomainModel.ApplicationClasses.FinanceManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.FinanceManagement
{
    public interface IFinanceManagementRepository
    {
        #region Chart of Accounts

        /// <summary>
        /// Method for fetching the list of all chart of accounts - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<ChartOfAccountsListViewAC>> GetChartOfAccountsListAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for fetching a chart of account by id - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="chartOfAccountId"></param>
        /// <returns></returns>
        Task<FinanceChartOfAccounts> GetChartOfAccountByIdAsync(int currentUserInstituteId, int chartOfAccountId);

        /// <summary>
        /// Method for fetching the list of all parent chart of accounts - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<FinanceChartOfAccounts>> GetParentChartOfAccountsListAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for adding a new chart of account - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="newChartOfAccount"></param>
        /// <returns></returns>
        Task<dynamic> AddNewChartOfAccountAsync(int currentUserInstituteId, FinanceChartOfAccounts newChartOfAccount, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating an existing chart of account - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedChartOfAccount"></param>
        /// <returns></returns>
        Task<dynamic> UpdateChartOfAccountAsync(int currentUserInstituteId, FinanceChartOfAccounts updatedChartOfAccount, ApplicationUser currentUser);

        #endregion

        #region Basic receipts

        /// <summary>
        /// Method for fetching the initial details before adding new receipt - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> GetFinanceReceiptCreationInitialDataAsync(int currentUserInstituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching the list of all financial receipts - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<FinanceReceipt>> GetFinanceReceiptsListAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for fetching a finance receipt by id - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="financeReceiptId"></param>
        /// <returns></returns>
        Task<FinanceReceipt> GetFinanceReceiptByIdAsync(int currentUserInstituteId, int financeReceiptId);

        /// <summary>
        /// Method for adding new finance receipt - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddNewFinancialReceiptAsync(int currentUserInstituteId, ApplicationUser currentUser, FinanceReceipt addedFinanceReceipt);

        /// <summary>
        /// Method for updating an existing finance receipt - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<dynamic> UpdateFinanceReceiptAsync(int currentUserInstituteId, FinanceReceipt updatedFinanceReceipt);

        #endregion

        #region Basic payments

        /// <summary>
        /// Method for fetching the initial details before adding new payment - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> GetFinancePaymentCreationInitialDataAsync(int currentUserInstituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching the list of all finance payments - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<FinancePayment>> GetAllFinancePaymentsAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for fetching the details of a finance payment by id - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="financePaymentId"></param>
        /// <returns></returns>
        Task<FinancePayment> GetFinancePaymentByIdAsync(int currentUserInstituteId, int financePaymentId);

        /// <summary>
        /// Method for adding new finance payment - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <param name="addedFinancePayment"></param>
        /// <returns></returns>
        Task<dynamic> AddNewFinancePaymentAsync(int currentUserInstituteId, ApplicationUser currentUser, FinancePayment addedFinancePayment);

        /// <summary>
        /// Method for updating an existing finance payment - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedFinancePayment"></param>
        /// <returns></returns>
        Task<dynamic> UpdateFinancePaymentAsync(int currentUserInstituteId, FinancePayment updatedFinancePayment);

        #endregion

        #region Payment types

        /// <summary>
        /// Method for fetching the list of all payment types - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<FinancePaymentType>> GetAllPaymentTypesAsync(int currentUserInstituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method for fetchint the payment type by id - RS
        /// </summary>
        /// <param name="paymentTypeId"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<FinancePaymentType> GetPaymentTypeByIdAsync(int paymentTypeId, int currentUserInstituteId);

        /// <summary>
        /// Method for adding new payment type - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <param name="addedPaymentType"></param>
        /// <returns></returns>
        Task<dynamic> AddNewPaymentTypeAsync(int currentUserInstituteId, ApplicationUser currentUser, FinancePaymentType addedPaymentType);

        /// <summary>
        /// Method for updating an existing payment type - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedPaymentType"></param>
        /// <returns></returns>
        Task<dynamic> UpdatePaymentTypeAsync(int currentUserInstituteId, FinancePaymentType updatedPaymentType);

        #endregion
    }
}
