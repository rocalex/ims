using IMS.DomainModel.ApplicationClasses.TemplateManagement;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using System.Threading.Tasks;

namespace IMS.Repository.TemplateManagement
{
    public interface ITemplateManagementRepository
    {
        /// <summary>
        /// Method for adding a new template - RS
        /// </summary>
        /// <param name="addedTemplate"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddOrUpdateTemplateAsync(AddTemplateAc addedTemplate, ApplicationUser currentUser);

        /// <summary>
        /// Method to get template - SS
        /// </summary>
        /// <param name="getTemplate">query params</param>
        /// <param name="instituteId">institute id</param>
        /// <returns></returns>
        Task<Template> GetTemplateAsync(GetTemplateAc getTemplate, int instituteId);

        /// <summary>
        /// Method to trigger mail or message using templates - SS
        /// </summary>
        /// <param name="instituteId">instituteId</param>
        /// <param name="templateType">templateType</param>
        /// <param name="templateFormat">templateFormat</param>
        /// <param name="data">data as object</param>
        /// <param name="password">password, default null</param>
        Task TriggerMailOrMessageAsync(int instituteId, TemplateTypeEnum templateType, TemplateFormatEnum templateFormat,
            object data, string password = null);
    }
}
