// ============================================================
// PORTFOLIO DATA — Content for Vijay E Portfolio
// ============================================================

export const personalInfo = {
  name: "Vijay E",
  title: "QA Engineer | Software Tester",
  tagline: "I test beyond the happy path to help build reliable, secure, and user-friendly software.",
  about: "I am a QA professional with six months of internship experience testing web and mobile applications. My experience includes manual testing, functional and regression testing, UI validation, API testing, performance testing, cross-browser compatibility testing, and advanced AI application testing with Promptfoo and Ragas. I build and maintain automated CI/CD test workflows using GitHub Actions, containerized test runners with Docker, and scalable deployments with Kubernetes to help deliver reliable, resilient software.",
  location: "Tiruppur, Tamil Nadu, India",
  email: "vijayceg28@gmail.com",
  linkedin: "https://www.linkedin.com/in/vijay-e-/",
  github: "https://github.com/vijay-tech-colab",
  resumeUrl: "./Vijay_E_QA_Resume.pdf", // Place resume PDF in /public folder
};

export const skills = [
  {
    category: "Manual Testing",
    icon: "🔍",
    color: "#0ea5e9",
    items: [
      "Functional Testing",
      "Smoke & Sanity Testing",
      "Regression Testing",
      "Exploratory Testing",
      "UI & Field Validation",
      "Negative & Boundary-Value Testing",
      "End-to-End Workflow Testing",
    ],
  },
  {
    category: "Web & Mobile Automation",
    icon: "🤖",
    color: "#06b6d4",
    items: ["Selenium WebDriver", "Python", "Appium", "Maestro"],
  },
  {
    category: "API Testing & Automation",
    icon: "🔗",
    color: "#8b5cf6",
    items: [
      "Postman",
      "Python Requests",
      "Pytest",
      "Newman",
      "API Assertions",
      "API Regression Checks",
    ],
  },
  {
    category: "AI Application Testing",
    icon: "🧠",
    color: "#10b981",
    items: [
      "Promptfoo (LLM & Prompt Eval)",
      "Ragas (RAG Metrics)",
      "DeepEval (LLM Unit Tests)",
      "Chatbot & AI Agent Testing",
      "Conversation Flow Validation",
      "Hallucination & Relevancy Checks",
      "Prompt Injection & Red-Teaming",
      "MCP-based Application Testing",
    ],
  },
  {
    category: "CI/CD & DevOps",
    icon: "🚀",
    color: "#38bdf8",
    items: [
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "Git & GitHub",
      "Automated Test Workflows",
      "Containerized Test Runners",
      "Multi-Environment CI Gates",
    ],
  },
  {
    category: "Performance Testing",
    icon: "⚡",
    color: "#f59e0b",
    items: ["Apache JMeter", "k6", "Prometheus", "Grafana"],
  },
  {
    category: "Security Testing",
    icon: "🛡️",
    color: "#ef4444",
    items: ["Burp Suite", "Nmap Fundamentals", "OWASP Top 10 Checks"],
  },
  {
    category: "Programming & Databases",
    icon: "💻",
    color: "#0ea5e9",
    items: ["Python", "JavaScript", "SQL", "MySQL", "Microsoft SQL Server", "MongoDB"],
  },
  {
    category: "Dev Tools & Practices",
    icon: "🛠️",
    color: "#06b6d4",
    items: [
      "Jira",
      "Chrome DevTools",
      "VS Code",
      "PyCharm",
      "Agile & Scrum",
      "LambdaTest",
    ],
  },
];

export const experience = [
  {
    role: "QA Intern",
    company: "Home Ideas Technologies Private Limited",
    period: "April 2026 – October 2026",
    location: "Tiruppur, Tamil Nadu, India",
    responsibilities: [
      "Performed manual and automated testing of web and mobile applications across diverse devices and browsers.",
      "Designed and executed 250+ comprehensive test cases covering positive, negative, boundary-value, and end-to-end scenarios.",
      "Identified, documented, and retested critical UI, validation, navigation, file-upload, and workflow defects in Jira.",
      "Conducted performance and stress testing using Apache JMeter and k6, monitoring thresholds with Grafana.",
      "Validated cross-browser and cross-device compatibility across Chrome, Safari, Firefox, and Edge using LambdaTest.",
      "Automated REST API tests using Postman, Newman, and Python Requests/Pytest suites.",
      "Executed AI agent and LLM evaluation test suites using Promptfoo for adversarial prompt testing and Ragas/DeepEval for measuring faithfulness, hallucination rate, and context retrieval quality.",
      "Integrated automated test runs into CI/CD workflows using GitHub Actions and containerized test runners using Docker with Kubernetes orchestration.",
      "Maintained detailed test documentation, traceability matrices, and collaborated closely with developers to uphold high release standards.",
    ],
    tools: [
      "Promptfoo",
      "Ragas",
      "DeepEval",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "Selenium",
      "Postman",
      "JMeter",
      "k6",
      "LambdaTest",
      "Appium",
      "Python",
      "Jira",
    ],
  },
];

