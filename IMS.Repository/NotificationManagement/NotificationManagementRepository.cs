using IMS.DomainModel.ApplicationClasses.NotificationManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.NotificationManagement
{
    public class NotificationManagementRepository : INotificationManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public NotificationManagementRepository(IMSDbContext imsDbContext)
        {
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of notifications for a particular user - RS
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="instituteId"></param>
        /// <param name="isUnreadNotifications">
        /// Send 'true' for fetching only unread notifications
        /// Send 'false' for fetching all notifications
        /// </param>
        /// <returns></returns>
        public async Task<List<NotificationAc>> GetNotificationsForCurrentUserAsync(string currentUserId, int instituteId, bool isUnreadNotifications)
        {
            List<NotificationAc> notificationsAcList = new List<NotificationAc>();

            List<NotificationUserMapping> allUnreadNotificationDetailsList = await _imsDbContext.NotificationUserMappings
                .Include(x => x.Notification)
                .Where(x => x.UserId == currentUserId && x.Notification.InstituteId == instituteId)
                .ToListAsync();

            if(isUnreadNotifications)
            {
                allUnreadNotificationDetailsList = allUnreadNotificationDetailsList.Where(x => !x.IsNotificationRead).ToList();
            }

            List<Notification> allUnreadNotificationsList = allUnreadNotificationDetailsList.Select(x => x.Notification).Distinct().ToList();

            foreach (Notification notification in allUnreadNotificationsList)
            {
                NotificationAc notificationAc = new NotificationAc
                {
                    Id = notification.Id,
                    NotificationCreationDate = notification.CreatedOn,
                    NotificationDetails = notification.NotificationDetails,
                    NotificationMessage = notification.NotificationMessage,
                    NotificationUserMappingsList = new List<NotificationUserMappingAc>(),
                    IsReadByUser = allUnreadNotificationDetailsList.First(x => x.NotificationId == notification.Id).IsNotificationRead
                };

                notificationsAcList.Add(notificationAc);
            }

            return notificationsAcList
                .OrderByDescending(x => x.NotificationCreationDate)
                .OrderBy(x => x.IsReadByUser)
                .ToList();
        }

        /// <summary>
        /// Method for adding a new notification - RS
        /// </summary>
        /// <param name="addedNotificationAc"></param>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task AddNotificationAsync(NotificationAc addedNotificationAc, int instituteId, ApplicationUser currentUser)
        {
            // Add new notification
            Notification addedNotification = new Notification
            {
                CreatedById = currentUser.Id,
                CreatedOn = DateTime.UtcNow,
                InstituteId = instituteId,
                NotificationDetails = addedNotificationAc.NotificationDetails,
                NotificationMessage = addedNotificationAc.NotificationMessage
            };

            _imsDbContext.Notifications.Add(addedNotification);
            await _imsDbContext.SaveChangesAsync();

            // Add user-notification mappings
            List<NotificationUserMapping> notificationUserMappings = new List<NotificationUserMapping>();
            List<string> userIdList = new List<string>();

            if(addedNotificationAc.NotificationTo == NoticeToEnum.AllStaffs)
            {
                userIdList = await _imsDbContext.StaffBasicPersonalInformation
                    .Where(x => x.InstituteId == instituteId && !x.IsArchived)
                    .Select(x => x.UserId)
                    .ToListAsync();
            }
            else if(addedNotificationAc.NotificationTo == NoticeToEnum.AllStudents)
            {
                userIdList = await _imsDbContext.StudentBasicInformation
                    .Where(x => x.InstituteId == instituteId && !x.IsActive && !x.IsArchived)
                    .Select(x => x.UserId)
                    .ToListAsync();
            }
            else
            {
                userIdList = addedNotificationAc.NotificationUserMappingsList.Select(x => x.UserId).ToList();
            }

            foreach (string userId in userIdList)
            {
                notificationUserMappings.Add(new NotificationUserMapping
                {
                    NotificationId = addedNotification.Id,
                    UserId = userId,
                    IsNotificationRead = false,
                    CreatedOn = DateTime.Now
                });
            }

            _imsDbContext.NotificationUserMappings.AddRange(notificationUserMappings);
            await _imsDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method for marking a particular notification as read - RS
        /// </summary>
        /// <param name="notificationId"></param>
        /// <param name="currentUserId"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<dynamic> MarkNotificationAsReadByIdAsync(int notificationId, string currentUserId, int currentUserInstituteId)
        {
            Notification notification = await _imsDbContext.Notifications.FirstOrDefaultAsync(x => x.Id == notificationId && x.InstituteId == currentUserInstituteId);
            if(notification != null)
            {
                NotificationUserMapping notificationUserMapping = await _imsDbContext.NotificationUserMappings
                    .FirstOrDefaultAsync(x => x.NotificationId == notification.Id && x.UserId == currentUserId && !x.IsNotificationRead);

                if(notificationUserMapping != null)
                {
                    notificationUserMapping.IsNotificationRead = true;
                    _imsDbContext.NotificationUserMappings.Update(notificationUserMapping);
                    await _imsDbContext.SaveChangesAsync();

                    return new { Message = "Notification marked as read", HasError = false };
                }
                else
                {
                    return new { Message = "Notification details not found", HasError = true };
                }
            }
            else
            {
                return new { Message = "Notification not found", HasError = true };
            }
        }

        /// <summary>
        /// Method for marking all notifications as read - RS
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        public async Task<dynamic> MarkAllNotificationsAsReadAsync(string currentUserId, int currentUserInstituteId)
        {
            List<NotificationUserMapping> notificationUserMappingsList = await _imsDbContext.NotificationUserMappings
                .Where(x => x.UserId == currentUserId && x.Notification.InstituteId == currentUserInstituteId)
                .ToListAsync();

            foreach (NotificationUserMapping notificationUserMappings in notificationUserMappingsList)
            {
                notificationUserMappings.IsNotificationRead = true;
            }

            _imsDbContext.NotificationUserMappings.UpdateRange(notificationUserMappingsList);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "All notifications marked as read", HasError = false };
        }

        #endregion
    }
}
