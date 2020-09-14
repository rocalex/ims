using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace IMS.Utility.PdfHelper
{
    public class PdfHelperService
    {
        public static byte[] GeneratePdfFromHtml(string htmlContent, string subFolderName, string fileName)
        {
            string uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", subFolderName);
            if(!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }
            List<string> existingFiles = Directory.GetFiles(uploadFolder).ToList();
            foreach (string file in existingFiles)
            {
                File.Delete(file);
            }
            string filePath = Path.Combine(uploadFolder, fileName);
            
            return File.ReadAllBytes(filePath);
        }
    }
}
