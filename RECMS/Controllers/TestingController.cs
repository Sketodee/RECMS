using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RECMS.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class TestingController : ControllerBase
    {
        private readonly DataContext _context;

        public TestingController(DataContext context)
        {
            _context = context;
        }

        private static readonly IEnumerable<Testing> Tests = new[]
        {
            new Testing {Id = 1, Name = "Jay", Hobby = "dancing"}
        };

        
        [HttpGet]
        //public Testing[] Get()
        //{
        //    Testing[] data = Tests.ToArray();
        //    return data;
        //}
        public async Task<IEnumerable<Testing>> Test()
        {

            var data = await _context.Testings.ToArrayAsync();
            return data;
        }
    }
}
