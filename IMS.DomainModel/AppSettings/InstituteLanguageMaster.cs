using System.Collections.Generic;

namespace IMS.DomainModel.AppSettings
{
    public class InstituteLanguageMaster
    {
        public InstituteLanguageMaster()
        {
            InstituteLanguageMasterDatas = new List<InstituteLanguageMasterData>();
        }
        public List<InstituteLanguageMasterData> InstituteLanguageMasterDatas { get; set; }
    }

    public class InstituteLanguageMasterData
    {
        public string Name { get; set; }

        public string Code { get; set; }
    }
}
