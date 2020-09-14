using System.Collections.Generic;

namespace IMS.DomainModel.ApplicationClasses.UserManagement
{
    public class UserAc
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string UserGroup { get; set; }

        public List<int> UserGroupIdList { get; set; }

        public string Institute { get; set; }

        public int? InstituteId { get; set; }

        public bool IsForgotPasswordMailSent { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}
