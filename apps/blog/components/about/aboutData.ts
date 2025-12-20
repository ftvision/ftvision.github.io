/**
 * About page content data - sourced from content/about
 * Provides both English and Chinese versions
 */

export type Locale = 'en' | 'zh';

// Main intro content
export const introContent = {
  en: {
    title: 'About',
    description: `I am a Software Engineer @ Citadel, New York, NY. Prior to that, I was a Software Engineer @ Google, Cambridge, MA. I received my Ph.D. training from the Johns Hopkins University.`,
    quotes: [
      'Removing the delusion of a separate self and the desires it produces, and concentrating upon the subject until there is a direct communion with it.',
      'Successes are only rare spikes among background noises of failures in daily life. Achieving more successes comes from failing faster, failing more often, then learning more and keeping on.',
    ],
    findMeOnline: 'Find me online',
    onlineLinks: `My [Linkedin](https://www.linkedin.com/in/feitong-yang-88088a55/) page contains similar information. [Google Scholar](http://scholar.google.com/citations?user=94Xx9u0AAAAJ) and [NeuroTree](http://neurotree.org/neurotree/tree.php?pid=65050) summarizes my academic efforts and lineage.`,
  },
  zh: {
    title: '关于作者',
    description: `我现在是Citadel的一名软件工程师。在此之前，我在Google工作过三年。在那之前，我在Johns Hopkins获得了认知心理学的博士学位。`,
    quotes: [],
    findMeOnline: '我的网络足迹',
    onlineLinks: `我的[Linkedin](https://www.linkedin.com/in/feitong-yang-88088a55/)页面介绍了跟这里差不多的工作经历。[Google Scholar](http://scholar.google.com/citations?user=94Xx9u0AAAAJ)和[NeuroTree](http://neurotree.org/neurotree/tree.php?pid=65050)页面介绍了一些我的学术训练的背景。以下的几个页面有更细节的简历。老实说，我的简历没什么好看的，倒是"失败简历"可能有点意思。`,
  },
};

// Contact info
export const contactInfo = {
  email: 'feitong.yang@outlook.com',
};

// Social links
export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/feitong-yang-88088a55/',
  googleScholar: 'http://scholar.google.com/citations?user=94Xx9u0AAAAJ',
  neuroTree: 'http://neurotree.org/neurotree/tree.php?pid=65050',
};

// Work experience data
export const workExperience = {
  en: [
    {
      title: 'Software Engineer',
      organization: 'Citadel',
      location: 'New York, NY, U.S.A.',
      dateRange: '2021/6 - present',
    },
    {
      title: 'Software Engineer',
      organization: 'Google',
      location: 'Cambridge, MA, U.S.A.',
      dateRange: '2018/7 - 2021/05',
    },
    {
      title: 'Quantitative Trader Intern',
      organization: 'Akuna Capital',
      location: 'Chicago, IL, U.S.A.',
      dateRange: '2017/6 - 2017/8',
    },
    {
      title: 'C++ Programming Intern',
      organization: 'Sparkypants Studios',
      location: 'Baltimore, Maryland, U.S.A.',
      dateRange: '2016/5 - 2016/8',
    },
  ],
  zh: [
    {
      title: '软件工程师',
      organization: 'Citadel',
      location: 'New York, NY, U.S.A.',
      dateRange: '2021/6 至今',
    },
    {
      title: '软件工程师',
      organization: 'Google',
      location: 'Cambridge, MA, U.S.A.',
      dateRange: '2018/7 - 2021/05',
    },
    {
      title: '实习量化交易员',
      organization: 'Akuna Capital',
      location: 'Chicago, IL, U.S.A.',
      dateRange: '2017/6 - 2017/8',
    },
    {
      title: '实习C++程序员',
      organization: 'Sparkypants Studios',
      location: 'Baltimore, Maryland, U.S.A.',
      dateRange: '2016/5 - 2016/8',
    },
  ],
};