export const projects = [
  {
    title: "AI Agent & RAG Testing Framework",
    category: "AI QA & LLM Evaluation",
    icon: "🧠",
    color: "#10b981",
    description: "Comprehensive evaluation and quality assurance of LLM applications, conversational AI agents, and RAG pipelines using Promptfoo, Ragas, and DeepEval.",
    objective: "Prevent hallucinations, guard against prompt injection vulnerabilities, and validate retrieval precision and answer faithfulness before production release.",
    approach: "Designed Promptfoo test matrices to red-team prompts and benchmark response consistency. Implemented Ragas to measure Faithfulness, Answer Relevance, Context Precision, and Context Recall across RAG workflows, with DeepEval automated test assertions.",
    tools: ["Promptfoo", "Ragas", "DeepEval", "Python", "Postman", "OpenAI/Anthropic APIs"],
    status: "AI Testing Framework",
  },
  {
    title: "CI/CD Test Automation Pipeline",
    category: "CI/CD & DevOps QA",
    icon: "🚀",
    color: "#38bdf8",
    description: "End-to-end automated testing pipeline orchestrated with GitHub Actions, containerized with Docker, and scalable with Kubernetes.",
    objective: "Automate continuous testing on every push and pull request, eliminating regressions and providing fast developer feedback loops.",
    approach: "Built multi-stage GitHub Actions workflows executing linting, Pytest unit tests, and Newman API checks. Packaged test runners into optimized Docker images, and prepared Kubernetes pod configurations for scalable parallel test execution.",
    tools: ["GitHub Actions", "Docker", "Kubernetes", "Python", "Newman", "Git"],
    status: "CI/CD Automation Pipeline",
  },
  {
    title: "API Testing & Automation Suite",
    category: "API QA",
    icon: "🔗",
    color: "#8b5cf6",
    description: "End-to-end API testing using Postman collections and automated regression checks using Python Requests and Newman integrated into GitHub Actions.",
    objective: "Validate API endpoints for functional correctness, authentication, edge cases, response times, and payload schema integrity.",
    approach: "Created modular Postman collections with pre-request scripts and test assertions; authored Python Requests and Pytest scripts; automated regression executions via Newman in CI/CD.",
    tools: ["Postman", "Python Requests", "Pytest", "Newman", "GitHub Actions"],
    status: "Automated API Test Suite",
  },
  {
    title: "Cross-Browser & Cross-Device Compatibility",
    category: "Compatibility QA",
    icon: "🌍",
    color: "#ef4444",
    description: "Cross-browser and responsive device testing to ensure pixel-perfect visual fidelity and functional consistency across Chrome, Safari, Firefox, Edge, iOS, and Android.",
    objective: "Ensure flawless user experience and responsive adaptability across all modern browser engines and mobile/tablet viewport sizes.",
    approach: "Leveraged LambdaTest cloud device grid to run automated Selenium tests and manual exploratory sessions across 20+ OS and browser combinations.",
    tools: ["LambdaTest", "Selenium", "Chrome DevTools", "Safari Web Inspector"],
    status: "Cross-Browser Test Matrix",
  },
  {
    title: "Performance & Stress Testing",
    category: "Performance QA",
    icon: "⚡",
    color: "#f59e0b",
    description: "Load, stress, and endurance testing of web applications to identify latency bottlenecks, server saturation points, and error rates under concurrent load.",
    objective: "Establish performance baselines, verify response time SLAs (<200ms), and prevent server crashes under spike traffic.",
    approach: "Scripted realistic user journeys using Apache JMeter and k6; simulated concurrent traffic curves; monitored system health via Prometheus and Grafana dashboards.",
    tools: ["Apache JMeter", "k6", "Prometheus", "Grafana", "Docker"],
    status: "Performance Engineering Study",
  },
  {
    title: "Web & Mobile Functional Testing",
    category: "Manual & Automation QA",
    icon: "📱",
    color: "#06b6d4",
    description: "Rigorous functional and exploratory testing of web and mobile applications covering positive, negative, boundary-value, and edge-case journeys.",
    objective: "Ensure high software quality, intuitive usability, and zero regression defects prior to client delivery.",
    approach: "Authored detailed test scenarios, executed exploratory test charters, validated input fields, file uploads, and mobile gesture interactions using Appium and Maestro.",
    tools: ["Appium", "Maestro", "Selenium", "Jira", "Android Studio"],
    status: "Functional QA Project",
  },
];

