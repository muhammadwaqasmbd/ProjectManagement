package com.candidate.management.backendcandidatemanagementappbackend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.candidate.management.backendcandidatemanagementappbackend.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.candidate.management.backendcandidatemanagementappbackend.model.Candidate;
import com.candidate.management.backendcandidatemanagementappbackend.vo.CandidateVO;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CandidateServiceImpl implements CandidateService {
	
	SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
	private static String UPLOADED_FOLDER = "/shared/Resumes/";
	
	@Autowired
	private CandidateRepository repository;
	
	public List<CandidateVO> findAll() {
		List<CandidateVO> candidateVOs = new ArrayList<CandidateVO>();
		List<Candidate> candidates = repository.findAll();
		if(!candidates.isEmpty()){
			for(Candidate candidate : candidates){
				CandidateVO candidateVO = new CandidateVO();
				candidateVO.setId(candidate.getId());
				candidateVO.setName(candidate.getName()!=null?candidate.getName():"");
				candidateVO.setAge(candidate.getAge()!=null?candidate.getAge():"");
				candidateVO.setPhone(candidate.getPhone()!=null?candidate.getPhone():"");
				candidateVO.setEmail(candidate.getEmail()!=null?candidate.getEmail():"");
				candidateVO.setQualification(candidate.getQualification()!=null?candidate.getQualification():"");
				candidateVO.setExperience(candidate.getExperience()!=null?candidate.getExperience():"");
				candidateVO.setFileName(candidate.getFileName()!=null?candidate.getFileName(): "");
				candidateVOs.add(candidateVO);
			}
		}
		return candidateVOs;
	}

	public Candidate save(long id, CandidateVO candidateVO, MultipartFile file) throws ParseException {
		Candidate candidate = new Candidate();
		if(id > 0){
			Optional<Candidate> optionalCandidate = repository.findById(id);
			candidate = optionalCandidate.get();
		}
		if (candidateVO != null) {
			candidate.setName(candidateVO.getName() != null ? candidateVO.getName() : "");
			candidate.setAge(candidateVO.getAge()!=null?candidateVO.getAge():"");
			candidate.setPhone(candidateVO.getPhone()!=null?candidateVO.getPhone():"");
			candidate.setEmail(candidateVO.getEmail() != null ? candidateVO.getEmail() : "");
			candidate.setQualification(candidateVO.getQualification()!=null?candidateVO.getQualification():"");
			candidate.setExperience(candidateVO.getExperience()!=null?candidateVO.getExperience():"");
			if (!file.isEmpty()) {
				try {
					byte[] bytes = file.getBytes();
					Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
					Files.write(path, bytes);
					candidate.setFileName(file.getOriginalFilename());
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			repository.save(candidate);
		}
		return candidate;
	}

	public Candidate deleteById(long id) {
		Optional<Candidate> optionalCandidate = repository.findById(id);
		if (optionalCandidate == null) {
			return null;
		}
		Candidate candidate = optionalCandidate.get();
		repository.delete(candidate);
		return candidate;
	}

	public CandidateVO findById(long id) {
		Optional<Candidate> optionalCandidate = repository.findById(id);
		Candidate candidate = optionalCandidate.get();
		CandidateVO candidateVO = new CandidateVO();
		candidateVO.setId(candidate.getId());
		candidateVO.setName(candidate.getName()!=null?candidate.getName():"");
		candidateVO.setAge(candidate.getAge()!=null?candidate.getAge():"");
		candidateVO.setPhone(candidate.getPhone()!=null?candidate.getPhone():"");
		candidateVO.setEmail(candidate.getEmail()!=null?candidate.getEmail():"");
		candidateVO.setQualification(candidate.getQualification()!=null?candidate.getQualification():"");
		candidateVO.setExperience(candidate.getExperience()!=null?candidate.getExperience():"");
		return candidateVO;
	}
	
}