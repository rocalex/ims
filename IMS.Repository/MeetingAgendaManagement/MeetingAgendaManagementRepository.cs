using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.MeetingAgendaManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.MeetingAgendaManagement
{
    public class MeetingAgendaManagementRepository : IMeetingAgendaManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _iMSDbContext;

        #endregion

        #region Constructor

        public MeetingAgendaManagementRepository(IMSDbContext iMSDbContext)
        {
            _iMSDbContext = iMSDbContext;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method to add Meeting Agenda - RS
        /// </summary>
        /// <param name="addMeetingAgenda">Slab</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> AddMeetingAgendaAsync(AddMeetingAgendaAc addMeetingAgenda, int instituteId)
        {
            if (!await _iMSDbContext.MeetingAgendas.AnyAsync(x => x.InstituteId == instituteId && x.Code.ToLowerInvariant() == addMeetingAgenda.Code.ToLowerInvariant()))
            {
                MeetingAgenda meetingAgenda = new MeetingAgenda()
                {
                    CreatedOn = DateTime.UtcNow,
                    InstituteId = instituteId,
                    Name = addMeetingAgenda.Name,
                    Code = addMeetingAgenda.Code,
                    Description = addMeetingAgenda.Description,
                    Status = true
                };
                _iMSDbContext.MeetingAgendas.Add(meetingAgenda);
                await _iMSDbContext.SaveChangesAsync();
                return new SharedLookUpResponse() { HasError = false, Message = "Meeting Agenda added successfully" };
            }
            else
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Meeting Agenda with the same name is already exist" };
        }

        /// <summary>
        /// Method to get list of Meeting Agenda by institute id - RS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        public async Task<List<MeetingAgenda>> GetAllMeetingAgendasAsync(int instiuteId)
        {
            return (await _iMSDbContext.MeetingAgendas.Where(x => x.InstituteId == instiuteId).ToListAsync());
        }

        /// <summary>
        /// Method to update MeetingAgenda - RS
        /// </summary>
        /// <param name="updateMeetingAgenda">Slab detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        public async Task<SharedLookUpResponse> UpdateMeetingAgendaAsync(UpdateMeetingAgendaAc updateMeetingAgenda, int instituteId)
        {
            List<MeetingAgenda> meetingAgendas = await _iMSDbContext.MeetingAgendas.Where(x => x.InstituteId == instituteId && x.Id != updateMeetingAgenda.MeetingAgendaId).ToListAsync();
            bool isDuplicate = meetingAgendas.Any(x => x.Code.ToLowerInvariant() == updateMeetingAgenda.Code.ToLowerInvariant());

            if (isDuplicate)
                return new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Duplicate code of Meeting Agenda. Please use unique code" };
            else
            {
                MeetingAgenda meetingAgenda = await _iMSDbContext.MeetingAgendas.FirstAsync(x => x.Id == updateMeetingAgenda.MeetingAgendaId);
                meetingAgenda.Name = updateMeetingAgenda.Name;
                meetingAgenda.Code = updateMeetingAgenda.Code;
                meetingAgenda.Description = updateMeetingAgenda.Description;
                meetingAgenda.Status = updateMeetingAgenda.Status;

                _iMSDbContext.MeetingAgendas.Update(meetingAgenda);
                await _iMSDbContext.SaveChangesAsync();

                return new SharedLookUpResponse() { HasError = false, Message = "Meeting Agenda updated successfully" };
            }
        }

        #endregion

        #region Private methods



        #endregion
    }
}
