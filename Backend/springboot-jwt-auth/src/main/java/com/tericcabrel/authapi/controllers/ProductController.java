package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.dtos.ProductDto;
import com.tericcabrel.authapi.entities.Product;
import com.tericcabrel.authapi.services.ProductService;
import com.tericcabrel.authapi.utils.SearchCriteria;
import com.tericcabrel.authapi.utils.SearchOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
//    private final ProductService productService;
//
//    public ProductController(ProductService productService) {
//        this.productService = productService;
//    }
    @Autowired
    private ProductService productService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        ProductDto product = productService.createProduct(productDto);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto product = productService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public boolean edit(@PathVariable Long id, @RequestBody ProductDto updatedProduct){
        return productService.editProduct(id, updatedProduct);
    }
    @GetMapping("/filter")
    public ResponseEntity<Page<ProductDto>> getFilteredProducts(
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) List<Integer> years,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        List<SearchCriteria> criteriaList = new ArrayList<>();

        if (brands != null && !brands.isEmpty()) {
            criteriaList.add(new SearchCriteria("brand", brands, SearchOperation.IN));
        }
        if (categories != null && !categories.isEmpty()) {
            criteriaList.add(new SearchCriteria("category", categories, SearchOperation.IN));
        }
        if (minPrice != null) {
            criteriaList.add(new SearchCriteria("price", minPrice, SearchOperation.GREATER_THAN_EQUAL));
        }
        if (maxPrice != null) {
            criteriaList.add(new SearchCriteria("price", maxPrice, SearchOperation.LESS_THAN_EQUAL));
        }
        if (name != null) {
            criteriaList.add(new SearchCriteria("name", name, SearchOperation.MATCH));
        }
        if (years != null && !years.isEmpty()) {
            criteriaList.add(new SearchCriteria("releaseYear", years, SearchOperation.IN));
        }

        Page<ProductDto> productsPage = productService.getFilteredProducts(criteriaList, page, size);
        return new ResponseEntity<>(productsPage, HttpStatus.OK);
    }

}

