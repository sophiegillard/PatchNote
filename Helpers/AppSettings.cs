#nullable disable

namespace PatchNote.Api.Helpers
{
    public class AppSettings
    {
    public const string SectionName = "AppSettings";
    public string Secret { get; init; } = null!;
    public double ExpirationTimeInMinutes { get; init; }
    public string Issuer { get; init; } = null!;
    public string Audience { get; init; } = null!;
    }
}