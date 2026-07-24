export type ProjectCategory = "research" | "event" | "leadership";

export interface ProjectLink {
  label: string;
  url: string;
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
}

export const projectsData: ProjectData[] = [
  {
    id: "yflp-season-6",
    category: "leadership",
    type: "Leadership Competition",
    medal: null,
    title: "Youth Forchance Leadership Program (YFLP) - Season 6",
    role: "Top 5 / 25 Finalists - Team Strategist",
    highlights: ["Top 5 / 25 Finalists", "5-member team", "Outstanding Team", "Crisis Management"],
    overview: "Competed in an internal leadership program focusing on organizational development and strategy. Collaborated with a 5-member team to design and present a comprehensive Learning & Development (L&D) framework tailored for a simulated 50-member club structure.",
    responsibilities: [
      "Collaborated in a 5-member team to design a comprehensive Learning & Development (L&D) and HR strategy for a simulated 50-member club structure.",
      "Built individual development plans, defined KPIs, and established performance evaluation criteria for diverse organizational roles.",
      "Navigated a mid-project crisis when two team members withdrew, successfully redistributing workloads, resetting deadlines, and maintaining project momentum.",
      "Presented the team's strategy to judges under pressure and delivered an inspiring closing speech."
    ],
    outcomes: "Earned an individual Top 5 of 25 ranking for performance and influence. Recognized as an Outstanding Team among 5 semifinal teams for resilience and strategic depth.",
    tags: ["Learning & Development", "HR Strategy", "KPI Definition", "Crisis Management", "Public Speaking", "Performance Tracking", "Cross-Functional Collaboration"],
    links: [],
    cardTags: ["L&D Strategy", "Crisis Management", "Public Speaking"],
    cardDesc: "Designed an organizational L&D strategy and navigated team turnover to earn an individual Top 5 of 25 ranking and an Outstanding Team recognition."
  },
  {
    id: "scrum-managed-macroeconomics",
    category: "research",
    type: "Academic Research",
    medal: null,
    title: "Scrum-Managed Group Research Project - Macroeconomics",
    role: "Team Lead - Scrum Master - Group 1A - Ho Chi Minh University of Banking",
    highlights: ["8 members", "3 offline sprints", "Google Sheets dashboard", "9/10 score"],
    overview: "Applied Agile/Scrum workflows to coordinate an 8-member macroeconomics research team from planning to final delivery. Managed research backlog, role-based task ownership, milestone tracking, and deliverable deadlines while using Management by Objectives (MBO) to connect individual responsibilities with project goals.",
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
    cardDesc: "Coordinated an 8-member macroeconomics research team using Agile/Scrum, 3 offline sprint sessions, MBO, and a Google Sheets dashboard. Earned a 9/10 faculty score."
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
    cardDesc: "Oversaw operations for a 50-member athletics club, secured VND 3,000,000 in approved funding, organized tournament logistics across 15 institutions, and maintained 85% active participation."
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