// Education data
export const education = {
  en: [
    {
      title: 'Ph.D. Cognitive Psychology',
      organization: 'Johns Hopkins University',
      location: 'Baltimore, Maryland, U.S.A.',
      dateRange: '2013/9 - 2018/6',
    },
    {
      title: 'M.S.E Applied Mathematics and Statistics',
      organization: 'Johns Hopkins University',
      location: 'Baltimore, Maryland, U.S.A.',
      dateRange: '2017/2 - 2018/6',
    },
    {
      title: 'M.A. Cognitive Psychology',
      organization: 'Johns Hopkins University',
      location: 'Baltimore, Maryland, U.S.A.',
      dateRange: '2013/9 - 2015/6',
    },
    {
      title: 'B.Sc. Experimental Psychology',
      organization: 'Peking University',
      location: 'Beijing, China',
      dateRange: '2008/9 - 2012/7',
    },
  ],
  zh: [
    {
      title: '认知心理学博士',
      organization: 'Johns Hopkins University',
      location: 'Baltimore, Maryland, U.S.A.',
      dateRange: '2013/9 - 2018/6',
    },
    {
      title: '应用数学与统计硕士',
      organization: 'Johns Hopkins University',
      location: 'Baltimore, Maryland, U.S.A.',
      dateRange: '2017/2 - 2018/6',
    },
    {
      title: '认知心理学硕士',
      organization: 'Johns Hopkins University',
      location: 'Baltimore, Maryland, U.S.A.',
      dateRange: '2013/9 - 2015/6',
    },
    {
      title: '实验心理学学士',
      organization: '北京大学',
      location: '中国北京',
      dateRange: '2008/9 - 2012/7',
    },
  ],
};

// Research experience
export const researchExperience = {
  en: [
    {
      title: 'Brains, Minds & Machines Summer Course',
      organization: 'Marine Biological Laboratory',
      location: 'Woods Hole, MA, U.S.A.',
      dateRange: '2017/8 - 2017/9',
    },
    {
      title: 'Computational and Cognitive Neuroscience Summer School',
      organization: 'Cold Spring Harbor Asia',
      location: 'Beijing, China',
      dateRange: '2013/7',
      description:
        'Organizer: Xiao-Jing Wang, Si Wu, Upinder S. Bhalla, Zachary F. Mainen',
    },
    {
      title: 'Computational Neuroscience Summer School',
      organization: 'University of Pennsylvania',
      location: 'Philadelphia, PA, U.S.A.',
      dateRange: '2011/6 - 2011/8',
      description: 'Advisor: Geoffrey Aguirre',
    },
  ],
  zh: [
    {
      title: 'Brains, Minds & Machines 暑期课程',
      organization: 'Marine Biological Laboratory',
      location: 'Woods Hole, MA, U.S.A.',
      dateRange: '2017/8 - 2017/9',
    },
    {
      title: '计算与认知神经科学暑期学校',
      organization: 'Cold Spring Harbor Asia',
      location: '中国北京',
      dateRange: '2013/7',
      description:
        '组织者: Xiao-Jing Wang, Si Wu, Upinder S. Bhalla, Zachary F. Mainen',
    },
    {
      title: '计算神经科学暑期学校',
      organization: 'University of Pennsylvania',
      location: 'Philadelphia, PA, U.S.A.',
      dateRange: '2011/6 - 2011/8',
      description: '导师: Geoffrey Aguirre',
    },
  ],
};

// Publications
export const publications = [
  'Gong, M., Yang, F., & Li, S. (2016). Reward association facilitates distractor suppression in human visual search. European Journal of Neuroscience.',
  'Yang, F., Wu. Q., & Li. S., (2014), Learning-induced uncertainty reduction in perceptual decisions is task-dependent, Frontiers in Human Neuroscience, 8, 282',
  'Li. S., & Yang, F., (2012), Task‐dependent uncertainty modulation of perceptual decisions in the human brain, European Journal of Neuroscience, 36(12), 3732-3739',
];

// Talks
export const talks = [
  'Yang, F., & Flombaum, J., (2018) Polar coordinates as the format of spatial representation in visual perception, Vision Science Society, 2018, St. Pete, FL.',
  'Yang, F., & Li, S., (2011) Asymmetrical Transfer of Learning Effects between Signal-based and Criterion-based Task Uncertainties in Perceptual Decision, The 7th Asia-Pacific Conference on Vision, Hong Kong.',
];

// Posters
export const posters = [
  'Yang, F., & Flombaum, J. I., (2015) Statistical Learning without Attention, Vision Science Society Meeting 2015, St. Pete, FL.',
  'Yang, F., & Flombaum, J. I., (2014) Ponzo inducers in the working memory produce Illusory line length perception, Vision Science Society Meeting 2014, St. Pete, FL.',
  'Prasad, S., Yang, F., Butt, O., Brandes, L., Datta, R., Thomas, A., & Aguirre, G., (2012) Occipital Areas Distinguish Semantic Content in Congenitally Blind but Not Sighted Individuals. Neurology 2012; 78, P02.018.',
  'Yang, F., & Li, S., (2011) Learning of Uncertain Stimuli Transfers from Criterion-Based to Noise-Based Perceptual Decision, But Not Vice Versa, Vision Science Society Meeting 2011, Naples, FL.',
  'Li, S., & Yang, F., (2010) Learning of Perceptual Judgment under Criterion-based and Noise-based Uncertainties, Society for Neuroscience Annual Meeting 2010, San Diego, CA.',
];

