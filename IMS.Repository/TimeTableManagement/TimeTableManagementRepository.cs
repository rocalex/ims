using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.ApplicationClasses.TimeTableManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using IMS.Utility.EnumHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.TimeTableManagement
{
    public class TimeTableManagementRepository : ITimeTableManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public TimeTableManagementRepository(IMSDbContext imsDbContext)
        {
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the class and sections list
        /// </summary>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<List<TimeTableClassSectionAc>> GetClassSectionsListAsync(int instituteId)
        {
            List<TimeTableClassSectionAc> timeTableClassSectionAcList = new List<TimeTableClassSectionAc>();
            List<InstituteClass> classList = await _imsDbContext.InstituteClasses.Where(x => x.InstituteId == instituteId).ToListAsync();
            List<Section> sectionsList = await _imsDbContext.Sections.Where(x => x.InstituteId == instituteId && x.Status).ToListAsync();

            foreach (InstituteClass instituteClass in classList)
            {
                foreach (Section section in sectionsList)
                {
                    timeTableClassSectionAcList.Add(new TimeTableClassSectionAc
                    {
                        ClassId = instituteClass.Id,
                        ClassName = instituteClass.Name,
                        SectionId = section.Id,
                        SectionName = section.Name
                    });
                }
            }

            return timeTableClassSectionAcList;
        }

        /// <summary>
        /// Method for fetching the list of week days
        /// </summary>
        /// <returns></returns>
        public List<WeekDaysEnumDetails> GetDaysOfWeek(int instituteId)
        {
            List<WeekDaysEnumDetails> weekDaysEnumDetailsList = new List<WeekDaysEnumDetails>();
            List<WeekDaysEnum> weekDaysEnumList = EnumHelperService.GetEnumValuesList<WeekDaysEnum>();

            foreach (WeekDaysEnum weekDay in weekDaysEnumList)
            {
                WeekOff weekOff = _imsDbContext.WeekOffs.FirstOrDefault(x => x.WeekDay == weekDay && x.InstitutionId == instituteId);
                if (weekOff == null)
                {
                    weekDaysEnumDetailsList.Add(new WeekDaysEnumDetails
                    {
                        WeekDaysEnum = weekDay,
                        WeekDaysEnumString = EnumHelperService.GetDescription(weekDay)
                    });
                }
            }

            return weekDaysEnumDetailsList;
        }

        /// <summary>
        /// Method for add or update time table details
        /// </summary>
        /// <param name="addedTimeTable"></param>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddUpdateTimeTableAsync(AddTimeTableAc addedTimeTable, int instituteId, ApplicationUser currentUser)
        {
            if (addedTimeTable.TimeTable.Id == 0 || !await _imsDbContext.TimeTables.AnyAsync(x => x.Id == addedTimeTable.TimeTable.Id))
            {
                return (await AddTimeTableAsync(addedTimeTable, instituteId, currentUser));
            }
            else
            {
                return (await UpdateTimeTableAsync(addedTimeTable, instituteId, currentUser));
            }
        }

        /// <summary>
        /// Method for fetching the details of a time table based on class, section, institute and academic year
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <param name="academicYearId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<AddTimeTableAc> GetTimeTableDetailsAsync(int classId, int sectionId, int academicYearId, int instituteId)
        {
            AddTimeTableAc timeTableObj = new AddTimeTableAc();
            TimeTable timeTable = await _imsDbContext.TimeTables.FirstOrDefaultAsync(x => x.ClassId == classId && x.SectionId == sectionId
                    && x.AcademicYearId == academicYearId && x.InstituteId == instituteId);

            if (timeTable != null)
            {
                #region Set time table data

                TimeTableAc timeTableAc = new TimeTableAc
                {
                    Id = timeTable.Id,
                    AcademicYearId = timeTable.AcademicYearId,
                    ClassId = timeTable.ClassId,
                    SectionId = timeTable.SectionId,
                    PeriodCount = timeTable.PeriodCount,
                    PeriodDuration = timeTable.PeriodDuration,
                    PeriodStartTime = timeTable.PeriodStartTime,
                    BreaksCount = timeTable.BreaksCount
                };
                timeTableObj.TimeTable = timeTableAc;

                #endregion

                #region Set time table break details

                timeTableObj.TimeTableBreakDetailsList = new List<TimeTableBreakDetailsAc>();
                List<TimeTableBreakDetails> timeTableBreakDetailsList = await _imsDbContext.TimeTableBreakDetails
                    .Where(x => x.TimeTableId == timeTable.Id).ToListAsync();

                foreach (TimeTableBreakDetails timeTableBreakDetails in timeTableBreakDetailsList)
                {
                    timeTableObj.TimeTableBreakDetailsList.Add(new TimeTableBreakDetailsAc
                    {
                        Id = timeTableBreakDetails.Id,
                        TimeTableId = timeTableBreakDetails.TimeTableId,
                        BreakAfterPeriod = timeTableBreakDetails.BreakAfterPeriod,
                        BreakDuration = timeTableBreakDetails.BreakDuration
                    });
                }

                #endregion

                #region Set time table details

                timeTableObj.TimeTableSubjectDetailsList = new List<TimeTableDetailsAc>();
                List<TimeTableDetails> timeTableDetailsList = await _imsDbContext.TimeTableDetails
                    .Include(x => x.Subject)
                    .Where(x => x.TimeTableId == timeTable.Id).ToListAsync();

                List<WeekDaysEnumDetails> weekDaysEnumDetailsList = GetDaysOfWeek(instituteId);

                foreach (WeekDaysEnumDetails weekDaysEnumDetails in weekDaysEnumDetailsList)
                {
                    TimeTableDetailsAc timeTableDetailsAc = new TimeTableDetailsAc
                    {
                        WeekDaysEnum = weekDaysEnumDetails.WeekDaysEnum,
                        WeekDaysEnumString = weekDaysEnumDetails.WeekDaysEnumString
                    };

                    timeTableDetailsAc.TimeTableWeekDaySubjectList = new List<TimeTableDetailsAc>();
                    int periodNo = 1;
                    for (int i = 0; i < timeTableAc.PeriodCount + timeTableAc.BreaksCount; i++)
                    {
                        bool isBreakPeriod = CheckBreakPeriod(i, timeTableObj.TimeTableBreakDetailsList);
                        TimeTableDetails timeTableDetails = null;
                        if (!isBreakPeriod)
                        {
                            timeTableDetails = timeTableDetailsList.FirstOrDefault(x => x.PeriodNumber == periodNo && x.WeekDaysEnum == weekDaysEnumDetails.WeekDaysEnum);
                            periodNo++;
                        }
                        
                        timeTableDetailsAc.TimeTableWeekDaySubjectList.Add(new TimeTableDetailsAc
                        {
                            Id = (timeTableDetails == null) ? 0 : timeTableDetails.Id,
                            PeriodNumber = (timeTableDetails == null) ? (i + 1) : timeTableDetails.PeriodNumber,
                            SubjectId = (timeTableDetails == null) ? 0 : timeTableDetails.SubjectId,
                            TimeTableId = (timeTableDetails == null) ? 0 : timeTableDetails.TimeTableId,
                            WeekDaysEnum = (timeTableDetails == null) ? weekDaysEnumDetails.WeekDaysEnum : timeTableDetails.WeekDaysEnum,
                            WeekDaysEnumString = (timeTableDetails == null) ? weekDaysEnumDetails.WeekDaysEnumString : EnumHelperService.GetDescription(timeTableDetails.WeekDaysEnum),
                            SubjectName = timeTableDetails?.Subject?.Name,
                            SubjectCode = timeTableDetails?.Subject?.Code,
                            IsBreakPeriod = isBreakPeriod
                        });
                    }

                    timeTableObj.TimeTableSubjectDetailsList.Add(timeTableDetailsAc);
                }

                #endregion
            }
            return timeTableObj;
        }

        /// <summary>
        /// Method for fetching the details of a time table based on class, section, institute and academic year for a particular staff
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="sectionId"></param>
        /// <param name="staffId"></param>
        /// <param name="academicYearId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        public async Task<AddTimeTableAc> GetTimeTableForStaffAsync(int classId, int sectionId, int staffId, int academicYearId, int instituteId)
        {
            AddTimeTableAc timeTableObj = await GetTimeTableDetailsAsync(classId, sectionId, academicYearId, instituteId);
            List<InstituteClassSubjectMapping> staffSubjects = await _imsDbContext.InstituteClassSubjectMappings
                .Where(x => x.ClassId == classId && x.InstituteClass.InstituteId == instituteId && (x.FacultyId == staffId || x.AlternateFacultyId == staffId))
                .Include(x => x.InstituteClass)
                .ToListAsync();

            if (timeTableObj.TimeTableSubjectDetailsList != null)
            {
                foreach (TimeTableDetailsAc timeTableDetail in timeTableObj.TimeTableSubjectDetailsList)
                {
                    foreach (TimeTableDetailsAc subjects in timeTableDetail.TimeTableWeekDaySubjectList)
                    {
                        if (staffSubjects.Any(x => x.SubjectId != subjects.SubjectId))
                        {
                            timeTableDetail.SubjectName = "-";
                            timeTableDetail.SubjectCode = "-";
                        }
                    }
                }
            }

            return timeTableObj;
        }

        #endregion

        #region Private methods

        /// <summary>
        /// Method for adding a time table details
        /// </summary>
        /// <param name="addedTimeTable"></param>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> AddTimeTableAsync(AddTimeTableAc addedTimeTable, int instituteId, ApplicationUser currentUser)
        {
            #region Add time table

            TimeTable newTimeTable = new TimeTable
            {
                AcademicYearId = addedTimeTable.TimeTable.AcademicYearId,
                ClassId = addedTimeTable.TimeTable.ClassId,
                SectionId = addedTimeTable.TimeTable.SectionId,
                InstituteId = instituteId,
                PeriodCount = addedTimeTable.TimeTable.PeriodCount,
                PeriodDuration = addedTimeTable.TimeTable.PeriodDuration,
                PeriodStartTime = addedTimeTable.TimeTable.PeriodStartTime,
                BreaksCount = addedTimeTable.TimeTable.BreaksCount,
                CreatedOn = DateTime.UtcNow
            };
            _imsDbContext.TimeTables.Add(newTimeTable);
            await _imsDbContext.SaveChangesAsync();

            #endregion

            #region Add time table details

            List<TimeTableDetails> timeTableDetailsList = new List<TimeTableDetails>();
            foreach (TimeTableDetailsAc addedTimeTableDetailsAc in addedTimeTable.TimeTableSubjectDetailsList)
            {
                timeTableDetailsList.Add(new TimeTableDetails
                {
                    SubjectId = addedTimeTableDetailsAc.SubjectId,
                    TimeTableId = newTimeTable.Id,
                    WeekDaysEnum = addedTimeTableDetailsAc.WeekDaysEnum,
                    PeriodNumber = addedTimeTableDetailsAc.PeriodNumber
                });
            }
            _imsDbContext.TimeTableDetails.AddRange(timeTableDetailsList);
            await _imsDbContext.SaveChangesAsync();

            #endregion

            #region Add time table breaks

            List<TimeTableBreakDetails> timeTableBreakDetailsList = new List<TimeTableBreakDetails>();
            foreach (TimeTableBreakDetailsAc timeTableBreakDetailsAc in addedTimeTable.TimeTableBreakDetailsList)
            {
                timeTableBreakDetailsList.Add(new TimeTableBreakDetails
                {
                    TimeTableId = newTimeTable.Id,
                    BreakAfterPeriod = timeTableBreakDetailsAc.BreakAfterPeriod,
                    BreakDuration = timeTableBreakDetailsAc.BreakDuration
                });
            }
            _imsDbContext.TimeTableBreakDetails.AddRange(timeTableBreakDetailsList);
            await _imsDbContext.SaveChangesAsync();

            #endregion

            return new { Message = "Time table added successfully" };
        }

        /// <summary>
        /// Method for updating a time table details
        /// </summary>
        /// <param name="addedTimeTable"></param>
        /// <param name="instituteId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateTimeTableAsync(AddTimeTableAc addedTimeTable, int instituteId, ApplicationUser currentUser)
        {
            #region Update time table

            TimeTable timeTable = await _imsDbContext.TimeTables.FirstAsync(x => x.Id == addedTimeTable.TimeTable.Id);

            timeTable.AcademicYearId = addedTimeTable.TimeTable.AcademicYearId;
            timeTable.ClassId = addedTimeTable.TimeTable.ClassId;
            timeTable.SectionId = addedTimeTable.TimeTable.SectionId;
            timeTable.InstituteId = instituteId;
            timeTable.PeriodCount = addedTimeTable.TimeTable.PeriodCount;
            timeTable.PeriodDuration = addedTimeTable.TimeTable.PeriodDuration;
            timeTable.PeriodStartTime = addedTimeTable.TimeTable.PeriodStartTime;
            timeTable.BreaksCount = addedTimeTable.TimeTable.BreaksCount;

            _imsDbContext.TimeTables.Update(timeTable);
            await _imsDbContext.SaveChangesAsync();

            #endregion

            #region Update time table details

            List<TimeTableDetails> existingTimeTableDetails = await _imsDbContext.TimeTableDetails.Where(x => x.TimeTableId == timeTable.Id).ToListAsync();

            List<TimeTableDetails> addedTimeTableDetailsList = new List<TimeTableDetails>();
            foreach (TimeTableDetailsAc addedTimeTableDetailsAc in addedTimeTable.TimeTableSubjectDetailsList)
            {
                TimeTableDetails timeTableDetails = existingTimeTableDetails.FirstOrDefault(x => x.WeekDaysEnum == addedTimeTableDetailsAc.WeekDaysEnum && x.PeriodNumber == addedTimeTableDetailsAc.PeriodNumber);
                if (timeTableDetails == null)
                {
                    addedTimeTableDetailsList.Add(new TimeTableDetails
                    {
                        SubjectId = addedTimeTableDetailsAc.SubjectId,
                        TimeTableId = timeTable.Id,
                        WeekDaysEnum = addedTimeTableDetailsAc.WeekDaysEnum,
                        PeriodNumber = addedTimeTableDetailsAc.PeriodNumber
                    });
                }
                else
                {
                    timeTableDetails.SubjectId = addedTimeTableDetailsAc.SubjectId;
                    _imsDbContext.Update(timeTableDetails);
                }
            }
            if (addedTimeTableDetailsList.Count > 0)
            {
                _imsDbContext.TimeTableDetails.AddRange(addedTimeTableDetailsList);
            }
            await _imsDbContext.SaveChangesAsync();

            #endregion

            #region Update time table break details

            List<TimeTableBreakDetails> existingTimeTableBreakDetails = await _imsDbContext.TimeTableBreakDetails.Where(x => x.TimeTableId == timeTable.Id).ToListAsync();
            _imsDbContext.TimeTableBreakDetails.RemoveRange(existingTimeTableBreakDetails);

            List<TimeTableBreakDetails> timeTableBreakDetailsList = new List<TimeTableBreakDetails>();
            foreach (TimeTableBreakDetailsAc timeTableBreakDetailsAc in addedTimeTable.TimeTableBreakDetailsList)
            {
                timeTableBreakDetailsList.Add(new TimeTableBreakDetails
                {
                    TimeTableId = timeTable.Id,
                    BreakAfterPeriod = timeTableBreakDetailsAc.BreakAfterPeriod,
                    BreakDuration = timeTableBreakDetailsAc.BreakDuration
                });
            }
            _imsDbContext.TimeTableBreakDetails.AddRange(timeTableBreakDetailsList);
            await _imsDbContext.SaveChangesAsync();

            #endregion

            return new { Message = "Time table updated successfully" };
        }

        /// <summary>
        /// Method for checking break period
        /// </summary>
        /// <param name="index"></param>
        /// <param name="timeTableBreakDetailsList"></param>
        /// <returns></returns>
        public bool CheckBreakPeriod(int index, List<TimeTableBreakDetailsAc> timeTableBreakDetailsList)
        {
            bool isBreakPeriod = false;
            for (int i = 0; i < timeTableBreakDetailsList.Count; i++)
            {
                if (timeTableBreakDetailsList[i].BreakAfterPeriod + i == index)
                {
                    isBreakPeriod = true;
                    break;
                }
            }
            return isBreakPeriod;
        }

        #endregion
    }
}
