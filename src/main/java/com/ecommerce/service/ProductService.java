package com.ecommerce.service;


import com.ecommerce.repository.ProductRepository;
import com.ecommerce.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return productRepository.getOne(id);
    }

    public List<Product> saveProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }
}
