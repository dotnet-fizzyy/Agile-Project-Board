using System.Reflection;
using AutoMapper;
using Ninject.Modules;
using Ninject.Web.Common;
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
            Bind<IUserRepository>().To<UserRepository>().InRequestScope();
            Bind<ITeamRepository>().To<TeamRepository>().InRequestScope();
            Bind<IStoryRepository>().To<StoryRepository>().InRequestScope();
            Bind<ISprintRepository>().To<SprintRepository>().InRequestScope();
            Bind<IEpicRepository>().To<EpicRepository>().InRequestScope();
            Bind<IProjectRepository>().To<ProjectRepository>().InRequestScope();

            //Services
            Bind<IUserService>().To<UserService>().InRequestScope();
            Bind<IProjectService>().To<ProjectService>().InRequestScope();
            Bind<ITeamService>().To<TeamService>().InRequestScope();
            Bind<ISprintService>().To<SprintService>().InRequestScope();
            Bind<IEpicService>().To<EpicService>().InRequestScope();
            Bind<IStoryService>().To<StoryService>().InRequestScope();

            //Mapper
            var mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddMaps(Assembly.GetExecutingAssembly());
            });
            Bind<IMapper>().ToConstructor(c => new Mapper(mapperConfig)).InSingletonScope();
        }
    }
}
