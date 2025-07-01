using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            // This is a placeholder for admin-specific data retrieval logic
            // In a real application, you would typically check if the user is an admin
            // and return relevant data accordingly.

            return Ok(new { message = "This is admin data" });
        }
    }
}