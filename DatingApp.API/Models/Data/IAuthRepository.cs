using System.Threading.Tasks;

//Repository for authentication 
// 3 Methods to for the user authentication 
//Register for regeistering the user
//Logging the user 
//UserExists method is used to check if the user name already exists in the database


namespace DatingApp.API.Models.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user,string password);            

         Task<User> Login(string username, string password);

         Task<bool> UserExists(string usernamew);
    }
}