package com.main.myapp.repository;

import com.main.myapp.models.teacher.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
//    Teacher findByUsername(String username);
//    Teacher findByEmail(String email);
//    Teacher findByPhone(String phone);
}
