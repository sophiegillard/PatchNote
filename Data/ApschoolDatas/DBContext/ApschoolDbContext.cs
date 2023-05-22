using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.ApschoolDatas.Entities;


#nullable disable

namespace PatchNote.Api.Data.ApschoolDatas.DBContext;

    public partial class ApschoolDbContext : DbContext
    {
        public ApschoolDbContext()
        {
        }

        public ApschoolDbContext(DbContextOptions<ApschoolDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Module> Modules { get; set; }
        public virtual DbSet<Utilisateur> Utilisateurs { get; set; }
        public virtual DbSet<EcoleAuxiliaire> EcoleAuxiliaires { get; set; }
        public virtual DbSet<Ecole> Ecoles { get; set; }
        public virtual DbSet<EcoleAuxiliaireModule> EcoleAuxiliaireModules { get; set; }
        public virtual DbSet<Identifiants> AllIdentifiants { get; set; }
        public virtual DbSet<IdentifiantUtilisateur> IdentifiantUtilisateurs { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
       
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //optionsBuilder.UseMySQL("Server=54.38.169.234;Port=3306;Database=apschool;UId=apkiosk.readonly;Password=N7fBU&zItzbj&@$3i!mmEHe9;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        
        }


    }