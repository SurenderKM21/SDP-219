package com.kenny.genzvehicle.service;

import com.kenny.genzvehicle.repo.ServicesRepository;
import com.kenny.genzvehicle.model.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicesService {

    private final ServicesRepository serviceRepository;

    @Autowired
    public ServicesService(ServicesRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Services> getAllServices() {
        return serviceRepository.findAll();
    }

    public Optional<Services> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public Services createService(Services service) {
        return serviceRepository.save(service);
    }

    public Services updateService(Long id, Services updatedService) {
        return serviceRepository.findById(id).map(service -> {
            service.setTitle(updatedService.getTitle());
            service.setCompleted(updatedService.getCompleted());
            service.setPending(updatedService.getPending());
            service.setDescription(updatedService.getDescription());
            return serviceRepository.save(service);
        }).orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}