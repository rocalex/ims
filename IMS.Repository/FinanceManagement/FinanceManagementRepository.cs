using IMS.DomainModel.ApplicationClasses.FinanceManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.AppSettings;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.FinanceManagement
{
    public class FinanceManagementRepository : IFinanceManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly SystemRoles _systemRoles;
        private readonly InitialFinancePaymentTypes _initialFinancePaymentTypes;

        #endregion

        #region Constructor

        public FinanceManagementRepository(IMSDbContext imsDbContext,
             IOptions<SystemRoles> systemRoles,
             IOptions<InitialFinancePaymentTypes> initialFinancePaymentTypes)
        {
            _imsDbContext = imsDbContext;
            _systemRoles = systemRoles.Value;
            _initialFinancePaymentTypes = initialFinancePaymentTypes.Value;
        }

        #endregion

        #region Public methods

        #region Chart of Accounts

        /// <summary>
        /// Method for fetching the list of all chart of accounts - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<ChartOfAccountsListViewAC>> GetChartOfAccountsListAsync(int currentUserInstituteId)
        {
            List<ChartOfAccountTypeEnum> chartOfAccountTypeEnumDetailsList = EnumHelperService.GetEnumValuesList<ChartOfAccountTypeEnum>();
            List<FinanceChartOfAccounts> chartsOfAccountsList = await _imsDbContext.FinanceChartOfAccounts
                .Where(x => x.InstituteId == currentUserInstituteId)
                .Include(x => x.Institute)
                .ToListAsync();

            List<ChartOfAccountsListViewAC> chartOfAccountsListView = new List<ChartOfAccountsListViewAC>();

            foreach (ChartOfAccountTypeEnum chartOfAccountTypeEnum in chartOfAccountTypeEnumDetailsList)
            {
                // Set account types and parent accounts
                ChartOfAccountsListViewAC chartOfAccountsListViewAc = new ChartOfAccountsListViewAC
                {
                    ChartOfAccountTypeEnum = chartOfAccountTypeEnum,
                    ChartOfAccountTypeEnumString = EnumHelperService.GetDescription(chartOfAccountTypeEnum),
                    ParentChartOfAccounts = MapChartOfAccountToApplicationClassList(chartsOfAccountsList.FindAll(x => x.AccountType == chartOfAccountTypeEnum && x.IsParent))
                };

                // Set child accounts
                foreach (ChartOfAccountsAC parentChartOfAccount in chartOfAccountsListViewAc.ParentChartOfAccounts)
                {
                    parentChartOfAccount.ChildChartOfAccounts = MapChartOfAccountToApplicationClassList(
                        chartsOfAccountsList.FindAll(x => x.AccountType == chartOfAccountTypeEnum && !x.IsParent && x.ParentGroupId == parentChartOfAccount.Id));
                }

                chartOfAccountsListView.Add(chartOfAccountsListViewAc);
            }

            return chartOfAccountsListView;
        }

        /// <summary>
        /// Method for fetching a chart of account by id - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="chartOfAccountId"></param>
        /// <returns></returns>
        public async Task<FinanceChartOfAccounts> GetChartOfAccountByIdAsync(int currentUserInstituteId, int chartOfAccountId)
        {
            return await _imsDbContext.FinanceChartOfAccounts
                .Include(x => x.Institute)
                .Include(x => x.ChildChartOfAccounts)
                .FirstOrDefaultAsync(x => x.InstituteId == currentUserInstituteId && x.Id == chartOfAccountId);
        }

        /// <summary>
        /// Method for fetching the list of all parent chart of accounts - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<FinanceChartOfAccounts>> GetParentChartOfAccountsListAsync(int currentUserInstituteId)
        {
            return await _imsDbContext.FinanceChartOfAccounts
                .Where(x => x.InstituteId == currentUserInstituteId && x.IsParent)
                .Include(x => x.Institute)
                .ToListAsync();
        }

        /// <summary>
        /// Method for adding a new chart of account - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="newChartOfAccount"></param>
        /// <returns></returns>
        public async Task<dynamic> AddNewChartOfAccountAsync(int currentUserInstituteId, FinanceChartOfAccounts newChartOfAccount, ApplicationUser currentUser)
        {
            if (await _imsDbContext.FinanceChartOfAccounts.AnyAsync(x => x.InstituteId == currentUserInstituteId
                && x.Code.ToLowerInvariant().Equals(newChartOfAccount.Code.ToLowerInvariant())))
            {
                return new { Message = "Chart of Account exist with this code", HasError = true };
            }
            else if (await _imsDbContext.FinanceChartOfAccounts.AnyAsync(x => x.InstituteId == currentUserInstituteId
                && x.Name.ToLowerInvariant().Equals(newChartOfAccount.Name.ToLowerInvariant())))
            {
                return new { Message = "Chart of Account exist with this name", HasError = true };
            }

            newChartOfAccount.CreatedOn = DateTime.UtcNow;
            newChartOfAccount.CreatedBy = currentUser.Id;
            newChartOfAccount.InstituteId = currentUserInstituteId;


            _imsDbContext.FinanceChartOfAccounts.Add(newChartOfAccount);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Chart of Accounts added successfully", HasError = false };
        }

        /// <summary>
        /// Method for updating an existing chart of account - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedChartOfAccount"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateChartOfAccountAsync(int currentUserInstituteId, FinanceChartOfAccounts updatedChartOfAccount, ApplicationUser currentUser)
        {
            List<FinanceChartOfAccounts> udpatedFinanceChartOfAccounts = new List<FinanceChartOfAccounts>();
            List<FinanceChartOfAccounts> udpatedChildChartOfAccounts = new List<FinanceChartOfAccounts>();

            FinanceChartOfAccounts existingChartOfAccount = await _imsDbContext.FinanceChartOfAccounts
                .FirstOrDefaultAsync(x => x.Id == updatedChartOfAccount.Id && x.InstituteId == currentUserInstituteId);

            if (existingChartOfAccount == null)
            {
                return new { Message = "No Chart of Account exist with this id", HasError = true };
            }
            else if (await _imsDbContext.FinanceChartOfAccounts.AnyAsync(x => x.InstituteId == currentUserInstituteId
                && x.Id != updatedChartOfAccount.Id
                && x.Code.ToLowerInvariant().Equals(updatedChartOfAccount.Code.ToLowerInvariant())))
            {
                return new { Message = "Chart of Account exist with this code", HasError = true };
            }
            else if (await _imsDbContext.FinanceChartOfAccounts.AnyAsync(x => x.InstituteId == currentUserInstituteId
                && x.Id != updatedChartOfAccount.Id
                && x.Name.ToLowerInvariant().Equals(updatedChartOfAccount.Name.ToLowerInvariant())))
            {
                return new { Message = "Chart of Account exist with this name", HasError = true };
            }
            else if (existingChartOfAccount.IsParent != updatedChartOfAccount.IsParent && existingChartOfAccount.Id == updatedChartOfAccount.ParentGroupId)
            {
                return new { Message = "Can not set the chart of account as parent of itself", HasError = true };
            }

            bool isAccountTypeChanged = (existingChartOfAccount.IsParent && existingChartOfAccount.AccountType != updatedChartOfAccount.AccountType);

            existingChartOfAccount.Name = updatedChartOfAccount.Name;
            existingChartOfAccount.AliasName = updatedChartOfAccount.AliasName;
            existingChartOfAccount.AccountType = updatedChartOfAccount.AccountType;
            existingChartOfAccount.Description = updatedChartOfAccount.Description;
            existingChartOfAccount.IsActive = updatedChartOfAccount.IsActive;
            existingChartOfAccount.IsParent = updatedChartOfAccount.IsParent;
            existingChartOfAccount.ParentGroupId = !existingChartOfAccount.IsParent ? updatedChartOfAccount.ParentGroupId : null;

            // Update child accounts' account type
            if (isAccountTypeChanged)
            {
                List<FinanceChartOfAccounts> childAccountsList = await _imsDbContext.FinanceChartOfAccounts.Where(x => x.ParentGroupId == existingChartOfAccount.Id).ToListAsync();
                childAccountsList.ForEach(x =>
                {
                    x.AccountType = existingChartOfAccount.AccountType;
                });
                udpatedChildChartOfAccounts = childAccountsList;
            }

            _imsDbContext.FinanceChartOfAccounts.Update(existingChartOfAccount);
            _imsDbContext.FinanceChartOfAccounts.UpdateRange(udpatedChildChartOfAccounts);
            await _imsDbContext.SaveChangesAsync();
            return new { Message = "Chart of Accounts updated successfully", HasError = false };
        }

        #endregion

        #region Basic receipts

        /// <summary>
        /// Method for fetching the initial details before adding new receipt - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> GetFinanceReceiptCreationInitialDataAsync(int currentUserInstituteId, ApplicationUser currentUser)
        {
            List<FinanceChartOfAccounts> incomeChartOfAccountsList = await _imsDbContext.FinanceChartOfAccounts
                .Where(x => x.AccountType == ChartOfAccountTypeEnum.Income && x.IsActive)
                .Include(x => x.Institute)
                .ToListAsync();

            List<UserAc> systemUsersList = new List<UserAc>();
            List<ApplicationUser> usersList = await _imsDbContext.Users.ToListAsync();
            foreach (ApplicationUser user in usersList)
            {
                IdentityRole roleName = null;
                IdentityUserRole<string> userRoleMapping = await _imsDbContext.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);
                if (userRoleMapping != null)
                    roleName = await _imsDbContext.Roles.FirstAsync(x => x.Id == userRoleMapping.RoleId);

                if (roleName == null || !roleName.Name.ToLowerInvariant().Equals(_systemRoles.Roles[0].ToLowerInvariant()))
                {
                    Institute userInstitute = (await _imsDbContext.UserInstituteMappings.Include(x => x.Institute)
                        .FirstOrDefaultAsync(x => x.UserId.Equals(user.Id) && x.InstituteId == currentUserInstituteId))?.Institute;
                    systemUsersList.Add(new UserAc
                    {
                        Id = user.Id,
                        Name = user.Name,
                        InstituteId = userInstitute?.Id,
                        Institute = userInstitute?.Name,
                        Email = user.Email
                    });
                }
            }

            return new
            {
                IncomeChartOfAccountsList = incomeChartOfAccountsList,
                SystemUsersList = systemUsersList,
                LoggedInUserId = currentUser.Id
            };
        }

        /// <summary>
        /// Method for fetching the list of all financial receipts - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<FinanceReceipt>> GetFinanceReceiptsListAsync(int currentUserInstituteId)
        {
            return await _imsDbContext.FinanceReceipts
                .Where(x => x.InstituteId == currentUserInstituteId)
                .Include(x => x.ReceivedByUser)
                .Include(x => x.ReceivedFromChartOfAccount)
                .ToListAsync();
        }

        /// <summary>
        /// Method for fetching a finance receipt by id - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="financeReceiptId"></param>
        /// <returns></returns>
        public async Task<FinanceReceipt> GetFinanceReceiptByIdAsync(int currentUserInstituteId, int financeReceiptId)
        {
            return await _imsDbContext.FinanceReceipts
                .Include(x => x.ReceivedByUser)
                .Include(x => x.ReceivedFromChartOfAccount)
                .FirstOrDefaultAsync(x => x.Id == financeReceiptId && x.InstituteId == currentUserInstituteId);
        }

        /// <summary>
        /// Method for adding new finance receipt - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddNewFinancialReceiptAsync(int currentUserInstituteId, ApplicationUser currentUser, FinanceReceipt addedFinanceReceipt)
        {
            if (await _imsDbContext.FinanceReceipts.AnyAsync(x => x.Code.ToLowerInvariant().Equals(addedFinanceReceipt.Code.ToLowerInvariant()) && x.InstituteId == currentUserInstituteId))
            {
                return new { Message = "Finance Receipt already exists with this code", HasError = true };
            }

            addedFinanceReceipt.InstituteId = currentUserInstituteId;
            addedFinanceReceipt.CreatedOn = DateTime.UtcNow;
            addedFinanceReceipt.CreatedBy = currentUser.Id;
            _imsDbContext.FinanceReceipts.Add(addedFinanceReceipt);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Finance Receipt added successfully", HasError = false };
        }

        /// <summary>
        /// Method for updating an existing finance receipt - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateFinanceReceiptAsync(int currentUserInstituteId, FinanceReceipt updatedFinanceReceipt)
        {
            FinanceReceipt existingReceipt = await GetFinanceReceiptByIdAsync(currentUserInstituteId, updatedFinanceReceipt.Id);

            if (existingReceipt == null)
            {
                return new { Message = "No finance receipt exists with this id", HasError = true };
            }
            else if (await _imsDbContext.FinanceReceipts.AnyAsync(x => x.Id != updatedFinanceReceipt.Id
                 && x.InstituteId == currentUserInstituteId && x.Code.ToLowerInvariant().Equals(updatedFinanceReceipt.Code.ToLowerInvariant())))
            {
                return new { Message = "Finance Receipt already exists with this code", HasError = true };
            }

            existingReceipt.Code = updatedFinanceReceipt.Code;
            existingReceipt.Amount = updatedFinanceReceipt.Amount;
            existingReceipt.ReceiptDate = updatedFinanceReceipt.ReceiptDate;
            existingReceipt.ReceivedBy = updatedFinanceReceipt.ReceivedBy;
            existingReceipt.ReceivedFrom = updatedFinanceReceipt.ReceivedFrom;
            existingReceipt.Remarks = updatedFinanceReceipt.Remarks;
            _imsDbContext.FinanceReceipts.Update(existingReceipt);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Finance Receipt updated successfully", HasError = false };
        }

        #endregion

        #region Basic payments

        /// <summary>
        /// Method for fetching the initial details before adding new payment - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> GetFinancePaymentCreationInitialDataAsync(int currentUserInstituteId, ApplicationUser currentUser)
        {
            List<FinanceChartOfAccounts> expenseChartOfAccountsList = await _imsDbContext.FinanceChartOfAccounts
                .Where(x => x.AccountType == ChartOfAccountTypeEnum.Expense && x.IsActive)
                .Include(x => x.Institute)
                .ToListAsync();

            List<FinancePaymentType> paymentTypesList = await GetAllPaymentTypesAsync(currentUserInstituteId, currentUser);

            List<UserAc> systemUsersList = new List<UserAc>();
            List<ApplicationUser> usersList = await _imsDbContext.Users.ToListAsync();
            foreach (ApplicationUser user in usersList)
            {
                IdentityRole roleName = null;
                IdentityUserRole<string> userRoleMapping = await _imsDbContext.UserRoles.FirstOrDefaultAsync(x => x.UserId == user.Id);
                if (userRoleMapping != null)
                    roleName = await _imsDbContext.Roles.FirstAsync(x => x.Id == userRoleMapping.RoleId);

                if (roleName == null || !roleName.Name.ToLowerInvariant().Equals(_systemRoles.Roles[0].ToLowerInvariant()))
                {
                    Institute userInstitute = (await _imsDbContext.UserInstituteMappings.Include(x => x.Institute)
                        .FirstOrDefaultAsync(x => x.UserId.Equals(user.Id) && x.InstituteId == currentUserInstituteId))?.Institute;
                    systemUsersList.Add(new UserAc
                    {
                        Id = user.Id,
                        Name = user.Name,
                        InstituteId = userInstitute?.Id,
                        Institute = userInstitute?.Name,
                        Email = user.Email
                    });
                }
            }

            return new
            {
                ExpenseChartOfAccountsList = expenseChartOfAccountsList,
                SystemUsersList = systemUsersList,
                LoggedInUserId = currentUser.Id,
                PaymentTypesList = paymentTypesList
            };
        }

        /// <summary>
        /// Method for fetching the list of all finance payments - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<FinancePayment>> GetAllFinancePaymentsAsync(int currentUserInstituteId)
        {
            return await _imsDbContext.FinancePayments
                .Where(x => x.InstituteId == currentUserInstituteId)
                .Include(x => x.PaidToChartOfAccounts)
                .Include(x => x.PaymentByUser)
                .Include(x => x.FinancePaymentType)
                .ToListAsync();
        }

        /// <summary>
        /// Method for fetching the details of a finance payment by id - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="financePaymentId"></param>
        /// <returns></returns>
        public async Task<FinancePayment> GetFinancePaymentByIdAsync(int currentUserInstituteId, int financePaymentId)
        {
            return await _imsDbContext.FinancePayments
                .Include(x => x.PaidToChartOfAccounts)
                .Include(x => x.PaymentByUser)
                .Include(x => x.FinancePaymentType)
                .FirstOrDefaultAsync(x => x.Id == financePaymentId && x.InstituteId == currentUserInstituteId);
        }

        /// <summary>
        /// Method for adding new finance payment - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <param name="addedFinancePayment"></param>
        /// <returns></returns>
        public async Task<dynamic> AddNewFinancePaymentAsync(int currentUserInstituteId, ApplicationUser currentUser, FinancePayment addedFinancePayment)
        {
            if (await _imsDbContext.FinancePayments.AnyAsync(x => x.InstituteId == currentUserInstituteId && x.Code.ToLowerInvariant().Equals(addedFinancePayment.Code.ToLowerInvariant())))
            {
                return new { Message = "Finance payment already exist with this code", HasError = true };
            }

            addedFinancePayment.CreatedBy = currentUser.Id;
            addedFinancePayment.CreatedOn = DateTime.UtcNow;
            addedFinancePayment.InstituteId = currentUserInstituteId;
            _imsDbContext.Add(addedFinancePayment);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Finance payment added successfully", HasError = false };
        }

        /// <summary>
        /// Method for updating an existing finance payment - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedFinancePayment"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateFinancePaymentAsync(int currentUserInstituteId, FinancePayment updatedFinancePayment)
        {
            FinancePayment existingFinancePayment = await _imsDbContext.FinancePayments
                .FirstOrDefaultAsync(x => x.Id == updatedFinancePayment.Id && x.InstituteId == currentUserInstituteId);

            if (existingFinancePayment == null)
            {
                return new { Message = "No finance payment exists with this id", HasError = true };
            }
            else if (await _imsDbContext.FinancePayments.AnyAsync(x => x.InstituteId == currentUserInstituteId
                && x.Id != updatedFinancePayment.Id
                && x.Code.ToLowerInvariant().Equals(updatedFinancePayment.Code.ToLowerInvariant())))
            {
                return new { Message = "Finance payment already exist with this code", HasError = true };
            }

            existingFinancePayment.Amount = updatedFinancePayment.Amount;
            existingFinancePayment.Code = updatedFinancePayment.Code;
            existingFinancePayment.PaidToId = updatedFinancePayment.PaidToId;
            existingFinancePayment.PaymentById = updatedFinancePayment.PaymentById;
            existingFinancePayment.PaymentDate = updatedFinancePayment.PaymentDate;
            existingFinancePayment.PaymentReference = updatedFinancePayment.PaymentReference;
            existingFinancePayment.PaymentTypeId = updatedFinancePayment.PaymentTypeId;
            existingFinancePayment.ReferenceCode = updatedFinancePayment.ReferenceCode;
            existingFinancePayment.ReferenceDate = updatedFinancePayment.ReferenceDate;
            _imsDbContext.FinancePayments.Update(existingFinancePayment);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Finance payment updated successfully", HasError = false };
        }

        #endregion

        #region Payment types

        /// <summary>
        /// Method for fetching the list of all payment types - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<List<FinancePaymentType>> GetAllPaymentTypesAsync(int currentUserInstituteId, ApplicationUser currentUser)
        {
            await SeedInitialPaymentTypes(currentUserInstituteId, currentUser);

            return await _imsDbContext.FinancePaymentTypes
                .Where(x => x.InstituteId == currentUserInstituteId)
                .ToListAsync();
        }

        /// <summary>
        /// Method for fetchint the payment type by id - RS
        /// </summary>
        /// <param name="paymentTypeId"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<FinancePaymentType> GetPaymentTypeByIdAsync(int paymentTypeId, int currentUserInstituteId)
        {
            return await _imsDbContext.FinancePaymentTypes
                .FirstOrDefaultAsync(x => x.Id == paymentTypeId && x.InstituteId == currentUserInstituteId);
        }

        /// <summary>
        /// Method for adding new payment type - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="currentUser"></param>
        /// <param name="addedPaymentType"></param>
        /// <returns></returns>
        public async Task<dynamic> AddNewPaymentTypeAsync(int currentUserInstituteId, ApplicationUser currentUser, FinancePaymentType addedPaymentType)
        {
            if (await _imsDbContext.FinancePaymentTypes.AnyAsync(x => x.InstituteId == currentUserInstituteId && x.Code.ToLowerInvariant().Equals(addedPaymentType.Code.ToLowerInvariant())))
            {
                return new { HasError = true, Message = "Payment Type with the same code already exists" };
            }

            addedPaymentType.InstituteId = currentUserInstituteId;
            addedPaymentType.CreatedOn = DateTime.UtcNow;
            addedPaymentType.CreatedBy = currentUser.Id;
            addedPaymentType.Status = true;
            _imsDbContext.FinancePaymentTypes.Add(addedPaymentType);
            await _imsDbContext.SaveChangesAsync();

            return new { HasError = false, Message = "Payment Type added successfully" };
        }

        /// <summary>
        /// Method for updating an existing payment type - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedPaymentType"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdatePaymentTypeAsync(int currentUserInstituteId, FinancePaymentType updatedPaymentType)
        {
            FinancePaymentType existingPaymentType = await _imsDbContext.FinancePaymentTypes
                .FirstOrDefaultAsync(x => x.Id == updatedPaymentType.Id && x.InstituteId == currentUserInstituteId);

            if (existingPaymentType == null)
            {
                return new { HasError = true, Message = "No payment type exists with this id" };
            }
            else if (await _imsDbContext.FinancePaymentTypes.AnyAsync(x =>
                x.Id != updatedPaymentType.Id && x.InstituteId == currentUserInstituteId
                && x.Code.ToLowerInvariant().Equals(updatedPaymentType.Code.ToLowerInvariant())))
            {
                return new { HasError = true, Message = "Payment Type with the same code already exists" };
            }

            existingPaymentType.Name = updatedPaymentType.Name;
            existingPaymentType.Code = updatedPaymentType.Code;
            existingPaymentType.Description = updatedPaymentType.Description;
            existingPaymentType.Status = updatedPaymentType.Status;
            _imsDbContext.FinancePaymentTypes.Update(existingPaymentType);
            await _imsDbContext.SaveChangesAsync();

            return new { HasError = false, Message = "Payment Type updated successfully" };
        }

        #endregion

        #endregion

        #region Private methods

        /// <summary>
        /// Method for seeding initial payment type data if no data exists - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        private async Task SeedInitialPaymentTypes(int currentUserInstituteId, ApplicationUser currentUser)
        {
            if (await _imsDbContext.FinancePaymentTypes.CountAsync() == 0)
            {
                List<string> initialPaymentTypeData = _initialFinancePaymentTypes.InitialPaymentTypeData.ToList();
                List<FinancePaymentType> initialPaymentTypes = new List<FinancePaymentType>();
                foreach (string paymentType in initialPaymentTypeData)
                {
                    initialPaymentTypes.Add(new FinancePaymentType
                    {
                        Code = paymentType,
                        Name = paymentType,
                        CreatedOn = DateTime.UtcNow,
                        InstituteId = currentUserInstituteId,
                        Status = true,
                        CreatedBy = currentUser.Id
                    });
                }
                _imsDbContext.FinancePaymentTypes.AddRange(initialPaymentTypes);
                await _imsDbContext.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Method for mapping a list of Chart Of Account to application class's list
        /// </summary>
        /// <param name="chartOfAccountsList"></param>
        /// <returns></returns>
        private List<ChartOfAccountsAC> MapChartOfAccountToApplicationClassList(List<FinanceChartOfAccounts> chartOfAccountsList)
        {
            List<ChartOfAccountsAC> chartOfAccountsAcList = new List<ChartOfAccountsAC>();
            foreach (FinanceChartOfAccounts chartOfAccount in chartOfAccountsList)
            {
                chartOfAccountsAcList.Add(new ChartOfAccountsAC
                {
                    Id = chartOfAccount.Id,
                    AccountType = chartOfAccount.AccountType,
                    AccountTypeName = EnumHelperService.GetDescription(chartOfAccount.AccountType),
                    AliasName = chartOfAccount.AliasName,
                    Code = chartOfAccount.Code,
                    Description = chartOfAccount.Description,
                    InstituteId = chartOfAccount.InstituteId,
                    IsActive = chartOfAccount.IsActive,
                    IsParent = chartOfAccount.IsParent,
                    Name = chartOfAccount.Name,
                    ParentChartOfAccountName = chartOfAccount.ParentChartOfAccount?.Name,
                    ParentGroupId = chartOfAccount.ParentGroupId
                });
            }
            return chartOfAccountsAcList;
        }

        #endregion
    }
}
