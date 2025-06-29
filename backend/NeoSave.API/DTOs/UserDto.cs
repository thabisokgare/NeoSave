using NeoSave.API.DTOs; // Add this if BudgetDto is in the same namespace, otherwise use the correct namespace
// or define BudgetDto below if it does not exist

namespace NeoSave.API.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public List<Dto.NeoSave.API.DTOs.BudgetDto>? Budgets { get; set; }
        public string? Password { get; set; }
    }

    // Uncomment and modify this if BudgetDto does not exist
    // public class BudgetDto
    // {
    //     public int Id { get; set; }
    //     public string? Name { get; set; }
    // }
}
