using IMS.DomainModel.ApplicationClasses.FeeRefundManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IMS.Repository.FeeRefundManagement
{
    public class FeeRefundManagementRepository : IFeeRefundManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        #endregion

        #region Constructor
        public FeeRefundManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add fee refund - SS
        /// </summary>
        /// <param name="addFeeRefund">fee refund</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<FeeRefundManagementResponse> AddFeeRefundAsync(AddFeeRefundManagementAc addFeeRefund, ApplicationUser loggedInUser)
        {
            await semaphore.WaitAsync();
            try
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                if (!await _iMSDbContext.StudentBasicInformation.AnyAsync(x => x.Id == addFeeRefund.StudentId && x.InstituteId == instituteId))
                    return new FeeRefundManagementResponse() { HasError = true, Message = "Student not found", ErrorType = FeeRefundManagementErrorType.StudentId };
                else if (!await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.InstituteId == instituteId && x.UserId == addFeeRefund.IssuedById))
                    return new FeeRefundManagementResponse() { HasError = true, Message = "Issued-by user not found", ErrorType = FeeRefundManagementErrorType.IssuedById };
                else
                {
                    if (string.IsNullOrEmpty(addFeeRefund.RefundNumber.Trim()))
                        return new FeeRefundManagementResponse() { HasError = true, Message = "Refund number can't be empty", ErrorType = FeeRefundManagementErrorType.RefundNumber };
                    else if (string.IsNullOrEmpty(addFeeRefund.ChallanNumber.Trim()))
                        return new FeeRefundManagementResponse() { HasError = true, Message = "Challan number can't be empty", ErrorType = FeeRefundManagementErrorType.ChallanNumber };
                    else if (string.IsNullOrEmpty(addFeeRefund.ChequeNumber.Trim()))
                        return new FeeRefundManagementResponse() { HasError = true, Message = "Cheque number can't be empty", ErrorType = FeeRefundManagementErrorType.ChequeNumber };
                    else if (string.IsNullOrEmpty(addFeeRefund.BankName.Trim()))
                        return new FeeRefundManagementResponse() { HasError = true, Message = "Bank name can't be empty", ErrorType = FeeRefundManagementErrorType.BankName };
                    else if (double.IsNaN(addFeeRefund.Amount))
                        return new FeeRefundManagementResponse() { HasError = true, Message = "Amount number can't be empty and should be number", ErrorType = FeeRefundManagementErrorType.Amount };
                    else
                    {
                        if (await _iMSDbContext.FeeRefunds.AnyAsync(x => x.RefundNumber.ToLowerInvariant() == addFeeRefund.RefundNumber.ToLowerInvariant()))
                        {
                            var autoSequence = await _iMSDbContext.AutoSequenceGenerators.Include(s => s.AutoSequenceGeneratorDataTypes)
                                .Include(d => d.Institute).FirstOrDefaultAsync(x => x.InstituteId == instituteId
                                && x.AutoSequenceGeneratorType == AutoSequenceGeneratorTypeEnum.RefundNumber);
                            if (autoSequence == null)
                                return new FeeRefundManagementResponse() { Message = "Refund number already exist. Please use unique id", HasError = true, ErrorType = FeeRefundManagementErrorType.RefundNumber };
                            else
                                addFeeRefund.RefundNumber = await GenerateRefundNumberAsync(autoSequence);
                        }
                        var refund = new FeeRefund()
                        {
                            Amount = addFeeRefund.Amount,
                            BankName = addFeeRefund.BankName,
                            ChallanNumber = addFeeRefund.ChallanNumber,
                            ChequeDate = addFeeRefund.ChequeDate,
                            ChequeNumber = addFeeRefund.ChequeNumber,
                            CreatedOn = DateTime.UtcNow,
                            IssuedById = addFeeRefund.IssuedById,
                            RefundDate = addFeeRefund.RefundDate,
                            RefundNumber = addFeeRefund.RefundNumber,
                            Remark = addFeeRefund.Remark,
                            StudentId = addFeeRefund.StudentId,
                            UpdatedById = loggedInUser.Id,
                            UpdatedOn = DateTime.UtcNow
                        };
                        _iMSDbContext.FeeRefunds.Add(refund);
                        await _iMSDbContext.SaveChangesAsync();
                        return new FeeRefundManagementResponse() { HasError = false, Message = "Fee refund detail added successfully" };
                    }
                }
            }
            finally
            {
                semaphore.Release();
            }
        }
        
        /// <summary>
        /// Method to get list of refund - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of fee refund</returns>
        public async Task<List<FeeRefund>> GetAllFeeRefundsAsync(int instituteId)
        {
            return (await _iMSDbContext.FeeRefunds.Include(s => s.Student).Include(p=>p.IssuedBy)
                .Where(x => x.Student.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update fee refund - SS
        /// </summary>
        /// <param name="updateFeeRefund">fee refund</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<FeeRefundManagementResponse> UpdateFeeRefundAsync(UpdateFeeRefundManagementAc updateFeeRefund, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            if (!await _iMSDbContext.UserInstituteMappings.AnyAsync(x => x.InstituteId == instituteId && x.UserId == updateFeeRefund.IssuedById))
                return new FeeRefundManagementResponse() { HasError = true, Message = "Issued-by user not found", ErrorType = FeeRefundManagementErrorType.IssuedById };
            else
            {
                if (string.IsNullOrEmpty(updateFeeRefund.RefundNumber.Trim()))
                    return new FeeRefundManagementResponse() { HasError = true, Message = "Refund number can't be empty", ErrorType = FeeRefundManagementErrorType.RefundNumber };
                else if (string.IsNullOrEmpty(updateFeeRefund.ChallanNumber.Trim()))
                    return new FeeRefundManagementResponse() { HasError = true, Message = "Challan number can't be empty", ErrorType = FeeRefundManagementErrorType.ChallanNumber };
                else if (string.IsNullOrEmpty(updateFeeRefund.ChequeNumber.Trim()))
                    return new FeeRefundManagementResponse() { HasError = true, Message = "Cheque number can't be empty", ErrorType = FeeRefundManagementErrorType.ChequeNumber };
                else if (string.IsNullOrEmpty(updateFeeRefund.BankName.Trim()))
                    return new FeeRefundManagementResponse() { HasError = true, Message = "Bank name can't be empty", ErrorType = FeeRefundManagementErrorType.BankName };
                else if (double.IsNaN(updateFeeRefund.Amount))
                    return new FeeRefundManagementResponse() { HasError = true, Message = "Amount number can't be empty and should be number", ErrorType = FeeRefundManagementErrorType.Amount };
                else
                {
                    var refund = await _iMSDbContext.FeeRefunds.FirstOrDefaultAsync(x => x.Id == updateFeeRefund.Id);
                    if (refund == null)
                        return new FeeRefundManagementResponse() { HasError = true, Message = "Refund not found", ErrorType = FeeRefundManagementErrorType.Id };
                    else
                    {
                        refund.Amount = updateFeeRefund.Amount;
                        refund.BankName = updateFeeRefund.BankName;
                        refund.ChallanNumber = updateFeeRefund.ChallanNumber;
                        refund.ChequeDate = updateFeeRefund.ChequeDate;
                        refund.ChequeNumber = updateFeeRefund.ChequeNumber;
                        refund.IssuedById = updateFeeRefund.IssuedById;
                        refund.RefundDate = updateFeeRefund.RefundDate;
                        refund.Remark = updateFeeRefund.Remark;
                        refund.UpdatedById = loggedInUser.Id;
                        refund.UpdatedOn = DateTime.UtcNow;
                        _iMSDbContext.FeeRefunds.Update(refund);
                        await _iMSDbContext.SaveChangesAsync();
                        return new FeeRefundManagementResponse() { HasError = false, Message = "Fee refund detail added successfully" };
                    }
                }
            }
        }
        #endregion

        #region Private Method(s)
        /// <summary>
        /// Method to generate employee id - SS
        /// </summary>
        /// <param name="autoSequence"></param>
        /// <returns></returns>
        private async Task<string> GenerateRefundNumberAsync(AutoSequenceGenerator autoSequence)
        {
            string value = string.Empty;
            var selected = autoSequence.AutoSequenceGeneratorDataTypes.OrderByDescending(x => x.OrderId).Where(x => x.IsSelected).ToList();
            selected.Reverse();
            for (int i = 0; i < selected.Count; i++)
            {
                var data = selected[i];
                switch (data.Name)
                {
                    case "Institute":
                        {
                            value += autoSequence.Institute.Name.Substring(0, (autoSequence.Institute.Name.Length >= data.Length ? data.Length : autoSequence.Institute.Name.Length));
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Day":
                        {
                            value += DateTime.UtcNow.DayOfWeek.GetDescription();
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Month":
                        {
                            value += DateTime.UtcNow.Month;
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Year":
                        {
                            value += DateTime.UtcNow.Year;
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Date":
                        {
                            value += DateTime.UtcNow.Day;
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Text":
                        {
                            value += autoSequence.CustomText.Substring(0, data.Length);
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                    case "Sequence Number":
                        {
                            var count = await _iMSDbContext.FeeRefunds.CountAsync();
                            count++;
                            var length = "D" + data.Length;
                            value += count.ToString(length);
                            if ((selected.Count - 1) != i)
                                value += EnumHelperService.GetDescription(autoSequence.Seperator);
                        }
                        break;
                }
            }
            return value;
        }
        #endregion
    }
}
