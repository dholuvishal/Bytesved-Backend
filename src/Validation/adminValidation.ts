import Joi, { allow, required } from "joi";
import JoiDate from "@joi/date";
const JoiExtended = Joi.extend(JoiDate);
import validationMessages from "../Utils/validationMessages";
// import { ModuleName } from "../Models/EmployeeModel";
import { ROLES, MODULES, JOBPERIODS, JobPeriods, LEAVESTATUS, PRIORITY, STATUS, priority, CHARGETYPE, ASSETSTATUS } from "../Config/constant";

const addEmployeeValidation = Joi.object({
    firstName: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "First name"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "First name"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "First name"),
      }),
    lastName: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Last name"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Last name"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Last name"),
      }),
    userName: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Username"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Username"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Username"),
      }),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in"] },
      })
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "E-mail Id"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "E-mail Id"),
        "string.email": validationMessages.EMAIL.replace("ADD:", "E-mail Id"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "E-mail Id"),
      }),
      password: Joi.string()
      .required()
      .min(6)
      .max(20)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\",./<>?])"
        )
      )
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Password"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Password"),
        "string.min": validationMessages.STRING_MIN.replace("ADD:", "Password"),
        "string.max": validationMessages.STRING_MAX.replace("ADD:", "Password"),
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
      }),
      ConfirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        "any.required": validationMessages.REQUIRED.replace("ADD:", "ConfirmPassword"),
        "any.only": " does not match",
      }),
      employeeId: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Employee ID"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Employee ID"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Employee ID"),
      }),
      joiningDate: Joi.date()
      .required()
      .messages({
        "date.base": validationMessages.DATE_BASE.replace("ADD:", "Joining date"),
        "date.empty": validationMessages.DATE_EMPTY.replace("ADD:", "Joining date"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Joining date"),
      }),
      jobPeriod: Joi.string()
      .valid(...Object.values(JOBPERIODS))
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Job Periods"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Job Periods"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Job Periods"),
        "any.only": "Job Period must be one of 'NoticePeriod', 'ProbationPeriod', ",
      }),
    phone: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Phone number"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Phone number"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Phone number"),
      }),
    company: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Company"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Company"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Company"),
      }),
    department: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Department"),
      }),
    designation: Joi.string()
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Designation"),
      }),
    role: Joi.string()
      .valid(...Object.values(ROLES))
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Role"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Role"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Role"),
        "any.only": "Role must be one of 'Admin', 'HR', 'Employee', 'TeamLeader'",
      }),
   })
  
  const editEmployeeValidation = Joi.object({
    id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),
    firstName: Joi.string()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "First name"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "First name"),
      }),
    lastName: Joi.string()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Last name"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Last name"),
      }),
    userName: Joi.string()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Username"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Username"),
      }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "in"] },
      })
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "E-mail Id"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "E-mail Id"),
        "string.email": validationMessages.EMAIL.replace("ADD:", "E-mail Id"),
      }),
    password: Joi.string()
      .min(6)
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Password"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Password"),
        "string.min": validationMessages.STRING_MIN.replace("ADD:", "Password"),
      }),
    employeeId: Joi.string()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Employee ID"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Employee ID"),
      }),
    joiningDate: Joi.date()
      .messages({
        "date.base": validationMessages.DATE_BASE.replace("ADD:", "Joining date"),
        "date.empty": validationMessages.DATE_EMPTY.replace("ADD:", "Joining date"),
      }),
      jobPeriod: Joi.string()
      .valid(...Object.values(JOBPERIODS))
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Job Periods"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Job Periods"),
        "any.only": "Job Period must be one of 'NoticePeriod', 'ProbationPeriod', ",
      }),
    phone: Joi.string()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Phone number"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Phone number"),
      }),
    company: Joi.string()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Company"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Company"),
      }),
    department: Joi.string()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department"),
      }),
    designation: Joi.string()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation"),
      }),
    role: Joi.string()
      .valid(...Object.values(ROLES))
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Role"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Role"),
        "any.only": "Role must be one of 'Admin', 'HR', 'Employee', 'TeamLeader'",
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

  const addHolidayValidation = Joi.object({
    holidayName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Holiday Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Holiday Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Holiday Name"),
    }),
    holidayDate: JoiExtended.date()
    .format("YYYY-MM-DD")
    .required()
    .messages({
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:",
        "Holiday Date"
      ),
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "Holiday Date"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Holiday Date"
      ),
    }),
    day: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Day"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Day"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Day"),
    }),
  });

