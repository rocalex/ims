
namespace IMS.DomainModel.ApplicationClasses.Hostel.BedAllocationManagement
{
    public class UpdateBedAllocation
    {
        public int Id { get; set; }

        public int BedId { get; set; }

        public int StudentId { get; set; }

        public int Status { get; set; }
        public int InstituteId { get; set; }

    }
}
