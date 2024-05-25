using System.Text;
using PiwKO.Models;
using PiwKO.Data;
using PiwKO.Interfaces;
using PiwKO.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ILoginAndRegisterService, LoginAndRegisterService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<IBeerService, BeerService>();
builder.Services.AddScoped<IUserBeerService, UserBeerService>();


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<User, IdentityRole>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireUppercase = true;
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = false;
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

var jwtSettings = builder.Configuration.GetSection("Jwt");
var jwtKey = jwtSettings["Key"] ?? "DefaultKey";
var key = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

builder.Services.AddControllers();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
    var loginAndRegisterService = services.GetRequiredService<ILoginAndRegisterService>();
    await loginAndRegisterService.CreateRoles();
    var userService = scope.ServiceProvider.GetRequiredService<IAdminService>();
    await userService.InitializeAdminAsync();
    var beerService = scope.ServiceProvider.GetRequiredService<IBeerService>();
}

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();


app.UseHttpsRedirection();
app.MapControllers();

app.Run();