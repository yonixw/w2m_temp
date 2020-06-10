using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// https://aspnetcore.readthedocs.io/en/latest/fundamentals/static-files.html

namespace server.Controllers
{
    [ApiController]
    [Route("sample")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public int Get()
        {
            return 5;
        }
    }
}
