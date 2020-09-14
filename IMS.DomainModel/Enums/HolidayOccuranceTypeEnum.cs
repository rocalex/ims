using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum HolidayOccuranceTypeEnum
    {
        [Description("Every Year")]
        EveryYear,

        [Description("One Time")]
        OneTime,

        [Description("Special Off")]
        SpecialOff
    }
}
