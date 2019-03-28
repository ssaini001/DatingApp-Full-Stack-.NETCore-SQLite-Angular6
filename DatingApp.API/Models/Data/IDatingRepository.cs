using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;

namespace DatingApp.API.Models.Data
{
    public interface IDatingRepository
    {
         void add<T>(T entity) where T : class;
         void delete<T>(T entity) where T : class;
         Task<bool> SaveAll();
         Task<PagedList<User>> GetUsers(UserPagingParams userPagingParams);
         Task<User> GetUser(int id);
         Task<Photo> GetPhoto(int id);

         Task<Photo> GetMainPhotoForUser(int userId);


         
     }
}