// Grants & Awards
export const grantsAndAwards = {
  en: [
    {
      title: 'Robert S. and Dorothy L. Waldrop Graduate Fellowship',
      organization: 'Johns Hopkins University',
      dateRange: '2014 - 2015',
    },
    {
      title: 'National University Student Innovation Program',
      organization: 'Peking University',
      dateRange: '2010 - 2011',
    },
    {
      title: 'Student Travel Award',
      organization: 'The 7th Asia-Pacific Conference on Vision',
      dateRange: '2011',
    },
    {
      title: 'Undergraduate Research Grants',
      organization: 'Department of Psychology, Peking University',
      dateRange: '2009 - 2010',
    },
    {
      title: 'Excellence in Academic Study Award',
      organization: 'Peking University',
      dateRange: '2009 - 2011',
    },
    {
      title: 'First Prize, National Olympiad in Informatics Contest in China',
      organization: '',
      dateRange: '2004, 2005, 2007',
    },
  ],
  zh: [
    {
      title: 'Robert S. and Dorothy L. Waldrop Graduate Fellowship',
      organization: 'Johns Hopkins University',
      dateRange: '2014 - 2015',
    },
    {
      title: '国家大学生创新项目',
      organization: '北京大学',
      dateRange: '2010 - 2011',
    },
    {
      title: '学生旅行奖',
      organization: '第七届亚太视觉会议',
      dateRange: '2011',
    },
    {
      title: '本科生科研基金',
      organization: '北京大学心理学系',
      dateRange: '2009 - 2010',
    },
    {
      title: '学业优秀奖',
      organization: '北京大学',
      dateRange: '2009 - 2011',
    },
    {
      title: '全国信息学奥林匹克竞赛一等奖',
      organization: '',
      dateRange: '2004, 2005, 2007',
    },
  ],
};

// Teaching experience
export const teaching = {
  en: [
    {
      title: 'Introduction to Cognitive Psychology',
      organization: 'Teaching Assistant for Dr. Jonathan Flombaum',
      dateRange: '2017 Spring',
      description:
        'This course introduced cognitive psychology from the functionalist\'s point of view.',
    },
    {
      title: 'Unconscious Computations in Mind',
      organization: 'Instructor',
      dateRange: '2016 Intersession',
      description:
        'In this course, I taught about visual awareness, attention, decision making, and learning.',
    },
    {
      title: 'Research Method',
      organization: 'Instructor for Dr. Howard Egeth',
      dateRange: '2015 Fall',
      description:
        'This course teaches undergraduates how to conduct scientific research, analyze data, and write an APA-style paper.',
    },
    {
      title: 'Functional Human Neuroanatomy',
      organization: 'Teaching Assistant for Dr. Susan Courtney',
      dateRange: '2015 Spring',
      description:
        'This course discussed about neuroanatomy from the perspective of cognitive function.',
    },
    {
      title: 'Unconscious Computations in Mind',
      organization: 'Instructor',
      dateRange: '2015 Intersession',
      description:
        'Every intersession, I offer this introductory course on unconscious computations in mind.',
    },
    {
      title: 'Mind, Brain & Experience',
      organization: 'Teaching Assistant for Dr. Marina Bedny',
      dateRange: '2014 Fall',
      description:
        'This course discussed about brain plasticity, cognitive development, and core knowledge.',
    },
    {
      title: 'Neuroscience of Decision Making',
      organization: 'Teaching Assistant for Dr. Veit Stuphorn',
      dateRange: '2014 Spring',
      description:
        'This course discussed about human learning and decision making process.',
    },
    {
      title: 'Computational Vision',
      organization: 'Teaching Assistant for Dr. Zili Liu',
      dateRange: '2012 Fall',
      description:
        'This course covered basic computational problems and algorithms in vision.',
    },
    {
      title: 'Functional Anatomy of Central Nervous System',
      organization: 'Teaching Assistant for Dr. Yanjie Su',
      dateRange: '2011 Spring',
      description:
        'This course offered a general knowledge of human central nervous system.',
    },
  ],
  zh: [
    {
      title: '认知心理学导论',
      organization: 'Dr. Jonathan Flombaum 助教',
      dateRange: '2017年春',
      description: '本课程从功能主义角度介绍认知心理学。',
    },
    {
      title: '心智中的无意识计算',
      organization: '讲师',
      dateRange: '2016年间学期',
      description: '本课程讲授视觉意识、注意力、决策和学习。',
    },
    {
      title: '研究方法',
      organization: 'Dr. Howard Egeth 讲师',
      dateRange: '2015年秋',
      description: '本课程教授本科生如何进行科学研究、分析数据并撰写APA格式的论文。',
    },
    {
      title: '功能性人体神经解剖学',
      organization: 'Dr. Susan Courtney 助教',
      dateRange: '2015年春',
      description: '本课程从认知功能的角度讨论神经解剖学。',
    },
    {
      title: '心智中的无意识计算',
      organization: '讲师',
      dateRange: '2015年间学期',
      description: '每年间学期，我都会开设这门关于心智中无意识计算的入门课程。',
    },
    {
      title: '心智、大脑与经验',
      organization: 'Dr. Marina Bedny 助教',
      dateRange: '2014年秋',
      description: '本课程讨论大脑可塑性、认知发展和核心知识。',
    },
    {
      title: '决策神经科学',
      organization: 'Dr. Veit Stuphorn 助教',
      dateRange: '2014年春',
      description: '本课程讨论人类学习和决策过程。',
    },
    {
      title: '计算视觉',
      organization: 'Dr. Zili Liu 助教',
      dateRange: '2012年秋',
      description: '本课程涵盖视觉中的基本计算问题和算法。',
    },
    {
      title: '中枢神经系统功能解剖学',
      organization: 'Dr. Yanjie Su 助教',
      dateRange: '2011年春',
      description: '本课程提供人类中枢神经系统的基本知识。',
    },
  ],
};

