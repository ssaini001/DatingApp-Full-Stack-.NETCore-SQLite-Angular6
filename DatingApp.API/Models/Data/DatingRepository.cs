using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using Microsoft.EntityFrameworkCore;

// We are using Automapper.Extensions.Microsoft.DependencyInjection

namespace DatingApp.API.Models.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _dataContext;

        public DatingRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public void add<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        public void delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _dataContext.Likes.FirstOrDefaultAsync( u => u.LikerId == userId && u.LikeeId == recipientId);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _dataContext.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p=>p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _dataContext.Photos.FirstOrDefaultAsync(p => p.Id ==id);
            return photo;

        }

        public async Task<User> GetUser(int id)
        {
            var user =await _dataContext.Users.Include(p=>p.Photos).FirstOrDefaultAsync(u=>u.Id==id);
            return user;
        }

        public async Task<PagedList<User>> GetUsers(UserPagingParams userPagingParams)
        {
            var users = _dataContext.Users.Include(p=>p.Photos).OrderByDescending(u =>u.LastActive).AsQueryable();

            users = users.Where(u =>u.Id != userPagingParams.UserId);

            users = users.Where(u => u.Gender == userPagingParams.Gender);

            if(userPagingParams.Likers)
            {
                   var userLikers = await GetUserLikes(userPagingParams.UserId, userPagingParams.Likers); 
                   users = users.Where(u => userLikers.Contains(u.Id));
            }
            if(userPagingParams.Likees)
            {
                var userLikees = await GetUserLikes(userPagingParams.UserId, userPagingParams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if(userPagingParams.MinAge !=18 || userPagingParams.MaxAge !=99)
            {
                var minDob = DateTime.Today.AddYears(-userPagingParams.MaxAge-1);
                var maxDob = DateTime.Today.AddYears(-userPagingParams.MinAge);

                users = users.Where( u => u.DateOfBirth>=minDob && u.DateOfBirth <=maxDob);   
            }

            if(!string.IsNullOrEmpty(userPagingParams.OrderBy))
            {
                switch(userPagingParams.OrderBy)
                {
                    case "created":
                            users = users.OrderByDescending( u=> u.Created);
                            break;
                    default:
                            users = users.OrderByDescending(u => u.LastActive);
                            break;        
                }
            }

            return await PagedList<User>.CreateAsync(users, userPagingParams.PageNumber, userPagingParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await _dataContext.Users.Include(u => u.Likers).Include(u => u.Likees).FirstOrDefaultAsync(u => u.Id == id);
            if(likers)
            {
                return user.Likers.Where( u => u.LikeeId ==id).Select( u => u.LikerId); 
            }
            else 
            {
                return user.Likees.Where( u => u.LikerId ==id).Select(u => u.LikeeId);
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync()>0;
        }
    }
}