using System;
using System.Threading.Tasks;
using WebAPI.Core.Enums;
using WebAPI.Models.Entities;

namespace WebAPI.Core.Interfaces.Repository
{
	public interface IStoryRepository : IBaseCrudRepository<Story>
	{
		Task UpdateStoryColumnAsync(Guid storyId, Columns column);
	}
}
