using AspNetCoreReactVite.Models;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreReactVite.Data;

public sealed class AppDbContext : DbContext
{
    public DbSet<WeatherForecast> WeatherForecasts => Set<WeatherForecast>();

    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var weatherForecast = modelBuilder.Entity<WeatherForecast>();

        weatherForecast.HasKey(e => e.Id);
        weatherForecast.Property(e => e.Summary).HasConversion<string>();

        weatherForecast.HasData(
            new WeatherForecast
            {
                Id = Guid.Parse("dd1a4b02-2853-458b-9aee-027803d5f205"),
                Date = new(2024, 1, 1),
                TemperatureC = 22,
                Summary = WeatherSummary.Cool,
            },
            new WeatherForecast
            {
                Id = Guid.Parse("96ca5ba9-2e01-47ae-8b00-510739e7cb76"),
                Date = new(2024, 1, 2),
                TemperatureC = 26,
                Summary = WeatherSummary.Warm,
            }
        );
    }
}