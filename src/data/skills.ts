export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: { coordination: SkillCategory[]; ld: SkillCategory[] } = {
  coordination: [
    {
      category: "Leadership & Communication",
      skills: [
        "Team Leadership",
        "Crisis Management",
        "Team Facilitation",
        "Public Speaking",
        "People Development",
        "Stakeholder Communication"
      ]
    },
    {
      category: "Project Coordination",
      skills: [
        "Project Coordination",
        "Agile/Scrum",
        "Deliverable & Milestone Tracking",
        "Cross-Functional Coordination",
        "MBO & Goal-Setting",
        "Risk Management",
        "Timeline Planning"
      ]
    },
    {
      category: "Operations & Documentation",
      skills: [
        "Process Documentation",
        "Operations Support",
        "Status Reporting",
        "Resource Allocation",
        "Event Logistics",
        "Budget Approval Coordination"
      ]
    },
    {
      category: "Tools",
      skills: [
        "Microsoft Excel",
        "Microsoft Word",
        "Microsoft PowerPoint",
        "Google Sheets",
        "Canva",
        "CapCut"
      ]
    },
    {
      category: "Languages",
      skills: [
        "English - IELTS 7.5, Professional Working Proficiency",
        "Vietnamese - Native"
      ]
    }
  ],
  ld: [
    {
      category: "Learning & Development",
      skills: [
        "Training & Program Design",
        "Onboarding & Talent Development",
        "Coaching & Mentoring",
        "Individualized Learning Plans",
        "Performance & Progress Tracking"
      ]
    },
    {
      category: "People & Stakeholder Management",
      skills: [
        "Stakeholder Management",
        "Cross-Functional Collaboration",
        "Process Documentation",
        "Crisis Management",
        "Public Speaking"
      ]
    },
    {
      category: "Tools",
      skills: [
        "Microsoft Excel",
        "Microsoft Word",
        "Microsoft PowerPoint",
        "Google Sheets",
        "Canva",
        "CapCut"
      ]
    },
    {
      category: "Languages",
      skills: [
        "English - IELTS 7.5, Professional Working Proficiency",
        "Vietnamese - Native"
      ]
    }
  ]
};
