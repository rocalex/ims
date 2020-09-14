using System.Collections.Generic;
using IMS.DomainModel.Models;

namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
	public class InitialDataForAddOrEditStudentBundle
	{
		public InitialDataForAddOrEditStudentBundle()
		{
			Genders = new List<Gender>();
			Nationalities = new List<InstituteNationality>();
			MotherTongues = new List<MotherTongue>();
			Religions = new List<Religion>();
			Castes = new List<Caste>();
			BloodGroups = new List<BloodGroup>();
			Countries = new List<AdministrationCountry>();
			Cities = new List<AdministrationCity>();
			Classes = new List<InstituteClass>();
			AcademicYears = new List<Models.InstituteAcademicYear>();
			Languages = new List<InstituteLanguageMaster>();
			Occupations = new List<Occupation>();
            Sports = new List<SportDetail>();
            Levels = new List<Level>();
            MaritalStatuses = new List<MaritalStatus>();
            Sections = new List<Section>();
            Statuses = new List<DisciplinaryStatus>();
		}

		public List<Gender> Genders { get; set; }

		public List<InstituteNationality> Nationalities { get; set; }

		public List<MotherTongue> MotherTongues { get; set; }

		public List<Religion> Religions { get; set; }

		public List<Caste> Castes { get; set; }

		public List<BloodGroup> BloodGroups { get; set; }

		public List<AdministrationCountry> Countries { get; set; }

		public List<AdministrationCity> Cities { get; set; }

		public List<InstituteClass> Classes { get; set; }

		public List<Models.InstituteAcademicYear> AcademicYears { get; set; }

		public List<InstituteLanguageMaster> Languages { get; set; }

		public List<Occupation> Occupations { get; set; }

        public List<SportDetail> Sports { get; set; }

        public List<Level> Levels { get; set; }

        public List<MaritalStatus> MaritalStatuses { get; set; }

        public List<Section> Sections { get; set; }

        public List<DisciplinaryStatus> Statuses { get; set; }
    }
}
