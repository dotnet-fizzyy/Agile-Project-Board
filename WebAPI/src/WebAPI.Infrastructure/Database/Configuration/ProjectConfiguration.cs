using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Configuration
{
	public class ProjectConfiguration : EntityTypeConfiguration<Project>
	{
		public ProjectConfiguration()
		{
			this.HasKey(x => x.ProjectId);
			this.Property(x => x.ProjectId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

			this.HasMany(x => x.Teams).WithOptional().HasForeignKey(e => e.ProjectId);
			this.HasMany(x => x.Epics).WithOptional().HasForeignKey(e => e.ProjectId);
		}
	}
}
