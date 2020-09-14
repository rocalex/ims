using IMS.DomainModel.Models;

namespace IMS.DomainModel.ApplicationClasses.InstituteManagement
{
    public class GetInstituteDetailAc : BaseModel
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public string Address { get; set; }

        public string Location { get; set; }

        public ApplicationUser Admin { get; set; }
    }
}
