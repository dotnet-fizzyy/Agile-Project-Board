using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Configuration
{
    public class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            this.HasKey(x => x.UserId);
            this.Property(x => x.UserId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