const editHolidayValidation = Joi.object({
    id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),     
    holidayName: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Holiday Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Holiday Name"),
    }),
    holidayDate: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "Holiday Date"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Holiday Date"
      ),
    }),
    day: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Day"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Day"),
    }),
  });

const addDepartmentValidation = Joi.object({
    departmentName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Department Name"),
    }),
  });

  const editDepartmentValidation = Joi.object({
    id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),
    departmentName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Department Name"),
    }),
  });

  const addDesignationValidation = Joi.object({
    departmentId: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Department Id"),
    }),
    designationName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Designation Name"),
    }),
  });

  const editDesignationValidation = Joi.object({
    designationId: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Designation Id"),
    }),
    designationName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Designation Name"),
    }),
    departmentId: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Department Id"),
    }),
  });

  const deleteDesignationValidation = Joi.object({
    designationId: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Designation Id"),
    }),
  });

  const editLeaveStatusValidation = Joi.object({
    id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),
    leaveStatus: Joi.string()
      .valid(...Object.values(LEAVESTATUS))
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Job Period"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Job Period"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Job Period"),
        "any.only": "Leave Status must be one of 'Approved', 'Declined'",
      }),
  });

  const getAttendanceValidation = Joi.object({
    from: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "From Date"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "From Date"
      ),
    }),
    to: JoiExtended.date()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "To Date"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "To Date"
      ),
    }),
  });

  const addClientValidation = Joi.object({
    firstName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "First Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "First Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "First Name"),
    }),
    lastName: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Last Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Last Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Last Name"),
    }),
    email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "in"] },
    })
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "E-mail Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "E-mail Id"),
      "string.email": validationMessages.EMAIL.replace("ADD:", "E-mail Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "E-mail Id"),
    }),
    mobileNo: Joi.string()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Mobile Number"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Mobile Number"),
    }),
    country: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Country Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Country Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Country Name"),
    }),
    review: Joi.number()
    .min(0)
    .max(5)
    .messages({
      "number.base": validationMessages.NUMBER_BASE.replace("ADD:", "Review"),
      "number.empty": validationMessages.NUMBER_EMPTY.replace("ADD:", "Review"),
      "number.min": "Review must be at least 0",
      "number.max": "Review must not exceed 5",
    }),
  });

  const addProjectValidation = Joi.object({
    projectName: Joi.string()
    .required()
    .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Project Name"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Project Name"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Project Name"),
    }),
    client: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Client Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Client Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Client Name"),
    }),
    startDate: JoiExtended.date()
    .required()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "Start Date"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "Start Date"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:", 
        "Start Date"
      ),
    }),
    endDate: JoiExtended.date()
    .required()
    .format("YYYY-MM-DD")
    .messages({
      "date.base": validationMessages.DATE_BASE.replace(
        "ADD:",
        "End Date"
      ),
      "date.format": validationMessages.DATE_FORMAT.replace(
        "ADD:",
        "End Date"
      ),
      "any.required": validationMessages.REQUIRED.replace(
        "ADD:", 
        "End Date"
      ),
    }),
    priority: Joi.string()
    .required()
    .valid(...Object.values(PRIORITY))
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Priority"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Priority"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "End Date"),
      "any.only": "Role must be one of 'High', 'Medium', 'Low' ",
    }),
    projectLeader: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Project Leader"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Project Leader"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Project Leader"),
    }),
    team: Joi.array()
    .items(Joi.string().required())
    .required()
    .messages({
      'array.base': 'Team must be an array of strings',
      'array.empty': 'Team is required',
      'any.required': 'Team is required',
    }),
    description: Joi.string()
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description is required',
      'any.required': 'Description is required',
    }),
    uploadFile: Joi.string()
    .allow('')
    .messages({
      'string.base': 'Upload Files must be a string',
      'any.only': 'Upload Files must be a valid string',
    }),
    status: Joi.string()
    .valid(...Object.values(STATUS))
    .messages({
      'any.only': `Status must be one of [${Object.values(STATUS).join(', ')}]`,
    }),
    rate: Joi.object({
      charge: Joi.number()
      .required()
      .messages({
        'number.base': 'Charge must be a number',
        'number.empty': 'Charge is required',
        'any.required': 'Charge is required',
      }),
      type: Joi.string()
      .valid(...Object.values(CHARGETYPE))
      .required()
      .messages({
        'any.only': `Type must be one of [${Object.values(CHARGETYPE).join(', ')}]`,
        'any.required': 'Type is required',
      }),
    }).required()  
});

