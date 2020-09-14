using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum StudentRelievingEnum
    {
        [Description("Passed Out")]
        PassedOut,
        [Description("Transfer")]
        Transfer,
        [Description("Termination")]
        Termination
    }
}
