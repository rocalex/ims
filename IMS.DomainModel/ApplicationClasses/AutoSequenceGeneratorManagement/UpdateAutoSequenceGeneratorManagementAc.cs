using IMS.DomainModel.Models;
using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.AutoSequenceGeneratorManagement
{
    public class UpdateAutoSequenceGeneratorManagementAc
    {
        public UpdateAutoSequenceGeneratorManagementAc()
        {
            AutoSequenceGeneratorDataTypes = new List<AutoSequenceGeneratorDataType>();
        }
        public int Id { get; set; }

        public string SeperatorDescription { get; set; }

        public string CustomText { get; set; }

        public List<AutoSequenceGeneratorDataType> AutoSequenceGeneratorDataTypes { get; set; }
    }
}
