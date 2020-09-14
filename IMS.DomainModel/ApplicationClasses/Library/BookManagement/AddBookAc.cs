﻿using System;
using System.ComponentModel.DataAnnotations;

namespace IMS.DomainModel.ApplicationClasses.Library.BookManagement
{
    public class AddBookAc
    {
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string ISBN { get; set; }

        public string Title { get; set; }

        [Required]
        public int BookTypeId { get; set; }

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

        public int InstituteId { get; set; }
    }
}