// Resume of Failures - Job rejections
export const failedJobs = {
  en: [
    {
      company: 'Akuna Capital',
      location: 'Chicago, IL, U.S.A.',
      role: 'Quantitative Developer',
      year: '2017',
      result: 'Declined the offer',
    },
    {
      company: 'Bloomberg L.P.',
      location: 'New York, NY, U.S.A.',
      role: 'Software Developer',
      year: '2017',
      result: 'Declined the offer',
    },
    {
      company: 'Two Sigma',
      location: 'New York, NY, U.S.A.',
      role: 'Quantitative Developer',
      year: '2017',
      result: 'Rejected after final round interview',
    },
    {
      company: 'Google',
      location: 'Mountain View, CA, U.S.A.',
      role: 'Quantitative Analyst',
      year: '2017',
      result: 'Rejected after phone interview',
    },
    {
      company: 'Akuna Capital',
      location: 'Chicago, IL, U.S.A.',
      role: 'Trader Intern',
      year: '2016',
      result: 'Rejected after final round interview',
    },
    {
      company: 'Jane Street',
      location: 'Hong Kong, China',
      role: 'Quantitative Trader Intern',
      year: '2016',
      result: 'Rejected after first phone interview',
    },
    {
      company: 'The D.E.Shaw Group',
      location: 'New York, NY, U.S.A.',
      role: 'Quantitative Trader Intern',
      year: '2016',
      result: 'Rejected after on-site interview',
    },
    {
      company: 'Susquehanna International Group',
      location: 'Bala Cynwyd, PA, U.S.A.',
      role: 'Quantitative Researcher Intern',
      year: '2016',
      result: 'Rejected after first phone interview',
    },
    {
      company: 'Bloomberg L.P.',
      location: 'New York, NY, U.S.A.',
      role: 'Software Developer Intern',
      year: '2015',
      result: 'Rejected after the on-site interview',
    },
    {
      company: 'Google',
      location: 'Mountain View, CA, U.S.A.',
      role: 'Data Science Intern',
      year: '2015',
      result: 'Silently Rejected with no further decisions after contacted by recruiter',
    },
  ],
  zh: [
    {
      company: 'Akuna Capital',
      location: 'Chicago, IL, U.S.A.',
      role: 'Quantitative Developer',
      year: '2017',
      result: '拒绝了offer',
    },
    {
      company: 'Bloomberg L.P.',
      location: 'New York, NY, U.S.A.',
      role: 'Software Developer',
      year: '2017',
      result: '拒绝了offer',
    },
    {
      company: 'Two Sigma',
      location: 'New York, NY, U.S.A.',
      role: 'Quantitative Developer',
      year: '2017',
      result: '终面后被拒',
    },
    {
      company: 'Google',
      location: 'Mountain View, CA, U.S.A.',
      role: 'Quantitative Analyst',
      year: '2017',
      result: '电话面试后被拒',
    },
    {
      company: 'Akuna Capital',
      location: 'Chicago, IL, U.S.A.',
      role: 'Trader Intern',
      year: '2016',
      result: '终面后被拒',
    },
    {
      company: 'Jane Street',
      location: 'Hong Kong, China',
      role: 'Quantitative Trader Intern',
      year: '2016',
      result: '第一轮电话面试后被拒',
    },
    {
      company: 'The D.E.Shaw Group',
      location: 'New York, NY, U.S.A.',
      role: 'Quantitative Trader Intern',
      year: '2016',
      result: '现场面试后被拒',
    },
    {
      company: 'Susquehanna International Group',
      location: 'Bala Cynwyd, PA, U.S.A.',
      role: 'Quantitative Researcher Intern',
      year: '2016',
      result: '第一轮电话面试后被拒',
    },
    {
      company: 'Bloomberg L.P.',
      location: 'New York, NY, U.S.A.',
      role: 'Software Developer Intern',
      year: '2015',
      result: '现场面试后被拒',
    },
    {
      company: 'Google',
      location: 'Mountain View, CA, U.S.A.',
      role: 'Data Science Intern',
      year: '2015',
      result: '招聘人员联系后石沉大海',
    },
  ],
};

