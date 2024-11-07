package com.main.myapp.repository;

import com.main.myapp.models.typeCourse.TypeCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeCourseRepository extends JpaRepository<TypeCourse, Long> {

}
