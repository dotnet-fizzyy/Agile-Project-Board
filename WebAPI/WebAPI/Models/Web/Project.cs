using System;

namespace WebAPI.Models.Web
{
    public class Project
    {
        public Guid ProjectId { get; set; }

        public string ProjectName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public Guid CustomerId { get; set; }
    }
}
