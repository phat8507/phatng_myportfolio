export interface ModeVariant<T> {
  coordination: T;
  ld: T;
}

export const profileData = {
  name: "Phat Nguyen",
  viName: "Nguyễn Hữu Trường Phát",
  location: "Ho Chi Minh City, Vietnam",
  status: "Open to Internships",

  headline: {
    coordination: "Team Leader & Agile Project Coordinator | SFC Certified · IELTS 7.5 · Top 5 of 25 - YFLP Season 6",
    ld: "Learning & Development · People Development · Aspiring HR Manager"
  } satisfies ModeVariant<string>,

  heroDescription: {
    coordination: "I lead teams and coordinate the moving parts - people, timelines, and stakeholders - so projects land on time and on target. As a Team Leader, I guided my team to Best Team of the Semi-Final. As Vice Leader, I helped my team reach a Top 5 of 25 finish in the YFC Future Leaders Program. Alongside this, I led an 8-member Scrum team to a 9/10 faculty score, ran operations for a 50-member club with 85% active participation, and delivered weekly stakeholder reporting across two concurrent teaching roles.",
    ld: "Business Administration (E-Business) student pursuing a career in Learning & Development with a long-term goal of HR management in multinational and corporate environments. IELTS 7.5 and Scrum Fundamentals Certified, with hands-on experience designing structured learning programs, tracking performance data, and onboarding, coaching, and developing team members across cross-functional settings."
  } satisfies ModeVariant<string>,

  targets: {
    coordination: [
      "Project Coordination",
      "Project Management",
      "Team Leadership",
      "Learning & Development",
      "Operations"
    ],
    ld: [
      "Learning & Development",
      "Talent Development",
      "Coaching & Mentoring",
      "HR Management",
      "People Operations"
    ]
  } satisfies ModeVariant<string[]>,

  stats: {
    coordination: [
      { label: "Competition", value: "Top 5 / 25 - YFLP", accent: true },
      { label: "Score", value: "9/10 Faculty", accent: true },
      { label: "Scale", value: "50+ Members Led", accent: false },
      { label: "English", value: "IELTS 7.5", accent: false }
    ],
    ld: [
      { label: "Track", value: "L&D → HR Manager", accent: true },
      { label: "Score", value: "9/10 Faculty", accent: true },
      { label: "Coached", value: "50+ Members", accent: false },
      { label: "English", value: "IELTS 7.5", accent: false }
    ]
  } satisfies ModeVariant<{ label: string; value: string; accent: boolean }[]>,

  contact: {
    email: "nhtruongphat.forwork@gmail.com",
    phone: "+84 389 742 464",
    linkedin: "https://linkedin.com/in/nhtruongphat",
    github: "https://github.com/phat8507",
    portfolio: "https://phat8507.github.io/phatng_myportfolio"
  },

  cv: {
    coordination: { file: "Phat_Nguyen_CV.pdf", downloadName: "Phat_Nguyen_CV.pdf" },
    ld: { file: "Phat_Nguyen_CV_LD_HR.pdf", downloadName: "Phat_Nguyen_CV_LD_HR.pdf" }
  } satisfies ModeVariant<{ file: string; downloadName: string }>,

  // TODO: swap the ld path once a Learning & Development / HR-specific photo is provided.
  photo: {
    coordination: "uploads/photo-1777006151341.jpg",
    ld: "uploads/photo-1777006151341.jpg"
  } satisfies ModeVariant<string>,

  about: {
    paragraphs: {
      coordination: [
        "Currently pursuing **Business Administration (E-Business)** at Ho Chi Minh University of Banking, I combine hands-on team leadership with project coordination - bringing certifications and real-world experience alongside my studies. I'm building toward a career that connects people and processes, with a growing focus on team development and people operations.",
        "My practical experience spans **competitive team leadership, Scrum-led academic projects, club operations, and active paid teaching roles**. As a Team Leader and Vice Leader in the YFC Future Leaders Program, I guided teams through high-pressure case competitions - earning Best Team of the Semi-Final and a Top 5 of 25 finish. Across these settings I have delivered timeline planning, task tracking, stakeholder communication, and people coordination in measurable, real-world environments."
      ],
      ld: [
        "Currently pursuing **Business Administration (E-Business)** at Ho Chi Minh University of Banking, I'm building toward a career in **Learning & Development**, with a long-term goal of HR management in multinational and corporate environments. My work centers on designing structured learning programs, tracking performance data, and coaching people toward measurable growth.",
        "My practical experience spans **onboarding and coaching teammates, designing individualized learning plans, and leading people through high-pressure competitions**. As a Team Leader and Vice Leader in the YFC Future Leaders Program, I coached teammates through case competitions - earning an Outstanding Team award and an individual Top 5 of 25 for performance and influence. Across teaching, tutoring, and team leadership, I've built a consistent practice of diagnosing gaps, setting goals, and developing people."
      ]
    } satisfies ModeVariant<string[]>,
    snapshot: {
      coordination: [
        { key: "Name", value: "Phat Nguyen" },
        { key: "University", value: "Ho Chi Minh University of Banking" },
        { key: "Program", value: "Business Administration - E-Business - Class of 2029" },
        { key: "English", value: "IELTS 7.5 - Professional Working", accent: true },
        { key: "Languages", value: "Vietnamese (Native) - English" },
        { key: "Learning", value: "Google PM Certificate - Expected Aug 2026" },
        { key: "Location", value: "Ho Chi Minh City, Vietnam" },
        { key: "Target", value: "Project Coordination - Team Leadership - Learning & Development", accent: true }
      ],
      ld: [
        { key: "Name", value: "Phat Nguyen" },
        { key: "University", value: "Ho Chi Minh University of Banking" },
        { key: "Program", value: "Business Administration - E-Business - Class of 2029" },
        { key: "English", value: "IELTS 7.5 - Professional Working", accent: true },
        { key: "Languages", value: "Vietnamese (Native) - English" },
        { key: "Learning", value: "Google PM Certificate - Expected Q3 2026" },
        { key: "Location", value: "Ho Chi Minh City, Vietnam" },
        { key: "Target", value: "Learning & Development - Coaching & Mentoring - Aspiring HR Manager", accent: true }
      ]
    } satisfies ModeVariant<{ key: string; value: string; accent?: boolean }[]>,
    badges: {
      coordination: [
        "Team Leadership",
        "Project Coordination",
        "Agile/Scrum",
        "Crisis Management",
        "Public Speaking",
        "Stakeholder Communication"
      ],
      ld: [
        "Learning & Development",
        "Training & Program Design",
        "Onboarding & Talent Development",
        "Coaching & Mentoring",
        "Performance & Progress Tracking",
        "Stakeholder Management"
      ]
    } satisfies ModeVariant<string[]>
  }
};
