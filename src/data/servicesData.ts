export interface ServiceProblem {
  title: string;
  description: string;
}

export interface ServiceProject {
  title: string;
  category: string;
  metrics: string;
  description: string;
  accentColor: string;
  theme: 'dark' | 'light' | 'amber' | 'slate';
}

export interface ServiceProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export type MainCategorySlug = 'software-solutions' | 'social-media-marketing' | 'digital-strategy-ideas';

export interface ServiceCategory {
  id: string;
  slug: MainCategorySlug;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: 'Cpu' | 'Megaphone' | 'Lightbulb';
  accentColor: string;
  accentGradient: string;
  hubServiceSlug: string;
  subServiceSlugs: string[];
}

export const MAIN_SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'software-solutions',
    slug: 'software-solutions',
    title: 'Software Solutions',
    tagline: 'High-performance web, native mobile apps, automated QA testing, and modern AI search optimization.',
    description: 'Our software engineering pod constructs enterprise-grade digital systems. From mission-critical cloud apps to cross-platform mobile experiences and automated QA pipelines, we deliver fault-tolerant, scalable codebases.',
    badge: '6 Core Services',
    iconName: 'Cpu',
    accentColor: '#3B82F6',
    accentGradient: 'from-blue-500 to-indigo-600',
    hubServiceSlug: 'web-development',
    subServiceSlugs: [
      'web-development',
      'mobile-app-development',
      'application-testing',
      'search-engine-optimisation',
      'artificial-intelligence-optimization',
      'generative-engine-optimisation',
    ],
  },
  {
    id: 'social-media-marketing',
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    tagline: 'Precision advertising, high-engagement community management, and compounding content ecosystems.',
    description: 'Transform social attention into revenue pipelines. We combine data-driven paid social acquisition, active multi-channel community stewardship, and viral content production that builds enduring audience loyalty.',
    badge: '3 Core Services',
    iconName: 'Megaphone',
    accentColor: '#EC4899',
    accentGradient: 'from-pink-500 to-rose-600',
    hubServiceSlug: 'social-media-advertising',
    subServiceSlugs: [
      'social-media-advertising',
      'social-media-management',
      'content-marketing',
    ],
  },
  {
    id: 'digital-strategy-ideas',
    slug: 'digital-strategy-ideas',
    title: 'Digital Strategy Ideas',
    tagline: 'Strategic brand architecture, memorable visual identities, and executive-level analytics attribution.',
    description: 'Define your market category and master your metrics. We engineer cohesive brand identities, iconic logos, and end-to-end data pipelines that empower decisive leadership and compounding enterprise valuation.',
    badge: '3 Core Services',
    iconName: 'Lightbulb',
    accentColor: '#F59E0B',
    accentGradient: 'from-amber-500 to-orange-600',
    hubServiceSlug: 'digital-analytics',
    subServiceSlugs: [
      'brand-management',
      'unique-logo-design',
      'digital-analytics',
    ],
  },
];

export interface PriorityService {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  category: string;
  categorySlug: MainCategorySlug;
  serviceImage: string;
  iconName:
    | 'Lightbulb'
    | 'Search'
    | 'Megaphone'
    | 'MessageSquare'
    | 'Cog'
    | 'FileCheck'
    | 'TrendingUp'
    | 'Cpu'
    | 'Monitor'
    | 'Smartphone'
    | 'Tag'
    | 'PenTool';
  /**
   * Coordinates in the S2 / S3 Beehive Honeycomb Grid:
   * Row 0 (top 4): Digital Strategy Ideas, Search Engine Optimisation, Social Media Advertising, Social Media Management
   * Row 1 (mid 4): Generative Engine Optimisation, Content Marketing, Digital Analytics, Artificial Intelligence Optimization
   * Row 2 (bot 4): Web Development, Mobile App Development, Brand Handling, Unique Logo Designing
   */
  hiveCell: {
    row: 0 | 1 | 2;
    col: 0 | 1 | 2 | 3;
    /** Target percentage coordinates (0-100) on the hive stage where the Bee flies in S2/S3 */
    beeTargetX: number;
    beeTargetY: number;
    /** Crop region from S2.jpg / S3.jpg to show authentic 3D architectural room interior */
    s2Crop: { x: number; y: number; w: number; h: number };
    roomGradient: string;
    frameColor: string;
    glowColor: string;
    roomInteriorLabel: string;
  };
  /**
   * Stage 4 (S4.jpg) Interior Beehive Conference Room customization
   */
  s4Room: {
    consultantQuestion: string;
    voiceNarration: string;
    whiteboardHeading: string;
    whiteboardModules: string[];
    kpiHighlight: string;
  };
  /**
   * Stage 5 & 6 (S5.jpg & S6.jpg) Service Section Details on the Services Page
   */
  detail: {
    overviewTitle: string;
    overviewDescription: string;
    desktopMockupHeadline: string;
    desktopMockupSubtext: string;
    mobileMockupStat: string;
    problemsSolved: ServiceProblem[];
    modernTechSummary: string;
    techStack: string[];
    ratingScore: string;
    previousProjects: ServiceProject[];
    processDelivery: ServiceProcessStep[];
  };
}

