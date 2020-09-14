using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum TemplateFeatureEnum
    {
        [Description("Student")]
        Student,
        [Description("Staff")]
        Staff,
        [Description("All")]
        All,
        [Description("Time Table")]
        TimeTable,
        [Description("Fee")]
        Fee,
        [Description("Leave")]
        Leave
    }
}
