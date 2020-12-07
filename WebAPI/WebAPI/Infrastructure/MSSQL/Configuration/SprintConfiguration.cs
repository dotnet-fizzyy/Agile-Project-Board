using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Configuration
{
    public class SprintConfiguration : EntityTypeConfiguration<Sprint>
    {
        public SprintConfiguration()
        {
            HasKey(x => x.SprintId);
            Property(x => x.SprintId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasMany(x => x.Stories).WithOptional().HasForeignKey(e => e.SprintId);
        }
    }
}
