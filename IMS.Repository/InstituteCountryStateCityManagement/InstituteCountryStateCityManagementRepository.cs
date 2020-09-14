using IMS.DomainModel.ApplicationClasses.InstituteCountryStateCityManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteCountryStateCityManagement
{
    public class InstituteCountryStateCityManagementRepository : IInstituteCountryStateCityManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        #endregion

        #region Constructor
        public InstituteCountryStateCityManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }
        #endregion

        #region Public Method(s)
        #region Country
        /// <summary>
        /// Method to add country - SS
        /// </summary>
        /// <param name="countryName">country name</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddInstituteCountryAsync(AddAdministrationCountryAc addAdministrationCountry, int instituteId)
        {
            if (!(await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.Code.ToLowerInvariant() ==
            addAdministrationCountry.Code.ToLowerInvariant() && x.InstituteId == instituteId)))
            {
                var country = new AdministrationCountry()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addAdministrationCountry.Name,
                    Code = addAdministrationCountry.Code,
                    Description = addAdministrationCountry.Description,
                    Status = true
                };
                _iMSDbContext.AdministrationCountries.Add(country);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Country added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Country code already exist" };
        }

        /// <summary>
        /// Method to get all list of countries by institute id - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of countries</returns>
        public async Task<List<AdministrationCountry>> GetAllCountriesAsync(int instituteId)
        {
            return (await _iMSDbContext.AdministrationCountries.Include(c => c.States).Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update country - SS
        /// </summary>
        /// <param name="updateAdministrationCountry">country detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateInstituteCountryAsync(UpdateAdministrationCountryAc updateAdministrationCountry, int instituteId)
        {
            var countries = await _iMSDbContext.AdministrationCountries.Where(x => x.InstituteId == instituteId
            && x.Id != updateAdministrationCountry.CountryId).ToListAsync();
            var isDuplicate = countries.Any(x => x.Code.ToLowerInvariant() == updateAdministrationCountry.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of country. Please use unique code" };
            else
            {
                var country = await _iMSDbContext.AdministrationCountries.FirstAsync(x => x.Id == updateAdministrationCountry.CountryId);
                country.Name = updateAdministrationCountry.Name;
                country.Code = updateAdministrationCountry.Code;
                country.Description = updateAdministrationCountry.Description;
                country.Status = updateAdministrationCountry.Status;
                _iMSDbContext.AdministrationCountries.Update(country);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Country updated successfully" };
            }

        }
        #endregion

        #region State
        /// <summary>
        /// Method to add state - SS
        /// </summary>
        /// <param name="state">state detail</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddInstituteStateAsync(AddAdministrationStateAc state)
        {
            if (!(await _iMSDbContext.AdministrationStates.AnyAsync(x => x.Code.ToLowerInvariant() == state.Code.ToLowerInvariant()
            && x.CountryId == state.CountryId)))
            {
                var stateDetail = new AdministrationState()
                {
                    CreatedOn = DateTime.UtcNow,
                    CountryId = state.CountryId,
                    Name = state.Name,
                    Code = state.Code,
                    Description = state.Description,
                    Status = true
                };
                _iMSDbContext.AdministrationStates.Add(stateDetail);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "State added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "State code already exist" };
        }

        /// <summary>
        /// Method to get list of state of country - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of states</returns>
        public async Task<List<AdministrationState>> GetAllStatesAsync(int instituteId)
        {
            return (await _iMSDbContext.AdministrationStates.Include(s => s.Country).Where(x => x.Country.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update state - SS
        /// </summary>
        /// <param name="updateAdministrationState">state detail</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateInstituteStateAsync(UpdateAdministrationStateAc updateAdministrationState)
        {
            var states = await _iMSDbContext.AdministrationStates.Where(x => x.CountryId == updateAdministrationState.CountryId
            && x.Id != updateAdministrationState.StateId).ToListAsync();
            var isDuplicate = states.Any(x => x.Code.ToLowerInvariant() == updateAdministrationState.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of state. Please use unique code" };
            else
            {
                var state = await _iMSDbContext.AdministrationStates.FirstAsync(x => x.Id == updateAdministrationState.StateId);
                state.Name = updateAdministrationState.Name;
                state.CountryId = updateAdministrationState.CountryId;
                state.Code = updateAdministrationState.Code;
                state.Description = updateAdministrationState.Description;
                state.Status = updateAdministrationState.Status;
                _iMSDbContext.AdministrationStates.Update(state);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "State updated successfully" };
            }

        }
        #endregion

        #region City
        /// <summary>
        /// Method to add city - SS
        /// </summary>
        /// <param name="addAdministrationCity">city detail</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddInstituteCityAsync(AddAdministrationCityAc addAdministrationCity)
        {
            if (!await _iMSDbContext.AdministrationCities.AnyAsync(x => x.Code.ToLowerInvariant() == addAdministrationCity.Code.ToLowerInvariant()
            && x.StateId == addAdministrationCity.StateId))
            {
                var city = new AdministrationCity()
                {
                    CreatedOn = DateTime.UtcNow,
                    Name = addAdministrationCity.Name,
                    StateId = addAdministrationCity.StateId,
                    Code = addAdministrationCity.Code,
                    Description = addAdministrationCity.Description,
                    Status = true
                };
                _iMSDbContext.AdministrationCities.Add(city);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "City added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "City code already exist" };
        }

        /// <summary>
        /// Method to get all cities list - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of cities</returns>
        public async Task<List<AdministrationCity>> GetAllCitiesAsync(int instituteId)
        {
            return (await _iMSDbContext.AdministrationCities.Include(x => x.State).ThenInclude(x => x.Country)
                .Where(x => x.State.Country.InstituteId == instituteId).ToListAsync());
        }

        /// <summary>
        /// Method to update city - SS
        /// </summary>
        /// <param name="updateAdministrationCity">city detail</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateInstituteCityAsync(UpdateAdministrationCityAc updateAdministrationCity)
        {
            var cities = await _iMSDbContext.AdministrationCities.Where(x => x.StateId == updateAdministrationCity.StateId &&
            x.Id != updateAdministrationCity.CityId).ToListAsync();
            var isDuplicate = cities.Any(x => x.Code.ToLowerInvariant() == updateAdministrationCity.Code.ToLowerInvariant());
            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of city. Please use unique code" };
            else
            {
                var city = await _iMSDbContext.AdministrationCities.FirstAsync(x => x.Id == updateAdministrationCity.CityId);
                city.Name = updateAdministrationCity.Name;
                city.StateId = updateAdministrationCity.StateId;
                city.Code = updateAdministrationCity.Code;
                city.Description = updateAdministrationCity.Description;
                city.Status = updateAdministrationCity.Status;
                _iMSDbContext.AdministrationCities.Update(city);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "City updated successfully" };
            }
        }
        #endregion

        #region Migration
        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        public async Task MigratedPreviousDataAsync()
        {
            var countries = await _iMSDbContext.AdministrationCountries.ToListAsync();
            countries.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.AdministrationCountries.UpdateRange(countries);
            await _iMSDbContext.SaveChangesAsync();

            var states = await _iMSDbContext.AdministrationStates.ToListAsync();
            states.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.AdministrationStates.UpdateRange(states);
            await _iMSDbContext.SaveChangesAsync();

            var cities = await _iMSDbContext.AdministrationCities.ToListAsync();
            cities.ForEach(x =>
            {
                if (string.IsNullOrEmpty(x.Code))
                    x.Code = x.Name;
            });
            _iMSDbContext.AdministrationCities.UpdateRange(cities);
            await _iMSDbContext.SaveChangesAsync();
        }
        #endregion
        #endregion
    }
}
