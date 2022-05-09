using System.Text;

namespace WebAPI.Application.Utilities
{
	public static class PasswordHashing
	{
		public static string GeneratePassword(string input)
		{
			var bytes = Encoding.UTF8.GetBytes(input);

			using (var hash = System.Security.Cryptography.SHA512.Create())
			{
				var hashedInputBytes = hash.ComputeHash(bytes);
				var hashedInputStringBuilder = new StringBuilder(128);

				foreach (var hashInputByte in hashedInputBytes)
				{
					hashedInputStringBuilder.Append(hashInputByte.ToString("X2"));
				}

				return hashedInputStringBuilder.ToString();
			}
		}
	}
}