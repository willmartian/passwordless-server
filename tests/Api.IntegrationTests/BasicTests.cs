using System.Net.Http.Json;

namespace Passwordless.Api.IntegrationTests;

public class BasicTests : IClassFixture<TestWebApplicationFactory<Program>>
{
    protected readonly TestWebApplicationFactory<Program> _factory;
    protected readonly HttpClient _client;

    public BasicTests(TestWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();

        _client.DefaultRequestHeaders.Add("Accept", "application/json");
        _client.DefaultRequestHeaders.Add("User-Agent", "nunit");
    }

    public Task<HttpResponseMessage> PostAsync(string url, object payload)
    {
        return _client.PostAsJsonAsync(url, payload);
    }
}

public class BackendTests : BasicTests
{
    public BackendTests(TestWebApplicationFactory<Program> factory) : base(factory)
    {
        _client.DefaultRequestHeaders.Add("ApiSecret", _factory.ApiSecret);
    }
}

public class PublicTests : BasicTests
{
    public PublicTests(TestWebApplicationFactory<Program> factory) : base(factory)
    {
        _client.DefaultRequestHeaders.Add("ApiKey", _factory.ApiKey);
    }
}