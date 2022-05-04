using System;
using WebAPI.Core.Enums;

namespace WebAPI.Models.Entities
{
    public class User
    {
        public Guid UserId { get; set; }

        public Guid? TeamId { get; set; }

        public UserRole UserRole { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string AvatarLink { get; set; }

        public bool IsActive { get; set; }
    }
}
