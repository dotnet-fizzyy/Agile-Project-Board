using System;

namespace WebAPI.DomainAPI.Exceptions
{
	public class NotFoundException : Exception
	{
		public NotFoundException(string searchValue, string searchCriteria) : base(GenerateErrorMessage(searchValue, searchCriteria))
		{

		}

		private static string GenerateErrorMessage(string searchValue, string searchCriteria) =>
			$"{searchValue} could not be found by provided criteria: ${searchCriteria}";
	}
}
