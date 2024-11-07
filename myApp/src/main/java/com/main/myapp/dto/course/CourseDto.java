package com.main.myapp.dto.course;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseDto {
    private UUID id;
    private String name;
    private String description;
    private String image;
    private String videoUrl;
    private Double price;
    private Long duration;
    private int promoPrice;
    private UUID teachId;
    private boolean isDeleted;
    private boolean isActive;
    private Long typeId;
}