const editClientValidation = Joi.object({
  firstName: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "First Name"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "First Name"),
  }),
  lastName: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Last Name"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Last Name"),
  }),
  email: Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "in"] },
  })
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "E-mail Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "E-mail Id"),
    "string.email": validationMessages.EMAIL.replace("ADD:", "E-mail Id"),
  }),
  mobileNo: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Mobile Number"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Mobile Number"),
  }),
  country: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Country Name"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Country Name"),
  }),
  review: Joi.number()
  .min(0)
  .max(5)
  .messages({
    "number.base": validationMessages.NUMBER_BASE.replace("ADD:", "Review"),
    "number.empty": validationMessages.NUMBER_EMPTY.replace("ADD:", "Review"),
    "number.min": "Review must be at least 0",
    "number.max": "Review must not exceed 5",
  }),
});

const editProjectValidation = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),
  projectName: Joi.string()
  .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Project Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Project Name"),
  }),
  client: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Client Name"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Client Name"),
  }),
  startDate: JoiExtended.date()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "Start Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "Start Date"
    ),
  }),
  endDate: JoiExtended.date()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "End Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "End Date"
    ),
  }),
  priority: Joi.string()
  .valid(...Object.values(PRIORITY))
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Priority"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Priority"),
    "any.only": "Role must be one of 'High', 'Medium', 'Low' ",
  }),
  projectLeader: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Project Leader"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Project Leader"),
  }),
  team: Joi.array()
  .items(Joi.string().required())
  .messages({
    'array.base': 'Team must be an array of strings',
    'array.empty': 'Team is required',
  }),
  description: Joi.string()
  .messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
  }),
  uploadFile: Joi.string()
  .allow('')
  .messages({
    'string.base': 'Upload Files must be a string',
    'any.only': 'Upload Files must be a valid string',
  }),
  status: Joi.string()
  .valid(...Object.values(STATUS))
  .messages({
    'any.only': `Status must be one of [${Object.values(STATUS).join(', ')}]`,
  }),
  rate: Joi.object({
    charge: Joi.number()
    .messages({
      'number.base': 'Charge must be a number',
      'number.empty': 'Charge is required',
    }),
    type: Joi.string()
    .valid(...Object.values(CHARGETYPE))
    .messages({
      'any.only': `Type must be one of [${Object.values(CHARGETYPE).join(', ')}]`,
    }),
  })
});

const addTrainingTypeValidation = Joi.object({
  type: Joi.string()
  .required()
  .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Training Type"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Training Type"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Training Type"),
  }),
  description: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Training Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Training Description"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Training Description"),
  }),
  status: Joi.string()
  .valid(...Object.values(STATUS))
  .messages({
    'any.only': `Status must be one of [${Object.values(STATUS).join(', ')}]`,
  }), 
});

const addTrainerValidation = Joi.object({
  firstName: Joi.string()
  .required()
  .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "First Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Frist Name"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Frist Name"),
  }),
  lastName: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Last Name"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Last Name"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Last Name"),
  }),
  role: Joi.string()
  .valid(...Object.values(ROLES))
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Role"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Role"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Role"),
    "any.only": "Role must be one of 'Admin', 'HR', 'Employee', 'TeamLeader'",
  }),
  email: Joi.string()
  .required()
  .email({
      minDomainSegments: 2,
    tlds: { allow: ["com", "in"] },
  })
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "E-mail Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "E-mail Id"),
    "string.email": validationMessages.EMAIL.replace("ADD:", "E-mail Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "E-mail Id"),
  }),
  mobileNo: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Mobile Number"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Mobile Number"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Mobile Number"),
  }),
  status: Joi.string()
  .valid(...Object.values(STATUS))
  .messages({
    'any.only': `Status must be one of [${Object.values(STATUS).join(', ')}]`,
  }),
  description: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Description"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Description"),
  }),
});

