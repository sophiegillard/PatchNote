
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PatchNote.Api.Application.Services;
using PatchNote.Api.Helpers;
using PatchNote.Api.Models.Authentication;
using PatchNote.Api.Models.DTOs.Requests;

namespace PatchNote.Api.Controllers.Authentication;

[Authorize]
[ApiController]
[Route("auth")]

    public class AuthenticationController : ControllerBase
    {
    
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AuthenticationController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);
            return Ok(response);
        }

    }