export const PRIORITY_SERVICES: PriorityService[] = [
  {
    id: 1,
    slug: 'application-testing',
    title: 'Application Testing',
    shortTitle: 'App Testing',
    tagline: 'Enterprise-grade QA, automated end-to-end testing, and performance validation ensuring zero-defect deployments.',
    category: 'Software Solutions',
    categorySlug: 'software-solutions',
    serviceImage: '/assets/services/application-testing.jpg',
    iconName: 'FileCheck',
    hiveCell: {
      row: 0,
      col: 0,
      beeTargetX: 39,
      beeTargetY: 28,
      s2Crop: { x: 41.2, y: 21.8, w: 11.2, h: 20.5 },
      roomGradient: 'from-blue-600/85 via-indigo-700/75 to-stone-900/90',
      frameColor: '#3B82F6',
      glowColor: 'rgba(59, 130, 246, 0.7)',
      roomInteriorLabel: 'Automated QA & Testing Lab',
    },
    s4Room: {
      consultantQuestion: 'Ready to bulletproof your software with automated testing & continuous QA?',
      voiceNarration: 'Welcome to the Application Testing studio. We engineer automated test suites, security scans, and performance benchmarks for flawless releases.',
      whiteboardHeading: 'Automated QA & Performance Testing Matrix',
      whiteboardModules: ['End-to-End Cypress & Playwright Suites', 'API Load & Chaos Resilience Testing', 'CI/CD Automated Regression Gates'],
      kpiHighlight: '99.98% Crash-Free Release Rate',
    },
    detail: {
      overviewTitle: 'Application Testing & Quality Assurance Overview',
      overviewDescription:
        'We ensure your web and mobile applications operate flawlessly under enterprise workloads. From automated cross-browser suites and API stress testing to security penetration audits, our QA engineers catch regressions before your customers ever do.',
      desktopMockupHeadline: 'Continuous Automated QA Pipeline & Test Analytics',
      desktopMockupSubtext: 'Real-time regression coverage, load stress benchmarks, and accessibility compliance monitoring.',
      mobileMockupStat: '0.02% Defect Escape Rate',
      problemsSolved: [
        {
          title: 'Undetected regressions breaking critical checkout and sign-up flows',
          description: 'Automate critical user journey tests across all browsers, operating systems, and device form factors.',
        },
        {
          title: 'System slowdowns and server crashes during high-traffic spikes',
          description: 'Execute continuous load, stress, and chaos tests simulating 50,000+ concurrent real-world users.',
        },
        {
          title: 'Manual testing bottlenecks delaying fast product release cycles',
          description: 'Embed automated test runners directly into your GitHub Actions / GitLab CI/CD pipelines.',
        },
      ],
      modernTechSummary:
        'Leveraging industry-standard automated test runners, headless browser clusters, and performance profilers.',
      techStack: ['Playwright', 'Cypress', 'Jest & Vitest', 'k6 Load Testing', 'Postman API', 'SonarQube', 'Appium'],
      ratingScore: '4.9 / 5.0 QA Engineering Rating',
      previousProjects: [
        {
          title: 'FinTech Payment Gateway Hardening',
          category: 'Automated E2E QA',
          metrics: '100% Core Flow Coverage',
          description: 'Architected zero-tolerance automated test suites for high-volume PCI-compliant payment flows.',
          accentColor: '#10B981',
          theme: 'dark',
        },
        {
          title: 'E-Commerce Black Friday Load Optimization',
          category: 'Stress & Load Testing',
          metrics: 'Zero Downtime at 40k RPS',
          description: 'Simulated flash sale traffic surges, resolved connection pool bottlenecks, and optimized cache hit ratios.',
          accentColor: '#F59E0B',
          theme: 'amber',
        },
        {
          title: 'Healthcare Mobile App Compliance Audit',
          category: 'Security & Regression QA',
          metrics: 'HIPAA & WCAG 2.1 AA',
          description: 'Automated cross-device regression suites and accessibility compliance verification for 500k+ active patients.',
          accentColor: '#3B82F6',
          theme: 'light',
        },
        {
          title: 'SaaS Multi-Tenant API Contract Testing',
          category: 'Integration QA',
          metrics: '<0.01% API Regression Rate',
          description: 'Automated schema validation and integration tests across 80+ microservices.',
          accentColor: '#EC4899',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Test Architecture & Strategy',
          description: 'Map critical business pathways, risk profiles, and test automation coverage requirements.',
          iconName: 'Compass',
        },
        {
          stepNumber: '02',
          title: 'Automated Test Suite Authoring',
          description: 'Write maintainable, flake-resistant Playwright, Cypress, and unit test suites.',
          iconName: 'Code2',
        },
        {
          stepNumber: '03',
          title: 'API & Integration Testing',
          description: 'Validate microservices, third-party webhook contracts, and database transaction integrity.',
          iconName: 'Layers',
        },
        {
          stepNumber: '04',
          title: 'Load & Performance Stress',
          description: 'Run distributed k6 simulations measuring p95 latency, database saturation, and memory leaks.',
          iconName: 'Zap',
        },
        {
          stepNumber: '05',
          title: 'CI/CD Pipeline Integration',
          description: 'Enforce automated pull request validation and deployment blocker gates.',
          iconName: 'Workflow',
        },
        {
          stepNumber: '06',
          title: 'Continuous Quality Monitoring',
          description: 'Real-time crash analytics, synthetic monitoring, and monthly regression audits.',
          iconName: 'ShieldCheck',
        },
      ],
    },
  },
  {
    id: 2,
    slug: 'search-engine-optimisation',
    title: 'SEO (Search Engine Optimisation)',
    shortTitle: 'SEO',
    tagline: 'Technical SEO precision and high-authority content ecosystems that capture high-intent search demand.',
    category: 'Software Solutions',
    categorySlug: 'software-solutions',
    serviceImage: '/assets/services/seo.jpg',
    iconName: 'Search',
    hiveCell: {
      row: 0,
      col: 1,
      beeTargetX: 50,
      beeTargetY: 28,
      s2Crop: { x: 52.0, y: 21.8, w: 11.2, h: 20.5 },
      roomGradient: 'from-slate-700/85 via-slate-800/80 to-stone-950/95',
      frameColor: '#D97706',
      glowColor: 'rgba(251, 191, 36, 0.7)',
      roomInteriorLabel: 'Search Intelligence Command',
    },
    s4Room: {
      consultantQuestion: 'Shall we analyze your organic search rankings and technical SEO architecture?',
      voiceNarration: 'Welcome to our Search Engine Optimisation studio. Let us dominate page one rankings together.',
      whiteboardHeading: 'Technical SEO & Topical Authority Architecture',
      whiteboardModules: ['Core Web Vitals & Crawl Budget', 'Semantic Topic Cluster Graph', 'High-DR Digital PR Link Engine'],
      kpiHighlight: '+415% Organic Non-Brand Traffic',
    },
    detail: {
      overviewTitle: 'Search Engine Optimisation Overview',
      overviewDescription:
        'We engineer sustainable organic search dominance. From deep technical crawlability and Core Web Vitals optimization to programmatic SEO and authoritative link acquisition, we turn organic search into your highest-margin revenue channel.',
      desktopMockupHeadline: 'Organic Visibility & SERP Dominance Engine',
      desktopMockupSubtext: 'Real-time keyword share-of-voice, schema graph deployment, and revenue-tied rankings.',
      mobileMockupStat: '#1 SERP Share',
      problemsSolved: [
        {
          title: 'Invisible pages buried on page 2+ for high-intent commercial keywords',
          description: 'Semantic content engineering and authority building that wins top-3 SERP positions.',
        },
        {
          title: 'Technical crawl bottlenecks, slow Core Web Vitals, and indexation bloat',
          description: 'Surgical site architecture cleanups, edge rendering, and structured schema markup.',
        },
        {
          title: 'Traffic that reads blog posts but never converts into pipeline or sales',
          description: 'Bottom-of-funnel commercial landing pages and comparison hubs built for buyer intent.',
        },
      ],
      modernTechSummary:
        'Enterprise crawl intelligence, log-file analysis, and semantic NLP clustering for compounding organic growth.',
      techStack: ['Ahrefs Enterprise', 'Semrush', 'Screaming Frog', 'Google Search Console API', 'Cloudflare Workers', 'Schema.org JSON-LD'],
      ratingScore: '5.0 / 5.0 Organic Growth Score',
      previousProjects: [
        {
          title: 'B2B Cloud Platform Programmatic SEO',
          category: 'Technical & Programmatic SEO',
          metrics: '1.2M Monthly Organic Visits',
          description: 'Scaled 4,500 high-intent integration landing pages with 99/100 Core Web Vitals.',
          accentColor: '#3B82F6',
          theme: 'dark',
        },
        {
          title: 'Luxury E-Commerce International SEO',
          category: 'Multi-Region Search',
          metrics: '+285% Organic Revenue',
          description: 'Hreflang architecture and category page optimization across 14 global markets.',
          accentColor: '#F59E0B',
          theme: 'light',
        },
        {
          title: 'Legal & Compliance Authority Hub',
          category: 'Content & Digital PR',
          metrics: '640+ Tier-1 Backlinks',
          description: 'Data-driven industry studies earning placements in top financial publications.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'Real Estate Marketplace Migration',
          category: 'Site Migration & Recovery',
          metrics: '+94% Indexation Efficiency',
          description: 'Zero-traffic-loss Next.js migration for 2.4 million dynamic property listings.',
          accentColor: '#0F172A',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Full technical audit, log-file crawl analysis, and revenue keyword gap mapping.',
          iconName: 'Search',
        },
        {
          stepNumber: '02',
          title: 'Architecture Fix',
          description: 'Core Web Vitals acceleration, internal link sculpting, and rich schema deployment.',
          iconName: 'Code',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Topical authority pillar clusters and high-converting commercial landing pages.',
          iconName: 'FileText',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Digital PR campaigns and authoritative editorial link acquisition.',
          iconName: 'Link',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'On-page CTR testing, featured snippet capture, and conversion rate optimization.',
          iconName: 'Award',
        },
        {
          stepNumber: '06',
          title: 'Algorithm Resilience',
          description: 'Continuous SERP volatility monitoring and E-E-A-T authority fortification.',
          iconName: 'ShieldCheck',
        },
      ],
    },
  },
  {
    id: 3,
    slug: 'social-media-advertising',
    title: 'Social Media Advertising',
    shortTitle: 'Social Ads',
    tagline: 'High-converting paid social campaigns engineered with thumb-stopping creative and precision ROAS bidding.',
    category: 'Social Media Marketing',
    categorySlug: 'social-media-marketing',
    serviceImage: '/assets/services/social-media-advertising.jpg',
    iconName: 'Megaphone',
    hiveCell: {
      row: 0,
      col: 2,
      beeTargetX: 61,
      beeTargetY: 28,
      s2Crop: { x: 63.0, y: 21.8, w: 11.2, h: 20.5 },
      roomGradient: 'from-amber-800/85 via-stone-800/85 to-stone-950/95',
      frameColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.75)',
      roomInteriorLabel: 'Paid Acquisition Studio',
    },
    s4Room: {
      consultantQuestion: 'Ready to scale your ROAS with high-velocity paid social creative & targeting?',
      voiceNarration: 'Welcome to our Social Media Advertising hub. Let us turn paid impressions into profitable customers.',
      whiteboardHeading: 'Paid Social Creative Testing & ROAS Scaling',
      whiteboardModules: ['UGC & Motion Ad Hook Lab', 'Server-Side CAPI Attribution', 'Lookalike & Broad AI Bidding'],
      kpiHighlight: '5.4x Blended Paid ROAS',
    },
    detail: {
      overviewTitle: 'Social Media Advertising Overview',
      overviewDescription:
        'We combine rapid-fire creative production with algorithmic media buying across Meta, TikTok, LinkedIn, and YouTube. Using server-side conversion APIs and structured hook-testing sprints, we scale customer acquisition profitably.',
      desktopMockupHeadline: 'Multi-Platform ROAS & Creative Velocity Suite',
      desktopMockupSubtext: 'Live campaign pacing, thumb-stop ratios, and server-side conversion tracking.',
      mobileMockupStat: '5.4x Avg. ROAS',
      problemsSolved: [
        {
          title: 'Rising CPAs and creative fatigue killing campaign profitability',
          description: 'Weekly modular video and static ad testing sprints that refresh hooks before fatigue hits.',
        },
        {
          title: 'Broken iOS/cookie tracking causing blind budget decisions',
          description: 'First-party Meta CAPI, TikTok Events API, and incrementality holdout testing.',
        },
        {
          title: 'High click-through rates that bounce on generic landing pages',
          description: 'Dedicated post-click advertorials and fast-loading conversion funnels tailored to each ad angle.',
        },
      ],
      modernTechSummary:
        'Full-funnel creative analytics, server-side event pipelines, and algorithmic bid automation across every major social network.',
      techStack: ['Meta Ads Manager', 'TikTok Symphony', 'LinkedIn Campaign Manager', 'Triple Whale', 'Motion Creative Analytics', 'Google Tag Manager Server'],
      ratingScore: '4.95 / 5.0 Media Buying Score',
      previousProjects: [
        {
          title: 'D2C Wellness Brand Global Scale-Up',
          category: 'Meta & TikTok Ads',
          metrics: '6.2x Return on Ad Spend',
          description: 'Scaled monthly spend from $25k to $380k with 120+ modular UGC video variations.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'Enterprise Cybersecurity Pipeline Ads',
          category: 'LinkedIn ABM Advertising',
          metrics: '$8.4M Attributed Pipeline',
          description: 'Account-based thought-leader ads and conversation campaigns targeting Fortune 500 CISOs.',
          accentColor: '#2563EB',
          theme: 'light',
        },
        {
          title: 'Consumer FinTech App Install Blitz',
          category: 'App Acquisition Campaign',
          metrics: '480,000+ Verified Installs',
          description: 'High-tempo TikTok and YouTube Shorts motion ads reducing CPI by 52%.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'Hospitality Group Seasonal Booking Surge',
          category: 'Dynamic Catalog Retargeting',
          metrics: '+195% Direct Bookings',
          description: 'Real-time dynamic room availability feeds paired with localized video reels.',
          accentColor: '#334155',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Historical ad account forensic audit, unit economics review, and pixel verification.',
          iconName: 'Activity',
        },
        {
          stepNumber: '02',
          title: 'Creative Sprint',
          description: 'Scripting, storyboarding, and producing high-converting video hooks and static carousels.',
          iconName: 'Video',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Server-side CAPI setup, custom conversion events, and dedicated landing page alignment.',
          iconName: 'Sliders',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Structured sandbox testing of hooks, angles, audiences, and offer structures.',
          iconName: 'Target',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Horizontal and vertical budget scaling on winning creative-audience pairs.',
          iconName: 'TrendingUp',
        },
        {
          stepNumber: '06',
          title: 'Creative Refresh',
          description: 'Bi-weekly creative iteration cycles informed by thumb-stop and hold-rate analytics.',
          iconName: 'RefreshCw',
        },
      ],
    },
  },
  {
    id: 4,
    slug: 'social-media-management',
    title: 'Social Media Management',
    shortTitle: 'Social Management',
    tagline: 'Authentic community building, executive thought leadership, and viral short-form storytelling.',
    category: 'Social Media Marketing',
    categorySlug: 'social-media-marketing',
    serviceImage: '/assets/services/social-media-management.jpg',
    iconName: 'MessageSquare',
    hiveCell: {
      row: 0,
      col: 3,
      beeTargetX: 72,
      beeTargetY: 28,
      s2Crop: { x: 74.2, y: 21.8, w: 11.2, h: 20.5 },
      roomGradient: 'from-stone-600/80 via-stone-800/85 to-stone-950/95',
      frameColor: '#EAB308',
      glowColor: 'rgba(234, 179, 8, 0.7)',
      roomInteriorLabel: 'Community & Content Studio',
    },
    s4Room: {
      consultantQuestion: 'How would you like to grow your brand voice and organic social community?',
      voiceNarration: 'Welcome to our Social Media Management studio. Let us build an engaged, loyal brand community.',
      whiteboardHeading: 'Organic Social Pillars & Community Engine',
      whiteboardModules: ['Short-Form Reels/TikTok Studio', 'Executive LinkedIn Ghostwriting', '24/7 Community & DM Automation'],
      kpiHighlight: '+680% Organic Engagement Rate',
    },
    detail: {
      overviewTitle: 'Social Media Management Overview',
      overviewDescription:
        'We transform passive social profiles into vibrant brand communities. From daily short-form video production and carousel design to founder thought leadership and real-time community management, we keep your brand top-of-mind every day.',
      desktopMockupHeadline: 'Omnichannel Social Calendar & Community Pulse',
      desktopMockupSubtext: 'Unified content production, trend hijacking, and sentiment-driven community engagement.',
      mobileMockupStat: '4.2M+ Organic Reach',
      problemsSolved: [
        {
          title: 'Inconsistent posting and generic corporate graphics that get zero engagement',
          description: 'Platform-native short-form video, interactive carousels, and authentic founder storytelling.',
        },
        {
          title: 'Missed customer inquiries and slow response times in comments and DMs',
          description: 'Proactive community moderation and conversational DM flows that turn followers into leads.',
        },
        {
          title: 'Disconnect between social media vanity likes and actual business pipeline',
          description: 'Strategic social-to-newsletter and social-to-demo conversion bridges built into every content pillar.',
        },
      ],
      modernTechSummary:
        'Studio-grade short-form production workflows, social listening radars, and conversational engagement tooling.',
      techStack: ['Sprout Social', 'Adobe Premiere Pro', 'After Effects', 'ManyChat Pro', 'Brandwatch', 'Notion Editorial OS'],
      ratingScore: '4.9 / 5.0 Brand Community Score',
      previousProjects: [
        {
          title: 'AI Productivity Suite Viral Launch',
          category: 'Short-Form Video & Community',
          metrics: '18M+ Organic Views in 90 Days',
          description: 'Daily creator-led Reels, X threads, and Discord community activation.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'Venture Capital Executive Branding',
          category: 'LinkedIn & X Thought Leadership',
          metrics: '+145k Targeted Followers',
          description: 'Ghostwritten partner insights, founder podcast clips, and industry carousels.',
          accentColor: '#3B82F6',
          theme: 'light',
        },
        {
          title: 'Sustainable Fashion Lifestyle Hub',
          category: 'Instagram & Pinterest Curation',
          metrics: '8.4% Avg. Engagement Rate',
          description: 'Behind-the-scenes atelier storytelling and creator co-creation series.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'Global Beverage Brand Trend Studio',
          category: 'Always-On Social Management',
          metrics: '#1 Category Share of Voice',
          description: '24-hour culturally reactive content studio and interactive community challenges.',
          accentColor: '#1E293B',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Brand voice codification, audience persona mapping, and competitor social audit.',
          iconName: 'MessageCircle',
        },
        {
          stepNumber: '02',
          title: 'Content Pillars',
          description: 'Establishing educational, entertaining, and conversion-focused content franchises.',
          iconName: 'Grid',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Monthly batch filming, motion editing, copywriting, and visual carousel design.',
          iconName: 'Camera',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Peak-hour cross-platform publishing and automated DM lead-capture workflows.',
          iconName: 'Calendar',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Daily comment community building, influencer warm-ups, and trend participation.',
          iconName: 'Heart',
        },
        {
          stepNumber: '06',
          title: 'Analytics & Growth',
          description: 'Monthly retention, share-rate, and dark-social attribution reporting.',
          iconName: 'BarChart2',
        },
      ],
    },
  },
  {
    id: 5,
    slug: 'generative-engine-optimisation',
    title: 'GEO (Generative Engine Optimisation)',
    shortTitle: 'GEO & AI Search',
    tagline: 'Position your brand as the primary cited answer inside ChatGPT, Gemini, Perplexity, and Google AI Overviews.',
    category: 'Software Solutions',
    categorySlug: 'software-solutions',
    serviceImage: '/assets/services/geo.jpg',
    iconName: 'Cog',
    hiveCell: {
      row: 1,
      col: 0,
      beeTargetX: 39,
      beeTargetY: 50,
      s2Crop: { x: 46.5, y: 40.5, w: 11.2, h: 20.5 },
      roomGradient: 'from-stone-700/85 via-amber-950/85 to-stone-950/95',
      frameColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      roomInteriorLabel: 'GEO & LLM Citation Lab',
    },
    s4Room: {
      consultantQuestion: 'Want your brand recommended first by ChatGPT, Gemini, and Perplexity?',
      voiceNarration: 'Welcome to Generative Engine Optimisation. Let us make AI models cite and recommend your brand.',
      whiteboardHeading: 'LLM Citation & AI Overview Share-of-Voice',
      whiteboardModules: ['Entity Knowledge Graph Seeding', 'LLM-Readable `/llms.txt` & Schema', 'Citation Co-Occurrence Authority'],
      kpiHighlight: 'Top-3 AI Answer Inclusion',
    },
    detail: {
      overviewTitle: 'Generative Engine Optimisation Overview',
      overviewDescription:
        'As buyers shift from traditional blue links to AI answer engines like ChatGPT, Google Gemini, Claude, and Perplexity, we engineer your brand’s digital footprint so Large Language Models consistently cite, trust, and recommend your solutions first.',
      desktopMockupHeadline: 'AI Answer Engine Citation & Entity Monitor',
      desktopMockupSubtext: 'Tracking brand recommendation share across ChatGPT Search, Perplexity, and Google AI Overviews.',
      mobileMockupStat: '78% AI Citation Share',
      problemsSolved: [
        {
          title: 'AI chatbots recommending your competitors when prospects ask for best-in-class providers',
          description: 'Entity optimization and high-authority third-party consensus seeding that shapes LLM weights and RAG retrieval.',
        },
        {
          title: 'Unstructured website content that AI retrieval crawlers fail to parse accurately',
          description: 'Semantic fact-blocks, structured comparison tables, `/llms.txt` endpoints, and deep JSON-LD entity graphs.',
        },
        {
          title: 'Zero visibility into how often AI engines mention or hallucinate about your brand',
          description: 'Automated multi-LLM prompt tracking across 500+ buyer-intent conversational queries.',
        },
      ],
      modernTechSummary:
        'Purpose-built LLM citation tracking, RAG retrieval optimization, and Knowledge Graph entity engineering.',
      techStack: ['OpenAI Search Audit', 'Perplexity Citation Tracker', 'Google Knowledge Graph API', 'JSON-LD Entity Schema', 'llms.txt Standard', 'Python NLP Vector Analysis'],
      ratingScore: '5.0 / 5.0 Next-Gen Search Score',
      previousProjects: [
        {
          title: 'Enterprise CRM AI Recommendation Takeover',
          category: 'LLM Citation Engineering',
          metrics: '#1 Cited in ChatGPT & Perplexity',
          description: 'Increased brand recommendation share from 14% to 79% across 300 commercial software prompts.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'Global FinTech Google AI Overviews Capture',
          category: 'AI Overview Optimization',
          metrics: '+340% Zero-Click Brand Recall',
          description: 'Restructured 800 financial guides into direct-answer semantic blocks with verified citations.',
          accentColor: '#3B82F6',
          theme: 'light',
        },
        {
          title: 'Healthcare Platform Entity Verification',
          category: 'Knowledge Graph & Trust',
          metrics: '99.4% LLM Factual Accuracy',
          description: 'Eliminated model hallucinations and anchored authoritative medical board citations.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'Developer DevTools `/llms.txt` Architecture',
          category: 'AI Crawler Readiness',
          metrics: '4.1x AI Referral Conversions',
          description: 'Implemented machine-optimized documentation feeds for coding assistants and search agents.',
          accentColor: '#0F172A',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Benchmarking your brand’s current visibility across ChatGPT, Gemini, Claude, and Perplexity.',
          iconName: 'Cpu',
        },
        {
          stepNumber: '02',
          title: 'Entity Architecture',
          description: 'Building explicit Knowledge Graph connections, Wikidata/Schema entities, and `/llms.txt`.',
          iconName: 'Network',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Authoring high-information-density comparison matrices, statistics hubs, and direct-answer blocks.',
          iconName: 'FileCheck',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Seeding authoritative mentions across high-trust domains that RAG engines prioritize.',
          iconName: 'Globe',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Continuous prompt testing and retrieval optimization across newly released foundation models.',
          iconName: 'Sparkles',
        },
        {
          stepNumber: '06',
          title: 'AI Attribution',
          description: 'Tracking AI-referred traffic, conversational brand lift, and assisted pipeline revenue.',
          iconName: 'BarChart',
        },
      ],
    },
  },
  {
    id: 6,
    slug: 'content-marketing',
    title: 'Content Marketing',
    shortTitle: 'Content Marketing',
    tagline: 'Editorial-grade storytelling, research reports, and multi-format content engines that educate and convert.',
    category: 'Social Media Marketing',
    categorySlug: 'social-media-marketing',
    serviceImage: '/assets/services/content-marketing.jpg',
    iconName: 'FileCheck',
    hiveCell: {
      row: 1,
      col: 1,
      beeTargetX: 50,
      beeTargetY: 50,
      s2Crop: { x: 57.5, y: 40.5, w: 11.2, h: 20.5 },
      roomGradient: 'from-amber-400/90 via-amber-500/85 to-amber-700/90',
      frameColor: '#FBBF24',
      glowColor: 'rgba(251, 191, 36, 0.9)',
      roomInteriorLabel: 'Golden Editorial Core',
    },
    s4Room: {
      consultantQuestion: 'Shall we craft a high-converting Content Marketing engine that builds lasting authority?',
      voiceNarration: 'Welcome to our Content Marketing flagship room. Let us craft stories and assets that convert.',
      whiteboardHeading: 'Full-Funnel Editorial & Demand Generation Engine',
      whiteboardModules: ['Original Industry Research Reports', 'Interactive Calculators & Playbooks', 'Multi-Channel Repurposing Flywheel'],
      kpiHighlight: '4.7x Content-Attributed Pipeline',
    },
    detail: {
      overviewTitle: 'Content Marketing Overview',
      overviewDescription:
        'We build authoritative media engines inside your company. By combining subject-matter expert interviews, original data journalism, interactive tools, and video essays, we create flagship assets that attract buyers and shorten enterprise sales cycles.',
      desktopMockupHeadline: 'Flagship Editorial Hub & Lead Magnet Studio',
      desktopMockupSubtext: 'High-retention thought leadership, gated benchmarks, and automated nurture sequences.',
      mobileMockupStat: '68% Reader-to-Lead',
      problemsSolved: [
        {
          title: 'Commoditized AI-slop blog posts that erode brand trust and bore decision-makers',
          description: 'SME-led deep dives, proprietary benchmark reports, and contrarian executive insights.',
        },
        {
          title: 'Sales teams lacking persuasive collateral to overcome mid-funnel objections',
          description: 'Case study films, interactive ROI calculators, and competitor battlecards that close deals faster.',
        },
        {
          title: 'One-and-done assets that get published once and forgotten',
          description: 'A structured 1-to-20 distribution flywheel turning every flagship study into newsletters, videos, and slides.',
        },
      ],
      modernTechSummary:
        'Data-backed editorial calendars, interactive web storytelling, and full-funnel CRM content attribution.',
      techStack: ['HubSpot Content Hub', 'Webflow / Headless CMS', 'Figma Interactive', 'Descript Studio', 'Ahrefs Content Explorer', 'Clearscope'],
      ratingScore: '4.95 / 5.0 Editorial Quality Score',
      previousProjects: [
        {
          title: 'State of Cloud Security Annual Report',
          category: 'Original Research & Lead Gen',
          metrics: '14,500+ Enterprise Downloads',
          description: 'Surveyed 1,200 CTOs to produce an interactive microsite generating $6.8M in pipeline.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'FinOps Interactive Savings Calculator',
          category: 'Interactive Content Asset',
          metrics: '34% Visitor-to-Demo Rate',
          description: 'Custom web calculator paired with personalized PDF executive briefings.',
          accentColor: '#2563EB',
          theme: 'light',
        },
        {
          title: 'Supply Chain Documentary Video Series',
          category: 'Video & Editorial Storytelling',
          metrics: '920k Executive Views',
          description: 'Three-part customer transformation mini-docs distributed across web, events, and LinkedIn.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'HR Tech Weekly Newsletter Flywheel',
          category: 'Owned Media Ecosystem',
          metrics: '52,000 Active Subscribers',
          description: 'Built an industry-leading weekly briefing with a 49% open rate and direct sponsor ROI.',
          accentColor: '#334155',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Buyer journey content gap analysis and subject-matter expert extraction interviews.',
          iconName: 'BookOpen',
        },
        {
          stepNumber: '02',
          title: 'Editorial Strategy',
          description: 'Mapping flagship research themes, SEO topic clusters, and sales enablement assets.',
          iconName: 'Compass',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Writing, designing, and illustrating long-form guides, whitepapers, and interactive tools.',
          iconName: 'PenTool',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Atomizing flagship content into video shorts, email nurture sequences, and social decks.',
          iconName: 'Share2',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Multi-channel syndication, newsletter partnerships, and sales team activation.',
          iconName: 'Send',
        },
        {
          stepNumber: '06',
          title: 'Revenue Attribution',
          description: 'First-touch and multi-touch pipeline tracking per content asset.',
          iconName: 'TrendingUp',
        },
      ],
    },
  },
  {
    id: 7,
    slug: 'digital-analytics',
    title: 'Digital Analytics',
    shortTitle: 'Digital Analytics',
    tagline: 'End-to-end data warehousing, multi-touch attribution, and live executive BI dashboards.',
    category: 'Digital Strategy Ideas',
    categorySlug: 'digital-strategy-ideas',
    serviceImage: '/assets/services/digital-analytics.jpg',
    iconName: 'TrendingUp',
    hiveCell: {
      row: 1,
      col: 2,
      beeTargetX: 61,
      beeTargetY: 50,
      s2Crop: { x: 68.6, y: 40.5, w: 11.2, h: 20.5 },
      roomGradient: 'from-stone-700/85 via-stone-800/85 to-stone-950/95',
      frameColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.75)',
      roomInteriorLabel: 'BI & Attribution Observatory',
    },
    s4Room: {
      consultantQuestion: 'Need crystal-clear multi-touch attribution and real-time KPI dashboards?',
      voiceNarration: 'Welcome to our Digital Analytics room. Let us turn raw data into confident revenue decisions.',
      whiteboardHeading: 'Unified Data Warehouse & Attribution Architecture',
      whiteboardModules: ['Server-Side Event Tracking', 'BigQuery & dbt Revenue Modeling', 'Real-Time Executive Looker Dashboards'],
      kpiHighlight: '100% Data Pipeline Accuracy',
    },
    detail: {
      overviewTitle: 'Digital Analytics Overview',
      overviewDescription:
        'We eliminate data silos and conflicting reports. Our analytics engineers build clean server-side tracking, unify ad spend with CRM closed-won revenue in modern cloud warehouses, and deliver real-time visual dashboards your leadership team can trust.',
      desktopMockupHeadline: 'Real-Time Revenue Attribution & Cohort Command',
      desktopMockupSubtext: 'Connecting every impression, click, and product event directly to LTV and net margin.',
      mobileMockupStat: '99.9% Tracking Integrity',
      problemsSolved: [
        {
          title: 'Ad platforms, GA4, and your CRM all reporting completely different conversion numbers',
          description: 'Single-source-of-truth data modeling reconciling platform claims with actual bank revenue.',
        },
        {
          title: 'Loss of visibility from ad blockers, Safari ITP, and third-party cookie deprecation',
          description: 'First-party server-side tagging and privacy-compliant identity resolution.',
        },
        {
          title: 'Hours wasted every Monday stitching together manual CSV spreadsheets',
          description: 'Automated real-time executive and channel dashboards with anomaly alerts.',
        },
      ],
      modernTechSummary:
        'Modern data stack engineering combining server-side telemetry, warehouse SQL modeling, and predictive LTV analytics.',
      techStack: ['Google Analytics 4', 'BigQuery', 'dbt Cloud', 'Looker Studio / PowerBI', 'Segment / RudderStack', 'Server-Side GTM'],
      ratingScore: '5.0 / 5.0 Data Engineering Score',
      previousProjects: [
        {
          title: 'Multi-Brand E-Commerce Attribution Hub',
          category: 'Data Warehouse & BI',
          metrics: '$4.2M Saved in Wasted Spend',
          description: 'Unified 12 ad channels with Shopify and ERP margin data in BigQuery.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'SaaS Product-Led Growth Telemetry',
          category: 'Product & Funnel Analytics',
          metrics: '+38% Free-to-Paid Activation',
          description: 'Instrumented behavioral cohort tracking identifying the exact activation "aha moment".',
          accentColor: '#3B82F6',
          theme: 'light',
        },
        {
          title: 'Global Banking Server-Side Privacy Stack',
          category: 'First-Party Tagging',
          metrics: '+41% Recovered Conversion Signal',
          description: 'HIPAA/GDPR-compliant server-side event pipeline with zero PII leakage.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'Media Subscription Churn Predictor',
          category: 'Predictive Analytics',
          metrics: '24% Reduction in 90-Day Churn',
          description: 'Automated propensity scoring synced directly to lifecycle retention campaigns.',
          accentColor: '#1E293B',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Tracking audit, taxonomy definition, and business KPI measurement plan.',
          iconName: 'Database',
        },
        {
          stepNumber: '02',
          title: 'Instrumentation',
          description: 'Deploying clean dataLayer schemas and first-party server-side tag containers.',
          iconName: 'Code',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'ETL pipeline setup piping ad platforms, CRM, and billing into BigQuery/Snowflake.',
          iconName: 'Server',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Multi-touch attribution modeling and cohort LTV SQL transformation.',
          iconName: 'GitBranch',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Interactive executive & practitioner dashboards with automated Slack/email digests.',
          iconName: 'PieChart',
        },
        {
          stepNumber: '06',
          title: 'Optimization Loops',
          description: 'Feeding high-LTV conversion signals back into ad algorithms for smarter bidding.',
          iconName: 'Repeat',
        },
      ],
    },
  },
  {
    id: 8,
    slug: 'artificial-intelligence-optimization',
    title: 'AIO (Artificial Intelligence Optimization)',
    shortTitle: 'AI Optimization',
    tagline: 'Custom AI agents, RAG knowledge workflows, and intelligent automation that multiply team output.',
    category: 'Software Solutions',
    categorySlug: 'software-solutions',
    serviceImage: '/assets/services/aio.jpg',
    iconName: 'Cpu',
    hiveCell: {
      row: 1,
      col: 3,
      beeTargetX: 72,
      beeTargetY: 50,
      s2Crop: { x: 80.0, y: 40.5, w: 11.2, h: 20.5 },
      roomGradient: 'from-amber-500/85 via-amber-600/80 to-stone-900/90',
      frameColor: '#FBBF24',
      glowColor: 'rgba(251, 191, 36, 0.85)',
      roomInteriorLabel: 'AI Systems & Agent Foundry',
    },
    s4Room: {
      consultantQuestion: 'How can we automate your workflows and customer experience with custom AI systems?',
      voiceNarration: 'Welcome to Artificial Intelligence Optimization. Let us engineer autonomous workflows for your business.',
      whiteboardHeading: 'Enterprise AI Agents & Workflow Automation',
      whiteboardModules: ['Custom RAG Knowledge Assistants', 'Autonomous Lead Qualification Agents', 'Internal Operations AI Pipelines'],
      kpiHighlight: '65% Faster Operational Throughput',
    },
    detail: {
      overviewTitle: 'Artificial Intelligence Optimization Overview',
      overviewDescription:
        'We move beyond generic AI wrappers to build production-grade autonomous agents, private RAG knowledge systems, and intelligent marketing/operations workflows. We integrate Gemini, OpenAI, and Anthropic models securely into your existing software stack.',
      desktopMockupHeadline: 'Autonomous AI Agent Orchestration & Evaluation Hub',
      desktopMockupSubtext: 'Real-time agent tool-calling, vector retrieval accuracy, and human-in-the-loop guardrails.',
      mobileMockupStat: '14,000+ Hrs Saved/Yr',
      problemsSolved: [
        {
          title: 'Teams bogged down by repetitive manual research, support triage, and data entry',
          description: 'Multi-step AI workflow pipelines that execute complex operational tasks in seconds.',
        },
        {
          title: 'Generic chatbots that frustrate customers with scripted or inaccurate answers',
          description: 'Context-aware RAG agents grounded strictly in your live documentation, inventory, and policies.',
        },
        {
          title: 'Security and compliance concerns preventing enterprise AI adoption',
          description: 'Zero-data-retention API architectures, strict RBAC permissions, and automated eval guardrails.',
        },
      ],
      modernTechSummary:
        'Enterprise LLM orchestration, hybrid vector search, deterministic guardrails, and continuous evaluation pipelines.',
      techStack: ['Google Gemini API', 'OpenAI SDK', 'Vercel AI SDK', 'Pinecone / pgvector', 'LangGraph', 'n8n / Custom TypeScript Agents'],
      ratingScore: '5.0 / 5.0 AI Engineering Score',
      previousProjects: [
        {
          title: 'Enterprise Legal & Compliance RAG Copilot',
          category: 'Private Knowledge AI',
          metrics: '82% Faster Contract Review',
          description: 'Indexed 250,000 internal policy documents with citation-backed clause verification.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'Autonomous Inbound SDR & Booking Agent',
          category: 'Sales AI Automation',
          metrics: '3.4x Speed-to-Lead Conversion',
          description: 'Researches inbound leads in real time, personalizes outreach, and books calendar demos 24/7.',
          accentColor: '#2563EB',
          theme: 'light',
        },
        {
          title: 'E-Commerce Visual Search & Stylist Concierge',
          category: 'Multimodal AI Experience',
          metrics: '+46% Average Order Value',
          description: 'Multimodal conversational shopping assistant recommending complete outfit bundles.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'Logistics Exception Handling Swarm',
          category: 'Operations Automation',
          metrics: '91% Automated Resolution',
          description: 'AI agents monitoring shipment delays and proactively rerouting inventory with carriers.',
          accentColor: '#0F172A',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'AI opportunity mapping, ROI workflow scoring, and data security assessment.',
          iconName: 'Cpu',
        },
        {
          stepNumber: '02',
          title: 'Knowledge Architecture',
          description: 'Data cleaning, chunking strategies, and hybrid vector/keyword index construction.',
          iconName: 'Database',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Building custom tool-calling agents, prompt pipelines, and UI interfaces.',
          iconName: 'Terminal',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Integrating agents with CRM, ERP, Slack, and internal APIs via secure webhooks.',
          iconName: 'Plug',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Automated red-teaming, hallucination benchmarking, and latency optimization.',
          iconName: 'Shield',
        },
        {
          stepNumber: '06',
          title: 'Team Enablement',
          description: 'Staff training, observability monitoring, and continuous model fine-tuning.',
          iconName: 'Sparkles',
        },
      ],
    },
  },
  {
    id: 9,
    slug: 'web-development',
    title: 'Web Development',
    shortTitle: 'Web Development',
    tagline: 'Blazing-fast, interactive 3D and full-stack web applications engineered for conversion and scale.',
    category: 'Software Solutions',
    categorySlug: 'software-solutions',
    serviceImage: '/assets/services/web-development.jpg',
    iconName: 'Monitor',
    hiveCell: {
      row: 2,
      col: 0,
      beeTargetX: 39,
      beeTargetY: 72,
      s2Crop: { x: 41.2, y: 59.5, w: 11.2, h: 20.5 },
      roomGradient: 'from-amber-600/85 via-amber-800/80 to-stone-950/95',
      frameColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      roomInteriorLabel: 'Full-Stack Web Engineering Studio',
    },
    s4Room: {
      consultantQuestion: 'Discuss about the requirements of the Web Development platform you want to build?',
      voiceNarration: 'Welcome to our Web Development studio. Let us engineer a blazing-fast, high-converting web experience.',
      whiteboardHeading: 'Modern Full-Stack & Interactive Web Architecture',
      whiteboardModules: ['Next.js / React Edge Architecture', 'Interactive 3D WebGL & GSAP Motion', 'Headless CMS & Scalable API Layer'],
      kpiHighlight: '99/100 Lighthouse Performance',
    },
    detail: {
      overviewTitle: 'Web Development Overview',
      overviewDescription:
        'We engineer flagship marketing websites, interactive 3D digital experiences, and enterprise full-stack web applications. Combining sub-second edge performance, pixel-perfect UI craftsmanship, and rock-solid cloud architecture, we build websites that feel alive and convert effortlessly.',
      desktopMockupHeadline: 'High-Performance Web Architecture & Interactive UI',
      desktopMockupSubtext: 'Sub-second global edge delivery, fluid 60fps animations, and modular headless CMS control.',
      mobileMockupStat: '99/100 CWV Score',
      problemsSolved: [
        {
          title: 'Slow, outdated websites that fail to reflect your product quality and lose enterprise trust',
          description: 'Bespoke interactive design systems with 60fps motion and instant page transitions.',
        },
        {
          title: 'Rigid legacy CMS templates that require developer tickets for every minor copy change',
          description: 'Modular headless visual editing empowering marketing teams to launch pages in minutes.',
        },
        {
          title: 'Fragile backends that crash during high-traffic product launches or viral spikes',
          description: 'Auto-scaling edge functions, distributed caching, and zero-downtime CI/CD pipelines.',
        },
      ],
      modernTechSummary:
        'Cloud-native frontend and full-stack architecture built for speed, accessibility, and developer velocity.',
      techStack: ['React 19 / Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP & Three.js', 'Supabase / PostgreSQL', 'Vercel Edge Network'],
      ratingScore: '5.0 / 5.0 Web Engineering Score',
      previousProjects: [
        {
          title: 'Interactive 3D SaaS Product Showcase',
          category: 'Interactive Web & WebGL',
          metrics: '+165% Demo Conversion Rate',
          description: 'Built an interactive 3D product explorer with sub-second load times and global CDN caching.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'Global FinTech Multi-Currency Portal',
          category: 'Full-Stack Web Application',
          metrics: '$1.8B Annual Volume Processed',
          description: 'Real-time treasury dashboard with SOC2-compliant authentication and live WebSocket feeds.',
          accentColor: '#2563EB',
          theme: 'light',
        },
        {
          title: 'Headless Luxury Commerce Flagship',
          category: 'Headless E-Commerce',
          metrics: '0.6s Avg. Page Load Time',
          description: 'Custom Next.js storefront integrated with Shopify Storefront API and Sanity CMS.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'AI Developer Documentation & Playground',
          category: 'Developer Experience Portal',
          metrics: '400k+ Monthly Active Devs',
          description: 'Interactive in-browser API sandbox with live code execution and instant search.',
          accentColor: '#0F172A',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Technical discovery, system architecture blueprint, and UX wireframe prototyping.',
          iconName: 'Layout',
        },
        {
          stepNumber: '02',
          title: 'Design System',
          description: 'Component library tokenization, responsive breakpoints, and interactive motion specs.',
          iconName: 'Figma',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Clean TypeScript frontend and API engineering with weekly staging preview deployments.',
          iconName: 'Code2',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Headless CMS integration, CRM webhooks, auth flows, and third-party API orchestration.',
          iconName: 'Layers',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Automated E2E testing, WCAG 2.2 accessibility auditing, and Core Web Vitals tuning.',
          iconName: 'CheckCircle2',
        },
        {
          stepNumber: '06',
          title: 'Launch & Scale',
          description: 'Zero-downtime global edge deployment, security hardening, and ongoing SLA support.',
          iconName: 'Rocket',
        },
      ],
    },
  },
  {
    id: 10,
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    tagline: 'Native-grade iOS and Android applications crafted with fluid gestures, offline sync, and biometric security.',
    category: 'Software Solutions',
    categorySlug: 'software-solutions',
    serviceImage: '/assets/services/mobile-app-development.jpg',
    iconName: 'Smartphone',
    hiveCell: {
      row: 2,
      col: 1,
      beeTargetX: 50,
      beeTargetY: 72,
      s2Crop: { x: 52.0, y: 59.5, w: 11.2, h: 20.5 },
      roomGradient: 'from-slate-800/90 via-stone-900/90 to-stone-950/95',
      frameColor: '#D97706',
      glowColor: 'rgba(245, 158, 11, 0.75)',
      roomInteriorLabel: 'iOS & Android Mobile Lab',
    },
    s4Room: {
      consultantQuestion: 'Ready to design and build a 5-star iOS & Android mobile app experience?',
      voiceNarration: 'Welcome to our Mobile App Development room. Let us craft a seamless iOS and Android experience.',
      whiteboardHeading: 'Cross-Platform & Native Mobile Architecture',
      whiteboardModules: ['120fps Fluid Gesture UI', 'Offline-First Local Sync Engine', 'Biometric Auth & Apple/Google Pay'],
      kpiHighlight: '4.9★ Avg. App Store Rating',
    },
    detail: {
      overviewTitle: 'Mobile App Development Overview',
      overviewDescription:
        'We design and engineer flagship iOS and Android applications that users love opening every day. Whether building with Flutter, React Native, or native Swift/Kotlin, we obsess over 120Hz animations, instant offline responsiveness, and rock-solid backend synchronization.',
      desktopMockupHeadline: 'Native-Grade iOS & Android App Ecosystem',
      desktopMockupSubtext: 'Unified cross-platform codebase, real-time push orchestration, and biometric security.',
      mobileMockupStat: '99.95% Crash-Free',
      problemsSolved: [
        {
          title: 'Clunky, sluggish mobile apps with high uninstall rates and poor App Store reviews',
          description: '60/120fps native gesture physics, haptic feedback, and intuitive thumb-zone navigation.',
        },
        {
          title: 'Double engineering cost and feature drift between separate iOS and Android teams',
          description: 'Unified Flutter or React Native architecture sharing 95% of code with native platform bridges.',
        },
        {
          title: 'Apps that break completely when users enter elevators, subways, or low-signal areas',
          description: 'Offline-first SQLite/Realm local persistence with automatic conflict-free cloud sync.',
        },
      ],
      modernTechSummary:
        'Modern mobile engineering with automated CI/CD TestFlight/Play Console pipelines and real-time telemetry.',
      techStack: ['Flutter / Dart', 'React Native / Expo', 'Swift & Kotlin', 'Firebase / Supabase', 'Stripe Apple/Google Pay', 'Codemagic CI/CD'],
      ratingScore: '4.92 / 5.0 App Store Delivery Score',
      previousProjects: [
        {
          title: 'NeoBank Personal Finance Super-App',
          category: 'FinTech iOS & Android',
          metrics: '1.4M+ Active Monthly Users',
          description: 'Biometric instant transfers, real-time card controls, and AI spending insights with 4.9★ rating.',
          accentColor: '#3B82F6',
          theme: 'dark',
        },
        {
          title: 'On-Demand Telehealth & Rx Delivery',
          category: 'HealthTech Mobile App',
          metrics: '45,000+ Video Consults/Mo',
          description: 'Encrypted WebRTC doctor video calls, Apple HealthKit sync, and live courier tracking.',
          accentColor: '#10B981',
          theme: 'light',
        },
        {
          title: 'Smart EV Charging & Fleet Companion',
          category: 'IoT & Connected Mobility',
          metrics: '99.98% Session Reliability',
          description: 'Bluetooth Low Energy hardware pairing, live route planning, and one-tap tap-to-charge.',
          accentColor: '#F59E0B',
          theme: 'amber',
        },
        {
          title: 'Fitness & Habit Coaching Community',
          category: 'Consumer Subscription App',
          metrics: '+72% Day-30 Retention',
          description: 'Apple Watch companion app, offline workout video caching, and live leaderboards.',
          accentColor: '#1E293B',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Product requirements, user journey storyboarding, and interactive mobile prototyping.',
          iconName: 'Smartphone',
        },
        {
          stepNumber: '02',
          title: 'Mobile Architecture',
          description: 'Selecting optimal native/cross-platform stack, offline schema, and API contracts.',
          iconName: 'Layers',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Iterative sprint builds delivered weekly via TestFlight and Google Play Internal Track.',
          iconName: 'Code',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Push notification orchestration, deep linking, in-app purchases, and analytics SDKs.',
          iconName: 'Bell',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Device farm automated testing across 40+ iOS and Android screen sizes and OS versions.',
          iconName: 'ShieldCheck',
        },
        {
          stepNumber: '06',
          title: 'App Store Launch',
          description: 'App Store Optimization (ASO), review compliance approval, and post-launch telemetry.',
          iconName: 'Award',
        },
      ],
    },
  },
  {
    id: 11,
    slug: 'brand-management',
    title: 'Brand Management',
    shortTitle: 'Brand Handling',
    tagline: 'End-to-end brand stewardship, reputation management, visual identity systems, and market positioning.',
    category: 'Digital Strategy Ideas',
    categorySlug: 'digital-strategy-ideas',
    serviceImage: '/assets/services/brand-management.jpg',
    iconName: 'Tag',
    hiveCell: {
      row: 2,
      col: 2,
      beeTargetX: 61,
      beeTargetY: 72,
      s2Crop: { x: 63.0, y: 59.5, w: 11.2, h: 20.5 },
      roomGradient: 'from-amber-900/85 via-stone-800/85 to-stone-950/95',
      frameColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.75)',
      roomInteriorLabel: 'Brand Equity & Identity Suite',
    },
    s4Room: {
      consultantQuestion: 'How can we elevate and protect your complete Brand Identity across every channel?',
      voiceNarration: 'Welcome to our Brand Handling room. Let us craft an unmistakable, high-trust brand presence.',
      whiteboardHeading: '360° Brand Architecture & Reputation Stewardship',
      whiteboardModules: ['Visual & Verbal Design System', 'Brand Sentiment & PR Protection', 'Omnichannel Brand Governance'],
      kpiHighlight: '+88% Brand Recall & Trust',
    },
    detail: {
      overviewTitle: 'Brand Handling Overview',
      overviewDescription:
        'Your brand is your most valuable compounding asset. We provide comprehensive brand stewardship—from strategic positioning, messaging frameworks, and complete visual design systems to ongoing reputation management and multi-market campaign consistency.',
      desktopMockupHeadline: 'Complete Brand Governance & Identity Design System',
      desktopMockupSubtext: 'Unified typography, color systems, sonic/motion guidelines, and reputation monitoring.',
      mobileMockupStat: '94% Positive Sentiment',
      problemsSolved: [
        {
          title: 'Fragmented brand appearance across sales decks, web pages, and regional teams',
          description: 'Living digital brand portals with ready-to-use templates, component kits, and clear tone rules.',
        },
        {
          title: 'Outdated corporate identity failing to command premium pricing or attract top talent',
          description: 'Modernized brand evolution that honors heritage while signaling category leadership.',
        },
        {
          title: 'Unmonitored online reviews and search sentiment hurting enterprise deal velocity',
          description: 'Proactive SERP reputation management, executive PR positioning, and review amplification.',
        },
      ],
      modernTechSummary:
        'Living design system platforms, real-time brand sentiment listening, and multi-channel asset governance.',
      techStack: ['Figma Design Systems', 'Frontify / Zeroheight', 'Brand24 / Meltwater', 'Adobe Creative Cloud', 'LottieFiles Motion', 'Trustpilot / G2 Engine'],
      ratingScore: '4.96 / 5.0 Brand Stewardship Score',
      previousProjects: [
        {
          title: 'Unicorn AI Infrastructure Rebrand',
          category: 'Global Rebrand & Positioning',
          metrics: '$120M Series-C Announced',
          description: 'Complete verbal and visual identity overhaul ahead of global flagship conference.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'Heritage Financial Group Modernization',
          category: 'Brand Architecture',
          metrics: '+64% Millennial/Gen-Z Adoption',
          description: 'Consolidated 7 acquired sub-brands into one cohesive master brand architecture.',
          accentColor: '#2563EB',
          theme: 'light',
        },
        {
          title: 'Global Hospitality Reputation Turnaround',
          category: 'Brand Protection & PR',
          metrics: '4.8★ Across 180 Locations',
          description: 'Automated guest sentiment feedback loops and owned page-one brand SERP assets.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'CleanTech Enterprise Design System',
          category: 'Brand Guidelines & Motion',
          metrics: '3x Faster Campaign Production',
          description: 'Interactive web brand book with 3D asset library and motion graphics toolkit.',
          accentColor: '#334155',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Brand equity audit, stakeholder workshops, and competitive perceptual mapping.',
          iconName: 'Compass',
        },
        {
          stepNumber: '02',
          title: 'Brand Strategy',
          description: 'Defining core purpose, category narrative, messaging matrix, and brand archetype.',
          iconName: 'Target',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Crafting visual identity, typography, color palettes, 3D motifs, and motion language.',
          iconName: 'Palette',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Building the digital Brand Portal, pitch deck templates, and social asset kits.',
          iconName: 'BookOpen',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Internal employee brand rollout, PR launch coordination, and touchpoint migration.',
          iconName: 'Megaphone',
        },
        {
          stepNumber: '06',
          title: 'Brand Guardianship',
          description: 'Ongoing sentiment monitoring, creative direction, and quarterly brand health tracking.',
          iconName: 'Shield',
        },
      ],
    },
  },
  {
    id: 12,
    slug: 'unique-logo-design',
    title: 'Unique Logo Design',
    shortTitle: 'Logo Designing',
    tagline: 'Timeless geometric marks, custom wordmarks, and animated 3D brand emblems crafted for instant recognition.',
    category: 'Digital Strategy Ideas',
    categorySlug: 'digital-strategy-ideas',
    serviceImage: '/assets/services/unique-logo-design.jpg',
    iconName: 'PenTool',
    hiveCell: {
      row: 2,
      col: 3,
      beeTargetX: 72,
      beeTargetY: 72,
      s2Crop: { x: 74.2, y: 59.5, w: 11.2, h: 20.5 },
      roomGradient: 'from-cyan-900/80 via-slate-800/85 to-stone-950/95',
      frameColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.8)',
      roomInteriorLabel: 'Vector & Emblem Craft Studio',
    },
    s4Room: {
      consultantQuestion: 'Discuss about the requirements of the Unique Logo Design you want?',
      voiceNarration: 'Welcome to our Unique Logo Designing studio. Let us craft an iconic emblem your audience will never forget.',
      whiteboardHeading: 'Golden-Ratio Vector Mark & Custom Typography',
      whiteboardModules: ['Golden-Ratio Geometric Grid', 'Bespoke Wordmark Lettering', 'Animated 3D & App Icon Variants'],
      kpiHighlight: '100% Original Trademark-Ready Marks',
    },
    detail: {
      overviewTitle: 'Unique Logo Designing Overview',
      overviewDescription:
        'A great logo works effortlessly at 16 pixels on a browser tab and 60 feet wide on a stadium billboard. Our identity designers combine golden-ratio geometry, bespoke typographic craft, and motion design to create distinctive, trademark-ready brand marks.',
      desktopMockupHeadline: 'Precision Vector Craft & Responsive Logo System',
      desktopMockupSubtext: 'Golden-ratio construction grids, dark/light optical balance, and animated Lottie reveal marks.',
      mobileMockupStat: '100% Bespoke Vector',
      problemsSolved: [
        {
          title: 'Generic clip-art or template logos that blend in with competitors and fail trademark checks',
          description: '100% hand-sketched and mathematically gridded original marks built for global trademark registration.',
        },
        {
          title: 'Complex logos that become illegible at small sizes on mobile app icons, favicons, or embroidery',
          description: 'Responsive logo suites featuring primary lockups, horizontal wordmarks, and simplified micro-monograms.',
        },
        {
          title: 'Flat static logos that feel lifeless in video intros, web loaders, and digital product UI',
          description: 'Custom 3D glass/metallic renders and smooth Lottie SVG signature animations included with every delivery.',
        },
      ],
      modernTechSummary:
        'Mathematical bezier precision, custom font engineering, and 3D/motion emblem rendering.',
      techStack: ['Adobe Illustrator', 'Glyphs 3 Font Editor', 'Blender 3D / Cinema 4D', 'After Effects & Lottie', 'Figma Vector Networks', 'Pantone Color System'],
      ratingScore: '5.0 / 5.0 Identity Craft Score',
      previousProjects: [
        {
          title: 'Bwise Hive Emblem & Typographic Mark',
          category: 'Mascot & Geometric Wordmark',
          metrics: 'Instant Category Recall',
          description: 'Custom geometric B-wing monogram paired with friendly 3D studio mascot system.',
          accentColor: '#F59E0B',
          theme: 'dark',
        },
        {
          title: 'Quantum Computing Lab Monogram',
          category: 'Tech Symbol & Motion Logo',
          metrics: 'Red Dot Design Shortlist',
          description: 'Impossible-geometry vector mark with interactive WebGL shader logo reveal.',
          accentColor: '#3B82F6',
          theme: 'light',
        },
        {
          title: 'Artisanal Coffee Roasters Crest',
          category: 'Packaging & Heritage Emblem',
          metrics: '+140% Retail Shelf Pickup',
          description: 'Hand-crafted botanical crest and custom serif lettering for specialty retail.',
          accentColor: '#D97706',
          theme: 'amber',
        },
        {
          title: 'Global Esports League Identity',
          category: 'Dynamic Emblem System',
          metrics: '12 Team Sub-Marks Unified',
          description: 'Modular shield architecture adapting seamlessly across broadcast, merch, and mobile.',
          accentColor: '#0F172A',
          theme: 'slate',
        },
      ],
      processDelivery: [
        {
          stepNumber: '01',
          title: 'Client Engagement',
          description: 'Creative brief discovery, visual territory moodboards, and industry symbol audit.',
          iconName: 'Sparkles',
        },
        {
          stepNumber: '02',
          title: 'Concept Sketching',
          description: '50+ analog pencil explorations distilled into 4 distinct strategic directions.',
          iconName: 'Edit3',
        },
        {
          stepNumber: '03',
          title: 'Product Delivery',
          description: 'Golden-ratio vector construction, optical kerning, and custom bezier refinement.',
          iconName: 'PenTool',
        },
        {
          stepNumber: '04',
          title: 'Process Solutions',
          description: 'Color psychology calibration across CMYK, Pantone, RGB, and dark/light UI modes.',
          iconName: 'Palette',
        },
        {
          stepNumber: '05',
          title: 'Process Delivery',
          description: 'Real-world 3D environmental, packaging, digital UI, and apparel mockup stress-testing.',
          iconName: 'Eye',
        },
        {
          stepNumber: '06',
          title: 'Master Asset Kit',
          description: 'Delivering SVG, EPS, PDF, PNG, Lottie animations, and comprehensive usage guidelines.',
          iconName: 'PackageCheck',
        },
      ],
    },
  },
];

