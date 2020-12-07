using System;
using System.Collections.Generic;

namespace WebAPI.Models.Entities
{
    public class Project
    {
        public Project()
        {
            Teams = new List<Team>();
            Epics = new List<Epic>();
        }

        public Guid ProjectId { get; set; }

        public string ProjectName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public IList<Team> Teams { get; set; }

        public IList<Epic> Epics { get; set; }
    }
}
