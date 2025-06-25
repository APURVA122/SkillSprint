// data.js - Sample Data and Constants

export const CONFIG = {
    YOUTUBE_API_KEY: 'AIzaSyBM0Z5wbpz3-SQd5QnTtBVbhMAVjoyuEs8',
    YOUTUBE_API_BASE: 'https://www.googleapis.com/youtube/v3',
    STORAGE_KEYS: {
        BOOKMARKS: 'skillsprint-bookmarks',
        PROGRESS: 'skillsprint-progress',
        THEME: 'skillsprint-theme'
    }
};

export const SAMPLE_COURSES = [
    {
        id: 'sample-1',
        title: 'Complete JavaScript Tutorial - Full Course for Beginners',
        provider: 'freecodecamp',
        duration: '8 hours',
        level: 'Beginner',
        description: 'Learn JavaScript from scratch with practical examples and projects. This comprehensive course covers variables, functions, objects, arrays, and more.',
        url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
        category: 'programming',
        tags: ['javascript', 'web development', 'programming'],
        rating: 4.8,
        students: 125000,
        thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg'
    },
    {
        id: 'sample-2',
        title: 'Python for Beginners - Full Course',
        provider: 'freecodecamp',
        duration: '4.5 hours',
        level: 'Beginner',
        description: 'Complete Python tutorial for absolute beginners. Learn Python programming fundamentals including data types, loops, functions, and file handling.',
        url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
        category: 'programming',
        tags: ['python', 'programming', 'beginners'],
        rating: 4.9,
        students: 200000,
        thumbnail: 'https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg'
    },
    {
        id: 'sample-3',
        title: 'React JS Full Course for Beginners',
        provider: 'freecodecamp',
        duration: '12 hours',
        level: 'Intermediate',
        description: 'Complete React.js tutorial covering components, hooks, state management, and building real projects.',
        url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
        category: 'web development',
        tags: ['react', 'javascript', 'frontend'],
        rating: 4.7,
        students: 180000,
        thumbnail: 'https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg'
    },
    {
        id: 'sample-4',
        title: 'Node.js and Express.js Full Course',
        provider: 'freecodecamp',
        duration: '8 hours',
        level: 'Intermediate',
        description: 'Learn backend development with Node.js and Express.js. Build REST APIs and full-stack applications.',
        url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
        category: 'backend',
        tags: ['nodejs', 'express', 'backend', 'api'],
        rating: 4.6,
        students: 95000,
        thumbnail: 'https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg'
    },
    {
        id: 'sample-5',
        title: 'CSS Grid and Flexbox Complete Course',
        provider: 'freecodecamp',
        duration: '3 hours',
        level: 'Beginner',
        description: 'Master CSS Grid and Flexbox layout systems. Build responsive layouts with modern CSS techniques.',
        url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
        category: 'web design',
        tags: ['css', 'grid', 'flexbox', 'responsive'],
        rating: 4.8,
        students: 110000,
        thumbnail: 'https://i.ytimg.com/vi/t6CBKf8K_Ac/maxresdefault.jpg'
    },
    {
        id: '15',
        title: 'Cloud Computing with AWS',
        provider: 'udemy',
        duration: '25 hours',
        level: 'Intermediate',
        description: 'Master Amazon Web Services (AWS) cloud computing. Learn EC2, S3, Lambda, and cloud architecture.',
        url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate/',
        category: 'cloud computing',
        tags: ['aws', 'cloud computing', 'ec2', 's3', 'lambda', 'cloud architecture'],
        rating: 4.7,
        students: 125000,
        deadline: null,
        thumbnail: 'https://via.placeholder.com/300x200',
        instructor: 'Stephane Maarek'
    },
    {
        id: '16',
        title: 'Game Development with Unity',
        provider: 'freecodecamp',
        duration: '45 hours',
        level: 'Beginner',
        description: 'Learn game development using Unity engine. Create 2D and 3D games from scratch with C# programming.',
        url: 'https://www.freecodecamp.org/news/unity-course/',
        category: 'game development',
        tags: ['unity', 'game development', 'c#', '2d games', '3d games'],
        rating: 4.6,
        students: 75000,
        deadline: null,
        thumbnail: 'https://via.placeholder.com/300x200',
        instructor: 'Brackeys'
    },
    {
        id: '17',
        title: 'Database Management Systems',
        provider: 'nptel',
        duration: '12 weeks',
        level: 'Intermediate',
        description: 'Comprehensive course on database concepts, SQL, normalization, transactions, and database design.',
        url: 'https://nptel.ac.in/courses/106/104/106104135/',
        category: 'database',
        tags: ['database', 'sql', 'mysql', 'postgresql', 'database design'],
        rating: 4.8,
        students: 55000,
        deadline: '2024-12-20',
        thumbnail: 'https://via.placeholder.com/300x200',
        instructor: 'Prof. D. Janakiram'
    },
    {
        id: '18',
        title: 'Complete Python Bootcamp',
        provider: 'udemy',
        duration: '22 hours',
        level: 'Beginner',
        description: 'Go from zero to hero in Python. Learn Python fundamentals, OOP, web scraping, and data analysis.',
        url: 'https://www.udemy.com/course/complete-python-bootcamp/',
        category: 'programming',
        tags: ['python', 'programming', 'oop', 'web scraping', 'data analysis'],
        rating: 4.9,
        students: 1200000,
        deadline: null,
        thumbnail: 'https://via.placeholder.com/300x200',
        instructor: 'Jose Portilla'
    },
    {
        id: 'fcc-js',
        title: 'JavaScript Algorithms and Data Structures',
        provider: 'freecodecamp',
        duration: '300 hours',
        level: 'Beginner to Advanced',
        description: 'Complete JavaScript course covering algorithms, data structures, and functional programming. Build real projects and earn a certification.',
        url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
        category: 'programming',
        tags: ['javascript', 'algorithms', 'data structures'],
        rating: 4.9,
        students: 500000,
        thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
    },
    {
        id: 'fcc-python',
        title: 'Scientific Computing with Python',
        provider: 'freecodecamp',
        duration: '300 hours',
        level: 'Intermediate',
        description: 'Learn Python for scientific computing including NumPy, Pandas, Matplotlib, and data analysis projects.',
        url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
        category: 'data science',
        tags: ['python', 'data science', 'numpy', 'pandas'],
        rating: 4.8,
        students: 300000,
        thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
    },
    {
        id: 'fcc-frontend',
        title: 'Front End Development Libraries',
        provider: 'freecodecamp',
        duration: '300 hours',
        level: 'Intermediate',
        description: 'Master React, Redux, Sass, Bootstrap, and jQuery. Build 5 projects to earn your certification.',
        url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
        category: 'web development',
        tags: ['react', 'redux', 'bootstrap', 'sass'],
        rating: 4.7,
        students: 400000,
        thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
    },
    {
        id: 'fcc-backend',
        title: 'Back End Development and APIs',
        provider: 'freecodecamp',
        duration: '300 hours',
        level: 'Intermediate',
        description: 'Learn Node.js, Express.js, MongoDB, and build RESTful APIs. Complete 5 microservice projects.',
        url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
        category: 'backend',
        tags: ['nodejs', 'express', 'mongodb', 'api'],
        rating: 4.6,
        students: 250000,
        thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
    },
    {
        id: 'fcc-data-viz',
        title: 'Data Visualization',
        provider: 'freecodecamp',
        duration: '300 hours',
        level: 'Advanced',
        description: 'Create interactive data visualizations with D3.js. Build charts, graphs, and data-driven documents.',
        url: 'https://www.freecodecamp.org/learn/data-visualization/',
        category: 'data visualization',
        tags: ['d3js', 'data visualization', 'charts'],
        rating: 4.5,
        students: 150000,
        thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
    }
];

export const PROGRESS_STATES = {
    NOT_STARTED: 'not-started',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed'
};

export const PROVIDERS = {
    YOUTUBE: 'youtube',
    FREECODECAMP: 'freecodecamp',
    UDEMY: 'udemy',
    NPTEL: 'nptel',
    SAMPLE: 'sample'
};