const addTrainingValidation = Joi.object({
  trainingType: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Training Type"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Training Type"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Training Type"),
  }),
  trainer: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Trainer "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Trainer "),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Trainer "),
  }),
  employee: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Employee "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Employee "),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Employee "),
  }),
  startDate: JoiExtended.date()
  .required()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "Start Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "Start Date"
    ),
    "any.required": validationMessages.REQUIRED.replace(
      "ADD:", 
      "Start Date"
    ),
  }),
  endDate: JoiExtended.date()
  .required()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "End Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "End Date"
    ),
    "any.required": validationMessages.REQUIRED.replace(
      "ADD:", 
      "End Date"
    ),
  }),
  status: Joi.string()
  .valid(...Object.values(STATUS))
  .messages({
    'any.only': `Status must be one of [${Object.values(STATUS).join(', ')}]`,
  }),
  description: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Description"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Description"),
  }),
});

const editTrainingTypeValidation = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
    }),
  type: Joi.string()
  .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Training Type"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Training Type"),
  }),
  description: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Training Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Training Description"),
  }),
  status: Joi.string()
  .valid(...Object.values(STATUS))
  .messages({
    'any.only': `Status must be one of [${Object.values(STATUS).join(', ')}]`,
  }), 
});

const editTrainerValidation = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "Id"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Id"),
      "any.required": validationMessages.REQUIRED.replace("ADD:", "Id"),
  }),
  firstName: Joi.string()
  .messages({
      "string.base": validationMessages.STRING_BASE.replace("ADD:", "First Name"),
      "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Frist Name"),
  }),
  lastName: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Last Name"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Last Name"),
  }),
  role: Joi.string()
  .valid(...Object.values(ROLES))
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Role"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Role"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Role"),
  }),
  email: Joi.string()
  .email({
      minDomainSegments: 2,
    tlds: { allow: ["com", "in"] },
  })
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "E-mail Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "E-mail Id"),
    "string.email": validationMessages.EMAIL.replace("ADD:", "E-mail Id"),
  }),
  mobileNo: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Mobile Number"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Mobile Number"),
  }),
  status: Joi.string()
  .valid(...Object.values(STATUS))
  .messages({
    'any.only': `Status must be one of [${Object.values(STATUS).join(', ')}]`,
  }),
  description: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Description"),
  }),
});

const editTraineeValidation = Joi.object({
  trainingType: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Training Type"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Training Type"),
  }),
  trainer: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Trainer "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Trainer "),
  }),
  employee: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Employee "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Employee "),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Employee "),
  }),
  startDate: JoiExtended.date()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "Start Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "Start Date"
    ),
  }),
  endDate: JoiExtended.date()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "End Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "End Date"
    ),
  }),
  status: Joi.string()
  .valid(...Object.values(STATUS))
  .messages({
    'any.only': `Status must be one of [${Object.values(STATUS).join(', ')}]`,
  }),
  description: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Description"),
  }),
});

const addPromotionValidation = Joi.object({
  employee: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Employee Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Employee Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Employee Id"),
  }),
  department: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department "),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Department "),
  }),
  designationFrom: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation From "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation From "),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Designation From "),
  }),
  designationTo: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation To "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation To "),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Designation From To"),
  }),
  promotionDate: JoiExtended.date()
  .required()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "Promotion Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "Promotion Date"
    ),
    "any.required": validationMessages.REQUIRED.replace(
      "ADD:", 
      "Promotion Date"
    ),
  }),
});

const editPromotionValidation = Joi.object({
  employee: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Employee Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Employee Id"),
  }),
  department: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Department "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Department "),
  }),
  designationTo: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Designation To "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Designation To "),
  }),
  promotionDate: JoiExtended.date()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "Promotion Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "Promotion Date"
    ),
  }),
});

