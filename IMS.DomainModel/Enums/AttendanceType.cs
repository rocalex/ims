using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum AttendanceType
    {
        [Description("None")]
        None,
        [Description("Present")]
        Present,
        [Description("Absent")]
        Absent,
        [Description("Leave")]
        Leave,
        [Description("Half Leave")]
        HalfLeave
    }
}
