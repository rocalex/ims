using IMS.DomainModel.ApplicationClasses;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Utility.ImageStorageHelper
{
    public class ImageStorageHelperService : IImageStorageHelperService
    {
        #region Private Variable(s)
        #endregion

        #region Constructor
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to upload blob - SS
        /// </summary>
        /// <param name="formFile">form files</param>
        /// <param name="folderName">folder name</param>
        /// <param name="subFolderName">sub folder name</param>
        /// <returns>list of files path</returns>
        public async Task<List<string>> UploadBlobDataAsync(IFormFileCollection formFile, string folderName, string subFolderName)
        {
            List<string> filePaths = new List<string>();
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Image-Storage");
            var foldersInDirectory = Directory.GetDirectories(uploadFolder).ToList();
            if (!foldersInDirectory.Any(x => x == folderName))
            {
                Directory.CreateDirectory(Path.Combine(uploadFolder, folderName));
                Directory.CreateDirectory(Path.Combine(uploadFolder, folderName, subFolderName));
            }
            else
            {
                var subFoldersInDirectory = Directory.GetDirectories(Path.Combine(uploadFolder, folderName)).ToList();
                if (!subFoldersInDirectory.Any(x => x == subFolderName))
                    Directory.CreateDirectory(Path.Combine(uploadFolder, folderName, subFolderName));
            }
            foreach (var file in formFile)
            {
                if (file != null && file.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                    using (var fileStream = new FileStream(Path.Combine(uploadFolder, folderName, subFolderName, fileName), FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                        filePaths.Add(Path.Combine("Image-Storage", folderName, subFolderName, fileName));
                    }
                }
            }
            return filePaths;
        }

        public async Task<string> UploadSingleFileAsync(IFormFile file, string folderName, string subFolderName)
        {
            var filePath = "";
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Image-Storage");
            var foldersInDirectory = Directory.GetDirectories(uploadFolder).ToList();
            if (!foldersInDirectory.Any(x => x == folderName))
            {
                Directory.CreateDirectory(Path.Combine(uploadFolder, folderName));
                Directory.CreateDirectory(Path.Combine(uploadFolder, folderName, subFolderName));
            }
            else
            {
                var subFoldersInDirectory = Directory.GetDirectories(Path.Combine(uploadFolder, folderName)).ToList();
                if (!subFoldersInDirectory.Any(x => x == subFolderName))
                    Directory.CreateDirectory(Path.Combine(uploadFolder, folderName, subFolderName));
            }
            if (file != null && file.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                using (var fileStream = new FileStream(Path.Combine(uploadFolder, folderName, subFolderName, fileName), FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                    filePath = Path.Combine("Image-Storage", folderName, subFolderName, fileName);
                }
            }
            return filePath;
        }

        /// <summary>
        /// Method to save image of base64 - SS
        /// </summary>
        /// <param name="fileDetail">base64 images and folder name</param>
        /// <returns>list of file path</returns>
        public List<string> UploadBlobDataAsync(Base64ImageType fileDetail)
        {
            List<string> filePaths = new List<string>();
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Image-Storage");
            var foldersInDirectory = Directory.GetDirectories(uploadFolder).ToList();
            if (!foldersInDirectory.Any(x => x == fileDetail.FolderName))
            {
                Directory.CreateDirectory(Path.Combine(uploadFolder, fileDetail.FolderName));
                Directory.CreateDirectory(Path.Combine(uploadFolder, fileDetail.FolderName, fileDetail.SubFolderName));
            }
            else
            {
                var subFoldersInDirectory = Directory.GetDirectories(Path.Combine(uploadFolder, fileDetail.FolderName)).ToList();
                if (!subFoldersInDirectory.Any(x => x == fileDetail.SubFolderName))
                    Directory.CreateDirectory(Path.Combine(uploadFolder, fileDetail.FolderName, fileDetail.SubFolderName));
            }
            foreach (var file in fileDetail.Images)
            {
                if (!string.IsNullOrEmpty(file))
                    filePaths.Add(ConvertBase64ToImageAndSave(file, fileDetail.FolderName, fileDetail.SubFolderName));
            }
            return filePaths;
        }
        #endregion

        #region Private Method(s)
        /// <summary>
        /// Method to convert and save image - SS
        /// </summary>
        /// <param name="base64String">base64 string of image</param>
        /// <returns>path of image</returns>
        private string ConvertBase64ToImageAndSave(string base64String, string folderName, string subFolderName)
        {
            byte[] bytes = Convert.FromBase64String(base64String);
            var name = Guid.NewGuid().ToString().Replace("-", "");
            name += ".jpg";
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Image-Storage", folderName, subFolderName, name);
            File.WriteAllBytes(path, bytes);
            return path;
        }
        #endregion
    }
}
