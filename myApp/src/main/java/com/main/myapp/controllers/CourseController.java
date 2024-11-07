package com.main.myapp.controllers;

import com.main.myapp.common.res.APIResponse;
import com.main.myapp.dto.course.CourseDto;
import com.main.myapp.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/courses")
@CrossOrigin(origins = "*")
public class CourseController {
    @Autowired
    private CourseService courseService;

     @GetMapping("/all")
    public APIResponse<List<CourseDto>> getAllCourses() {
         APIResponse<List<CourseDto>> response = new APIResponse<>();
         response.setCode(200);
         response.setMessage("Get all courses successfully");
         response.setData(courseService.getAllCourses());
         return response;
     }

    @GetMapping("/course-type/{typeId}")
    public APIResponse<List<CourseDto>> getAllCoursesByType(@PathVariable Long typeId) {
        APIResponse<List<CourseDto>> response = new APIResponse<>();
        response.setCode(200);
        response.setMessage("Get all courses successfully");
        response.setData(courseService.getAllCoursesByType(typeId));
        return response;
    }

    @GetMapping("/course/{id}")
    public APIResponse<CourseDto> getCourseDetail(@PathVariable UUID id) {
        APIResponse<CourseDto> response = new APIResponse<>();
        response.setCode(200);
        response.setMessage("Get all courses successfully");
        response.setData(courseService.getCourseById(id));
        return response;
    }


}
