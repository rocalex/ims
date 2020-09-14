using IMS.DomainModel.ApplicationClasses.FeeReceiptManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.FeeReceiptManagement
{
    public interface IFeeReceiptManagementRepository
    {
        /// <summary>
        /// Method to add fee receipts - SS
        /// </summary>
        /// <param name="addFeeReceipts">fee receipts</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<FeeReceiptManagementResponse> AddFeeReceiptAsync(List<AddFeeReceiptManagementAc> addFeeReceipts, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get all fee receipt - SS
        /// </summary>
        /// <param name="instituteId">institue id</param>
        /// <returns>list of fee receipts</returns>
        Task<List<FeeReceipt>> GetAllFeeReceiptsAsync(int instituteId);
    }
}
