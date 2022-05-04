using System.Data.Entity;
using WebAPI.Infrastructure.MSSQL.Configuration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base("ScrumBoardContext") { }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Epic> Epics { get; set; }

        public DbSet<Sprint> Sprints { get; set; }

        public DbSet<Story> Stories { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new UserConfiguration());
            modelBuilder.Configurations.Add(new TeamConfiguration());
            modelBuilder.Configurations.Add(new StoryConfiguration());
            modelBuilder.Configurations.Add(new ProjectConfiguration());
            modelBuilder.Configurations.Add(new EpicConfiguration());
            modelBuilder.Configurations.Add(new SprintConfiguration());
        }
    }
}
