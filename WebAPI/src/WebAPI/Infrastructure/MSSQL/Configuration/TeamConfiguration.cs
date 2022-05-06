using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Configuration
{
    public class TeamConfiguration : EntityTypeConfiguration<Team>
    {
        public TeamConfiguration()
        {
            this.HasKey(x => x.TeamId);
            this.Property(x => x.TeamId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.HasMany(x => x.Users).WithOptional().HasForeignKey(x => x.TeamId);
        }
    }
}
