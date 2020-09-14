
namespace IMS.DomainModel.ApplicationClasses.Hostel.BedAllocationManagement
{
    public class AddBedAllocation
    {
        public int BedNo { get; set; }

        public int StudentId { get; set; }

        public int StatusId { get; set; }
        public int InstituteId { get; set; }
    }
}
