using System.ComponentModel.DataAnnotations;

namespace DataCollectionAPI.DTOs
{
    /// <summary>
    /// Data Transfer Object for receiving user submission from the frontend.
    /// </summary>
    public class UserDataRequestDto
    {
        [Required(ErrorMessage = "El nombre completo es obligatorio.")]
        [MaxLength(150, ErrorMessage = "El nombre no puede superar 150 caracteres.")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
        [EmailAddress(ErrorMessage = "El correo electrónico no tiene un formato válido.")]
        [MaxLength(200)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "El número de teléfono es obligatorio.")]
        [Phone(ErrorMessage = "El teléfono no tiene un formato válido.")]
        [MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        [Required(ErrorMessage = "La ciudad es obligatoria.")]
        [MaxLength(100)]
        public string City { get; set; } = string.Empty;

        [Required(ErrorMessage = "El número de estampas es obligatorio.")]
        [Range(0, 100000, ErrorMessage = "El número de estampas debe estar entre 0 y 100.000.")]
        public int StickerCount { get; set; }

        [MaxLength(150, ErrorMessage = "El álbum favorito no puede superar 150 caracteres.")]
        public string? FavoriteAlbum { get; set; }

        [Required(ErrorMessage = "Debe aceptar la política de privacidad.")]
        public bool PrivacyPolicyAccepted { get; set; }

        [Required(ErrorMessage = "La contraseña es obligatoria.")]
        public string Password { get; set; } = string.Empty;
    }

    /// <summary>Collector profile returned to the client — email is masked for privacy.</summary>
    public class UserDataResponseDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int StickerCount { get; set; }
        public string? FavoriteAlbum { get; set; }
        public bool PrivacyPolicyAccepted { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
