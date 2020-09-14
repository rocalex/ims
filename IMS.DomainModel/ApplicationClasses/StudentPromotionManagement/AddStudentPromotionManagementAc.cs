namespace IMS.DomainModel.ApplicationClasses.StudentPromotionManagement
{
    public class AddStudentPromotionManagementAc
    {
        public int StudentId { get; set; }

        public int CurrentClassId { get; set; }

        public int CurrentSectionId { get; set; }

        public int PromotedToClassId { get; set; }

        public int PromotedToSectionId { get; set; }

        public string Remark { get; set; }
    }
}
