﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pybs.backend.api.Entity
{
    [Table(nameof(ProjectEntity))]
    public class ProjectEntity
    {


        [Key, Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int ProjectId { get; set; }
     
        
        public string ProjectName { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public virtual DepartmentEntity? Department { get; set; }


    }
}
