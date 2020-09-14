using IMS.DomainModel.ApplicationClasses.EventManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using IMS.Utility.ExcelHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.EventManagement
{
    public class EventManagementRepository : IEventManagementRepository
    {
        #region Private variables

        private IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public EventManagementRepository(IMSDbContext imsDbContext)
        {
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public methods

        #region Event Info

        /// <summary>
        /// Method for fetching the list of event info - RS
        /// </summary>
        /// <param name="currentUserInstituteid"></param>
        /// <returns></returns>
        public async Task<List<EventInfo>> GetEventInfoListAsync(int currentUserInstituteid)
        {
            return await _imsDbContext.EventInfos.Where(x => x.InstituteId == currentUserInstituteid).ToListAsync();
        }

        /// <summary>
        /// Method for fetching the event info by id - RS
        /// </summary>
        /// <param name="eventInfoId"></param>
        /// <returns></returns>
        public async Task<EventInfo> GetEventInfoByIdAsync(int eventInfoId, int currentUserInstituteId)
        {
            return await _imsDbContext.EventInfos.FirstOrDefaultAsync(x => x.Id == eventInfoId && x.InstituteId == currentUserInstituteId);
        }

        /// <summary>
        /// Method for adding new event info - RS
        /// </summary>
        /// <param name="addedEventInfo"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<dynamic> AddNewEventInfoAsync(EventInfo addedEventInfo, int currentUserInstituteId, ApplicationUser currentUser)
        {
            if(await _imsDbContext.EventInfos.AnyAsync(x => x.InstituteId == currentUserInstituteId 
            && x.Name.ToLowerInvariant().Equals(addedEventInfo.Name.ToLowerInvariant())
            && x.EventDate == addedEventInfo.EventDate))
            {
                return new { Message = "Event already exist on the same date with this name", HasError = true };
            }

            addedEventInfo.InstituteId = currentUserInstituteId;
            addedEventInfo.CreatedBy = currentUser.Id;
            addedEventInfo.CreatedOn = DateTime.UtcNow;
            _imsDbContext.EventInfos.Add(addedEventInfo);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Event added successfully", HasError = false };
        }

        /// <summary>
        /// Method for updating an existing event info - RS
        /// </summary>
        /// <param name="updatedEventInfo"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateEventInfoAsync(EventInfo updatedEventInfo, int currentUserInstituteId)
        {
            EventInfo existingEventInfo = await _imsDbContext.EventInfos.FirstOrDefaultAsync(x => x.Id == updatedEventInfo.Id && x.InstituteId == currentUserInstituteId);

            if(existingEventInfo == null)
            {
                return new { Message = "No event exist with this id", HasError = true };
            }
            else if(await _imsDbContext.EventInfos.AnyAsync(x => x.Id != updatedEventInfo.Id 
                && x.InstituteId == currentUserInstituteId
                && x.Name.ToLowerInvariant().Equals(updatedEventInfo.Name.ToLowerInvariant())
                && x.EventDate == updatedEventInfo.EventDate))
            {
                return new { Message = "Event already exist on the same date with this name", HasError = true };
            }

            existingEventInfo.Name = updatedEventInfo.Name;
            existingEventInfo.EventDate = updatedEventInfo.EventDate;
            existingEventInfo.Description = updatedEventInfo.Description;
            existingEventInfo.IsActive = updatedEventInfo.IsActive;
            existingEventInfo.Priority = updatedEventInfo.Priority;
            _imsDbContext.EventInfos.Update(existingEventInfo);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Event updated successfully", HasError = false };
        }

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
        public async Task AddEventReportInfoAsync(int instituteId, string message, string subject, string sentTo, TemplateFormatEnum templateFormat)
        {
            EventReportDetail eventReportDetail = new EventReportDetail
            {
                CreatedOn = DateTime.UtcNow,
                InstituteId = instituteId,
                Message = message,
                Subject = subject,
                SentOn = DateTime.UtcNow,
                TemplateFormat = templateFormat,
                To = sentTo
            };

            _imsDbContext.EventReportDetails.Add(eventReportDetail);
            await _imsDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method for generating event reports - RS
        /// </summary>
        /// <param name="eventManagementReportQueryAc"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<EventManagementReportResponseAc> GenerateEventReportAsync(EventManagementReportQueryAc eventManagementReportQueryAc, int currentUserInstituteId)
        {
            #region Fetch details

            List<EventReportAc> eventReportAcList = new List<EventReportAc>();
            List<EventReportDetail> eventReportDetailsList = await _imsDbContext.EventReportDetails
                .Where(x => x.InstituteId == currentUserInstituteId && x.SentOn.Date >= eventManagementReportQueryAc.StartDate.Date && x.SentOn.Date <= eventManagementReportQueryAc.EndDate.Date)
                .ToListAsync();

            foreach (EventReportDetail eventReportDetail in eventReportDetailsList)
            {
                eventReportAcList.Add(new EventReportAc
                {
                    Format = EnumHelperService.GetDescription(eventReportDetail.TemplateFormat),
                    To = eventReportDetail.To,
                    Subject = eventReportDetail.Subject,
                    Message = eventReportDetail.Message,
                    SentOn = eventReportDetail.SentOn.ToString("dd-MMM-yyyy")
                });
            }

            #endregion

            #region Generate file

            string fileName = "Event_Report_" + DateTime.Now.Day.ToString("00") + "_" + DateTime.Now.Month.ToString("00") + "_" + DateTime.Now.Year.ToString("0000") + ".xlsx";
            return new EventManagementReportResponseAc()
            {
                FileName = fileName,
                ResponseType = "application/ms-excel",
                FileByteArray = ExcelHelperService.GenerateExcelFromList(eventReportAcList, string.Empty)
            };

            #endregion
        }

        #endregion

        #endregion

        #region Private methods



        #endregion
    }
}
