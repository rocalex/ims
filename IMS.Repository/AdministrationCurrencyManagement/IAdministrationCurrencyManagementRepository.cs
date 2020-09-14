using IMS.DomainModel.ApplicationClasses.AdministrationCurrencyManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.AdministrationCurrencyManagement
{
    public interface IAdministrationCurrencyManagementRepository
    {
        /// <summary>
        /// Method to add currency - SS
        /// </summary>
        /// <param name="addAdministrationCurrency">currency detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddAdministrationCurrencyAsync(AddAdministrationCurrencyAc addAdministrationCurrency, int instituteId);

        /// <summary>
        /// Method to get list of currencies - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of currencies</returns>
        Task<List<AdministrationCurrency>> GetAllCurrenciesAsync(int instituteId);

        /// <summary>
        /// Method to update currency - SS
        /// </summary>
        /// <param name="updateAdministrationCurrency">currency detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateAdministrationCurrencyAsync(UpdateAdministrationCurrencyAc updateAdministrationCurrency, int instituteId);
    }
}
