using System.Data.Entity;
using System.Reflection;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database
{
	public sealed class DatabaseContext : DbContext
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
			modelBuilder.Configurations.AddFromAssembly(Assembly.Load("WebAPI.Infrastructure"));
		}
	}
}