// Resume of Failures - Education rejections
export const failedEducation = {
  en: [
    {
      school: 'Baylor College of Medicine',
      location: 'Houston, TX, U.S.A.',
      program: 'Ph.D. Neuroscience',
      year: '2013',
      result: 'Declined the offer',
    },
    {
      school: 'New York University',
      location: 'New York, NY, U.S.A.',
      program: 'Ph.D. Center for Neural Science',
      year: '2013',
      result: 'Rejected after two interviews, because vacant positions were full',
    },
    {
      school: 'Oxford University',
      location: 'Oxford, England',
      program: 'Ph.D. Neuroscience',
      year: '2013',
      result: 'Rejected with no interview for Ph.D. program. Rejected after an interview for Master program',
    },
    {
      school: 'Yale University',
      location: 'New Haven, CT, U.S.A.',
      program: 'Ph.D. Biological and Biomedical Sciences',
      year: '2013',
      result: 'Rejected with no interview',
    },
    {
      school: 'Vanderbilt University',
      location: 'Nashville, TN, U.S.A.',
      program: 'Ph.D. Psychology',
      year: '2013',
      result: 'Rejected after I accepted offers from JHU',
    },
    {
      school: 'University of Pennsylvania',
      location: 'Philadelphia, PA, U.S.A.',
      program: 'Ph.D. Psychology',
      year: '2013',
      result: 'Rejected with no interview',
    },
    {
      school: 'York University',
      location: 'Toronto, Ontario, Canada',
      program: 'CVR Vision Science Summer School',
      year: '2011',
      result: 'Rejected by the program',
    },
    {
      school: 'Rochester University',
      location: 'Rochester, NY, U.S.A.',
      program: 'Undergraduate Summer Fellowship Program in Vision Science',
      year: '2011',
      result: 'Rejected by the program',
    },
  ],
  zh: [
    {
      school: 'Baylor College of Medicine',
      location: 'Houston, TX, U.S.A.',
      program: '神经科学博士',
      year: '2013',
      result: '拒绝了offer',
    },
    {
      school: 'New York University',
      location: 'New York, NY, U.S.A.',
      program: '神经科学中心博士',
      year: '2013',
      result: '两轮面试后被拒，因为名额已满',
    },
    {
      school: 'Oxford University',
      location: 'Oxford, England',
      program: '神经科学博士',
      year: '2013',
      result: '博士项目无面试被拒。硕士项目面试后被拒',
    },
    {
      school: 'Yale University',
      location: 'New Haven, CT, U.S.A.',
      program: '生物与生物医学科学博士',
      year: '2013',
      result: '无面试被拒',
    },
    {
      school: 'Vanderbilt University',
      location: 'Nashville, TN, U.S.A.',
      program: '心理学博士',
      year: '2013',
      result: '在我接受JHU的offer后被拒',
    },
    {
      school: 'University of Pennsylvania',
      location: 'Philadelphia, PA, U.S.A.',
      program: '心理学博士',
      year: '2013',
      result: '无面试被拒',
    },
    {
      school: 'York University',
      location: 'Toronto, Ontario, Canada',
      program: 'CVR 视觉科学暑期学校',
      year: '2011',
      result: '被项目拒绝',
    },
    {
      school: 'Rochester University',
      location: 'Rochester, NY, U.S.A.',
      program: '视觉科学本科生暑期研究项目',
      year: '2011',
      result: '被项目拒绝',
    },
  ],
};

