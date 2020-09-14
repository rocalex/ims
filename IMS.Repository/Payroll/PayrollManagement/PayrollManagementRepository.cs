using IMS.DomainModel.Data;

namespace IMS.Repository.Payroll.PayrollManagement
{
    public class PayrollManagementRepository : IPayrollManagementRepository
    {
        #region
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor

        public PayrollManagementRepository(IMSDbContext _imsDbContext)
        {
            iMSDbContext = _imsDbContext;
        }

        #endregion
    }
}