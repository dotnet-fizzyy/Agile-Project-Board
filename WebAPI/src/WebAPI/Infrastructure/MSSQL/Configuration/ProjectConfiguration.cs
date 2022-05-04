using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Configuration
{
    public class ProjectConfiguration : EntityTypeConfiguration<Project>
    {
        public ProjectConfiguration()
        {
            HasKey(x => x.ProjectId);
            Property(x => x.ProjectId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            HasMany(x => x.Teams).WithOptional().HasForeignKey(e => e.ProjectId);
            HasMany(x => x.Epics).WithOptional().HasForeignKey(e => e.ProjectId);
        }
    }
}
