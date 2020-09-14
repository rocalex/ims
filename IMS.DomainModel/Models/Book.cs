using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IMS.DomainModel.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string ISBN { get; set; }

        public string Title { get; set; }

        [Required]
        public int BookTypeId { get; set; }
        [ForeignKey("BookTypeId")]
        public virtual BookType BookType { get; set; }

        [Required]
        public string AuthorName { get; set; }

        public int Quantity { get; set; }

        public int Remaining { get; set; }

        public DateTime PurchaseDate { get; set; }

        public string Edition { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public int Pages { get; set; }

        [Required]
        public string BillNo { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        public int PublisherId { get; set; }
        [ForeignKey("PublisherId")]
        public virtual Publisher Publisher { get; set; }

        public int InstituteId { get; set; }
    }
}
