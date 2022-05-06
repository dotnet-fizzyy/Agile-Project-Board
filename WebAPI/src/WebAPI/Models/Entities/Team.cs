using System;
using System.Collections.Generic;

namespace WebAPI.Models.Entities
{
    public class Team
    {
        public Guid TeamId { get; set; }

        public Guid? ProjectId { get; set; }

        public string Name { get; set; }

        public string Location { get; set; }

        public IList<User> Users { get; set; } = new List<User>();
    }
}
