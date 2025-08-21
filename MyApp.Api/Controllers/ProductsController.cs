using Microsoft.AspNetCore.Mvc;
using CrudApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace CrudApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static List<Product> products = new()
        {
            new Product { Id = 1, Name = "Laptop", Price = 1500 },
            new Product { Id = 2, Name = "Phone", Price = 800 }
        };

        [HttpGet]
        public IActionResult GetAll() => Ok(products);

        [HttpGet("{id}")]
        public IActionResult Get(int id) =>
            products.FirstOrDefault(p => p.Id == id) is Product product ? Ok(product) : NotFound();

        [HttpPost]
        public IActionResult Create(Product product)
        {
            product.Id = products.Max(p => p.Id) + 1;
            products.Add(product);
            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Product updatedProduct)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();

            products.Remove(product);
            return NoContent();
        }
    }
}
