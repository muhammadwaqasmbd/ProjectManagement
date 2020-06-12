package com.candidate.management.backendcandidatemanagementappbackend.service;

import java.text.ParseException;
import java.util.List;

import org.springframework.stereotype.Service;
import com.candidate.management.backendcandidatemanagementappbackend.model.Candidate;
import com.candidate.management.backendcandidatemanagementappbackend.vo.CandidateVO;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface CandidateService {

  public List<CandidateVO> findAll();

  public Candidate save(long id, CandidateVO candidateVO, MultipartFile file) throws ParseException;

  public Candidate deleteById(long id);

  public CandidateVO findById(long id);
  
}