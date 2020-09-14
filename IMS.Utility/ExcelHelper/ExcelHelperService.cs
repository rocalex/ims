using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System.Collections.Generic;
using System.IO;

namespace IMS.Utility.ExcelHelper
{
    public static class ExcelHelperService
    {
        /// <summary>
        /// Method for generating excel file from list - RS
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dataList"></param>
        public static byte[] GenerateExcelFromList<T>(List<T> dataList, string filePath)
        {
            using (ExcelPackage excelPackage = new ExcelPackage())
            {
                ExcelWorksheet worksheet = excelPackage.Workbook.Worksheets.Add("Sheet 1");
                worksheet.Cells["A1"].LoadFromCollection(dataList, true);

                byte[] bin = excelPackage.GetAsByteArray();

                if (!string.IsNullOrEmpty(filePath))
                {
                    File.WriteAllBytes(filePath, bin);
                }
                return bin;
            }
        }

        /// <summary>
        /// Method to read data from excel - SS
        /// </summary>
        /// <param name="formFile">form file</param>
        /// <returns>data from excel</returns>
        public static List<List<string>> ReadDataFromExcel(IFormFile formFile)
        {
            List<List<string>> data = new List<List<string>>();
            using (ExcelPackage excelPackage = new ExcelPackage(formFile.OpenReadStream()))
            {
                var workSheets = excelPackage.Workbook.Worksheets;
                foreach (var workSheet in workSheets)
                {
                    int rowCount = workSheet.Dimension.Rows;
                    int colCount = workSheet.Dimension.Columns;
                    for (int row = 2; row <= rowCount; row++)
                    {
                        List<string> rowData = new List<string>();
                        for (int col = 1; col <= colCount; col++)
                        {
                            rowData.Add(workSheet.Cells[row, col].Value.ToString());
                        }
                        data.Add(rowData);
                    }
                }
            }
            return data;
        }
    }
}
