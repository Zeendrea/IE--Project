package com.appdev. Jobflex.Service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev. Jobflex.Entity.ServiceProviderEntity;
import com.appdev. Jobflex.Repository.ServiceProviderRepository;

@Service
public class ServiceProviderService {
	
	@Autowired
	ServiceProviderRepository sprepo;
	
	public ServiceProviderService() {
		super();
	}
	
	public ServiceProviderEntity postProviderRecord(ServiceProviderEntity provider) {
		return sprepo.save(provider);
	}
	
	public List<ServiceProviderEntity> getAllProviders(){
		return sprepo.findAll();
	}
	
	//Update
    @SuppressWarnings("finally")
    public ServiceProviderEntity updateProviderDetails(int providerId, ServiceProviderEntity newProviderDetails) {
    	ServiceProviderEntity provider = new ServiceProviderEntity();
        try {
            // Search the student by ID
            provider = sprepo.findById(providerId).get();

            provider.setServiceType(newProviderDetails.getServiceType());
            provider.setRating(newProviderDetails.getRating());
            provider.setVerifiedStatus(newProviderDetails.getVerifiedStatus());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Service Provider " + providerId + " not found");
        } finally {
            return sprepo.save(provider);
        }
    }
    // Delete
    public String deleteProvider(int providerId) {
        String msg = "";
        if (sprepo.findById(providerId).isPresent()) {
            sprepo.deleteById(providerId);
            msg = "Service Provider Record successfully deleted!";
        } else {
            msg = providerId + " NOT found!";
        }
        return msg;
    }

	
}
