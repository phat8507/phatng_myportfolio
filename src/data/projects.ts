export type ProjectCategory = "research" | "event" | "leadership";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectLDOverride {
  role?: string;
  medal?: string | null;
  highlights?: string[];
  overview?: string;
  responsibilities?: string[];
  outcomes?: string;
  cardDesc?: string;
}

export interface ProjectData {
  id: string;
  category: ProjectCategory;
  type: string;
  medal: string | null;
  title: string;
  role: string;
  highlights?: string[];
  overview: string;
  responsibilities: string[];
  outcomes: string;
  tags: string[];
  links?: ProjectLink[];
  cardTags: string[];
  cardDesc: string;
  /** Content overrides shown when the site is in Learning & Development / HR view mode. */
  ld?: ProjectLDOverride;
}

export const projectsData: ProjectData[] = [
  {
    id: "yflp-semifinal-marketing-case",
    category: "leadership",
    type: "Leadership Competition",
    medal: "Outstanding Team",
    title: "YFLP Season 6 - Semi-Final (Marketing Case)",
    role: "Team Leader",
    highlights: ["Outstanding Team - Semi-Final", "5-member team", "9-day sprint", "MBO + Scrum"],
    overview: "The semi-final round of the YFC Future Leaders Program (Season 6), an annual leadership competition run by the Youth For Chance (YFC) club. As Team Leader, I guided a 5-member team through an intensive 9-day Marketing Case sprint - focusing less on having every answer and more on building the structure and space for the team to solve the problem together.",
    responsibilities: [
      "Led a 5-member team as Team Leader through a 9-day Marketing Case sprint under heavy time pressure.",
      "Introduced lightweight structure - MBO for goal-setting, a Scrum rhythm for daily progress, and a risk plan - to protect the team's focus and energy against the deadline.",
      "Facilitated collaborative problem-solving, creating space for every member to contribute instead of directing each decision.",
      "Kept the team aligned and motivated through the most compressed stretch of the competition."
    ],
    outcomes: "Named Outstanding Team of the Semi-Final and advanced to the grand final.",
    tags: ["Team Leadership", "MBO", "Scrum", "Risk Management", "Time Management", "Team Facilitation", "Marketing Case"],
    links: [
      { label: "Outstanding Team Certificate", url: "https://drive.google.com/file/d/1qojWv2fHMPAiVMS0QZoE_9IUb7HpWhes/view" }
    ],
    cardTags: ["Team Leadership", "Scrum & MBO", "Risk Management"],
    cardDesc: "Led a 5-member team through a 9-day Marketing Case sprint using MBO, Scrum, and risk planning - earning the Outstanding Team award.",
    ld: {
      highlights: ["Outstanding Team - Semi-Final", "5-member team", "9-day sprint", "Self-built Scrum + MBO tracker"],
      overview: "The semi-final round of the YFC Future Leaders Program (Season 6), an internal leadership competition for 1st- and 2nd-year student members. As Team Leader, I coached a 5-member team through an intensive 9-day Marketing Case sprint - building a self-built Scrum + MBO tracker and aligning the team across 5-6 mentor and supervisor sessions.",
      responsibilities: [
        "Led and coached a 5-member team through a 9-day Marketing Case sprint under heavy time pressure, with defined roles for each member.",
        "Built a self-built Scrum + MBO tracker to structure goal-setting, daily progress, and a risk plan.",
        "Aligned the team across 5-6 mentor and supervisor sessions, coaching members individually on their contributions.",
        "Facilitated collaborative problem-solving, creating space for every member to develop and contribute."
      ],
      outcomes: "Earned the Outstanding Team award among the 5 semifinal teams and advanced to the grand final.",
      cardDesc: "Coached a 5-member team through a 9-day Marketing Case sprint with a self-built Scrum + MBO tracker and 5-6 mentor sessions - earning the Outstanding Team award."
    }
  },
  {
    id: "yflp-final-business-case",
    category: "leadership",
    type: "Leadership Competition",
    medal: "Individual Top 5",
    title: "YFLP Season 6 - Grand Final (Business Case)",
    role: "Vice Leader",
    highlights: ["Individual Top 5 of 25", "5-member team", "10-day sprint", "Full strategic pivot"],
    overview: "The grand final of the YFC Future Leaders Program (Season 6). As Vice Leader of a 5-member team, I worked on a 10-day Business Case. Six days in, we realized we had misidentified the core problem and rebuilt the entire strategy from scratch in the final four days - turning a crisis into our strongest work.",
    responsibilities: [
      "Served as Vice Leader of a 5-member team on a 10-day Business Case sprint.",
      "When the team discovered a misdiagnosed core problem six days in, helped drive a full reset and rebuild of the strategy in the final four days.",
      "Owned the Finance, Omni-channel, and Sales workstreams - running the numbers, sizing channels, and defending a P&L that proved the strategic pivot was profitable, not just creative.",
      "Delivered the closing 'Walk the Talk' inspiring speech on the final stage."
    ],
    outcomes: "Earned an individual Top 5 of 25 for performance and influence after leading a high-pressure strategic turnaround.",
    tags: ["Financial Modeling", "P&L Analysis", "Omni-channel Strategy", "Sales Strategy", "Crisis Management", "Public Speaking", "Business Case"],
    links: [
      { label: "Top 5 Finalist Certificate", url: "https://drive.google.com/file/d/18qAAFOzj6m_ZurzHPORMsA7eZeehWbPX/view" }
    ],
    cardTags: ["Finance & P&L", "Crisis Turnaround", "Public Speaking"],
    cardDesc: "As Vice Leader in the grand final, owned Finance, Omni-channel & Sales and helped rebuild the full strategy in 4 days after a crisis - earning an individual Top 5 of 25.",
    ld: {
      role: "Vice Leader (Acting Lead in the Final)",
      highlights: ["Individual Top 5 of 25", "5-member team", "10-day sprint", "Mid-project crisis recovery"],
      overview: "The grand final of the YFC Future Leaders Program (Season 6). As acting lead of a 5-member team on a 10-day Business Case, I kept the team motivated through a mid-project crisis - rebuilding our approach from insight with 4 days left and re-planning 4 sprints across 3 objectives.",
      responsibilities: [
        "Acted as lead of a 5-member team on a 10-day Business Case sprint.",
        "Kept the team motivated through a mid-project crisis, rebuilding the approach from insight with 4 days left.",
        "Re-planned 4 sprints across 3 objectives to rebuild the strategy under a compressed timeline.",
        "Presented the team's strategy to judges and delivered an inspiring closing speech on the final stage."
      ],
      outcomes: "Earned an individual Top 5 of 25 for performance and influence.",
      cardDesc: "As acting lead in the final, kept the team motivated through a mid-project crisis and re-planned 4 sprints across 3 objectives - earning an individual Top 5 of 25 for performance and influence."
    }
  },
  {
    id: "scrum-managed-macroeconomics",
    category: "research",
    type: "Academic Research",
    medal: null,
    title: "Scrum-Managed Group Research Project - Macroeconomics",
    role: "Team Lead - Scrum Master - Group 1A - Ho Chi Minh University of Banking",
    highlights: ["8 members", "3 offline sprints", "Google Sheets dashboard", "9/10 score"],
    overview: "Applied Agile/Scrum workflows to coordinate an 8-member macroeconomics research team studying market failure caused by private markets, from planning to final delivery. Managed research backlog, role-based task ownership, milestone tracking, and deliverable deadlines while using Management by Objectives (MBO) to connect individual responsibilities with project goals.",
    responsibilities: [
      "Coordinated an 8-member team across 3 offline sprint sessions, including planning, check-ins, review logistics, and final delivery.",
      "Managed the research backlog, role-based task ownership, milestone tracking, and deliverable deadlines.",
      "Built an Excel and Google Sheets project dashboard for tracking responsibilities, progress status, and team alignment.",
      "Applied Management by Objectives (MBO) to connect individual responsibilities with project objectives.",
      "Coordinated final deliverables, including a data analysis workbook, structured debate document, and project microsite.",
      "Integrated 2020-2025 evidence and Vietnam-focused case examples into the research storyline."
    ],
    outcomes: "Received a faculty evaluation score of 9/10 based on research quality, presentation delivery, and teamwork. Delivered a data analysis workbook, structured debate document, project dashboard, and project microsite while keeping team responsibilities and deadlines visible.",
    tags: ["Agile/Scrum", "Sprint Planning", "MBO", "Backlog Tracking", "Milestone Tracking", "Google Sheets", "Research Coordination", "Deliverable Management"],
    links: [
      { label: "Scrum/MBO Management Sheet", url: "https://docs.google.com/spreadsheets/d/1J7qV3jRL2DzsedPfVXcWpT1usXZqI-f6/edit?usp=sharing&ouid=115062449513822083905&rtpof=true&sd=true" },
      { label: "Interactive Project Website", url: "https://phat8507.github.io/MacroEco_N4_MarketFailure/" }
    ],
    cardTags: ["Agile/Scrum", "MBO", "Google Sheets", "Milestones"],
    cardDesc: "Coordinated an 8-member macroeconomics research team using Agile/Scrum, 3 offline sprint sessions, MBO, and a Google Sheets dashboard. Earned a 9/10 faculty score.",
    ld: {
      overview: "Managed an 8-member Scrum team researching market failure caused by private markets, using MBO to align each member's individual goals with the team's shared objectives and a self-built dashboard to track accountability.",
      responsibilities: [
        "Coached each of the 8 team members on individual goal-setting, connecting personal responsibilities to the team's shared research objectives (MBO).",
        "Built a self-built dashboard to track accountability, progress status, and team alignment across 3 offline sprint sessions.",
        "Coordinated planning, check-ins, review logistics, and final delivery for the full team.",
        "Coordinated final deliverables, including a data analysis workbook, structured debate document, and project microsite.",
        "Integrated 2020-2025 evidence and Vietnam-focused case examples into the research storyline."
      ],
      outcomes: "Delivered a 9/10 faculty-evaluated project by keeping each member's individual goals aligned to shared objectives and accountability visible throughout.",
      cardDesc: "Coached an 8-member macroeconomics research team using MBO to align individual goals, a self-built accountability dashboard, and 3 offline sprint sessions - earning a 9/10 faculty score."
    }
  },
  {
    id: "volleyball-club",
    category: "leadership",
    type: "Club Operations",
    medal: "Bronze Medal",
    title: "Club Operations Lead - Volleyball Club",
    role: "Head of Media & Technical Division - Duong Van Thi High School - Nov 2023 - Jun 2025",
    highlights: ["50 members", "15 selected from 37", "VND 3,000,000 budget", "85% active participation"],
    overview: "Oversaw weekly operations for a 50-member student athletics club, covering facility bookings, resource allocation, internal communications, member intake, media coordination, and inter-school tournament logistics.",
    responsibilities: [
      "Coordinated facility bookings, resource allocation, weekly operations, and internal communications for club activities.",
      "Managed budget approval through coach and school leadership, securing VND 3,000,000 in approved funding.",
      "Led a structured member intake project for 15 selected members from 37 submissions.",
      "Managed timeline planning, task coordination, review logistics, preparation materials, 4 practice sessions, and post-intake progress tracking.",
      "Organized an inter-school tournament involving 15 teams from 15 institutions.",
      "Managed a one-month preparation timeline covering venue approval, match scheduling, logistics, and communication with head coaches.",
      "Led the club's technical team as team captain during school-level competitions."
    ],
    outcomes: "Maintained 85% active participation after intake, coordinated tournament logistics across 15 teams from 15 institutions, secured VND 3,000,000 in approved funding, and contributed to the team winning a Bronze Medal at the HCMC Student Sports Championship.",
    tags: ["Operations Support", "Timeline Planning", "Budget Approval", "Resource Allocation", "Member Intake", "Stakeholder Communication", "Tournament Logistics", "Progress Tracking"],
    cardTags: ["Operations", "Budget", "Logistics", "Member Intake"],
    cardDesc: "Oversaw operations for a 50-member athletics club, secured VND 3,000,000 in approved funding, organized tournament logistics across 15 institutions, and maintained 85% active participation.",
    ld: {
      highlights: ["Onboarded 15 of 37 applicants", "85% active participation", "Structured intake program", "50 members"],
      overview: "Led onboarding and talent development for a 50-member student athletics club - designing a structured member intake program, coaching new members through practice rounds, and coordinating club-wide operations including budget, logistics, and tournament management.",
      responsibilities: [
        "Designed and led a structured onboarding program for 15 of 37 applicants, defining intake criteria, 4 practice rounds, and progress tracking.",
        "Coached incoming members through the intake process, tracking readiness and post-intake progress.",
        "Coordinated facility bookings, resource allocation, weekly operations, and internal communications for club activities.",
        "Managed budget approval through coach and school leadership, securing VND 3,000,000 in approved funding.",
        "Organized an inter-school tournament involving 15 teams from 15 institutions.",
        "Led the club's technical team as team captain during school-level competitions."
      ],
      outcomes: "Sustained 85% active participation after a structured onboarding program, coordinated tournament logistics across 15 institutions, secured VND 3,000,000 in funding, and contributed to a Bronze Medal at the HCMC Student Sports Championship.",
      cardDesc: "Designed and led a structured onboarding program for 15 of 37 applicants, sustaining 85% active participation in a 50-member club and contributing to a Bronze Medal."
    }
  },
  {
    id: "youth-for-chance",
    category: "event",
    type: "Event Support",
    medal: null,
    title: "Youth for Chance Club - \"Shared to Lead\" Talkshow",
    role: "External Relations & Event Communications",
    highlights: ["Multi-division coordination", "Partnership outreach", "End-to-end logistics", "Post-event documentation"],
    overview: "Coordinated external relations, event communications, and logistics for Youth for Chance's 'Shared to Lead' leadership talkshow — managing partner outreach, cross-division communication, and on-ground execution from planning through post-event review.",
    responsibilities: [
      "Planned event logistics, drafted the production timeline, allocated tasks across team divisions, and tracked follow-through.",
      "Authored partnership outreach communications and managed external relations with partner organizations and guest speakers.",
      "Coordinated internal messaging across club divisions to ensure consistent task ownership and deadline adherence.",
      "Supported on-ground execution on event day, including logistics checks, material preparation, and attendee flow management.",
      "Documented event outcomes, operational gaps, and lessons learned for post-event review and future planning reference."
    ],
    outcomes: "Delivered end-to-end event coordination — from timeline planning and partner outreach to on-ground execution and post-event documentation — for a live leadership-focused student talkshow. Built cross-functional coordination, stakeholder communication, and logistics planning experience in a real event environment.",
    tags: ["Event Logistics", "External Relations", "Partnership Outreach", "Communication Planning", "On-ground Coordination", "Timeline Planning", "Post-event Documentation"],
    cardTags: ["Event Logistics", "Partnerships", "Cross-Division Coordination"],
    cardDesc: "Managed partnership outreach, cross-division communication, production timeline, and on-ground execution for a live leadership-focused student talkshow end-to-end."
  }
];

export function resolveProject(project: ProjectData, mode: "coordination" | "ld"): ProjectData {
  if (mode !== "ld" || !project.ld) return project;
  return { ...project, ...project.ld };
}
