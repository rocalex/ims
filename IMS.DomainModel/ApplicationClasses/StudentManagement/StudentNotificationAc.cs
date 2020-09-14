using IMS.DomainModel.Enums;

namespace IMS.DomainModel.ApplicationClasses.StudentManagement
{
    public class StudentNotificationAc
    {
        public int StudentId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public TemplateFormatEnum NotificationType { get; set; }

        public string Subject { get; set; }

        public string Message { get; set; }
    }
}
