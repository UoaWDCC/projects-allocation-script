export type Applicant = {
  timestamp: Date;
  id: number;
  name: string;
  email: string;
  github: string;
  major: string;
  rolePreference: string; // out of 5
  skills: string[];
  backendPreference: number; // out of 5
  frontendExperience: number; // out of 5
  backendExperience: number; // out of 5
  designExperience: number; // out of 5
  testingExperience: number;  // out of 5, not too important?
  projectChoices: string[]; // index 0 is highest preference
  passionBlurb: string; // not used
  portfolioLink: string; // not used
  additionalInfo: string; // not used
  execComments: string; // not used
  creativityHire: string; // filter out designers for separate pathway
  rizzLevel: number; // not used
};

export type Project = {
  id: number;
  name: string;
  backendDifficulty: number; // out of 5
  frontendDifficulty: number; // out of 5
  backendWeighting: number; // out of 7 (???)
  priority: number; // out of 5
};

export type Allocation = {
  project: Project;
  applicants: Applicant[];
};
