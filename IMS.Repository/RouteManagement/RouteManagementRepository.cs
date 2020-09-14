using IMS.DomainModel.ApplicationClasses.RouteManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.RouteManagement
{
    public class RouteManagementRepository : IRouteManagementRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public RouteManagementRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add route - SS
        /// </summary>
        /// <param name="addRoute">route detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<RouteManagementResponse> AddRouteAsync(AddRouteManagementAc addRoute, ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(addRoute.Code.Trim()))
                return new RouteManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = RouteManagementResponseType.Code };
            else if (string.IsNullOrEmpty(addRoute.Name.Trim()))
                return new RouteManagementResponse() { HasError = true, Message = "Name can't be empty", ErrorType = RouteManagementResponseType.Name };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var placeIds = addRoute.RouteStageMappings.Select(x => x.FromPlaceId).ToList();
                placeIds.AddRange(addRoute.RouteStageMappings.Select(x => x.ToPlaceId).ToList());
                placeIds = placeIds.Distinct().ToList();
                var placeCount = await _iMSDbContext.TransportationStages.CountAsync(x => placeIds.Contains(x.Id) && x.InstituteId == instituteId);
                if (placeIds.Count != placeCount)
                    return new RouteManagementResponse() { HasError = true, Message = "Place not found", ErrorType = RouteManagementResponseType.PlaceId };
                else
                {
                    if (await _iMSDbContext.Routes.AnyAsync(x => x.Code.ToLowerInvariant() == addRoute.Code.ToLowerInvariant()))
                        return new RouteManagementResponse() { HasError = true, Message = "Code already exist. Please use unique one", ErrorType = RouteManagementResponseType.Code };
                    else
                    {
                        var route = new Route()
                        {
                            Code = addRoute.Code,
                            CreatedOn = DateTime.UtcNow,
                            InstituteId = instituteId,
                            Name = addRoute.Name,
                            StartDate = addRoute.StartDate,
                            UpdatedById = loggedInUser.Id,
                            UpdatedOn = DateTime.UtcNow
                        };
                        _iMSDbContext.Routes.Add(route);
                        await _iMSDbContext.SaveChangesAsync();
                        List<RouteStageMapping> routeStages = new List<RouteStageMapping>();
                        for (int i = 0; i < addRoute.RouteStageMappings.Count; i++)
                        {
                            routeStages.Add(new RouteStageMapping()
                            {
                                CreatedOn = DateTime.UtcNow,
                                Distance = addRoute.RouteStageMappings[i].Distance,
                                FromPlaceId = addRoute.RouteStageMappings[i].FromPlaceId,
                                OrderId = i,
                                RouteId = route.Id,
                                ToPlaceId = addRoute.RouteStageMappings[i].ToPlaceId
                            });
                        }
                        _iMSDbContext.RouteStageMappings.AddRange(routeStages);
                        await _iMSDbContext.SaveChangesAsync();
                        return new RouteManagementResponse() { HasError = false, Message = "Route added successfully" };
                    }
                }
            }
        }

        /// <summary>
        /// Method to get list of routes - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of routes</returns>
        public async Task<List<Route>> GetRoutesAsync(int instituteId)
        {
            return await _iMSDbContext.Routes.Where(x => x.InstituteId == instituteId).ToListAsync();
        }

        /// <summary>
        /// Method to update route - SS
        /// </summary>
        /// <param name="updateRoute">route detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<RouteManagementResponse> UpdateRouteAsync(UpdateRouteManagementAc updateRoute, ApplicationUser loggedInUser)
        {
            if (string.IsNullOrEmpty(updateRoute.Code.Trim()))
                return new RouteManagementResponse() { HasError = true, Message = "Code can't be empty", ErrorType = RouteManagementResponseType.Code };
            else if (string.IsNullOrEmpty(updateRoute.Name.Trim()))
                return new RouteManagementResponse() { HasError = true, Message = "Name can't be empty", ErrorType = RouteManagementResponseType.Name };
            else
            {
                var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
                var placeIds = updateRoute.RouteStageMappings.Select(x => x.FromPlaceId).ToList();
                placeIds.AddRange(updateRoute.RouteStageMappings.Select(x => x.ToPlaceId).ToList());
                placeIds = placeIds.Distinct().ToList();
                var placeCount = await _iMSDbContext.TransportationStages.CountAsync(x => placeIds.Contains(x.Id) && x.InstituteId == instituteId);
                if (placeIds.Count != placeCount)
                    return new RouteManagementResponse() { HasError = true, Message = "Place not found", ErrorType = RouteManagementResponseType.PlaceId };
                else
                {
                    var routes = await _iMSDbContext.Routes.Where(x => x.InstituteId == instituteId && x.Id != updateRoute.Id).ToListAsync();
                    if (routes.Any(x => x.Code.ToLowerInvariant() == updateRoute.Code.ToLowerInvariant()))
                        return new RouteManagementResponse() { HasError = true, Message = "Code already exist. Please use unique one", ErrorType = RouteManagementResponseType.Code };
                    else
                    {
                        var route = await _iMSDbContext.Routes.FirstOrDefaultAsync(x => x.Id == updateRoute.Id && x.InstituteId == instituteId);
                        if (route == null)
                            return new RouteManagementResponse() { HasError = true, Message = "Route not found", ErrorType = RouteManagementResponseType.Id };
                        else
                        {
                            route.Code = updateRoute.Code;
                            route.Name = updateRoute.Name;
                            route.StartDate = updateRoute.StartDate;
                            route.UpdatedById = loggedInUser.Id;
                            route.UpdatedOn = DateTime.UtcNow;
                            _iMSDbContext.Routes.Update(route);
                            await _iMSDbContext.SaveChangesAsync();
                            var previous = await _iMSDbContext.RouteStageMappings.Where(x => x.RouteId == route.Id).ToListAsync();
                            _iMSDbContext.RouteStageMappings.RemoveRange(previous);
                            await _iMSDbContext.SaveChangesAsync();
                            List<RouteStageMapping> routeStages = new List<RouteStageMapping>();
                            for (int i = 0; i < updateRoute.RouteStageMappings.Count; i++)
                            {
                                routeStages.Add(new RouteStageMapping()
                                {
                                    CreatedOn = DateTime.UtcNow,
                                    Distance = updateRoute.RouteStageMappings[i].Distance,
                                    FromPlaceId = updateRoute.RouteStageMappings[i].FromPlaceId,
                                    OrderId = i,
                                    RouteId = route.Id,
                                    ToPlaceId = updateRoute.RouteStageMappings[i].ToPlaceId
                                });
                            }
                            _iMSDbContext.RouteStageMappings.AddRange(routeStages);
                            await _iMSDbContext.SaveChangesAsync();
                            return new RouteManagementResponse() { HasError = false, Message = "Route updated successfully" };
                        }
                    }
                }
            }
        }
        #endregion
    }
}
