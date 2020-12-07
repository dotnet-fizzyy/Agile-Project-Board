using System;
using System.Collections.Generic;

namespace WebAPI.Models.Entities
{
    public class Epic
    {
        public Epic()
        {
            Sprints = new List<Sprint>();
        }

        public Guid EpicId { get; set; }

        public Guid ProjectId { get; set; }

        public string EpicName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public IList<Sprint> Sprints { get; set; }
    }
}
