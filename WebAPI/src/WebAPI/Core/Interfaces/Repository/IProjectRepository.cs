using System;
using System.Threading.Tasks;
using WebAPI.Models.Entities;

namespace WebAPI.Core.Interfaces.Repository
{
	public interface IProjectRepository : IBaseCrudRepository<Project>
	{
		Task<ProjectMainPageData> GetProjectMainPageDataAsync(Guid userId);
	}
}
