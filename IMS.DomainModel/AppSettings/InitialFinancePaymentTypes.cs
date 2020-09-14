using System.Collections.Generic;

namespace IMS.DomainModel.AppSettings
{
    public class InitialFinancePaymentTypes
    {
        public InitialFinancePaymentTypes()
        {
            InitialPaymentTypeData = new List<string>();
        }

        public List<string> InitialPaymentTypeData { get; set; }
    }
}
