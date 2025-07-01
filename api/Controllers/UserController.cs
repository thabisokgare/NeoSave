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
    [Authorize(Roles = "User")]
    // This controller is for user-specific actions and data retrieval.
    public class UserController : ControllerBase
    {


        [HttpGet]

        public IActionResult Get()
        {


            return Ok(new { message = "This is user data" });
        }
    }
}