using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Models.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
                _context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.Username==username);
            if(user==null)
                return null;
            if(!VerifyPasswordHash(password,user.PasswordHash,user.PasswordSalt))
                return null;

            return user;       

        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            //we pass password salt to generate the same hash for the password as of database
            //as the computedHash comes is byte[] same as the DB passowrd hash we compate for all the elements for exactly the same
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
           {
               
               var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
               for(int i=0; i<computedHash.Length; i++){

                    if(computedHash[i] !=passwordHash[i]) return false;
               }
           }

           return true; 
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt); //used out keyword to pass variables as reference not as value

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //will use the random key returned by fucntion as a passwordSalt to encrypt/decrypt password
            // The HMAC class implemts the iDisposable interface and dispose method to free up memory after the 
            //task has been performed. So we will enclose the the HMAC key/password hash process in using() block
           using(var hmac = new System.Security.Cryptography.HMACSHA512())
           {
               passwordSalt = hmac.Key;
               passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
           }    
        }

        public async Task<bool> UserExists(string username)
        {
            //anyAsync compares the any entry with matching any row in db for the given username
            
            if(await _context.Users.AnyAsync(x=>x.Username==username))
                return true;

            return false;    
        }
    }
}