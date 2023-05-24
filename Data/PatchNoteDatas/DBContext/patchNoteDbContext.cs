using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Common;
using PatchNote.Api.Data.PatchNoteDatas.Entities.MessageRecommandation;

#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.DBContext;

public partial class patchNoteDbContext : DbContext
{
    public patchNoteDbContext()
    { }

    public patchNoteDbContext(DbContextOptions<patchNoteDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Article> Articles { get; set; }
    public virtual DbSet<Categorie> Categories { get; set; }
    public virtual DbSet<Module> Modules { get; set; }
    public virtual DbSet<MessageRecommandation> MessageRecommandations { get; set; }
    public virtual DbSet<Newsletter> Newsletters { get; set; }
    public virtual DbSet<StatutMessageRecommandation> StatutMessageRecommandations { get; set; }
    public virtual DbSet<UtilisateurApschool> UtilisateursApschool { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            //optionsBuilder.UseMySQL("Server=localhost;Port=3306;Database=patch_note;UId=root;Password=root1234");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>(entity =>
        {
            entity.ToTable("article");

            // entity.HasIndex(e => e.UtilisateurId, "fk_articles_utilisateur_id");

            entity.HasIndex(e => e.CategorieId, "fk_articles_categorie_id");

            entity.HasIndex(e => e.NewsletterId, "fk_articles_newsletter_id");

            entity.HasIndex(e => e.NewsletterId, "fk_articles_module_id");

            entity.Property(e => e.ContenuFR)
                .IsRequired()
                .HasColumnType("longtext");

            entity.Property(e => e.IsArchive).HasColumnType("tinyint");

            entity.Property(e => e.IsBrouillon)
                .HasColumnType("tinyint")
                .HasComment("0: false / 1: true");

            entity.Property(e => e.TitreFR)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(e => e.Version).HasMaxLength(45);

            entity.HasOne(d => d.Categorie)
                .WithMany(p => p.Articles)
                .HasForeignKey(d => d.CategorieId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_articles_categorie_id");

            entity.HasOne(d => d.Module)
                 .WithMany(p => p.Articles)
                 .HasForeignKey(d => d.ModuleId)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("fk_articles_module_id");

            entity.HasOne(d => d.Newsletter)
                .WithMany(p => p.Articles)
                .HasForeignKey(d => d.NewsletterId)
                .HasConstraintName("fk_articles_newsletter_id");

            // entity.HasOne(d => d.UtilisateurApschool)
            //     .WithMany(p => p.Articles)
            //     .HasForeignKey(d => d.UtilisateurId)
            //     .OnDelete(DeleteBehavior.ClientSetNull)
            //     .HasConstraintName("fk_articles_auteur_id");
        });

        modelBuilder.Entity<Categorie>(entity =>
        {
            entity.ToTable("categorie");

            entity.Property(e => e.Nom)
                .IsRequired()
                .HasMaxLength(255);
        });

        modelBuilder.Entity<Module>(entity =>
       {
           entity.ToTable("module");

           entity.Property(e => e.Nom)
               .IsRequired()
               .HasMaxLength(255);
       });

        modelBuilder.Entity<MessageRecommandation>(entity =>
        {
            entity.ToTable("messageRecommandation");

            entity.HasIndex(e => e.StatutMessageRecommandationId, "fk_statut_message_recommandation_id");

            entity.Property(e => e.Auteur)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(e => e.Ecole)
                .IsRequired()
                .HasMaxLength(255);

            entity.Property(e => e.IsLu).HasColumnType("tinyint");

            entity.Property(e => e.Message).IsRequired();

            // entity.HasOne(d => d.StatutMessageRecommandation)
            //     .WithMany(p => p.MessageRecommandations)
            //     .HasForeignKey(d => d.StatutMessageRecommandationId)
            //     .OnDelete(DeleteBehavior.ClientSetNull)
            //     .HasConstraintName("fk_statut_message_recommandation_id");
        });

        modelBuilder.Entity<Newsletter>(entity =>
        {
            entity.ToTable("newsLetter");

            // entity.Property(e => e.Contenu)
            //     .IsRequired()
            //     .HasColumnType("longtext");

            // entity.Property(e => e.IsPublished).HasColumnType("tinyint");

            // entity.Property(e => e.Resume)
            //     .IsRequired()
            //     .HasMaxLength(255);

            // entity.Property(e => e.Titre)
            //     .IsRequired()
            //     .HasMaxLength(255);
        });

        modelBuilder.Entity<StatutMessageRecommandation>(entity =>
        {
            entity.ToTable("statutMessageRecommandation");

            entity.Property(e => e.NomStatut)
                .IsRequired()
                .HasMaxLength(255);
        });

        // modelBuilder.Entity<UtilisateurApschool>(entity =>
        // {
        //     entity.HasKey(e => e.UtilisateurApschoolId)
        //         .HasName("PRIMARY");

        //     entity.ToTable("utilisateur");

        //     entity.Property(e => e.IsSubscribed).HasColumnType("tinyint");
        // });

        modelBuilder.Entity<UtilisateurApschool>(entity =>
       {
           entity.ToTable("utilisateurApschool");

       });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
