using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.MeetingAgendaManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.MeetingAgendaManagement
{
    public interface IMeetingAgendaManagementRepository
    {
        /// <summary>
        /// Method to add Meeting Agenda - RS
        /// </summary>
        /// <param name="addMeetingAgenda">Slab</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddMeetingAgendaAsync(AddMeetingAgendaAc addMeetingAgenda, int instituteId);

        /// <summary>
        /// Method to get list of Meeting Agenda by institute id - RS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<MeetingAgenda>> GetAllMeetingAgendasAsync(int instiuteId);

        /// <summary>
        /// Method to update MeetingAgenda - RS
        /// </summary>
        /// <param name="updateMeetingAgenda">Slab detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateMeetingAgendaAsync(UpdateMeetingAgendaAc updateMeetingAgenda, int instituteId);
    }
}
