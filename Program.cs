using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using PatchNote.Api;
using PatchNote.Api.Application.Authorization;
using PatchNote.Api.Application.Services;
using PatchNote.Api.Application.Services.NewsletterEmailService;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Models.DTOs.Requests;
using PatchNote.Mapper;


var builder = WebApplication.CreateBuilder(args);

{
    // Add services to the container.
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

    builder.Services.AddControllers();
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddCors();

    builder.Services.AddAuth(builder.Configuration);

    builder.Services.AddControllers().AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
    );


    // add authentication services
    builder.Services
        .AddScoped<IJwtUtils, JwtUtils>()
        .AddScoped<IUserService, UserService>();

    builder.Services.AddTransient<INewsletterEmailService, NewsletterEmailService>();

    //  Connextion to Databases
    var connectionString = builder.Configuration.GetConnectionString("PatchNoteDbConnectionString");
    var serverVersion = new MySqlServerVersion(new Version(8, 0, 31));

    builder.Services.AddDbContext<patchNoteDbContext>(options =>
        options
        .UseMySql(connectionString, serverVersion)
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors());

    // Register AutoMapper and mapping profiles
    builder.Services
    .AddAutoMapper(typeof(ArticleMappingProfile))
    .AddAutoMapper(typeof(MessageRecommandationMappingProfile))
    .AddAutoMapper(typeof(NewsletterMappingProfile));
}


var app = builder.Build();

// Configure the HTTP request pipeline.
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        //     app.UseSwaggerUI(options =>
        // {
        //     options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        //     options.RoutePrefix = string.Empty;
        // });
    }
}

{
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();

    app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5173"));
    app.MapControllers();



    app.Run();
}

