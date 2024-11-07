package com.main.myapp.service;

import com.main.myapp.dto.course.CourseDto;

import java.util.List;
import java.util.UUID;

public interface CourseService {
    List<CourseDto> getAllCourses();
    List<CourseDto> getAllCoursesByType(Long typeId);
    CourseDto getCourseById(UUID id);
}
