package com.candidate.management.backendcandidatemanagementappbackend.restcontroller;

import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.candidate.management.backendcandidatemanagementappbackend.model.Candidate;
import com.candidate.management.backendcandidatemanagementappbackend.service.CandidateService;
import com.candidate.management.backendcandidatemanagementappbackend.vo.CandidateVO;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200", "http://localhost:8888" })
@RestController
public class CandidateRestController {

	@Autowired
	private CandidateService candidateService;

	@GetMapping("/candidatemanagement/candidates")
	public List<CandidateVO> getAllCandidates() {
		return candidateService.findAll();
	}

	@GetMapping("/candidatemanagement/candidates/{id}")
	public CandidateVO getCandidate(@PathVariable long id) {
		CandidateVO candidate = candidateService.findById(id);
		return candidate;
	}

	@DeleteMapping("/candidatemanagement/candidates/delete/{id}")
	public ResponseEntity<Void> deleteCandidate(@PathVariable long id) {

		Candidate candidate = candidateService.deleteById(id);

		if (candidate != null) {
			return ResponseEntity.noContent().build();
		}

		return ResponseEntity.notFound().build();
	}

	@PutMapping(value = "/candidatemanagement/candidates/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<CandidateVO> updateCandidate(@PathVariable long id,
													   @RequestParam String name, @RequestParam String age, @RequestParam String phone, @RequestParam String email,
													   @RequestParam String qualification, @RequestParam String experience,
													   @RequestParam MultipartFile file) {

		Candidate updatedCandidate = new Candidate();
		CandidateVO candidateVO = new CandidateVO();
		try {
				candidateVO.setName(StringUtils.isEmpty(name) ? "" : name);
				candidateVO.setAge(StringUtils.isEmpty(age) ? "" : age);
				candidateVO.setPhone(StringUtils.isEmpty(phone) ? "" :phone );
				candidateVO.setEmail(StringUtils.isEmpty(email) ? "" : email);
				candidateVO.setQualification(StringUtils.isEmpty(qualification) ? "" : qualification);
				candidateVO.setExperience(StringUtils.isEmpty(experience) ? "" : experience);;
				updatedCandidate = candidateService.save(id, candidateVO, file);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new ResponseEntity<CandidateVO>(candidateVO, HttpStatus.OK);
	}

	@PostMapping(value = "/candidatemanagement/candidates/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Void> createCandidate(@RequestParam String name, @RequestParam String age, @RequestParam String phone, @RequestParam String email,
												@RequestParam String qualification, @RequestParam String experience,
												@RequestParam MultipartFile file) {

		Candidate createdCandidate = new Candidate();
		CandidateVO candidateVO = new CandidateVO();
		try {
			candidateVO.setName(StringUtils.isEmpty(name) ? "" : name);
			candidateVO.setAge(StringUtils.isEmpty(age) ? "" : age);
			candidateVO.setPhone(StringUtils.isEmpty(phone) ? "" :phone );
			candidateVO.setEmail(StringUtils.isEmpty(email) ? "" : email);
			candidateVO.setQualification(StringUtils.isEmpty(qualification) ? "" : qualification);
			candidateVO.setExperience(StringUtils.isEmpty(experience) ? "" : experience);

			createdCandidate = candidateService.save(0, candidateVO, file);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(createdCandidate.getId()).toUri();

		return ResponseEntity.created(uri).build();
	}
	
	@GetMapping("/candidatemanagement/candidates/pieChartData")
	public List<HashMap<Integer, String>> getPieChartData() {
		List<HashMap<Integer, String>> languagesMap = new ArrayList<HashMap<Integer, String>>();
		List<CandidateVO> candidates = candidateService.findAll();
		
		if(!candidates.isEmpty()){
			List<String> languages = new ArrayList();
			for(CandidateVO candidate : candidates){
				if(candidate.getFileName()!=null && candidate.getFileName().toLowerCase().contains("java".toLowerCase())) {
					languages.add("Java");
				}else if(candidate.getFileName()!=null && candidate.getFileName().toLowerCase().contains("python".toLowerCase())) {
					languages.add("Python");
				}else if(candidate.getFileName()!=null && candidate.getFileName().toLowerCase().contains("node".toLowerCase())) {
					languages.add("Node");
				}else if(candidate.getFileName()!=null && candidate.getFileName().toLowerCase().contains("golang".toLowerCase())) {
					languages.add("GoLang");
				}else if(candidate.getFileName()!=null && candidate.getFileName().toLowerCase().contains("rust".toLowerCase())) {
					languages.add("Rust");
				}else if(candidate.getFileName()!=null && candidate.getFileName().toLowerCase().contains("scala".toLowerCase())) {
					languages.add("Scala");
				}
			}
			List<String> addedLanguages = new ArrayList<>();
			for(String language : languages){
				HashMap<Integer, String> map = new HashMap<>();
				if(addedLanguages.contains(language)){
					continue;
				}
				int percentage = (Collections.frequency(languages, language) * 100)/languages.size();
				map.put(percentage, language);
				languagesMap.add(map);
				addedLanguages.add(language);
			}
		}
		

		return languagesMap;
	}

}
