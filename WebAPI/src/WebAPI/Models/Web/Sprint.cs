using System;
using System.Collections.Generic;

namespace WebAPI.Models.Web
{
    public class Sprint
    {
        public Sprint()
        {
            Stories = new List<Story>();
        }

        public Guid SprintId { get; set; }

        public Guid EpicId { get; set; }

        public string SprintName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public IList<Story> Stories { get; set; }
    }
}
