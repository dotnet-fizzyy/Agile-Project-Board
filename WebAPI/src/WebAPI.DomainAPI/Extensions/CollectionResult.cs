using System.Collections.Generic;

namespace WebAPI.DomainAPI.Extensions
{
	public class CollectionResult<T> where T : class
	{
		public IList<T> Items { get; set; } = new List<T>();

		public int Count => this.Items.Count;
	}
}
