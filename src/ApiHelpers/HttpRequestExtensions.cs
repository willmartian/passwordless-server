﻿using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using UAParser;

namespace ApiHelpers
{
    public static class HttpRequestExtensions
    {
        public static string GetApiSecret(this HttpRequest req)
        {
            req.Headers.TryGetValue("ApiSecret", out var value);
            return value.SingleOrDefault();
        }

        public static string GetPublicApiKey(this HttpRequest req)
        {
            req.Headers.TryGetValue("ApiKey", out var value);
            return value.SingleOrDefault();
        }

        public static string GetTenantName(this HttpRequest req)
        {
            var key = req.GetPublicApiKey();
            if (key == null)
            {
                key = req.GetApiSecret();
            }

            if (key == null)
            {
                key = req.Query["key"];
            }

            if (string.IsNullOrEmpty(key))
            {
                return null;
            }

            var span = key.AsSpan();
            var i = span.IndexOf(':');

            if (i == -1)
            {
                return null;
            }

            return span.Slice(0, i).ToString();
        }
    }


    public static class Helpers
    {

        public static (string deviceInfo, string country) GetDeviceInfo(HttpRequest req)
        {
            var uap = Parser.GetDefault();
            var d = uap.Parse(req.Headers["User-Agent"]);

            var deviceInfo = $"{d.UA.Family}, {d.OS.Family} {d.OS.Major}";
            var country = string.Empty;
            if (req.Headers.TryGetValue("CF-IPCountry", out var countryh))
            {
                country = countryh.FirstOrDefault();
            }

            return (deviceInfo, country);
        }
    }
}