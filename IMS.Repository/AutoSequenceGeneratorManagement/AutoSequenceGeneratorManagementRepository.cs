using IMS.DomainModel.ApplicationClasses.AutoSequenceGeneratorManagement;
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

namespace IMS.Repository.AutoSequenceGeneratorManagement
{
    public class AutoSequenceGeneratorManagementRepository : IAutoSequenceGeneratorManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private SemaphoreSlim semaphore = new SemaphoreSlim(1, 1);
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public AutoSequenceGeneratorManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to update auto sequence - SS
        /// </summary>
        /// <param name="updateAutoSequence">auto sequence</param>
        /// <param name="loggedInUser">logged in user detail</param>
        /// <returns>response</returns>
        public async Task<AutoSequenceGeneratorManagementResponse> UpdateAutoSequenceGeneratorAsync(UpdateAutoSequenceGeneratorManagementAc
            updateAutoSequence, ApplicationUser loggedInUser)
        {
            await semaphore.WaitAsync();
            try
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var autoSequence = await _iMSDbContext.AutoSequenceGenerators.FirstOrDefaultAsync(x => x.Id == updateAutoSequence.Id
                && x.InstituteId == instituteId);
                if (autoSequence != null)
                {
                    if (updateAutoSequence.AutoSequenceGeneratorDataTypes.Any(x => x.IsSelected && x.Name == "Text"))
                    {
                        if (string.IsNullOrEmpty(updateAutoSequence.CustomText))
                            return new AutoSequenceGeneratorManagementResponse() { HasError = true, Message = "Please add text in custom text." };
                    }
                    autoSequence.CustomText = updateAutoSequence.CustomText;
                    autoSequence.Seperator = EnumHelperService.GetValueFromDescription<AutoSequenceGeneratorSeperatorEnum>(updateAutoSequence.SeperatorDescription);
                    autoSequence.UpdateById = loggedInUser.Id;
                    autoSequence.UpdateDate = DateTime.UtcNow;
                    autoSequence.AutoSequenceGeneratorDataTypes = null;
                    _iMSDbContext.AutoSequenceGenerators.Update(autoSequence);
                    await _iMSDbContext.SaveChangesAsync();
                    var types = await _iMSDbContext.AutoSequenceGeneratorDataTypes.Where(x => x.AutoSequenceGeneratorId == autoSequence.Id).ToListAsync();
                    _iMSDbContext.AutoSequenceGeneratorDataTypes.RemoveRange(types);
                    await _iMSDbContext.SaveChangesAsync();
                    updateAutoSequence.AutoSequenceGeneratorDataTypes.ForEach(x => x.Id = 0);
                    _iMSDbContext.AutoSequenceGeneratorDataTypes.AddRange(updateAutoSequence.AutoSequenceGeneratorDataTypes);
                    await _iMSDbContext.SaveChangesAsync();
                    return new AutoSequenceGeneratorManagementResponse() { HasError = false, Message = "Auto sequence updated successfully" };
                }
                else
                    return new AutoSequenceGeneratorManagementResponse() { HasError = true, Message = "Auto sequence not found" };
            }
            finally
            {
                semaphore.Release();
            }
        }

        /// <summary>
        /// Method to get auto sequence data - SS
        /// </summary>
        /// <param name="loggedInUser">logged in user detail</param>
        /// <param name="generatorTypeEnum">auto sequence type</param>
        /// <returns>auto sequence data</returns>
        public async Task<AutoSequenceGenerator> GetSequenceGeneratorsAsync(ApplicationUser loggedInUser, AutoSequenceGeneratorTypeEnum generatorTypeEnum)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            await SeedDataForAutoSequenceByTypeAsync(instituteId, loggedInUser.Id, generatorTypeEnum);
            var autoSequence = await _iMSDbContext.AutoSequenceGenerators.Include(x => x.AutoSequenceGeneratorDataTypes)
                .FirstAsync(x => x.AutoSequenceGeneratorType == generatorTypeEnum && x.InstituteId == instituteId);
            autoSequence.SeperatorDescription = EnumHelperService.GetDescription(autoSequence.Seperator);
            autoSequence.AutoSequenceGeneratorDataTypes = autoSequence.AutoSequenceGeneratorDataTypes.OrderByDescending(x => x.OrderId).ToList();
            autoSequence.AutoSequenceGeneratorDataTypes = autoSequence.AutoSequenceGeneratorDataTypes.Reverse().ToList();
            return autoSequence;
        }

        /// <summary>
        /// Method to generate auto sequence data - SS
        /// </summary>
        /// <param name="instituteId">institue id</param>
        /// <param name="typeEnum">type of data</param>
        /// <returns>response</returns>
        public async Task<GenerateAutoSequenceDataResponse> GetAutoSequenceNumberByTypeAndInstituteIdAsync(int instituteId, AutoSequenceGeneratorTypeEnum typeEnum)
        {
            var autoSequence = await _iMSDbContext.AutoSequenceGenerators.Include(s => s.AutoSequenceGeneratorDataTypes)
                .Include(d => d.Institute).FirstOrDefaultAsync(x => x.InstituteId == instituteId && x.AutoSequenceGeneratorType == typeEnum);
            if (autoSequence == null)
                return new GenerateAutoSequenceDataResponse() { HasValue = false };
            else
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
                                var count = 0;
                                if (typeEnum == AutoSequenceGeneratorTypeEnum.RollNumber)
                                    count = await _iMSDbContext.StudentBasicInformation.CountAsync();
                                else if (typeEnum == AutoSequenceGeneratorTypeEnum.RefundNumber)
                                    count = await _iMSDbContext.FeeRefunds.CountAsync();
                                else if (typeEnum == AutoSequenceGeneratorTypeEnum.ReceiptNumber)
                                    count = await _iMSDbContext.FeeReceipts.CountAsync();
                                else if (typeEnum == AutoSequenceGeneratorTypeEnum.ChartOfAccountsCode)
                                    count = await _iMSDbContext.FinanceChartOfAccounts.CountAsync();
                                else
                                    count = await _iMSDbContext.StaffBasicPersonalInformation.CountAsync();
                                count++;
                                var length = "D" + data.Length;
                                value += count.ToString(length);
                                if ((selected.Count - 1) != i)
                                    value += EnumHelperService.GetDescription(autoSequence.Seperator);
                            }
                            break;
                    }
                }
                return new GenerateAutoSequenceDataResponse() { HasValue = true, Data = value, Seperator = EnumHelperService.GetDescription(autoSequence.Seperator) };
            }
        }

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        public async Task MigratePreviousDataAsync()
        {
            var autoSequences = await _iMSDbContext.AutoSequenceGenerators.Include(x => x.AutoSequenceGeneratorDataTypes).ToListAsync();
            List<AutoSequenceGeneratorDataType> toUpdate = new List<AutoSequenceGeneratorDataType>();
            foreach (var auto in autoSequences)
            {
                var types = auto.AutoSequenceGeneratorDataTypes.OrderByDescending(x => x.OrderId).Where(s => s.IsSelected).ToList();
                types.Reverse();
                for (int i = 0; i < types.Count; i++)
                {
                    if (types[i].Name != "Sequence Number")
                        types[i].OrderId = i;
                }
                var sequenceNumber = types.First(x => x.Name == "Sequence Number");
                sequenceNumber.OrderId = (types.Count - 1);
                toUpdate.AddRange(types);
            }
            _iMSDbContext.AutoSequenceGeneratorDataTypes.UpdateRange(toUpdate);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion

        #region Private Method(s)
        /// <summary>
        /// Method to seed data for auto sequence - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <param name="loggedInUserId">logged in user</param>
        private async Task SeedDataForAutoSequenceByTypeAsync(int instituteId, string loggedInUserId, AutoSequenceGeneratorTypeEnum type)
        {
            await semaphore.WaitAsync();
            try
            {
                if (!await _iMSDbContext.AutoSequenceGenerators.AnyAsync(x => x.InstituteId == instituteId && x.AutoSequenceGeneratorType == type))
                {
                    var availableData = new List<string>() { "Institute", "Day", "Month", "Year", "Date", "Text", "Sequence Number" };
                    var autoSequence = new AutoSequenceGenerator()
                    {
                        AutoSequenceGeneratorType = type,
                        CreatedById = loggedInUserId,
                        CreatedOn = DateTime.UtcNow,
                        CustomText = string.Empty,
                        InstituteId = instituteId,
                        Seperator = AutoSequenceGeneratorSeperatorEnum.None,
                        UpdateById = loggedInUserId,
                        UpdateDate = DateTime.UtcNow
                    };
                    _iMSDbContext.AutoSequenceGenerators.Add(autoSequence);
                    await _iMSDbContext.SaveChangesAsync();
                    #region AutoSequenceGeneratorDataType
                    List<AutoSequenceGeneratorDataType> generatorDataTypes = new List<AutoSequenceGeneratorDataType>();
                    int orderId = 0;
                    foreach (var data in availableData)
                    {
                        generatorDataTypes.Add(new AutoSequenceGeneratorDataType()
                        {
                            CreatedOn = DateTime.UtcNow,
                            IsSelected = (data == "Sequence Number"),
                            AutoSequenceGeneratorId = autoSequence.Id,
                            OrderId = orderId,
                            Name = data,
                            Length = (data == "Sequence Number") ? 5 : 3
                        });
                        orderId++;
                    }
                    _iMSDbContext.AutoSequenceGeneratorDataTypes.AddRange(generatorDataTypes);
                    await _iMSDbContext.SaveChangesAsync();
                    #endregion
                }
            }
            finally
            {
                semaphore.Release();
            }
        }
        #endregion
    }
}
