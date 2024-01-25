using AspNetCoreReactVite.Data;
using AspNetCoreReactVite.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreReactVite;

public static class Routes
{
    public static void MapRoutes(this IEndpointRouteBuilder api)
    {
        api.MapGet("WeatherForecast", (
            ILogger<WeatherForecast> logger,
            TimeProvider timeProvider,
            Random random
        ) =>
        {
            logger.LogInformation("Request getting weather");
            var summaries = Enum.GetValues<WeatherSummary>();
            
            return Enumerable.Range(1, 5)
                .Select(index => new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(timeProvider.GetUtcNow().DateTime).AddDays(index),
                    TemperatureC = random.Next(-20, 55),
                    Summary = random.GetItems(summaries, 1).Single(),
                });
        });

        api.MapGet("WeatherForecast/saved", (AppDbContext db, CancellationToken ct) =>
            db.WeatherForecasts.ToListAsync(ct)
        );

        api.MapGet("WeatherForecast/{id}",
            async Task<Results<Ok<WeatherForecast>, NotFound>> (
                    AppDbContext db, CancellationToken ct,
                    Guid id
                ) =>
                await db.WeatherForecasts.SingleOrDefaultAsync(w => w.Id == id, ct) is { } weather
                    ? TypedResults.Ok(weather)
                    : TypedResults.NotFound()
        );
    }
}