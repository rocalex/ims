using IMS.DomainModel.ApplicationClasses;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Utility.ImageStorageHelper
{
    public interface IImageStorageHelperService
    {
        /// <summary>
        /// Method to upload blob - SS
        /// </summary>
        /// <param name="formFile">form files</param>
        /// <param name="folderName">folder name</param>
        /// <param name="subFolderName">sub folder name</param>
        /// <returns>list of files path</returns>
        Task<List<string>> UploadBlobDataAsync(IFormFileCollection formFile, string folderName, string subFolderName);
        Task<string> UploadSingleFileAsync(IFormFile file, string folderName, string subFolderName);

        /// <summary>
        /// Method to save image of base64 - SS
        /// </summary>
        /// <param name="fileDetail">base64 images and folder name</param>
        /// <returns>list of file path</returns>
        List<string> UploadBlobDataAsync(Base64ImageType fileDetail);
    }
}
