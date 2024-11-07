package com.main.myapp.service.impl;

import com.main.myapp.dto.course.CourseDto;
import com.main.myapp.models.course.Course;
import com.main.myapp.repository.CourseRepository;
import com.main.myapp.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream().map(course -> {
            return CourseDto.builder()
                    .id(course.getId())
                    .name(course.getName())
                    .description(course.getDescription())
                    .image(course.getImage())
                    .videoUrl(course.getVideoUrl())
                    .price(course.getPrice())
                    .duration(course.getDuration())
                    .promoPrice(course.getPromoPrice())
                    .teachId(course.getTeachId())
                    .typeId(course.getTypeId())
                    .isActive(course.isActive())
                    .isDeleted(course.isDeleted())
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    public List<CourseDto> getAllCoursesByType(Long typeId) {
        return courseRepository.findAllByTypeIdAndIsActive(typeId,true).stream().map(course -> {
            return CourseDto.builder()
                    .id(course.getId())
                    .name(course.getName())
                    .description(course.getDescription())
                    .image(course.getImage())
                    .videoUrl(course.getVideoUrl())
                    .price(course.getPrice())
                    .duration(course.getDuration())
                    .promoPrice(course.getPromoPrice())
                    .teachId(course.getTeachId())
                    .typeId(course.getTypeId())
                    .isActive(course.isActive())
                    .isDeleted(course.isDeleted())
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    public CourseDto getCourseById(UUID id) {
        Course course = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        return CourseDto.builder()
                .id(course.getId())
                .name(course.getName())
                .description(course.getDescription())
                .image(course.getImage())
                .videoUrl(course.getVideoUrl())
                .price(course.getPrice())
                .duration(course.getDuration())
                .promoPrice(course.getPromoPrice())
                .teachId(course.getTeachId())
                .typeId(course.getTypeId())
                .isActive(course.isActive())
                .isDeleted(course.isDeleted())
                .build();
    }
}
