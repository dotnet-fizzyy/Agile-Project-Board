using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Core.Interfaces.Repository;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.ApplicationLogic.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<CollectionResponse<User>> GetUsersAsync()
        {
            var userEntities = await _userRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<User>()
            {
                Items = userEntities.Select(_mapper.Map<User>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<User> GetUserAsync(Guid userId)
        {
            var userEntity = await _userRepository.SearchForSingleItemAsync(x => x.UserId == userId);

            var userModel = _mapper.Map<User>(userEntity);

            return userModel;
        }

        public async Task<User> CreateUserAsync(User user)
        {
            var userEntity = _mapper.Map<Models.Entities.User>(user);

            var createdEntity = await _userRepository.CreateItemAsync(userEntity);

            var userModel = _mapper.Map<User>(createdEntity);

            return userModel;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            var userEntity = _mapper.Map<Models.Entities.User>(user);

            var updatedEntity = await _userRepository.UpdateItemAsync(userEntity);

            var userModel = _mapper.Map<User>(updatedEntity);

            return userModel;
        }

        public async Task RemoveUserAsync(Guid userId)
        {
            await _userRepository.RemoveItemAsync(x => x.UserId == userId);
        }
    }
}
