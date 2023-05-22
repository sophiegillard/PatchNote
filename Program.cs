using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using Hangfire;
using Hangfire.MySql;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Identity.Web;
using PatchNote.Api;
using PatchNote.Api.Application.Authorization;
using PatchNote.Api.Application.Services;
using PatchNote.Api.Application.Services.NewsletterEmailService;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Models.DTOs.Requests;


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


//Setting up Hangfire for scheduling sending newsletter
    builder.Services.AddHangfire(configuration =>
        configuration
            .UseStorage(new MySqlStorage(builder.Configuration.GetConnectionString("HangfireConnection"), new MySqlStorageOptions
            {
                QueuePollInterval = TimeSpan.FromSeconds(15),
                JobExpirationCheckInterval = TimeSpan.FromHours(1),
                CountersAggregateInterval = TimeSpan.FromMinutes(5),
                PrepareSchemaIfNecessary = true,
                DashboardJobListLimit = 50000,
                TransactionTimeout = TimeSpan.FromMinutes(1),
                TablesPrefix = "Hangfire"
            })));

    builder.Services.AddHangfireServer();

 // add authentication services
    builder.Services
        .AddScoped<IJwtUtils, JwtUtils>()
        .AddScoped<IUserService, UserService>();

    builder.Services.AddTransient<INewsletterEmailService, NewsletterEmailService>();

//  Connextion to Databases
    var connectionString = builder.Configuration.GetConnectionString("PatchNoteDbConnectionString");
    var connectionStringApSchool = builder.Configuration.GetConnectionString("ApSchoolConnectionString");
    var HangfireConnection = builder.Configuration.GetConnectionString("HangfireConnection");
    var serverVersion = new MySqlServerVersion(new Version(8, 0, 31));

    builder.Services.AddDbContext<patchNoteDbContext>(options =>
        options
        .UseMySql(connectionString, serverVersion)
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors());

    builder.Services.AddDbContext<ApschoolDbContext>(options =>
        options
        .UseMySql(connectionStringApSchool, serverVersion)
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors());

    builder.Services.AddDbContext<HangfireDbContext>(options =>
        options
        .UseMySql(HangfireConnection, serverVersion)
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors());
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
    app.UseHangfireDashboard();
    app.MapHangfireDashboard();
    

    app.Run();
}

