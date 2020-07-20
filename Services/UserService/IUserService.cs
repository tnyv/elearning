using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.Models;

namespace LMS.Services.UserService
{
    public interface IUserService
    {
         Task<ServiceResponse<List<GetFlashcardDTO>>> GetAllFlashcards();

         Task<ServiceResponse<GetFlashcardDTO>> GetFlashcardById(int id);

         Task<ServiceResponse<List<GetFlashcardDTO>>> AddFlashcard(AddFlashcardDTO newFlashcard);

         Task<ServiceResponse<GetFlashcardDTO>> UpdateFlashcard(UpdateFlashcardDTO updatedFlashcard);

         Task<ServiceResponse<List<GetFlashcardDTO>>> DeleteFlashcard(int id);
    }
}