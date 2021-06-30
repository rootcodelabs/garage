package com.rootcodelabs.brpmocksystem.repository;

import com.rootcodelabs.brpmocksystem.entity.MockJson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * This interface method signatures to manipulate jpa repository crud operations.
 */
public interface MockJsonRepository extends JpaRepository<MockJson,Long> {
    List<MockJson> findById(String Id);
}
