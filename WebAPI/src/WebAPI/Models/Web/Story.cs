using System;

namespace WebAPI.Models.Web
{
    public class Story
    {
        public Guid StoryId { get; set; }

        public Guid? UserId { get; set; }

        public Guid? SprintId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Column { get; set; }

        public int Estimation { get; set; }

        public bool IsDefect { get; set; }

        public bool IsReady { get; set; }

        public bool IsBlocked { get; set; }

        public string BlockReason { get; set; }
    }
}
