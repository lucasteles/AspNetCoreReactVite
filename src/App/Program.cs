using System.Text.Json.Serialization;
using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;
using AspNetCoreReactVite;
using AspNetCoreReactVite.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services
    .AddDbContext<AppDbContext>(options => options
        .EnableSensitiveDataLogging(builder.Environment.IsDevelopment())
        .UseNpgsql(connectionString, o => o
            .UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)))
    .AddHttpLogging(o => o
            .LoggingFields = HttpLoggingFields.Duration
                             | HttpLoggingFields.RequestProperties
                             | HttpLoggingFields.ResponseStatusCode)
    .AddEndpointsApiExplorer()
    .AddSwaggerGen(options => { options.SupportNonNullableReferenceTypes(); })
    .ConfigureHttpJsonOptions(options => options
        .SerializerOptions.Converters.Add(new JsonStringEnumConverter()))
    .Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(o => o // For Swagger
        .JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services
    .AddSingleton(TimeProvider.System)
    .AddSingleton(Random.Shared);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}

// Swagger
if (!app.Environment.IsProduction())
    app
        .UseSwagger()
        .UseSwaggerUI(options =>
        {
            options.DocumentTitle = app.Environment.ApplicationName;
            options.DisplayRequestDuration();
        });

app
    .UseHttpLogging()
    .UseStaticFiles()
    .UseRouting();

// Map API routes
var api = app.MapGroup("api");
api.MapRoutes();
app.MapFallbackToFile("index.html");

await using (var scope = app.Services.CreateAsyncScope())
{
    await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.MigrateAsync();
}

app.Run();
