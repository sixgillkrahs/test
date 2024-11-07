package com.main.myapp.service.impl;

import com.main.myapp.models.typeCourse.TypeCourse;
import com.main.myapp.repository.TypeCourseRepository;
import com.main.myapp.service.TypeCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeCourseServiceImpl implements TypeCourseService {
    @Autowired
    private TypeCourseRepository courseRepository;



    @Override
    public List<TypeCourse> getAllTypeCourse() {
        return courseRepository.findAll();
    }

    @Override
    public TypeCourse getTypeCourseById(Long id) {
        return null;
    }

    @Override
    public TypeCourse createTypeCourse(TypeCourse typeCourse) {
        return null;
    }

    @Override
    public TypeCourse updateTypeCourse(TypeCourse typeCourse) {
        return null;
    }

    @Override
    public void deleteTypeCourse(Long id) {

    }
}
