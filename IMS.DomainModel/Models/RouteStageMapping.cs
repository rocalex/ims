using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class RouteStageMapping : BaseModel
    {
        public int RouteId { get; set; }
        [ForeignKey("RouteId")]
        public virtual Route Route { get; set; }

        public int FromPlaceId { get; set; }
        [ForeignKey("FromPlaceId")]
        public virtual TransportationStage FromPlace { get; set; }

        public int ToPlaceId { get; set; }
        [ForeignKey("ToPlaceId")]
        public virtual TransportationStage ToPlace { get; set; }

        public double Distance { get; set; }

        public int OrderId { get; set; }
    }
}
