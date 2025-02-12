﻿using AdminConsole.Identity;
using AdminConsole.Models;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminConsole.Db;

public class ConsoleDbContext : IdentityDbContext<ConsoleAdmin, IdentityRole, string>, IDataProtectionKeyContext
{
    public ConsoleDbContext(DbContextOptions options)
        : base(options)
    {
    }

    public DbSet<Organization> Organizations { get; set; }
    public DbSet<Application> Applications { get; set; }
    public DbSet<Onboarding> Onboardings { get; set; }

    public DbSet<Invite> Invites { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        EntityTypeBuilder<Application> application = builder.Entity<Application>();
        application.HasOne<Onboarding>(a => a.Onboarding);

        builder.Entity<Onboarding>(o =>
        {
            o.HasKey(o => o.ApplicationId);
        });

        builder.Entity<Invite>(o =>
        {
            o.HasKey(i => i.HashedCode);
        });

        base.OnModelCreating(builder);
    }

    public DbSet<DataProtectionKey> DataProtectionKeys { set; get; }
}