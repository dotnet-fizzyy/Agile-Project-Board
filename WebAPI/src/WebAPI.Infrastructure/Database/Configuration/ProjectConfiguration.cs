using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Configuration
{
	public class ProjectConfiguration : EntityTypeConfiguration<Project>
	{
		public ProjectConfiguration()
		{
			this.HasKey(x => x.Id);
			this.Property(x => x.Id)
				.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
				.HasColumnName("ProjectId");

			this.HasMany(x => x.Teams).WithOptional().HasForeignKey(e => e.ProjectId);
			this.HasMany(x => x.Epics).WithOptional().HasForeignKey(e => e.ProjectId);
		}
	}
}
