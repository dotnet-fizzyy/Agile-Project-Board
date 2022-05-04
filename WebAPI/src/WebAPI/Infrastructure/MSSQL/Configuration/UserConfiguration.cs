using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Configuration
{
    public class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            HasKey(x => x.UserId);
            Property(x => x.UserId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}
