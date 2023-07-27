export interface Employee {
  id: number;
  name: string;
  contactNumber: string;
  email: string;
  gender: string;
  skills: Skill[];
}

export interface Skill {
  skillName: string;
  skillExperience: string;
}
