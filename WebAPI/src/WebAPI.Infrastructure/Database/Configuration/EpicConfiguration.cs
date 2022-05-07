using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Configuration
{
	public class EpicConfiguration : EntityTypeConfiguration<Epic>
	{
		public EpicConfiguration()
		{
			this.HasKey(x => x.EpicId);
			this.Property(x => x.EpicId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

			this.HasMany(x => x.Sprints).WithOptional().HasForeignKey(e => e.EpicId);
		}
	}
}
