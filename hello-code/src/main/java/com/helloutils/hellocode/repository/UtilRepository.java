package com.helloutils.hellocode.repository;

import com.helloutils.hellocode.domain.Util;
import com.helloutils.hellocode.response.UtilResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UtilRepository extends JpaRepository<Util, Long> {
    Page<Util> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
