using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum FeeComponentTypeEnum
    {
        [Description("Applicable To All")]
        ApplicableToAll,

        [Description("Individual")]
        Individual,

        [Description("Deduction")]
        Deduction,

        [Description("Special Fee")]
        SpecialFee
    }
}
