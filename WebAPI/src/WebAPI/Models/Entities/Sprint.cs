using System;
using System.Collections.Generic;

namespace WebAPI.Models.Entities
{
    public class Sprint
    {
        public Guid SprintId { get; set; }

        public Guid EpicId { get; set; }

        public string SprintName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public IList<Story> Stories { get; set; } = new List<Story>();
    }
}
