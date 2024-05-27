using PiwKO.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace PiwKO.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserCourse>()
                .HasKey(ub => new { ub.UserId, ub.CourseId });

            builder.Entity<UserCourse>()
                .HasOne(ub => ub.User)
                .WithMany(u => u.UserCourses)
                .HasForeignKey(ub => ub.UserId);

            builder.Entity<UserCourse>()
                .HasOne(ub => ub.Course)
                .WithMany(b => b.UserCourses)
                .HasForeignKey(ub => ub.CourseId);
        }
    }
}