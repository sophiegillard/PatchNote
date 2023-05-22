#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

    public class Categorie
    {
        public Categorie()
        {
            Articles = new HashSet<Article>();
        }

        public int Id { get; set; }
        public string Nom { get; set; }

        public virtual ICollection<Article> Articles { get; set; }
    }

