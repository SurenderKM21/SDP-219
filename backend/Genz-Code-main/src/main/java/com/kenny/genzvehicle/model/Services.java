package com.kenny.genzvehicle.model;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class Services {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int completed;
    private int pending;
    private String description;

    // New fields based on BookingDetails data
    private String carModel;           // Represents the car model being booked
    private String date;               // Represents the date of booking
    private String question1;          // Represents the issue type
    private String question3;          // Represents the preferred time
    private String question4;          // Represents any additional notes
    private double laborCharge;        // Represents labor charge
    private double toolCharge;         // Represents tool charge
    private double totalAmount;        // Represents the total amount of the booking

    public Services() {
    }

    public Services(String title, int completed, int pending, String description, 
                    String carModel, String date, String question1, String question3,
                    String question4, double laborCharge, double toolCharge, double totalAmount) {
        this.title = title;
        this.completed = completed;
        this.pending = pending;
        this.description = description;
        this.carModel = carModel;
        this.date = date;
        this.question1 = question1;
        this.question3 = question3;
        this.question4 = question4;
        this.laborCharge = laborCharge;
        this.toolCharge = toolCharge;
        this.totalAmount = totalAmount;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getPending() {
        return pending;
    }

    public void setPending(int pending) {
        this.pending = pending;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // New Getters and Setters
    public String getCarModel() {
        return carModel;
    }

    public void setCarModel(String carModel) {
        this.carModel = carModel;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getQuestion1() {
        return question1;
    }

    public void setQuestion1(String question1) {
        this.question1 = question1;
    }

    public String getQuestion3() {
        return question3;
    }

    public void setQuestion3(String question3) {
        this.question3 = question3;
    }

    public String getQuestion4() {
        return question4;
    }

    public void setQuestion4(String question4) {
        this.question4 = question4;
    }

    public double getLaborCharge() {
        return laborCharge;
    }

    public void setLaborCharge(double laborCharge) {
        this.laborCharge = laborCharge;
    }

    public double getToolCharge() {
        return toolCharge;
    }

    public void setToolCharge(double toolCharge) {
        this.toolCharge = toolCharge;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
