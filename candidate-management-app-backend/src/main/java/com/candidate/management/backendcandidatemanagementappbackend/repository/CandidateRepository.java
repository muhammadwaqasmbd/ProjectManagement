package com.candidate.management.backendcandidatemanagementappbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.candidate.management.backendcandidatemanagementappbackend.model.Candidate;


@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long>{
}
