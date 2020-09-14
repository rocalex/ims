using IMS.DomainModel.ApplicationClasses.FeeRefundManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.FeeRefundManagement
{
    public interface IFeeRefundManagementRepository
    {
        /// <summary>
        /// Method to add fee refund - SS
        /// </summary>
        /// <param name="addFeeRefund">fee refund</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<FeeRefundManagementResponse> AddFeeRefundAsync(AddFeeRefundManagementAc addFeeRefund, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of refund - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of fee refund</returns>
        Task<List<FeeRefund>> GetAllFeeRefundsAsync(int instituteId);

        /// <summary>
        /// Method to update fee refund - SS
        /// </summary>
        /// <param name="updateFeeRefund">fee refund</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<FeeRefundManagementResponse> UpdateFeeRefundAsync(UpdateFeeRefundManagementAc updateFeeRefund, ApplicationUser loggedInUser);
    }
}