export const testingWorkflow = [
  {
    id: 1,
    stage: "Requirements Analysis",
    icon: "📋",
    color: "#0ea5e9",
    description:
      "Review and analyze user stories, functional requirements, and acceptance criteria. Identify edge cases, AI guardrail needs, and testable conditions early in the development lifecycle.",
  },
  {
    id: 2,
    stage: "Test Planning",
    icon: "🗺️",
    color: "#06b6d4",
    description:
      "Define testing scope, strategy, entrance/exit criteria, CI/CD pipeline integration points, tools (Selenium, Postman, Promptfoo, Ragas), and test environments.",
  },
  {
    id: 3,
    stage: "Test Case Design",
    icon: "✍️",
    color: "#8b5cf6",
    description:
      "Design structured positive, negative, boundary-value, API, and AI evaluation test matrices. Ensure complete requirement traceability and risk-based prioritization.",
  },
  {
    id: 4,
    stage: "Test Execution & Automation",
    icon: "▶️",
    color: "#f59e0b",
    description:
      "Execute manual exploratory charters, run automated Selenium/Appium suites, trigger Newman API collections, and run Promptfoo/Ragas AI test evaluations.",
  },
  {
    id: 5,
    stage: "Defect Tracking & Triage",
    icon: "🐛",
    color: "#ef4444",
    description:
      "Log actionable, reproducible defect reports in Jira complete with severity, steps to reproduce, network logs, and screenshots. Collaborate with engineers for quick triage.",
  },
  {
    id: 6,
    stage: "CI/CD & Regression Verification",
    icon: "🚀",
    color: "#38bdf8",
    description:
      "Execute automated regression test suites within GitHub Actions workflows across Docker containers, verifying that bug fixes introduce zero side-effects.",
  },
  {
    id: 7,
    stage: "Performance & Security Checks",
    icon: "⚡",
    color: "#10b981",
    description:
      "Perform load testing with JMeter and k6, monitor response times in Grafana, and perform OWASP Top 10 and prompt injection security evaluations.",
  },
  {
    id: 8,
    stage: "Sign-Off & Release Validation",
    icon: "✅",
    color: "#0ea5e9",
    description:
      "Conduct final smoke testing, cross-browser verification on LambdaTest, ensure all release criteria are met, and issue the QA sign-off for production deployment.",
  },
];

export const certifications = [
  {
    title: "Software Testing",
    issuer: "University of Leeds",
    platform: "Coursera",
    icon: "🎓",
    color: "#0ea5e9",
    verifyUrl: "",
  },
  {
    title: "Python Selenium",
    issuer: "Packt",
    platform: "Coursera",
    icon: "🐍",
    color: "#06b6d4",
    verifyUrl: "",
  },
  {
    title: "JavaScript",
    issuer: "Meta",
    platform: "Coursera",
    icon: "⚡",
    color: "#8b5cf6",
    verifyUrl: "",
  },
  {
    title: "Prompt Engineering & AI Evaluation",
    issuer: "Vanderbilt University",
    platform: "Coursera",
    icon: "🧠",
    color: "#10b981",
    verifyUrl: "",
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering — Computer Science & Engineering",
    institution: "Dr. N.G.P. Institute of Technology",
    period: "September 2021 – April 2025",
    grade: "CGPA: 7.29 / 10",
    level: "undergraduate",
    icon: "🎓",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "State Board of Tamil Nadu",
    period: "2019 – 2021",
    grade: "Completed",
    level: "hsc",
    icon: "📚",
  },
  {
    degree: "Secondary School Certificate (SSLC)",
    institution: "State Board of Tamil Nadu",
    period: "2018 – 2019",
    grade: "Completed",
    level: "sslc",
    icon: "🏫",
  },
];
