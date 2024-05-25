package com.ecommerce.api.services;

import com.ecommerce.api.dtos.ProductDto;
import com.ecommerce.api.entities.Product;
import com.ecommerce.api.exceptions.ProductAlreadyExistException;
import com.ecommerce.api.exceptions.UserNotFoundException;
import com.ecommerce.api.repositories.ProductRepository;
import com.ecommerce.api.utils.ProductSpecification;
import com.ecommerce.api.utils.SearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
//    private final ProductRepository productRepository;
//
//    public ProductService(ProductRepository productRepository) {
//        this.productRepository = productRepository;
//    }


    @Autowired
    private ProductRepository productRepository;

    public ProductDto createProduct(ProductDto productDto) {
//        Product product = new Product();
//        product.setName(productDto.getName());
//        product.setSmallDescription(productDto.getSmallDescription());
//        product.setImages(productDto.getImages());
//        product.setCategory(productDto.getCategory());
//        product.setBrand(productDto.getBrand());
//        product.setRetailPrice(productDto.getRetailPrice());
//        product.setPrice(productDto.getPrice());
//        product.setRecentlySold(productDto.getRecentlySold());
//        product.setColor(productDto.getColor());
//        product.setReleaseYear(productDto.getReleaseYear());
//        product.setFullDescription(productDto.getFullDescription());
//        product.setSizes(productDto.getSizes());
//        return productRepository.save(product);

        List<Product> products = this.productRepository.findAll();
        boolean productNameExists = products.stream().anyMatch(product -> product.getName().equals(productDto.getName()));

        if (productNameExists) {
            throw new ProductAlreadyExistException();
        } else {
            final var productAdded = this.productRepository.save(new Product(productDto));
            return new ProductDto(productAdded);
        }
    }

    public List<ProductDto> getAllProducts() {
        List<Product> products = this.productRepository.findAll();
        List<ProductDto> productDto = new ArrayList<>();
        for (Product product : products) {
            productDto.add(new ProductDto(product));
        }
        return productDto;
    }

    public ProductDto getProductById(Long id) {
        return productRepository.findById(id).map(ProductDto::new).orElse(null);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public boolean editProduct(Long id, ProductDto updatedProduct) {
        List<Product> products = this.productRepository.findAll();
        boolean productExist = products.stream().anyMatch(product -> product.getId().equals(id));

        return productRepository.findById(id).map(product -> {
            if (!productExist) {
                throw new UserNotFoundException();
            } else {
                boolean updatedProductExist = products.stream().anyMatch(p -> p.getName().equals(updatedProduct.getName()) && !p.getId().equals(id));
                if(updatedProductExist){
                    throw new ProductAlreadyExistException();
                }
                product.setName(updatedProduct.getName());
                product.setSmallDescription(updatedProduct.getSmallDescription());
                product.setImages(updatedProduct.getImages());
                product.setCategory(updatedProduct.getCategory());
                product.setBrand(updatedProduct.getBrand());
                product.setRetailPrice(updatedProduct.getRetailPrice());
                product.setPrice(updatedProduct.getPrice());
                product.setRecentlySold(updatedProduct.getRecentlySold());
                product.setColor(updatedProduct.getColor());
                product.setReleaseYear(updatedProduct.getReleaseYear());
                product.setFullDescription(updatedProduct.getFullDescription());
                product.setSizes(updatedProduct.getSizes());
                productRepository.save(product);
                return true;
            }
        }).orElse(false);
    }

    public Page<ProductDto> getFilteredProducts(List<SearchCriteria> criteriaList, int page, int size) {
        ProductSpecification spec = new ProductSpecification();
        criteriaList.forEach(spec::add);

        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Product> productsPage = productRepository.findAll(spec, pageable);

        return productsPage.map(ProductDto::new);
    }
}

