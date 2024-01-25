namespace AspNetCoreReactVite.Models;

public class WeatherForecast
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public required DateOnly Date { get; init; }

    public required int TemperatureC { get; init; }

    public int TemperatureF => 32 + (int) (TemperatureC / 0.5556);

    public WeatherSummary? Summary { get; init; }
}
