using DataCollectionAPI.DTOs;
using DataCollectionAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DataCollectionAPI.Controllers
{
    /// <summary>
    /// Panini Sticker Exchange — collector profile endpoints.
    /// </summary>
    [ApiController]
    [Route("api/users")]
    [Produces("application/json")]
    public class UserDataController : ControllerBase
    {
        private readonly IUserDataService _service;
        private readonly ILogger<UserDataController> _logger;

        public UserDataController(IUserDataService service, ILogger<UserDataController> logger)
        {
            _service = service;
            _logger = logger;
        }

        /// <summary>POST /api/users — Register a new collector.</summary>
        [HttpPost]
        [ProducesResponseType(typeof(UserDataResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register([FromBody] UserDataRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var ip = HttpContext.Connection.RemoteIpAddress?.ToString()
                     ?? Request.Headers["X-Forwarded-For"].FirstOrDefault();

            try
            {
                var result = await _service.SubmitUserDataAsync(dto, ip);
                return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, "Privacy policy not accepted.");
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error registering collector.");
                return StatusCode(500, new { message = "Ocurrio un error interno. Por favor intente de nuevo." });
            }
        }

        /// <summary>GET /api/users — List all collectors for the exchange board.</summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UserDataResponseDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAll()
        {
            var results = await _service.GetAllAsync();
            return Ok(results);
        }

        /// <summary>GET /api/users/{id} — Single collector (internal use).</summary>
        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(UserDataResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var all = await _service.GetAllAsync();
            var item = all.FirstOrDefault(u => u.Id == id);
            return item is null ? NotFound() : Ok(item);
        }
    }
}
