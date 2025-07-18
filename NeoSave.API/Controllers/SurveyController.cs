using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeoSave.Application.DTOs.Survey;
using NeoSave.Application.Interfaces;
using System.Security.Claims;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SurveyController(ISurveyService surveyService) : ControllerBase
    {
        private readonly ISurveyService _surveyService = surveyService;

        [Authorize]
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitSurvey([FromBody] SurveyResponseDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? User.FindFirst("sub")?.Value
                ?? User.FindFirst("nameid")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized();
            await _surveyService.SubmitSurveyAsync(dto, userId);
            return Ok(new { message = "Survey submitted" });
        }
    }
}