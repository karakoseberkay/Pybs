using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace pybs.backend.api.Entity
{
    public class MemberEntity
    {

        [Key, Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int MemberId { get; set; }
        public string MemberName { get; set; }
    }
}
