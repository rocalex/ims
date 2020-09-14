using System.ComponentModel;

namespace IMS.DomainModel.Enums
{
    public enum AutoSequenceGeneratorSeperatorEnum
    {
        [Description("@")]
        AtTheRate,

        [Description("/")]
        Slash,

        [Description("_")]
        UnderScore,

        [Description("-")]
        Hypefen,

        [Description("")]
        None
    }
}
