using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Configuration
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
