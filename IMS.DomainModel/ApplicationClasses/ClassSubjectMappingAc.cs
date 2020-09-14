namespace IMS.DomainModel.ApplicationClasses
{
    public class ClassSubjectMappingAc
    {
        public int Id { get; set; }

        public int ClassId { get; set; }

        public string ClassName { get; set; }

        public int SubjectId { get; set; }

        public string SubjectName { get; set; }

        public int FacultyId { get; set; }

        public string FacultyName { get; set; }

        public int AlternateFacultyId { get; set; }

        public string AlternateFacultyName { get; set; }

        public bool IsMapped { get; set; }
    }
}
