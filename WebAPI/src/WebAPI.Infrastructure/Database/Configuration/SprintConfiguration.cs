using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Configuration
{
	public class SprintConfiguration : EntityTypeConfiguration<Sprint>
	{
		public SprintConfiguration()
		{
			this.HasKey(x => x.Id);
			this.Property(x => x.Id)
				.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
				.HasColumnName("SprintId");

			this.HasMany(x => x.Stories).WithOptional().HasForeignKey(e => e.SprintId);
		}
	}
}
