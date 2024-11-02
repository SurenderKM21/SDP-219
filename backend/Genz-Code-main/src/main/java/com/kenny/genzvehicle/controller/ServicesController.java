package com.kenny.genzvehicle.controller;

import com.kenny.genzvehicle.model.Services;
import com.kenny.genzvehicle.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http://localhost:5173")
public class ServicesController {

    @Autowired
    private ServicesService serviceService;

    // Get all services
    @GetMapping
    public List<Services> getAllServices() {
        return serviceService.getAllServices();
    }

    // Get a service by ID
    @GetMapping("/{id}")
    public ResponseEntity<Services> getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new service
    @PostMapping
    public Services createService(@RequestBody Services service) {
        return serviceService.createService(service);
    }

    // Update an existing service
    @PutMapping("/{id}")
    public ResponseEntity<Services> updateService(@PathVariable Long id, @RequestBody Services serviceDetails) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceDetails));
    }

    // Delete a service
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}