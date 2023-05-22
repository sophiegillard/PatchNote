using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PatchNote.Api.Helpers;

namespace PatchNote.Api;

    public static class Dependencies
    {
        public static IServiceCollection AddAuth(
        this IServiceCollection services, 
        ConfigurationManager configuration)
        {
            var appSettings = new AppSettings(); 
            configuration.Bind(AppSettings.SectionName, appSettings);

            services.Configure<AppSettings>(configuration.GetSection(AppSettings.SectionName));
            
            return services;
        }
    }