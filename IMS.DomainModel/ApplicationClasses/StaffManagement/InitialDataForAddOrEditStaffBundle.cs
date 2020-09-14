using IMS.DomainModel.Models;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.StaffManagement
{
    public class InitialDataForAddOrEditStaffBundle
    {
        public InitialDataForAddOrEditStaffBundle()
        {
            Genders = new List<Gender>();
            Designations = new List<Designation>();
            Nationalities = new List<InstituteNationality>();
            MotherTongues = new List<MotherTongue>();
            Religions = new List<Religion>();
            Castes = new List<Caste>();
            BloodGroups = new List<BloodGroup>();
            Countries = new List<AdministrationCountry>();
            Cities = new List<AdministrationCity>();
            Departments = new List<Department>();
            MaritalStatuses = new List<MaritalStatus>();
            TeachingStaffs = new List<TeachingStaff>();
        }

        public List<Gender> Genders { get; set; }

        public List<Designation> Designations { get; set; }

        public List<InstituteNationality> Nationalities { get; set; }

        public List<MotherTongue> MotherTongues { get; set; }

        public List<Religion> Religions { get; set; }

        public List<Caste> Castes { get; set; }

        public List<BloodGroup> BloodGroups { get; set; }

        public List<AdministrationCountry> Countries { get; set; }

        public List<AdministrationCity> Cities { get; set; }

        public List<Department> Departments { get; set; }

        public List<MaritalStatus> MaritalStatuses { get; set; }

        public List<TeachingStaff> TeachingStaffs { get; set; }
    }
}
