using System.Threading.Tasks;

namespace IMS.Utility.InstituteUserMappingHelper
{
    public interface IInstituteUserMappingHelperService
    {
        /// <summary>
        /// Method to get current user institute id - SS
        /// </summary>
        /// <param name="userIdOrName">user id or user name</param>
        /// <returns>selected institute id</returns>
        Task<int> GetUserCurrentSelectedInstituteIdAsync(string userIdOrName, bool isUserId);
    }
}
