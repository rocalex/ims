using IMS.DomainModel.ApplicationClasses.EventManagement;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.EventManagement
{
    public interface IEventManagementRepository
    {
        #region Event Info

        /// <summary>
        /// Method for fetching the list of event info - RS
        /// </summary>
        /// <param name="currentUserInstituteid"></param>
        /// <returns></returns>
        Task<List<EventInfo>> GetEventInfoListAsync(int currentUserInstituteid);

        /// <summary>
        /// Method for fetching the event info by id - RS
        /// </summary>
        /// <param name="eventInfoId"></param>
        /// <returns></returns>
        Task<EventInfo> GetEventInfoByIdAsync(int eventInfoId, int currentUserInstituteId);

        /// <summary>
        /// Method for adding new event info - RS
        /// </summary>
        /// <param name="addedEventInfo"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<dynamic> AddNewEventInfoAsync(EventInfo addedEventInfo, int currentUserInstituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating an existing event info - RS
        /// </summary>
        /// <param name="updatedEventInfo"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<dynamic> UpdateEventInfoAsync(EventInfo updatedEventInfo, int currentUserInstituteId);

        #endregion

        #region Report

        /// <summary>
        /// Method for adding events - RS
        /// </summary>
        /// <param name="instituteId"></param>
        /// <param name="message"></param>
        /// <param name="subject"></param>
        /// <param name="sentTo"></param>
        /// <param name="templateFormat"></param>
        Task AddEventReportInfoAsync(int instituteId, string message, string subject, string sentTo, TemplateFormatEnum templateFormat);

        /// <summary>
        /// Method for generating event reports - RS
        /// </summary>
        /// <param name="eventManagementReportQueryAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<EventManagementReportResponseAc> GenerateEventReportAsync(EventManagementReportQueryAc eventManagementReportQueryAc, int currentUserInstituteId);

        #endregion
    }
}
