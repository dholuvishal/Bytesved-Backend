import Joi, { allow, required } from "joi";
import JoiDate from "@joi/date";
const JoiExtended = Joi.extend(JoiDate);
import validationMessages from "../Utils/validationMessages";
// import { ModuleName } from "../Models/EmployeeModel";
import { ROLES, MODULES } from "../Config/constant";
import ExperienceInformations from "../Models/experienceInfoModel";

const profileValidation = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "First Name"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "First Name"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "First Name"),
    }),
  lastName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Last Name"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Last Name"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Last Name"),
    }),
  birthDate: JoiExtended.date()
    .format("YYYY-MM-DD")
    .required()
    .messages({
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Date of Birth"
      ),
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "Date of Birth"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Date of Birth"
      ),
    }),
  gender: Joi.string()
    .valid("Male", "Female", "Other")
    .insensitive()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Gender"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Gender"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Gender"),
      "any.only": "Invalid gender. Please choose a valid option.",
    }),
  address: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Address"),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Address"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Address"),
    }),
  state: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "State"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "State"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "State"),
    }),
  country: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Country"),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Country"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Country"),
    }),
  pinCode: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Pin Code"),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Pin Code"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Pin Code"),
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Phone Number"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Phone Number"
      ),
      "string.pattern.base": "Phone Number must be a 10-digit number",
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Phone Number"
      ),
    }),
  department: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Department"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Department"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Department"),
    }),
  designation: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Designation"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Designation"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Designation"
      ),
    }),
  reportsTo: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Reports To"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Reports To"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Reports To"),
    }),
});

const empPersonalInformationValidation = Joi.object({
  passportNo: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
         "ADD:", 
         "Passport No"
        ),
    }),
    passportExpiryDate: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "Passport Expiry Date"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Passport Expiry Date"
      ),
    }),
    telephoneNo: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Telephone Number"
      ),
      "string.pattern.base": "Telephone Number must be a 10-digit number",
    }),
  nationality: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Nationality"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Nationality"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Nationality"
      ),
    }),
  religion: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Religion"),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Religion"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Religion"),
    }),
  maritalStatus: Joi.string()
    .valid("Single", "Married")
    .insensitive()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Marital Status"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Marital Status"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Marital Status"
      ),
      "any.only": "Invalid merital status. Please choose a valid option.",
    }),
  employmentOfSpouse: Joi.string().messages({
    "string.base": validationMessages.STRING_BASE.replace(
      "ADD:",
      "Employment Of Spouse"
    ),
  }),
  no_ofChildren: Joi.number().messages({
    "number.base": validationMessages.NUMBER_BASE.replace(
      "ADD:",
      "Number Of Children"
    ),
  }),
});

const bankInfoValidation = Joi.object({
  bankName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Bank Name"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Bank Name"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Bank Name"),
    }),
  bankAccountNo: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Bank Account Number"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Bank Account Number"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Bank Account Number"
      ),
  }),
  ifscCode: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace(
       "ADD:", 
       "IFSC Code"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "IFSC Code"
      ),
    "any.required": validationMessages.REQUIRED.replace(
       "ADD:", 
       "IFSC Code"
      ),
  }),
  panNo: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace(
       "ADD:", 
       "PAN Number"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "PAN Number"
      ),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "PAN Number"),
    }),
});
const educationInfoValidation = Joi.object({
  educationRecords: Joi.array()
    .items(
      Joi.object({
        institution: Joi.string()
          .required()
          .messages({
            "string.base": "Institute Name must be a string.",
            "string.empty": "Institute Name cannot be empty.",
            "any.required": "Institute Name is required.",
          }),
        subject: Joi.string()
          .required()
          .messages({
            "string.base": "Subject Name must be a string.",
            "string.empty": "Subject Name cannot be empty.",
            "any.required": "Subject Name is required.",
          }),
        startingDate: JoiExtended.date()
          .format("YYYY-MM-DD")
          .required()
          .messages({
            "any.required": "Starting Date is required.",
            "date.base": "Starting Date must be a valid date.",
            "date.format": "Starting Date must be in YYYY-MM-DD format.",
          }),
        completeDate: JoiExtended.date()
          .format("YYYY-MM-DD")
          .required()
          .messages({
            "any.required": "Complete Date is required.",
            "date.base": "Complete Date must be a valid date.",
            "date.format": "Complete Date must be in YYYY-MM-DD format.",
          }),
        degree: Joi.string()
          .required()
          .messages({
            "string.base": "Degree Name must be a string.",
            "string.empty": "Degree Name cannot be empty.",
            "any.required": "Degree Name is required.",
          }),
        grade: Joi.string()
          .required()
          .messages({
            "string.base": "Grade must be a string.",
            "string.empty": "Grade cannot be empty.",
            "any.required": "Grade is required.",
          }),
      })
    )
    .required()
    .messages({
      "array.base": "Education Records must be an array.",
      "any.required": "Education Records is required.",
    }),
});

