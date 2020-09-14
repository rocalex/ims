using IMS.DomainModel.ApplicationClasses.AdministrationCurrencyManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.AdministrationCurrencyManagement
{
    public class AdministrationCurrencyManagementRepository : IAdministrationCurrencyManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public AdministrationCurrencyManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add currency - SS
        /// </summary>
        /// <param name="addAdministrationCurrency">currency detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddAdministrationCurrencyAsync(AddAdministrationCurrencyAc addAdministrationCurrency, int instituteId)
        {
            if (await _iMSDbContext.AdministrationCurrencies.AnyAsync(x => x.Symbol.ToLowerInvariant() == addAdministrationCurrency.Code.ToLowerInvariant()
             && x.InstituteId == instituteId))
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Currency with the same symbol is already exist" };
            else
            {
                var currency = new AdministrationCurrency()
                {
                    CreatedOn = DateTime.UtcNow,
                    CurrencyName = addAdministrationCurrency.Name,
                    InstituteId = instituteId,
                    Symbol = addAdministrationCurrency.Code,
                    Description = addAdministrationCurrency.Description,
                    Status = true
                };
                _iMSDbContext.AdministrationCurrencies.Add(currency);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Currency added successfully" };
            }
        }

        /// <summary>
        /// Method to get list of currencies - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of currencies</returns>
        public async Task<List<AdministrationCurrency>> GetAllCurrenciesAsync(int instituteId)
        {
            return (await _iMSDbContext.AdministrationCurrencies.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update currency - SS
        /// </summary>
        /// <param name="updateAdministrationCurrency">currency detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateAdministrationCurrencyAsync(UpdateAdministrationCurrencyAc updateAdministrationCurrency, int instituteId)
        {
            var currencies = await _iMSDbContext.AdministrationCurrencies.Where(x => x.InstituteId == instituteId
            && x.Id != updateAdministrationCurrency.CurrencyId).ToListAsync();
            var isDuplicateSymbol = currencies.Any(x => x.Symbol.ToLowerInvariant() == updateAdministrationCurrency.Code.ToLowerInvariant());
            if (isDuplicateSymbol)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate symbol of currency. Please use unique name" };
            else
            {
                var currency = await _iMSDbContext.AdministrationCurrencies.FirstAsync(x => x.Id == updateAdministrationCurrency.CurrencyId);
                currency.CurrencyName = updateAdministrationCurrency.Name;
                currency.Symbol = updateAdministrationCurrency.Code;
                currency.Description = updateAdministrationCurrency.Description;
                currency.Status = updateAdministrationCurrency.Status;
                _iMSDbContext.AdministrationCurrencies.Update(currency);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Currency updated successfully" };
            }
        }
        #endregion
    }
}
