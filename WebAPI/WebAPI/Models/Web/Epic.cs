using System;
using System.Collections.Generic;

namespace WebAPI.Models.Web
{
    public class Epic
    {
        public Epic()
        {
            Sprints = new List<Entities.Sprint>();
        }

        public Guid EpicId { get; set; }

        public Guid ProjectId { get; set; }

        public string EpicName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public IList<Entities.Sprint> Sprints { get; set; }
    }
}
