package com.ecommerce.api.services;

import com.ecommerce.api.dtos.ProductDto;
import com.ecommerce.api.entities.Product;
import com.ecommerce.api.entities.User;
import com.ecommerce.api.exceptions.*;
import com.ecommerce.api.repositories.ProductRepository;
import com.ecommerce.api.utils.ProductSpecification;
import com.ecommerce.api.utils.SearchCriteria;
import jakarta.transaction.Transactional;
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

    @Autowired
    private ProductRepository productRepository;

    public ProductDto createProduct(ProductDto productDto) {
        isValidProduct(productDto);

        List<Product> products = this.productRepository.findAll();
        boolean productNameExists = products.stream().anyMatch(product -> product.getName().equalsIgnoreCase(productDto.getName()));

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
        isValidProduct(updatedProduct);
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

    @Transactional
    public void editProductRecentlySold(Long itemId, int quantity) {
        final var optionalProduct = productRepository.findById(itemId).orElseThrow(ProductNotFoundException::new);

        optionalProduct.setRecentlySold(quantity);
        productRepository.save(optionalProduct);
    }

    private void isValidProduct(ProductDto productDto){
        if(productDto.getName() == null){
            throw new InvalidProductNameException();
        }
        if(productDto.getSmallDescription() == null){
            throw new InvalidProductDescriptionException();
        }
        if(productDto.getFullDescription() == null){
            throw new InvalidProductDescriptionException();
        }
        if(productDto.getCategory() == null){
            throw new InvalidProductCategoryException();
        }
        if(productDto.getColor() == null){
            throw new InvalidProductColorException();
        }
        if(productDto.getBrand() == null){
            throw new InvalidProductBrandException();
        }
        if(productDto.getPrice() <= 0){
            throw new InvalidProductPriceException();
        }
        if(productDto.getRetailPrice() <= 0){
            throw new InvalidProductRetailPriceException();
        }
        if(productDto.getReleaseYear() < 2020 &&  productDto.getReleaseYear() > 2024){
            throw new InvalidProductReleaseYearException();
        }
        if(productDto.getImages().isEmpty()){
            throw new InvalidProductImagesException();
        }
    }
}

