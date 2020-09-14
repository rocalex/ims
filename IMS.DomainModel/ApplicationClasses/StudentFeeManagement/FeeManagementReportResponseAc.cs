namespace IMS.DomainModel.ApplicationClasses.StudentFeeManagement
{
    public class FeeManagementReportResponseAc
    {
        public byte[] FileByteArray { get; set; }

        public string ResponseType { get; set; }

        public string FileName { get; set; }

        public string PdfHtmlString { get; set; }
    }
}
