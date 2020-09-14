using IMS.DomainModel.ApplicationClasses.InstituteCountryStateCityManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteCountryStateCityManagement
{
    public interface IInstituteCountryStateCityManagementRepository
    {
        #region Country
        /// <summary>
        /// Method to add country - SS
        /// </summary>
        /// <param name="countryName">country name</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddInstituteCountryAsync(AddAdministrationCountryAc addAdministrationCountry, int instituteId);

        /// <summary>
        /// Method to get all list of countries by institute id - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of countries</returns>
        Task<List<AdministrationCountry>> GetAllCountriesAsync(int instituteId);

        /// <summary>
        /// Method to update country - SS
        /// </summary>
        /// <param name="updateAdministrationCountry">country detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateInstituteCountryAsync(UpdateAdministrationCountryAc updateAdministrationCountry, int instituteId);
        #endregion

        #region State
        /// <summary>
        /// Method to add state - SS
        /// </summary>
        /// <param name="state">state detail</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddInstituteStateAsync(AddAdministrationStateAc state);

        /// <summary>
        /// Method to get list of state of country - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of states</returns>
        Task<List<AdministrationState>> GetAllStatesAsync(int instituteId);

        /// <summary>
        /// Method to update state - SS
        /// </summary>
        /// <param name="updateAdministrationState">state detail</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateInstituteStateAsync(UpdateAdministrationStateAc updateAdministrationState);
        #endregion

        #region City
        /// <summary>
        /// Method to add city - SS
        /// </summary>
        /// <param name="addAdministrationCity">city detail</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddInstituteCityAsync(AddAdministrationCityAc addAdministrationCity);

        /// <summary>
        /// Method to get all cities list - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of cities</returns>
        Task<List<AdministrationCity>> GetAllCitiesAsync(int instituteId);

        /// <summary>
        /// Method to update city - SS
        /// </summary>
        /// <param name="updateAdministrationCity">city detail</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateInstituteCityAsync(UpdateAdministrationCityAc updateAdministrationCity);
        #endregion

        #region Migration
        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
        #endregion
    }
}
