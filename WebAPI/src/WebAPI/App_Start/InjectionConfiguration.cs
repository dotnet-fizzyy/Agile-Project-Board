using System.Reflection;
using AutoMapper;
using Ninject.Modules;
using Ninject.Web.Common;
using WebAPI.ApplicationLogic;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Interfaces.Repository;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Infrastructure.MSSQL.Repository;

namespace WebAPI.App_Start
{
    public class InjectionConfiguration : NinjectModule
    {
        public override void Load()
        {
            //Repository
            this.Bind<IUserRepository>().To<UserRepository>().InRequestScope();
            this.Bind<ITeamRepository>().To<TeamRepository>().InRequestScope();
            this.Bind<IStoryRepository>().To<StoryRepository>().InRequestScope();
            this.Bind<ISprintRepository>().To<SprintRepository>().InRequestScope();
            this.Bind<IEpicRepository>().To<EpicRepository>().InRequestScope();
            this.Bind<IProjectRepository>().To<ProjectRepository>().InRequestScope();

            //Services
            this.Bind<IUserService>().To<UserService>().InRequestScope();
            this.Bind<IProjectService>().To<ProjectService>().InRequestScope();
            this.Bind<ITeamService>().To<TeamService>().InRequestScope();
            this.Bind<ISprintService>().To<SprintService>().InRequestScope();
            this.Bind<IEpicService>().To<EpicService>().InRequestScope();
            this.Bind<IStoryService>().To<StoryService>().InRequestScope();
            this.Bind<IRequestHeadersProvider>().To<RequestHeadersProvider>().InRequestScope();

            //Mapper
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddMaps(Assembly.GetExecutingAssembly());
            });
            this.Bind<IMapper>().ToConstructor(c => new Mapper(mapperConfig)).InSingletonScope();
        }
    }
}
