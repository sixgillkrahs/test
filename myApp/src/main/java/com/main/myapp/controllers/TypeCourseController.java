package com.main.myapp.controllers;

import com.main.myapp.common.res.APIResponse;
import com.main.myapp.models.typeCourse.TypeCourse;
import com.main.myapp.service.TypeCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/type-courses")
@CrossOrigin(origins = "*")
public class TypeCourseController {
    @Autowired
    private TypeCourseService typeCourseService;


    @GetMapping("/all")
    public APIResponse<List<TypeCourse>> getAllTypeCourses() {
        APIResponse<List<TypeCourse>> response = new APIResponse<>();
        response.setCode(200);
        response.setMessage("Get all type courses successfully");
        response.setData(typeCourseService.getAllTypeCourse());
        return response;
    }
}
