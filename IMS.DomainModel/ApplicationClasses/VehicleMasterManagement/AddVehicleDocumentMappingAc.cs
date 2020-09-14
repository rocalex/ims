using System;

namespace IMS.DomainModel.ApplicationClasses.VehicleMasterManagement
{
    public class AddVehicleDocumentMappingAc
    {
        public string Name { get; set; }

        public DateTime? ExpiredDate { get; set; }

        public string MetaData { get; set; }

        public string FileType { get; set; }

        public string FileUrl { get; set; }
    }
}
