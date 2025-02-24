export const state = {
    tel: "+975544366021",
    email: "zimakovs93@gmail.com",
    linkedIn: "https://www.linkedin.com/in/sergey-zimakov/",
    git: "https://github.com/SergeyZimakov",
    facebook: "https://www.facebook.com/serega.zimakov",
    aboutMeItems: [
        "Hi everyone,",
        "I am backend developer with 3+ years of experience.",
        "Living programming and learning new technologies. For me it isn't just a job, but also a favourite hobby.",
        "Skilled in C#, API, SQL(include complex SP), ASP.Net, NodeJS, Javascript, Git.",
        "Have basic knowledge in React, Angular, Flutter, GitHub Actions, CI/CD Proccess and Docker.",
        "I am highly-motivated, organized, team-player and have strong self-learning skills.",
    ],

    workExperienceItems: [
        {
            position: "Backend Developer",
            dates: "April 2023 - Present",
            place: "Galcon",
            description: [
                "Developing API servers and communication servers with C# and NodeJS.",
                "Significant improvement of load test capabilities by developing a new application that simulates running a big number of devices under different conditions.",
                "Promoting and moving new features to test by making integration between Embedded side and Frontend.",
                "Taking a part and responsibilities in most of the company`s projects."
            ],
        },
        {
            position: "Full Stack Developer",
            dates: "August 2021 - March 2023",
            place: "Catom LTD",
            description: [
                "Developing energy control system with ASP.Net, system and data base characterization.",
                "Improving the timing of energy reports and bills generating by fixing and creating complex procedures and functions in SQL.",
                "Achieving system improvement by developing new effective features.",
                "Developing Windows Services with C#."
            ],
        },
        {
            position: "Differnt jobs at factories, like CNC Machine Operator At Iscar",
            dates: "Until August 2021",
            place: "",
            description: [],
        },
    ],

    educationItems: [
        {
            position: "Full Stack Web Development",
            place: "John Brice",
            dates: "March 2020 - April 2021",
            description: ["Graduated with honors"]
        },
        {
            position: "Programming Engineer",
            place: "ORT Braude",
            dates: "October 2018 - March 2019",
            description: ["Termination of study due to personal reasons"]
        },
        {
            position: "Junior Electro-Mechanical Engineer",
            place: "ORT Braude",
            dates: "October 2015 - June 2017",
            description: ["Graduated with honors"]
        },
    ],

    technicalSkillsItems: [
        "C#, NodeJS, SQL",
        "API, .Net, Services",
        "Git, CI/CD, Jira",
        "Docker(basic knowledge)",
        "Flutter(basic knowledge)"
    ],

    skillsItems: [
        "Target oriented",
        "Self-learner",
        "Team Player",
        "Organized",
        "Highly motivated",
    ],

    languagesItems: [
        "Hebrew - native",
        "Russian - native",
        "English - full professional proficiency"
    ],

    projectItems: [
        {
            name: "Working Hours API",
            year: "2025",
            technologies: "C#, .Net",
            description: [
                "Rest API for tracking working hours and shifts",
                "Currently in progress...",
            ],
            links: [
                { name: "Git", link: "https://github.com/SergeyZimakov/WorkingHoursAPI" },
            ],
            images: [],
        },
        {
            name: "WEB API - Assignment",
            year: "2023",
            technologies: "C#, .Net",
            description: [
                "Assignment for job application",
                "Simple Rest API",
            ],
            links: [
                { name: "Git", link: "https://github.com/SergeyZimakov/WebApi-Assignment-2023" },
            ],
            images: [],
        },
        {
            name: "CMake - Assignment",
            year: "2022",
            technologies: "Docker, CI/CD, C++",
            description: [
                "Assignment for job application",
                "Automated proccess of running simple programm in docker container",
                "Automated proccess of pushing the code to docker container on push",
            ],
            links: [
                { name: "Git", link: "https://github.com/SergeyZimakov/CMake-Assignment-2022" },
            ],
            images: [],
        },
        {
            name: "CRM-MEAN",
            year: "2021",
            technologies: "MongoDB, Express, Angular, NodeJS",
            description: [
                "CRM system for tracking sales",
                "Ability to add categories and positions",
                "Tracking history and statistics of sales",
            ],
            links: [
                { name: "Git", link: "https://github.com/SergeyZimakov/CRM-MEAN" },
            ],
            images: [
                "./images/crm.JPG",
            ],
        },
        {
            name: "Vacations",
            year: "2021",
            technologies: "SQL, Express, React, SocketIO, NodeJS",
            description: [
                "Web site for tracking vacation tours",
                "Includes admin and user modes",
                "Tracking and following tours",
            ],
            links: [
                { name: "Git", link: "https://github.com/SergeyZimakov/Vacations-John-Brice-Project2" },
            ],
            images: [
                "./images/vacations.JPG",
            ],
        },
        {
            name: "Crypto Info",
            year: "2020",
            technologies: "HTML, JS, Ajax",
            description: [
                "First project at study",
                "Web site for tracking crypto currencies",
            ],
            links: [
                { name: "Git", link: "https://github.com/SergeyZimakov/CryptoInfo-John-Brice-Project1" },
            ],
            images: [
                "./images/crypto.JPG",
            ],
        },
    ]
};

