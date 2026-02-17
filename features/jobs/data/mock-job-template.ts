import { ComplianceCheck, JobTemplate } from "@/interfaces/job";

export const jobTemplates: JobTemplate[] = [
  {
    id: "swe",
    name: "Software Engineer",
    description: "Standard SWE posting template",
    department: "Engineering",
    tags: ["tech", "development"],
    prefill: {
      title: "Software Engineer",
      department: "Engineering",
      jobType: "full-time",
      experienceLevel: "mid",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are looking for a talented Software Engineer to join our engineering team. You will design, develop, and maintain scalable software solutions that power our products. This role offers the opportunity to work with modern technologies and collaborate with a passionate team.",
      responsibilities:
        "Design and implement new features and services\nWrite clean, maintainable, and well-tested code\nParticipate in code reviews and provide constructive feedback\nCollaborate with product managers and designers to define requirements\nTroubleshoot production issues and implement fixes\nContribute to architecture decisions and technical documentation",
      requirements:
        "3+ years of professional software development experience\nProficiency in one or more programming languages (e.g., Python, Java, Go, TypeScript)\nExperience with RESTful APIs and microservices architecture\nFamiliarity with SQL and NoSQL databases\nStrong problem-solving and debugging skills\nBachelor's degree in Computer Science or equivalent experience",
      niceToHave:
        "Experience with cloud platforms (AWS, GCP, Azure)\nFamiliarity with CI/CD pipelines and DevOps practices\nContributions to open-source projects",
      skills: ["Python, TypeScript, React, PostgreSQL, Docker, Git"],
      educationLevel: "bachelor",
      benefits: [
        "health",
        "dental",
        "pto",
        "401k",
        "remote",
        "equity",
        "learning",
      ],
      documentRequirements: {
        resume: true,
        coverLetter: false,
        portfolio: false,
        githubProfile: true,
      },
    },
  },
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "React/Vue focused frontend role",
    department: "Engineering",
    tags: ["tech", "frontend"],
    prefill: {
      title: "Frontend Developer",
      department: "Engineering",
      jobType: "full-time",
      experienceLevel: "mid",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are seeking a Frontend Developer who is passionate about building beautiful, performant user interfaces. You will work closely with designers and backend engineers to deliver delightful user experiences across web and mobile platforms.",
      responsibilities:
        "Build responsive and accessible user interfaces using React/TypeScript\nTranslate designs and wireframes into high-quality code\nOptimize application performance and loading times\nImplement state management and data fetching patterns\nWrite unit and integration tests for UI components\nMentor junior developers on frontend best practices",
      requirements:
        "3+ years of frontend development experience\nStrong proficiency in React, TypeScript, and modern CSS\nExperience with state management (Redux, Zustand, or similar)\nKnowledge of web accessibility standards (WCAG)\nFamiliarity with testing frameworks (Jest, Cypress)\nUnderstanding of RESTful APIs and GraphQL",
      niceToHave:
        "Experience with Next.js or similar frameworks\nKnowledge of design systems and component libraries\nFamiliarity with animation libraries (Framer Motion, GSAP)",
      skills: ["React, TypeScript, CSS, Tailwind, Next.js, Jest"],
      educationLevel: "bachelor",
      benefits: ["health", "dental", "pto", "remote", "learning"],
      documentRequirements: {
        resume: true,
        coverLetter: false,
        portfolio: true,
        githubProfile: true,
      },
    },
  },
  {
    id: "backend",
    name: "Backend Developer",
    description: "API and server-side development",
    department: "Engineering",
    tags: ["tech", "backend"],
    prefill: {
      title: "Backend Developer",
      department: "Engineering",
      jobType: "full-time",
      experienceLevel: "mid",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are looking for a Backend Developer to build and maintain robust server-side applications and APIs. You will work on scalable systems that handle millions of requests and ensure data integrity across our platform.",
      responsibilities:
        "Design and build scalable APIs and microservices\nOptimize database queries and data models\nImplement authentication, authorization, and security best practices\nMonitor system performance and resolve bottlenecks\nWrite comprehensive tests and maintain documentation\nCollaborate with frontend and DevOps teams",
      requirements:
        "4+ years of backend development experience\nProficiency in Node.js, Python, or Go\nStrong experience with PostgreSQL and Redis\nKnowledge of message queues (RabbitMQ, Kafka)\nExperience with containerization (Docker, Kubernetes)\nUnderstanding of distributed systems patterns",
      niceToHave:
        "Experience with event-driven architectures\nFamiliarity with infrastructure as code (Terraform)\nKnowledge of GraphQL",
      skills: ["Node.js, Python, PostgreSQL, Redis, Docker, Kubernetes"],
      educationLevel: "bachelor",
      benefits: ["health", "dental", "pto", "401k", "remote", "equity"],
      documentRequirements: {
        resume: true,
        coverLetter: false,
        portfolio: false,
        githubProfile: true,
      },
    },
  },
  {
    id: "designer",
    name: "Product Designer",
    description: "Design role with portfolio focus",
    department: "Design",
    tags: ["design", "ux"],
    prefill: {
      title: "Product Designer",
      department: "Design",
      jobType: "full-time",
      experienceLevel: "mid",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are hiring a Product Designer to shape the future of our product experience. You will lead end-to-end design projects, from research and ideation through to polished, production-ready designs that delight our users.",
      responsibilities:
        "Lead end-to-end design for product features\nConduct user research, interviews, and usability testing\nCreate wireframes, prototypes, and high-fidelity mockups\nBuild and maintain our design system\nCollaborate with engineers to ensure design quality in implementation\nPresent designs and rationale to stakeholders",
      requirements:
        "3+ years of product design experience\nStrong portfolio demonstrating UX/UI design skills\nProficiency in Figma and prototyping tools\nExperience with user research methodologies\nUnderstanding of design systems and component-based design\nExcellent visual design and typography skills",
      niceToHave:
        "Experience with motion design and micro-interactions\nBasic understanding of HTML/CSS\nExperience designing for mobile platforms",
      skills: [
        "Figma, User Research, Prototyping, Design Systems, Accessibility",
      ],
      educationLevel: "bachelor",
      benefits: ["health", "pto", "remote", "learning", "gym"],
      documentRequirements: {
        resume: true,
        coverLetter: true,
        portfolio: true,
        githubProfile: false,
      },
    },
  },
  {
    id: "ux",
    name: "UX Researcher",
    description: "User research and testing focus",
    department: "Design",
    tags: ["design", "research"],
    prefill: {
      title: "UX Researcher",
      department: "Design",
      jobType: "full-time",
      experienceLevel: "mid",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are looking for a UX Researcher to help us deeply understand our users and inform product decisions with data-driven insights. You will plan, conduct, and synthesize research that shapes our product roadmap.",
      responsibilities:
        "Plan and conduct qualitative and quantitative research studies\nRecruit participants and manage research logistics\nSynthesize findings into actionable insights and recommendations\nCreate research reports and present to cross-functional teams\nBuild and maintain a user research repository\nAdvocate for user needs throughout the product development process",
      requirements:
        "3+ years of UX research experience\nExperience with various research methods (interviews, surveys, usability tests)\nStrong analytical and synthesis skills\nExcellent written and verbal communication\nFamiliarity with research tools (UserTesting, Dovetail, Maze)\nBachelor's degree in HCI, Psychology, or related field",
      skills: [
        "User Research, Usability Testing, Data Analysis, Survey Design",
      ],
      educationLevel: "master",
      benefits: ["health", "pto", "remote", "learning"],
      documentRequirements: {
        resume: true,
        coverLetter: true,
        portfolio: true,
        githubProfile: false,
      },
    },
  },
  {
    id: "pm",
    name: "Product Manager",
    description: "PM with cross-functional emphasis",
    department: "Product",
    tags: ["product", "strategy"],
    prefill: {
      title: "Product Manager",
      department: "Product",
      jobType: "full-time",
      experienceLevel: "senior",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are seeking a Product Manager to own and drive the strategy, roadmap, and execution for a key product area. You will work at the intersection of business, technology, and design to deliver products that customers love.",
      responsibilities:
        "Define product vision, strategy, and roadmap\nGather and prioritize requirements from customers and stakeholders\nWrite detailed product specifications and user stories\nWork closely with engineering, design, and marketing teams\nAnalyze product metrics and drive data-informed decisions\nManage the product lifecycle from ideation to launch",
      requirements:
        "5+ years of product management experience\nProven track record of shipping successful products\nStrong analytical skills and data-driven mindset\nExcellent communication and stakeholder management\nExperience with agile development methodologies\nTechnical background or ability to work closely with engineers",
      niceToHave:
        "MBA or related advanced degree\nExperience in SaaS or B2B products\nFamiliarity with product analytics tools (Amplitude, Mixpanel)",
      skills: [
        "Product Strategy, Roadmapping, Agile, Data Analysis, Stakeholder Management",
      ],
      educationLevel: "bachelor",
      benefits: ["health", "dental", "pto", "401k", "equity", "learning"],
      documentRequirements: {
        resume: true,
        coverLetter: true,
        portfolio: false,
        githubProfile: false,
      },
    },
  },
  {
    id: "sales",
    name: "Sales Representative",
    description: "Sales role with quota details",
    department: "Sales",
    tags: ["sales", "revenue"],
    prefill: {
      title: "Sales Representative",
      department: "Sales",
      jobType: "full-time",
      experienceLevel: "mid",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are looking for a driven Sales Representative to join our growing sales team. You will be responsible for generating new business, managing a pipeline of prospects, and closing deals that drive company revenue.",
      responsibilities:
        "Prospect and qualify new sales leads\nConduct product demonstrations and presentations\nManage and grow a pipeline of opportunities in CRM\nNegotiate contracts and close deals\nMeet or exceed quarterly and annual sales quotas\nCollaborate with marketing and customer success teams",
      requirements:
        "2+ years of B2B sales experience\nProven track record of meeting or exceeding sales targets\nExcellent communication and presentation skills\nExperience with CRM tools (Salesforce, HubSpot)\nStrong negotiation and closing abilities\nSelf-motivated with a results-driven mindset",
      skills: ["B2B Sales, CRM, Negotiation, Lead Generation, Presentations"],
      educationLevel: "bachelor",
      benefits: ["health", "dental", "pto", "401k"],
      documentRequirements: {
        resume: true,
        coverLetter: true,
        portfolio: false,
        githubProfile: false,
      },
    },
  },
  {
    id: "marketing",
    name: "Marketing Manager",
    description: "Marketing role with campaign focus",
    department: "Marketing",
    tags: ["marketing", "campaigns"],
    prefill: {
      title: "Marketing Manager",
      department: "Marketing",
      jobType: "full-time",
      experienceLevel: "senior",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are hiring a Marketing Manager to lead our marketing efforts and drive brand awareness, lead generation, and customer engagement. You will develop and execute multi-channel marketing campaigns that deliver measurable results.",
      responsibilities:
        "Develop and execute marketing strategy and campaigns\nManage content marketing, email, social media, and paid channels\nAnalyze campaign performance and optimize for ROI\nCollaborate with sales team on lead generation initiatives\nManage marketing budget and vendor relationships\nBuild and lead a growing marketing team",
      requirements:
        "5+ years of marketing experience\nExperience with digital marketing channels and analytics\nStrong project management and organizational skills\nProficiency with marketing tools (HubSpot, Google Analytics, etc.)\nExcellent writing and communication skills\nData-driven approach to decision making",
      skills: [
        "Digital Marketing, Content Strategy, SEO, Analytics, Campaign Management",
      ],
      educationLevel: "bachelor",
      benefits: ["health", "pto", "remote", "learning", "gym"],
      documentRequirements: {
        resume: true,
        coverLetter: true,
        portfolio: true,
        githubProfile: false,
      },
    },
  },
  {
    id: "hr",
    name: "HR Specialist",
    description: "People operations and talent management",
    department: "Human Resources",
    tags: ["hr", "people"],
    prefill: {
      title: "HR Specialist",
      department: "Human Resources",
      jobType: "full-time",
      experienceLevel: "mid",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are looking for an HR Specialist to support our people operations and help build a world-class employee experience. You will manage HR processes, support talent acquisition, and drive employee engagement initiatives.",
      responsibilities:
        "Manage end-to-end recruitment processes\nOnboard new employees and manage orientation programs\nAdminister employee benefits and compensation\nSupport performance management and employee development\nMaintain HR records and ensure compliance with regulations\nDrive employee engagement and culture initiatives",
      requirements:
        "3+ years of HR experience\nKnowledge of employment laws and regulations\nExperience with HRIS systems (Workday, BambooHR)\nStrong interpersonal and communication skills\nAbility to handle confidential information with discretion\nPHR or SHRM-CP certification preferred",
      certifications: "PHR, SHRM-CP",
      skills: [
        "Recruitment, Employee Relations, HRIS, Compliance, Benefits Administration",
      ],
      educationLevel: "bachelor",
      benefits: ["health", "dental", "pto", "401k", "parental"],
      documentRequirements: {
        resume: true,
        coverLetter: true,
        portfolio: false,
        githubProfile: false,
      },
    },
  },
  {
    id: "data",
    name: "Data Analyst",
    description: "Data analysis and reporting",
    department: "Engineering",
    tags: ["data", "analytics"],
    prefill: {
      title: "Data Analyst",
      department: "Engineering",
      jobType: "full-time",
      experienceLevel: "mid",
      location: "colombo, sri lanka",
      workPreference: "Hybrid",
      salary: {
        currency: "LKR",
        min: 100000,
        max: 200000,
        payPeriod: "monthly",
        showOnPosting: true,
      },
      description:
        "We are seeking a Data Analyst to turn data into actionable insights that drive business decisions. You will work with large datasets, build dashboards, and partner with teams across the organization to answer critical business questions.",
      responsibilities:
        "Analyze large datasets to identify trends and insights\nBuild and maintain dashboards and reports\nDefine and track key business metrics\nPartner with product, marketing, and engineering teams\nDesign and analyze A/B tests\nEnsure data quality and integrity across systems",
      requirements:
        "3+ years of data analysis experience\nProficiency in SQL and at least one programming language (Python, R)\nExperience with data visualization tools (Tableau, Looker, Power BI)\nStrong statistical analysis skills\nAbility to communicate complex findings to non-technical audiences\nExperience with ETL processes and data warehousing",
      skills: ["SQL, Python, Tableau, Statistics, A/B Testing, ETL"],
      educationLevel: "bachelor",
      benefits: ["health", "dental", "pto", "remote", "learning"],
      documentRequirements: {
        resume: true,
        coverLetter: false,
        portfolio: false,
        githubProfile: true,
      },
    },
  },
];

