package com.appdev.Trabahanap.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.Trabahanap.Entity.ServiceProviderEntity;
import com.appdev.Trabahanap.Service.ServiceProviderService;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ServiceProviderController {
	@Autowired
	ServiceProviderService spserv;
	
	@PostMapping("/postProviderRecord")
    public ServiceProviderEntity postProviderRecord(@RequestBody ServiceProviderEntity provider) {
        return spserv.postProviderRecord(provider);
    }


    @GetMapping("/getAllProviders")
    public List<ServiceProviderEntity>getAllProviders(){
        return spserv.getAllProviders();
    }
    // Update of CRUD
    @PutMapping("/updateProviderDetails")
    public ServiceProviderEntity updateProviderDetails(@RequestParam int providerId, @RequestBody ServiceProviderEntity newProviderDetails) {
        return spserv.updateProviderDetails(providerId, newProviderDetails);
    }

    // Delete of CRUD
    @DeleteMapping("/deleteProviderDetails/{providerId}")
    public String deleteStudent(@PathVariable int providerId) {
        return spserv.deleteProvider(providerId);
    }
}
