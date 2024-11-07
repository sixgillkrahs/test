package com.main.myapp.models.teacher;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "teachers")
@Builder
@Entity
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String image;
    private String description;
    private String facebook;
    private String linkedin;
    private String twitter;
}
