using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Common;
using PatchNote.Api.Data.PatchNoteDatas.Entities.MessageRecommandation;

#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.DBContext;

public partial class HangfireDbContext : DbContext
{
    public HangfireDbContext()
    {

    }

    public HangfireDbContext(DbContextOptions<HangfireDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<HangfireJob> HangfireJobs { get; set; }


}
