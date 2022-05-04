namespace WebAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Epics",
                c => new
                    {
                        EpicId = c.Guid(nullable: false, identity: true),
                        ProjectId = c.Guid(nullable: false),
                        EpicName = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.EpicId)
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.Sprints",
                c => new
                    {
                        SprintId = c.Guid(nullable: false, identity: true),
                        EpicId = c.Guid(nullable: false),
                        SprintName = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.SprintId)
                .ForeignKey("dbo.Epics", t => t.EpicId, cascadeDelete: true)
                .Index(t => t.EpicId);
            
            CreateTable(
                "dbo.Stories",
                c => new
                    {
                        StoryId = c.Guid(nullable: false, identity: true),
                        UserId = c.Guid(),
                        SprintId = c.Guid(),
                        Title = c.String(),
                        Description = c.String(),
                        Columns = c.Int(nullable: false),
                        Estimation = c.Int(nullable: false),
                        IsDefect = c.Boolean(nullable: false),
                        IsReady = c.Boolean(nullable: false),
                        IsBlocked = c.Boolean(nullable: false),
                        BlockReason = c.String(),
                    })
                .PrimaryKey(t => t.StoryId)
                .ForeignKey("dbo.Sprints", t => t.SprintId)
                .Index(t => t.SprintId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectId = c.Guid(nullable: false, identity: true),
                        ProjectName = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        CustomerId = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectId);
            
            CreateTable(
                "dbo.Teams",
                c => new
                    {
                        TeamId = c.Guid(nullable: false, identity: true),
                        ProjectId = c.Guid(),
                        Name = c.String(),
                        Location = c.String(),
                    })
                .PrimaryKey(t => t.TeamId)
                .ForeignKey("dbo.Projects", t => t.ProjectId)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Guid(nullable: false, identity: true),
                        TeamId = c.Guid(),
                        UserRole = c.Int(nullable: false),
                        Username = c.String(),
                        Password = c.String(),
                        AvatarLink = c.String(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Teams", t => t.TeamId)
                .Index(t => t.TeamId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Teams", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.Users", "TeamId", "dbo.Teams");
            DropForeignKey("dbo.Epics", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.Sprints", "EpicId", "dbo.Epics");
            DropForeignKey("dbo.Stories", "SprintId", "dbo.Sprints");
            DropIndex("dbo.Users", new[] { "TeamId" });
            DropIndex("dbo.Teams", new[] { "ProjectId" });
            DropIndex("dbo.Stories", new[] { "SprintId" });
            DropIndex("dbo.Sprints", new[] { "EpicId" });
            DropIndex("dbo.Epics", new[] { "ProjectId" });
            DropTable("dbo.Users");
            DropTable("dbo.Teams");
            DropTable("dbo.Projects");
            DropTable("dbo.Stories");
            DropTable("dbo.Sprints");
            DropTable("dbo.Epics");
        }
    }
}