const emergencyContactValidation = Joi.object({
  emergencyContactRecords:Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
        .required()
        .messages({
          "string.base": validationMessages.STRING_BASE.replace("ADD:", "Name"),
          "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Name"),
          "any.required": validationMessages.REQUIRED.replace("ADD:", "Name"),
        }),
        relationship: Joi.string()
        .required()
        .messages({
          "string.base": validationMessages.STRING_BASE.replace(
          "ADD:",
          "Relationship"
        ),
        "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Relationship"
        ),
        "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Relationship"
        ),
      }),
      primaryPhone: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace(
        "ADD:", 
        "Phone Number"
        ),
        "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Phone Number"
        ),
        "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Phone Number"
        ),
      }),
      secondaryPhone: Joi.string()
      .messages({
      "string.base": validationMessages.STRING_BASE.replace(
      "ADD:",
      "Phone Number"
      ),
    }),

  })
    ).required()
  });

const familyInfoValidation = Joi.object({
  familyInformationRecords: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
        .required()
        .messages({
          "string.base": validationMessages.STRING_BASE.replace("ADD:", "Name"),
          "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Name"),
          "any.required": validationMessages.REQUIRED.replace("ADD:", "Name"),
        }),
        relationship: Joi.string()
        .required()
        .messages({
          "string.base": validationMessages.STRING_BASE.replace(
          "ADD:",
          "Relationship"
        ),
          "string.empty": validationMessages.STRING_EMPTY.replace(
          "ADD:",
          "Relationship"
        ),
          "any.required": validationMessages.REQUIRED.replace(
          "ADD:",
          "Relationship"
        ),
        }),
        birthDate: JoiExtended.date()
        .format("YYYY-MM-DD")
        .required()
        .messages({
        "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Birth Date "
        ),
        "date.base": validationMessages.DATE_BASE.replace("ADD:", "Birth Date"),
        "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Birth Date"
        ),
        }),
        phone: Joi.string().messages({
        "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Phone Number"
        ),
      }),
      })
    ).required()
});

const experienceInfoValidation = Joi.object({
  experienceInformationRecords: Joi.array()
    .items(
      Joi.object({
        companyName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Company Name"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Company Name"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Company Name"
      ),
    }),
  location: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Company Location"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Company Location"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Company Location"
      ),
    }),
  jobPosition: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Job Position"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Job Position"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Job Position"
      ),
    }),
  periodFrom: JoiExtended.date()
    .format("YYYY-MM-DD")
    .required()
    .messages({
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Period From "
      ),
      "date.base": validationMessages.DATE_BASE.replace("ADD:", "Period From"),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Period From"
      ),
    }),
  periodTo: JoiExtended.date()
    .format("YYYY-MM-DD")
    .required()
    .messages({
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Period To "),
      "date.base": validationMessages.DATE_BASE.replace("ADD:", "Period To"),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Period To"
      ),
    }),
      })
    ).required()
});

const loginValidation = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in"] },
    })
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "E-mail Id"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "E-mail Id"
      ),
      "string.email": validationMessages.EMAIL.replace("ADD:", "E-mail Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "E-mail Id"),
    }),
  password: Joi.string()
    .required()
    .min(6)
    .max(20)
    // .pattern(
    //   new RegExp(
    //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\",./<>?])"
    //   )
    // )
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Password"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Password"),
      "string.min": validationMessages.STRING_MIN.replace("ADD:", "Password"),
      "string.max": validationMessages.STRING_MAX.replace("ADD:", "Password"),
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
    }),
});

const recordIdValidation = Joi.object({
  id: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
  }),
});

