package com.ISCES.response;


import com.ISCES.entities.Candidate;
import com.ISCES.entities.Student;
import com.ISCES.entities.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
// It is only for responsing the login status in http manners.
public class LoginResponse {
    private int status;
    private String message;
    private Student student;
    private Candidate candidate;


    public LoginResponse(int status, String message,Student student) { //  response for student's login.
        this.status = status;
        this.message = message;
        this.student = student;

    }

    public LoginResponse(int status, String message,Candidate candidate) { // response for candidate's login.
        this.status = status;
        this.message = message;
        this.candidate = candidate;

    }
	public LoginResponse(int status, String message) {
		this.status = status;
		this.message = message;
	}


}