export const defaultComplianceChecks: ComplianceCheck[] = [
  {
    id: "bias-gender",
    label: "Gender Bias Check",
    description: "Scans for gendered language",
    status: "pending",
    category: "bias",
  },
  {
    id: "bias-age",
    label: "Age Bias Check",
    description: "Checks for age-discriminatory terms",
    status: "pending",
    category: "bias",
  },
  {
    id: "legal-eeo",
    label: "EEO Compliance",
    description: "Equal Employment Opportunity statement",
    status: "pending",
    category: "legal",
  },
  {
    id: "legal-ada",
    label: "ADA Compliance",
    description: "Reasonable accommodation notice",
    status: "pending",
    category: "legal",
  },
  {
    id: "gdpr-data",
    label: "GDPR Data Notice",
    description: "Data processing disclosure",
    status: "pending",
    category: "gdpr",
  },
  {
    id: "gdpr-consent",
    label: "Consent Mechanism",
    description: "Explicit consent collection",
    status: "pending",
    category: "gdpr",
  },
  {
    id: "inclusive-lang",
    label: "Inclusive Language",
    description: "Uses inclusive language throughout",
    status: "pending",
    category: "inclusive",
  },
  {
    id: "inclusive-req",
    label: "Reasonable Requirements",
    description: "Requirements not unnecessarily restrictive",
    status: "pending",
    category: "inclusive",
  },
];
