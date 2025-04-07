package com.appdev.Trabahanap.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.appdev.Trabahanap.Entity.ServiceEntity;
import com.appdev.Trabahanap.Service.ServiceService;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000, http://localhost:5174") // Adjust for frontend URL
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000, http://localhost:5174")
    public List<ServiceEntity> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{serviceID}")
    @CrossOrigin(origins = "http://localhost:3000, http://localhost:5174")
    public ServiceEntity getServiceById(@PathVariable("serviceID") Long serviceID) {
        return serviceService.getServiceById(serviceID);
    }

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000, http://localhost:5174")
    public ServiceEntity createService(@RequestBody ServiceEntity serviceEntity) {
        System.out.println("Received service data: " + serviceEntity); // Debug log
        return serviceService.saveService(serviceEntity);
    }

    @PutMapping("/{serviceID}")
    @CrossOrigin(origins = "http://localhost:3000, http://localhost:5174")
    public ServiceEntity updateService(@PathVariable("serviceID") Long serviceID, @RequestBody ServiceEntity updatedService) {
        return serviceService.updateService(serviceID, updatedService);
    }

    @DeleteMapping("/{serviceID}")
    @CrossOrigin(origins = "http://localhost:3000, http://localhost:5174")
    public void deleteService(@PathVariable("serviceID") Long serviceID) {
        serviceService.deleteService(serviceID);
    }
}
