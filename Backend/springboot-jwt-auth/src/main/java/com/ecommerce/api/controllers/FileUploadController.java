package com.ecommerce.api.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/image")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        // Usar el nombre original del archivo
        String fileName = file.getOriginalFilename();
        try {
            // Asegurarse de que el directorio existe
            Files.createDirectories(Paths.get(uploadPath));

            // Guardar el archivo en la ubicación especificada
            Path filePath = Paths.get(uploadPath, fileName);
            Files.copy(file.getInputStream(), filePath);

            // Devolver el nombre del archivo
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}

