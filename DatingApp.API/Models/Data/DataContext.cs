using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Models.Data
{
    public class DataContext : DbContext
    {
        private DbSet<User> _users;

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users { get; set; }

    }
}