export const getServiceBySlug = (slug: string | null | undefined): PriorityService => {
  if (!slug) return PRIORITY_SERVICES.find((s) => s.slug === 'web-development') || PRIORITY_SERVICES[0];

  // Backward compatibility alias normalization
  let normalized = slug.trim().toLowerCase();
  if (normalized === 'brand-handling') normalized = 'brand-management';
  if (normalized === 'unique-logo-designing') normalized = 'unique-logo-design';
  if (normalized === 'digital-strategy-ideas') normalized = 'digital-analytics';

  return PRIORITY_SERVICES.find((s) => s.slug === normalized) || PRIORITY_SERVICES[0];
};

export const getMainCategoryBySlug = (slug: string | null | undefined): ServiceCategory => {
  if (!slug) return MAIN_SERVICE_CATEGORIES[0];
  const normalized = slug.trim().toLowerCase();
  return MAIN_SERVICE_CATEGORIES.find((c) => c.slug === normalized) || MAIN_SERVICE_CATEGORIES[0];
};

export const getServicesByCategory = (categorySlug: string): PriorityService[] => {
  return PRIORITY_SERVICES.filter((s) => s.categorySlug === categorySlug);
};

export const getCategoryForService = (serviceSlug: string): ServiceCategory => {
  const service = getServiceBySlug(serviceSlug);
  return getMainCategoryBySlug(service.categorySlug);
};
