package com.main.myapp.service;

import com.main.myapp.models.typeCourse.TypeCourse;

import java.util.List;

public interface TypeCourseService {
    List<TypeCourse> getAllTypeCourse();
    TypeCourse getTypeCourseById(Long id);
    TypeCourse createTypeCourse(TypeCourse typeCourse);
    TypeCourse updateTypeCourse(TypeCourse typeCourse);
    void deleteTypeCourse(Long id);
}
