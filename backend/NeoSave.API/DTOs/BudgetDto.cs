using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NeoSave.API.Dto
{
    namespace NeoSave.API.DTOs
    {
        public class BudgetDto
        {
            public int Id { get; set; }
            public string? Name { get; set; }
            public decimal Amount { get; set; }
            public string? Category { get; set; }
        }
    }

}