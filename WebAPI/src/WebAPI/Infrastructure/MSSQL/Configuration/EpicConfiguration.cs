using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Configuration
{
    public class EpicConfiguration : EntityTypeConfiguration<Epic>
    {
        public EpicConfiguration()
        {
            HasKey(x => x.EpicId);
            Property(x => x.EpicId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasMany(x => x.Sprints).WithOptional().HasForeignKey(e => e.EpicId);
        }
    }
}
