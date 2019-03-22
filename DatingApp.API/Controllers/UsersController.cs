using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController:ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        // When we use automapper we have to create a profile class which defines the mapping
       // From src class to destination class. automapperProfiles.cs in Helpers folder have mappings

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var usersToReturn  = _mapper.Map<IEnumerable<UserForListDto>>(users);   
            return Ok(usersToReturn);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn  = _mapper.Map<UserForDetailDto>(user);
            return Ok(userToReturn);
        }
    }
}