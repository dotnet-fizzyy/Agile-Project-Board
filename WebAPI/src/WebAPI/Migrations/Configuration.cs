namespace WebAPI.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<WebAPI.Infrastructure.MSSQL.DatabaseContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = false;
            this.ContextKey = "WebAPI.Infrastructure.MSSQL.DatabaseContext";
        }

        protected override void Seed(WebAPI.Infrastructure.MSSQL.DatabaseContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
        }
    }
}
