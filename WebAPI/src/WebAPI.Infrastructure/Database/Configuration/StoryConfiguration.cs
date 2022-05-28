using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Configuration
{
	public class StoryConfiguration : EntityTypeConfiguration<Story>
	{
		public StoryConfiguration()
		{
			this.HasKey(x => x.Id);
			this.Property(x => x.Id)
				.HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
				.HasColumnName("StoryId");
		}
	}
}
