package com.main.myapp.models.course;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "courses")
@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
