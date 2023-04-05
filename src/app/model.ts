

interface Member {
    id: number;
    name: string;
    dob: Date;
    gender: 'Female' | 'Male' | 'Unspecified';
    membership: 'Basic' | 'Premium' | 'Corporate' | 'Student' | 'Day pass';
    start: Date;
    contact: string;
    email: string;
    address: string;
    emergencyContact: string;
    medicalCondition: string;
    trial: boolean;
}

const Member_Cache = "MemberCache";

export{
    Member,
    Member_Cache
}