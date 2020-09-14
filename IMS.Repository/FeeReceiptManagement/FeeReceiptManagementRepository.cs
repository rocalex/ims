using IMS.DomainModel.ApplicationClasses.FeeReceiptManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Repository.TemplateManagement;
using IMS.Utility.EnumHelper;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace IMS.Repository.FeeReceiptManagement
{
    public class FeeReceiptManagementRepository : IFeeReceiptManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        private readonly ITemplateManagementRepository _templateManagementRepository;
        #endregion

        #region Constructor
        public FeeReceiptManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService,
            ITemplateManagementRepository templateManagementRepository)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _templateManagementRepository = templateManagementRepository;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add fee receipts - SS
        /// </summary>
        /// <param name="addFeeReceipts">fee receipts</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<FeeReceiptManagementResponse> AddFeeReceiptAsync(List<AddFeeReceiptManagementAc> addFeeReceipts, ApplicationUser loggedInUser)
        {
            await semaphore.WaitAsync();
            try
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                List<FeeReceiptComponent> feeReceiptComponents = new List<FeeReceiptComponent>();
                int orderId = 0;
                foreach (var receipt in addFeeReceipts)
                {
                    if (string.IsNullOrEmpty(receipt.ReceiptNumber.Trim()))
                        return new FeeReceiptManagementResponse() { HasError = true, OrderId = orderId, Message = "Receipt number can't be empty", ErrorType = FeeReceiptManagementType.ReceiptNumber };
                    else if (string.IsNullOrEmpty(receipt.ChallanNumber.Trim()))
                        return new FeeReceiptManagementResponse() { HasError = true, OrderId = orderId, Message = "Challan number can't be empty", ErrorType = FeeReceiptManagementType.ChallanNumber };
                    else
                    {
                        if (await _iMSDbContext.FeeReceipts.AnyAsync(x => x.ReceiptNumber == receipt.ReceiptNumber))
                        {
                            var autoSequence = await _iMSDbContext.AutoSequenceGenerators.Include(s => s.AutoSequenceGeneratorDataTypes)
                                .Include(d => d.Institute).FirstOrDefaultAsync(x => x.InstituteId == instituteId
                                && x.AutoSequenceGeneratorType == AutoSequenceGeneratorTypeEnum.ReceiptNumber);
                            if (autoSequence == null)
                                return new FeeReceiptManagementResponse() { HasError = true, OrderId = orderId, Message = "Duplicate receipt number. Please choose unique number", ErrorType = FeeReceiptManagementType.ReceiptNumber };
                            else
                            {
                                receipt.ReceiptNumber = await GenerateFeeReceiptNumberAsync(autoSequence);
                            }
                        }
                        var feeReceipt = new FeeReceipt()
                        {
                            Amount = receipt.Amount,
                            BankName = receipt.BankName,
                            ChallanNumber = receipt.ChallanNumber,
                            ChequeDate = receipt.ChequeDate,
                            ChequeNumber = receipt.ChequeNumber,
                            ClassId = receipt.ClassId,
                            CreatedOn = DateTime.UtcNow,
                            IsNewAdmission = receipt.IsNewAdmission,
                            LateFee = receipt.LateFee,
                            PreviousAmountPaid = receipt.PreviousAmountPaid,
                            ReceiptDate = receipt.ReceiptDate,
                            ReceiptNumber = receipt.ReceiptNumber,
                            ReceiptType = EnumHelperService.GetValueFromDescription<ReceiptTypeEnum>(receipt.ReceiptType),
                            StudentId = receipt.StudentId,
                            Total = receipt.Total,
                            UpdatedById = loggedInUser.Id,
                            UpdatedOn = DateTime.UtcNow,
                            Term = receipt.Term
                        };
                        _iMSDbContext.FeeReceipts.AddRange(feeReceipt);
                        await _iMSDbContext.SaveChangesAsync();
                        #region Send Mail/Message
                        feeReceipt = await _iMSDbContext.FeeReceipts.Include(s=>s.Student).FirstAsync(s => s.Id == feeReceipt.Id);
                        await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.FeePaymentAdd,
                            TemplateFormatEnum.Email, feeReceipt);
                        await _templateManagementRepository.TriggerMailOrMessageAsync(instituteId, TemplateTypeEnum.FeePaymentAdd,
                            TemplateFormatEnum.Sms, feeReceipt);
                        #endregion
                        for (int i = 0; i < receipt.FeeReceiptComponents.Count; i++)
                        {
                            feeReceiptComponents.Add(new FeeReceiptComponent()
                            {
                                Amount = receipt.FeeReceiptComponents[i].Amount,
                                CreatedOn = DateTime.UtcNow,
                                FeeReciptId = feeReceipt.Id,
                                Name = receipt.FeeReceiptComponents[i].Name,
                                OrderId = i,
                            });
                        }
                    }
                    orderId++;
                }
                _iMSDbContext.FeeReceiptComponents.AddRange(feeReceiptComponents);
                await _iMSDbContext.SaveChangesAsync();
                return new FeeReceiptManagementResponse() { HasError = false, Message = "Fee receipt added successfully" };
            }
            finally
            {
                semaphore.Release();
            }
        }

        /// <summary>
        /// Method to get all fee receipt - SS
        /// </summary>
        /// <param name="instituteId">institue id</param>
        /// <returns>list of fee receipts</returns>
        public async Task<List<FeeReceipt>> GetAllFeeReceiptsAsync(int instituteId)
        {
            var list = await _iMSDbContext.FeeReceipts.Include(s => s.Student).Where(x => x.Student.InstituteId == instituteId).ToListAsync();
            list.ForEach(x => x.ReceiptTypeDescription = EnumHelperService.GetDescription(x.ReceiptType));
            return list;
        }
        #endregion

        #region Private Method(s)
        /// <summary>
        /// Method to generate employee id - SS
        /// </summary>
        /// <param name="autoSequence"></param>
        /// <returns></returns>
        private async Task<string> GenerateFeeReceiptNumberAsync(AutoSequenceGenerator autoSequence)
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
                            var count = await _iMSDbContext.FeeReceipts.CountAsync();
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
