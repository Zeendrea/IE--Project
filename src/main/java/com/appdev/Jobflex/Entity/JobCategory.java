package com.appdev.Jobflex.Entity;

public enum JobCategory {
    TECHNOLOGY("Technology"),
    HEALTHCARE("Healthcare"),
    FINANCE("Finance"),
    ENGINEERING("Engineering"),
    REMOTE("Remote"),
    EDUCATION("Education"),
    MARKETING("Marketing"),
    SALES("Sales"),
    CUSTOMER_SERVICE("Customer Service"),
    ADMINISTRATION("Administration"),
    HOSPITALITY("Hospitality"),
    RETAIL("Retail"),
    MANUFACTURING("Manufacturing"),
    CONSTRUCTION("Construction"),
    TRANSPORTATION("Transportation"),
    OTHER("Other");

    private final String displayName;

    JobCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }

    public static JobCategory fromString(String text) {
        for (JobCategory category : JobCategory.values()) {
            if (category.displayName.equalsIgnoreCase(text)) {
                return category;
            }
        }
        return OTHER;
    }
}