const addAssetValidation = Joi.object({
  assetName: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Asset Name"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Asset Name"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Asset Name"),
  }),
  purchaseDate: JoiExtended.date()
  .required()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "Purchase Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "Purchase Date"
    ),
    "any.required": validationMessages.REQUIRED.replace(
      "ADD:", 
      "Purchase Date"
    ),
  }),
  purchaseFrom: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Purchase From "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Purchase From "),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Purchase From "),
  }),
  manufacturer: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", " Manufacturer "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", " Manufacturer "),
  }),
  modelName: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Model Name "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Model Name "),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Model Name "),
  }),
  serialNumber: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Model Name "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Model Name "),
  }),
  supplier: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Supplier "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Supplier "),
  }),
  condition: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Condition"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Condition"),
  }),
  warranty: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Warranty"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Warranty"),
  }),
  value: Joi.string()
  .required()
  .messages({
    "number.base": validationMessages.NUMBER_BASE.replace("ADD:", "Value"),
    "number.empty": validationMessages.NUMBER_EMPTY.replace("ADD:", "Value"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Value"),
  }),
  assetUser: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Asset User"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Asset User"),
  }),
  description: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Description"),
  }),
  status: Joi.string()
      .valid(...Object.values(ASSETSTATUS))
      .required()
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Asset Status"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Asset Status"),
        "any.required": validationMessages.REQUIRED.replace("ADD:", "Asser Status"),
        "any.only": "Asset status must be one of 'Pending', 'Approved', 'Deployed', 'Damaged', 'Returned'",
      }),
});

const ediAssetValidation = Joi.object({
  assetId: Joi.string()
  .required()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Asset Id"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Asset Id"),
    "any.required": validationMessages.REQUIRED.replace("ADD:", "Asset Id"),
  }),
  assetName: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Asset Name"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Asset Name"),
  }),
  purchaseDate: JoiExtended.date()
  .format("YYYY-MM-DD")
  .messages({
    "date.base": validationMessages.DATE_BASE.replace(
      "ADD:",
      "Purchase Date"
    ),
    "date.format": validationMessages.DATE_FORMAT.replace(
      "ADD:",
      "Purchase Date"
    ),
  }),
  purchaseFrom: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Purchase From "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Purchase From "),
  }),
  manufacturer: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", " Manufacturer "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", " Manufacturer "),
  }),
  modelName: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Model Name "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Model Name "),
  }),
  serialNumber: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Model Name "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Model Name "),
  }),
  supplier: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Supplier "),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Supplier "),
  }),
  condition: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Condition"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Condition"),
  }),
  warranty: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Warranty"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Warranty"),
  }),
  value: Joi.string()
  .messages({
    "number.base": validationMessages.NUMBER_BASE.replace("ADD:", "Value"),
    "number.empty": validationMessages.NUMBER_EMPTY.replace("ADD:", "Value"),
  }),
  assetUser: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Asset User"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Asset User"),
  }),
  description: Joi.string()
  .messages({
    "string.base": validationMessages.STRING_BASE.replace("ADD:", "Description"),
    "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Description"),
  }),
  status: Joi.string()
      .valid(...Object.values(ASSETSTATUS))
      .messages({
        "string.base": validationMessages.STRING_BASE.replace("ADD:", "Asset Status"),
        "string.empty": validationMessages.STRING_EMPTY.replace("ADD:", "Asset Status"),
        "any.only": "Asset status must be one of 'Pending', 'Approved', 'Deployed', 'Damaged', 'Returned'",
      }),
});


export default{
  addEmployeeValidation,
  editEmployeeValidation,
  recordIdValidation,
  addHolidayValidation,
  editHolidayValidation,
  addDepartmentValidation,
  editDepartmentValidation,
  addDesignationValidation,
  editDesignationValidation,
  deleteDesignationValidation,
  editLeaveStatusValidation,
  getAttendanceValidation,
  addClientValidation,
  addProjectValidation,
  editClientValidation,
  editProjectValidation,
  addTrainingTypeValidation,
  addTrainerValidation,
  addTrainingValidation,
  editTrainingTypeValidation,
  editTrainerValidation,
  editTraineeValidation,
  addPromotionValidation,
  editPromotionValidation,
  addAssetValidation,
  ediAssetValidation
}
  