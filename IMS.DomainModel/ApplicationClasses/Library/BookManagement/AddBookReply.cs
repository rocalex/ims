
namespace IMS.DomainModel.ApplicationClasses.Library.BookManagement
{
    public class AddBookReply
    {
        public int BookId { get; set; }
        public string Message { get; set; }

        public bool HasError { get; set; }

        public ResponseType ErrorType { get; set; }
    }

    public enum ResponseType
    {
        Name,
        Code,
        Other
    }
}
