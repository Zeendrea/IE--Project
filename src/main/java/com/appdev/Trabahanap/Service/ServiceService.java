package com.appdev.Trabahanap.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.appdev.Trabahanap.Entity.ServiceEntity;
import com.appdev.Trabahanap.Repository.ServiceRepository;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<ServiceEntity> getAllServices() {
        return serviceRepository.findAll();
    }

    public ServiceEntity getServiceById(Long serviceID) {
        return serviceRepository.findById(serviceID).orElse(null);
    }

    public ServiceEntity saveService(ServiceEntity serviceEntity) {
        return serviceRepository.save(serviceEntity);
    }
    public ServiceEntity updateService(Long serviceID, ServiceEntity updatedService) {
        ServiceEntity service = serviceRepository.findById(serviceID).orElse(null);
        if (service != null) {
            service.setTitle(updatedService.getTitle());
            service.setDescription(updatedService.getDescription());
            service.setPrice(updatedService.getPrice());
            service.setAvailability(updatedService.getAvailability()); // Use getAvailability() here
            return serviceRepository.save(service);
        }
        return null;
    }


    public void deleteService(Long serviceID) {
        serviceRepository.deleteById(serviceID);
    }
}