const updateProfileValidation = Joi.object({
  firstName: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "First Name"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "First Name"
      ),
    }),
  lastName: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Last Name"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Last Name"
      ),
    }),
  birthDate: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "Date of Birth"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Date of Birth"
      ),
    }),
  gender: Joi.string()
    .valid("Male", "Female", "Other")
    .insensitive()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Gender"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Gender"),
      "any.only": "Invalid gender. Please choose a valid option.",
    }),
  address: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Address"),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Address"
      ),
     
    }),
  state: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "State"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "State"),
    }),
  country: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Country"),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Country"
      ),
    }),
  pinCode: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Pin Code"),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Pin Code"
      ),
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Phone Number"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Phone Number"
      ),
      "string.pattern.base": "Phone Number must be a 10-digit number",
    }),
  department: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Department"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Department"
      ),
    }),
  designation: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Designation"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Designation"
      ),
    }),
  reportsTo: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Reports To"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Reports To"
      ),
    }),
});

const updatePersonalInformationValidation = Joi.object({
  passportNo: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
         "ADD:", 
         "Passport No"
        ),
    }),
    passportExpiryDate: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "Passport Expiry Date"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Passport Expiry Date"
      ),
    }),
    telephoneNo: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Telephone Number"
      ),
      "string.pattern.base": "Telephone Number must be a 10-digit number",
    }),
  nationality: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Nationality"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Nationality"
      ),
    }),
  religion: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Religion"),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Religion"
      ),
    }),
  maritalStatus: Joi.string()
    .valid("Single", "Married")
    .insensitive()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Marital Status"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Marital Status"
      ),
      "any.only": "Invalid merital status. Please choose a valid option.",
    }),
  employmentOfSpouse: Joi.string().messages({
    "string.base": validationMessages.STRING_BASE.replace(
      "ADD:",
      "Employment Of Spouse"
    ),
  }),
  no_ofChildren: Joi.number().messages({
    "number.base": validationMessages.NUMBER_BASE.replace(
      "ADD:",
      "Number Of Children"
    ),
  }),
});

const updateBankInfoValidation = Joi.object({
  bankName: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Bank Name"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Bank Name"
      ),
    }),
  bankAccountNo: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Bank Account Number"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Bank Account Number"
      ),
  }),
  ifscCode: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace(
       "ADD:", 
       "IFSC Code"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "IFSC Code"
      ),
  }),
  panNo: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace(
       "ADD:", 
       "PAN Number"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "PAN Number"
      ),
    }),
});

const updateEducationInfoValidation = Joi.object({
    id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),                   
    institution: Joi.string()
      .messages({
        "string.base": "Institute Name must be a string.",
        "string.empty": "Institute Name cannot be empty.",
      }),
    subject: Joi.string()
      .messages({
        "string.base": "Subject Name must be a string.",
        "string.empty": "Subject Name cannot be empty.",
      }),
    startingDate: JoiExtended.date()
      .format("YYYY-MM-DD")
      .messages({
        "date.base": "Starting Date must be a valid date.",
        "date.format": "Starting Date must be in YYYY-MM-DD format.",
      }),
    completeDate: JoiExtended.date()
      .format("YYYY-MM-DD")
      .messages({
        "date.base": "Complete Date must be a valid date.",
        "date.format": "Complete Date must be in YYYY-MM-DD format.",
      }),
    degree: Joi.string()
      .messages({
        "string.base": "Degree Name must be a string.",
        "string.empty": "Degree Name cannot be empty.",
      }),
    grade: Joi.string()
      .messages({
        "string.base": "Grade must be a string.",
        "string.empty": "Grade cannot be empty.",
      }),
  })

const updateEmergencyContactValidation = Joi.object({
    id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),   
    name: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Name"),
    }),
    relationship: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
      "ADD:",
      "Relationship"
    ),
    "string.empty": validationMessages.STRING_EMPTY.replace(
    "ADD:",
    "Relationship"
    ),
  }),
  primaryPhone: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace(
    "ADD:", 
    "Phone Number"
    ),
    "string.empty": validationMessages.STRING_EMPTY.replace(
    "ADD:",
    "Phone Number"
    ),
  }),
  secondaryPhone: Joi.string()
  .messages({
  "string.base": validationMessages.STRING_BASE.replace(
  "ADD:",
  "Phone Number"
    ),
  }),
});

const updateFamilyInfoValidation = Joi.object({
    id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),     
    name: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Name"),
    }),
    relationship: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
      "ADD:",
      "Relationship"
    ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
      "ADD:",
      "Relationship"
    ),
    }),
    birthDate: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
    "date.base": validationMessages.DATE_BASE.replace("ADD:", "Birth Date"),
    "date.format": validationMessages.DATE_FORMAT.replace(
    "ADD:",
    "Birth Date"
    ),
    }),
    phone: Joi.string().messages({
    "string.base": validationMessages.STRING_BASE.replace(
    "ADD:",
    "Phone Number"
    ),
  }),
});