// Resume of Failures - Publication rejections
export const failedPublications = {
  en: [
    {
      title: 'Visual Pattern Recognition as Algebra within a Coordinate Representation',
      authors: 'Yang, F., & Flombaum, J. I.',
      year: '2020',
      journal: 'PNAS',
      result: 'Rejected',
    },
    {
      title: 'Visual Pattern Recognition as Algebra within a Coordinate Representation',
      authors: 'Yang, F., & Flombaum, J. I.',
      year: '2020',
      journal: 'Nature Human Behaviour',
      result: 'Rejected',
    },
    {
      title: 'Stream of Unconsciousness: Statistical Learning without Conscious Awareness',
      authors: 'Yang, F., & Flombaum, J. I.',
      year: '2016',
      journal: 'Nature Neuroscience',
      result: 'Rejected',
    },
    {
      title: 'Howard Hughes Medical Institute International Research Fellowship',
      authors: '',
      year: '2015',
      journal: '',
      result: 'Failed to meet the internal application',
    },
  ],
  zh: [
    {
      title: 'Visual Pattern Recognition as Algebra within a Coordinate Representation',
      authors: 'Yang, F., & Flombaum, J. I.',
      year: '2020',
      journal: 'PNAS',
      result: '被拒',
    },
    {
      title: 'Visual Pattern Recognition as Algebra within a Coordinate Representation',
      authors: 'Yang, F., & Flombaum, J. I.',
      year: '2020',
      journal: 'Nature Human Behaviour',
      result: '被拒',
    },
    {
      title: 'Stream of Unconsciousness: Statistical Learning without Conscious Awareness',
      authors: 'Yang, F., & Flombaum, J. I.',
      year: '2016',
      journal: 'Nature Neuroscience',
      result: '被拒',
    },
    {
      title: 'Howard Hughes Medical Institute International Research Fellowship',
      authors: '',
      year: '2015',
      journal: '',
      result: '未通过内部申请',
    },
  ],
};

// Section labels for i18n
export const sectionLabels = {
  en: {
    resume: 'Resume',
    resumeOfFailures: 'Resume of Failures',
    workExperience: 'Working Experience',
    education: 'Education',
    researchExperience: 'Research Experience',
    publications: 'Publications',
    talks: 'Talks',
    posters: 'Posters',
    grantsAndAwards: 'Grants & Awards',
    teaching: 'Teaching',
    failedJobs: 'Failed Job Applications',
    failedEducation: 'Failed Education Applications',
    failedPublications: 'Failed Grants & Publications',
    failuresIntro:
      'This is a list of what I have tried during my journey. It is a running list of my failures during my journey. The idea is inspired by Prof. Johannes Haushofer. I was trying to summarize all of them, but some may have eluded my memory. I will keep maintaining this list, so future failures will be recorded and updated. You are welcome to come back and check my latest failures.',
  },
  zh: {
    resume: '简历',
    resumeOfFailures: '失败简历',
    workExperience: '工作经验',
    education: '教育背景',
    researchExperience: '研究经验',
    publications: '论文发表',
    talks: '学术演讲',
    posters: '研究海报',
    grantsAndAwards: '基金与奖项',
    teaching: '教授课程',
    failedJobs: '我没能获得的工作和失败过的面试',
    failedEducation: '我没能进入的学校和学术训练项目',
    failedPublications: '我没能获得的科研基金和投稿失败的文章',
    failuresIntro:
      '这个页面收藏了我一路上尝试过并失败过的各种经验。之所以有这个"失败简历"是因为之前普林斯顿的教授Prof. Johannes Haushofer在网上分享过这样的简历，我觉得很有帮助，而且了解每个人成功的简历背后的各种尝试远比了解这个人有什么成就来得有趣多了。我还会继续保持更新这个页面，这样才能说明我还在继续尝试不同的事情。',
  },
};
