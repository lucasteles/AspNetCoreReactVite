namespace AspNetCoreReactVite.Models;

public class WeatherForecastDto
{
    public required DateOnly Date { get; init; }
    public required int TemperatureC { get; init; }
    public WeatherSummary Summary { get; init; }
}
