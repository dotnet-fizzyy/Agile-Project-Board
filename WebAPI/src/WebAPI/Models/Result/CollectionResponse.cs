using System.Collections.Generic;

namespace WebAPI.Models.Result
{
    public class CollectionResponse<T> where T : class
    {
        public CollectionResponse()
        {
            this.Items = new List<T>();
        }

        public IList<T> Items { get; set; }

        public int Count => this.Items.Count;
    }
}
