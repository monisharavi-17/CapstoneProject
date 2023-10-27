package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.UserLeads;
import com.example.demo.entity.logs;
@Repository
public interface logrepo extends JpaRepository<logs, Integer>{

	List<logs> findByTeamid(int lteamid);

	List<logs> findByLeadid(int leadid);

}
