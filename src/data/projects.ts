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
    id: "financial-market-failures",
    category: "research",
    type: "Academic Research",
    medal: null,
    title: "Financial Market Failures & Economic Crises",
    role: "Team Lead - Scrum Master - 8-member research team",
    highlights: ["8 members", "Scrum + MBO", "3 offline sprints", "9/10 score"],
    overview: "Led an 8-member academic research team on financial market failures and economic crises, managing the project from topic scoping to final presentation. Applied Scrum to divide work into sprint-based workflows, track ownership, monitor progress, and coordinate review sessions. Used MBO to translate the team goal into clear objectives, key results, owners, deadlines, and measurable outputs.",
    responsibilities: [
      "Coordinated 8 members across kickoff, role assignment, sprint planning, research execution, rehearsal, and final submission.",
      "Built sprint backlogs, divided work by sprint, tracked task ownership, and hosted sprint reviews/check-ins.",
      "Applied MBO by converting the project goal into clear objectives, key results, deadlines, and output standards.",
      "Structured the project into key workstreams: framework research, Vietnam-focused case building, rebuttal preparation, and final storytelling.",
      "Coordinated research scope across market failure mechanisms, international supporting cases, and Vietnam-focused financial turbulence.",
      "Monitored progress, workload, dependencies, deadlines, and output quality across report writing, slide preparation, speaking script, debate document, and rehearsal."
    ],
    outcomes: "Achieved a 9/10 final group score. Delivered a complete research presentation, data workbook, Q&A preparation, and rebuttal materials. Improved team accountability by assigning owners, deadlines, and expected outputs for each workstream.",
    tags: ["Scrum", "MBO", "Sprint Planning", "Team Leadership", "Progress Tracking", "Task Delegation", "Research Management", "Presentation Structuring"],
    links: [
      { label: "Scrum/MBO Management Sheet", url: "https://docs.google.com/spreadsheets/d/1J7qV3jRL2DzsedPfVXcWpT1usXZqI-f6/edit?usp=sharing&ouid=115062449513822083905&rtpof=true&sd=true" },
      { label: "Interactive Project Website", url: "https://phat8507.github.io/MacroEco_N4_MarketFailure/" }
    ],
    cardTags: ["Scrum", "MBO", "Sprint Planning", "Team Leadership"],
    cardDesc: "Led an 8-member research team using Scrum and MBO: sprint planning, backlog tracking, task ownership, progress reviews, and final delivery control. Achieved 9/10."
  },
  {
    id: "volleyball-club",
    category: "leadership",
    type: "Operations & Media",
    medal: "Bronze Medal",
    title: "Volleyball Club - Duong Van Thi High School",
    role: "Head of Media & Technical Division - Nov 2023 - Jun 2025",
    highlights: ["50+ members", "15 new members/cycle", "85% retention", "15+ schools"],
    overview: "Oversaw operations and media coordination for a 50+ member student sports organization, covering weekly scheduling, facility coordination, recruitment, onboarding, media output, and inter-school tournament logistics across a two-year tenure.",
    responsibilities: [
      "Managed weekly scheduling, venue coordination, and resource allocation for club training sessions and events.",
      "Led annual recruitment and onboarding for 15 new members per cycle, achieving 85% retention through follow-up and mentorship.",
      "Coordinated media operations, including content planning, social media output, photography, and video direction for club activities and tournaments.",
      "Worked with school administration to secure budget approval, venue access, and institutional support.",
      "Planned inter-school tournaments with 15+ schools, managing timelines, logistics, stakeholder communication, and event delivery.",
      "Prepared post-event performance reports to support planning decisions for future tournaments."
    ],
    outcomes: "Contributed to a Bronze Medal at the HCMC Student Sports Championship 2025. Supported operations for a 50+ member club and coordinated tournament activities involving 15+ schools. Built practical experience in scheduling, logistics, stakeholder coordination, onboarding, reporting, and media operations.",
    tags: ["Operations", "Recruitment Coordination", "Onboarding", "Scheduling", "Stakeholder Communication", "Tournament Logistics", "Reporting", "Media Operations"],
    cardTags: ["Operations", "Recruitment", "Scheduling", "Media", "Logistics"],
    cardDesc: "Oversaw operations for a 50+ member club: scheduling, venue coordination, recruitment, onboarding, media operations, and tournament logistics involving 15+ schools. Achieved 85% retention and contributed to Bronze Medal performance."
  },
  {
    id: "youth-for-chance",
    category: "event",
    type: "Event Support",
    medal: null,
    title: "Youth for Chance Club - \"Shared to Lead\" Talkshow",
    role: "External Relations & Event Communications",
    highlights: ["Event logistics", "Partnership outreach", "Communication planning"],
    overview: "Supported operations, external relations, and event communications for Youth for Chance, a student organization focused on leadership development and social impact.",
    responsibilities: [
      "Supported event logistics planning, timeline drafting, task allocation, and on-ground coordination across teams.",
      "Drafted partnership outreach communications and assisted external relations with partner organizations and speakers.",
      "Coordinated internal communication between club divisions to keep messaging and task follow-through consistent.",
      "Supported on-ground execution during the talkshow, including logistics checks and attendee flow.",
      "Documented event outcomes and lessons learned for post-event review."
    ],
    outcomes: "Supported successful execution of the leadership-focused student talkshow while building practical experience in event logistics, partnership outreach, communication planning, and on-ground coordination.",
    tags: ["Event Logistics", "External Relations", "Partnership Outreach", "Communication Planning", "On-ground Coordination"],
    cardTags: ["Event Logistics", "Partnerships", "Communication"],
    cardDesc: "Supported event logistics, partnership outreach, communication planning, and on-ground coordination for a leadership-focused student talkshow."
  }
];
