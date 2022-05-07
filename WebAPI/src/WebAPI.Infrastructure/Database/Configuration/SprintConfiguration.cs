using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Configuration
{
	public class SprintConfiguration : EntityTypeConfiguration<Sprint>
	{
		public SprintConfiguration()
		{
			this.HasKey(x => x.SprintId);
			this.Property(x => x.SprintId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

			this.HasMany(x => x.Stories).WithOptional().HasForeignKey(e => e.SprintId);
		}
	}
}
