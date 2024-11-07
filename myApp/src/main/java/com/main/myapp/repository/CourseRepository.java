package com.main.myapp.repository;

import com.main.myapp.models.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> , PagingAndSortingRepository<Course, UUID> {
    List<Course> findAllByTypeIdAndIsActive(Long typeId, boolean active);
}
