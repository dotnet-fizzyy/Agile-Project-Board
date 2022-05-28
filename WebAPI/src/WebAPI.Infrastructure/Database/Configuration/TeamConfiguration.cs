using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Configuration
{
	public class TeamConfiguration : EntityTypeConfiguration<Team>
	{
		public TeamConfiguration()
		{
			this.HasKey(x => x.Id);
			this.Property(x => x.Id)
				.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
				.HasColumnName("TeamId");

			this.HasMany(x => x.Users).WithOptional().HasForeignKey(x => x.Id);
		}
	}
}
