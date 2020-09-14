using IMS.DomainModel.ApplicationClasses.NotificationManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.NotificationManagement
{
    public interface INotificationManagementRepository
    {
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
        Task<List<NotificationAc>> GetNotificationsForCurrentUserAsync(string currentUserId, int instituteId, bool isUnreadNotifications);

        /// <summary>
        /// Method for adding a new notification - RS
        /// </summary>
        /// <param name="addedNotificationAc"></param>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task AddNotificationAsync(NotificationAc addedNotificationAc, int instituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method for marking a particular notification as read - RS
        /// </summary>
        /// <param name="notificationId"></param>
        /// <param name="currentUserId"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<dynamic> MarkNotificationAsReadByIdAsync(int notificationId, string currentUserId, int currentUserInstituteId);

        /// <summary>
        /// Method for marking all notifications as read - RS
        /// </summary>
        /// <param name="currentUserId"></param>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<dynamic> MarkAllNotificationsAsReadAsync(string currentUserId, int currentUserInstituteId);
    }
}