const updateExperienceInfoValidation = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),
  companyName: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Company Name"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Company Name"
      ),
    }),
  location: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Company Location"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Company Location"
      ),
    }),
  jobPosition: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace(
        "ADD:",
        "Job Position"
      ),
      "string.empty": validationMessages.STRING_EMPTY.replace(
        "ADD:",
        "Job Position"
      ),
    }),
  periodFrom: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace("ADD:", "Period From"),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Period From"
      ),
    }),
  periodTo: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace("ADD:", "Period To"),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Period To"
      ),
    }),
});

const getDesignationValidation = Joi.object({
  departmentId: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Department Id"),
  }),
});


const addLeaveInfoValidation = Joi.object({
  from: JoiExtended.date()
  .format("YYYY-MM-DD")
  .required()
  .messages({
    "date.base": validationMessages.DATE_BASE.replace("ADD:", "From"),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "From"
    ),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "From"),
  }),
  to: JoiExtended.date()
  .format("YYYY-MM-DD")
  .required()
  .messages({
    "date.base": validationMessages.DATE_BASE.replace("ADD:", "To"),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "To"
    ),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "To"),
  }),
  totalDays: Joi.number()
  .required()
  .messages({
    "number.base": validationMessages.NUMBER_BASE.replace("ADD:", "Total Days Of Leave"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Total Days Of Leave"),
  }),
  fullLeave: Joi.bool()
  .messages({
    "boolean.base": validationMessages.BOOLEAN_BASE.replace("ADD:", "Full Leave"),
  }),
  halfLeave: Joi.bool()
  .messages({
    "boolean.base": validationMessages.BOOLEAN_BASE.replace("ADD:", "half Leave"),
  }),
  leaveReason: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Leave Reason"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Leave Reason"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Leave Reason"),
  })
});

const getAttendanceValidation = Joi.object({
  from: JoiExtended.date()
  .format("YYYY-MM-DD")
  .required()
  .messages({
    "date.base": validationMessages.DATE_BASE.replace("ADD:", "From"),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "From"
    ),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "From"),
  }),
  to: JoiExtended.date()
  .format("YYYY-MM-DD")
  .required()
  .messages({
    "date.base": validationMessages.DATE_BASE.replace("ADD:", "To"),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "To"
    ),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "To"),
  }),
});


const addTimeSheetValidation = Joi.object({
  project: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Project Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Project Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Project Id"),
  }),
  date: JoiExtended.date()
  .format("YYYY-MM-DD")
  .required()
  .messages({
    "date.base": validationMessages.DATE_BASE.replace("ADD:", "Date"),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "DAte"
    ),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Date"),
  }),
  hours: Joi.number()
  .required()
  .messages({
    "number.base": validationMessages.NUMBER_BASE.replace("ADD:", "Total Hours of Work"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Total Hours of Work"),
  }),
  description: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Description"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Description"),
  }),
});

const getEmpTotalHoursValidation = Joi.object({
  empId: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Employee Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Employee Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Employee Id"),
  }),
  projectId: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Project Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Project Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "project Id"),
  }),
});

const getProjectTotalHoursValidation = Joi.object({
  projectId: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Project Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Project Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "project Id"),
  }),
});

const editTimeSheetValidation = Joi.object({
  id: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
  }),
  project: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Project Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Project Id"),
  }),
  date: JoiExtended.date()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace("ADD:", "Date"),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "DAte"
    ),
  }),
  hours: Joi.number()
  .messages({
    "number.base": validationMessages.NUMBER_BASE.replace("ADD:", "Total Hours of Work"),
  }),
  description: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Description"),
  }),
});

export default { 
  profileValidation,
  empPersonalInformationValidation,
  educationInfoValidation,
  emergencyContactValidation,
  bankInfoValidation,
  familyInfoValidation,
  experienceInfoValidation,
  loginValidation,
  recordIdValidation,
  updateProfileValidation,
  updatePersonalInformationValidation,
  updateBankInfoValidation,
  updateEducationInfoValidation,
  updateEmergencyContactValidation,
  updateFamilyInfoValidation,
  updateExperienceInfoValidation,
  getDesignationValidation,
  addLeaveInfoValidation,
  getAttendanceValidation,
  addTimeSheetValidation,
  getEmpTotalHoursValidation,
  getProjectTotalHoursValidation,
  editTimeSheetValidation
};
