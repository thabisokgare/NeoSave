using System.Threading.Tasks;
using NeoSave.Application.DTOs.Survey;

namespace NeoSave.Application.Interfaces
{
    public interface ISurveyService
    {
        Task SubmitSurveyAsync(SurveyResponseDto dto, Guid userId);
    }
}