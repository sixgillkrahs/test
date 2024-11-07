package com.main.myapp.repository;

import com.main.myapp.models.Otp.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpRepository extends JpaRepository<Otp,Long> {
    Otp findByPhone(String phone);
    Otp findByPhoneAndOtp(String phone, String otp);
}
