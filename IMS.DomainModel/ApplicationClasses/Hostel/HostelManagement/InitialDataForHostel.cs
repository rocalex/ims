using IMS.DomainModel.Models;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.Hostel.HostelManagement
{
    public class InitialDataForHostel
    {
        public InitialDataForHostel()
        {
            Students = new List<StudentBasicInformation>();
            Country = new List<AdministrationCountry>();
            State = new List<AdministrationState>();
            City = new List<AdministrationCity>();
        }

        public List<StudentBasicInformation> Students { get; set; }

        public List<AdministrationCountry> Country { get; set; }

        public List<AdministrationState> State { get; set; }

        public List<AdministrationCity> City { get; set; }
    }
}
