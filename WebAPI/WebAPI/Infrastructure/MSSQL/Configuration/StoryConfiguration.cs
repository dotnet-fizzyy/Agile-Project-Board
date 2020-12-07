using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Configuration
{
    public class StoryConfiguration : EntityTypeConfiguration<Story>
    {
        public StoryConfiguration()
        {
            HasKey(x => x.StoryId);
            Property(x => x.StoryId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
