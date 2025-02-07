export const mockModuleCatalog = [
    {
        id: "module-1",
        name: "PreWork",
        description: "Basics of IT and Cloud value.",
        credits: 3,
        costPerCredit: 100,
        syncHours: 6,
        asyncHours: 0,
        competencies:
            "Cloud Computing, DevOps, IT, Cloud Computing, DevOps, IT, Cloud Computing, DevOps,",
        tools: "None",
        syllabus: `
      - Introduction to Cloud Computing
      - Introduction to DevOps
      - Introduction to IT
    `,
        objectives:
            "This module lays the foundation for your journey by introducing essential IT concepts and cloud computing fundamentals. Students will gain a clear understanding of the technological landscape, preparing them for more advanced topics throughout the program.",
    },
    {
        id: "module-2",
        name: "Automation with PowerShell",
        description: "Introduction to PowerShell and its usage.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 15,
        asyncHours: 12,
        competencies: "Problem Solving, Coding, Automation, CLI",
        tools: "CLI, PowerShell",
        syllabus: `
      - Introduction to PowerShell
      - Variables and Operators
      - Functions and Scripting
      - Automation and Scripting
    `,
        objectives:
            "In this module, learners will master the fundamentals of PowerShell scripting to automate routine tasks. The focus is on developing problem-solving skills through coding, understanding variables, operators, and crafting reusable scripts to enhance productivity.",
    },
    {
        id: "module-3",
        name: "Azure Cloud Adminisration",
        description: "Introduction to Azure and its usage.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 60,
        asyncHours: 39,
        competencies: "Cloud Services and Administration",
        tools: "Azure Portal, DrawIO",
        syllabus: `
      - Introduction to Azure
      - Azure Services
      - Azure Administration
      - Azure Networking
    `,
        objectives:
            "This module introduces the Azure cloud platform with an emphasis on practical administration. Students will learn to deploy, manage, and secure cloud resources while gaining hands-on experience with the Azure portal and associated networking services.",
    },
    {
        id: "module-4",
        name: "AWS Assoc Architect",
        description: "Introduction to AWS and its usage.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 45,
        asyncHours: 24,
        competencies: "Cloud Services and Architecture",
        tools: "AWS Console, AWS Academy",
        syllabus: `
      - Introduction to AWS
      - AWS Services
      - AWS Architecture
      - AWS Networking
    `,
        objectives:
            "This module is designed to build a strong foundation in AWS architecture. Students will explore core AWS services and learn best practices for designing scalable, secure cloud environments. The module emphasizes hands-on experience with the AWS Console to solidify architectural principles.",
    },
    {
        id: "module-5",
        name: "GCP Assoc Cloud Engineer",
        description: "Introduction to GCP and its usage.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 30,
        asyncHours: 21,
        competencies: "Cloud Services and Administration",
        tools: "GCP Console, DrawIO",
        syllabus: `
      - Introduction to GCP
      - GCP Services
      - GCP Administration
      - GCP Networking
    `,
        objectives:
            "Focusing on the Google Cloud Platform, this module provides essential insights into cloud infrastructure management. Students will gain the skills necessary to deploy, administer, and secure GCP services while understanding the fundamentals of cloud networking.",
    },
    {
        id: "module-6",
        name: "DevOps Engineer",
        description: "Introduction to DevOps.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 40,
        asyncHours: 20,
        competencies: "Code and release management",
        tools: "Azure DevOps, PowerShell",
        syllabus: `
      - Introduction to DevOps
      - Code Management
      - Release Management
      - DevOps Tools
    `,
        objectives:
            "This module introduces the principles and practices of DevOps, emphasizing the integration of development and operations. Students will learn how to streamline the software delivery process by mastering code management, continuous integration, and deployment techniques using industry-standard tools.",
    },
    {
        id: "module-7",
        name: "Capstone",
        description: "Final program.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 33,
        asyncHours: 0,
        competencies: "Team work and program development",
        tools: "",
        syllabus: `
      - Team work
      - Program Development
      - Final Project
    `,
        objectives:
            "The Capstone module is the culmination of the learning experience. Students will work in teams to integrate and apply their acquired skills in a comprehensive project that simulates real-world challenges, reinforcing both technical and collaborative competencies.",
    },
    {
        id: "module-8",
        name: "Introducción a la Ciberseguridad",
        description: "Conceptos básicos, amenazas y vulnerabilidades.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 25,
        asyncHours: 15,
        competencies: "Fundamentals, Networking, Attack Vectors",
        tools: "Wireshark, Linux CLI",
        syllabus: `
      - Conceptos básicos
      - Amenazas y vulnerabilidades
      - Herramientas de seguridad
    `,
        objectives:
            "Este módulo introduce los conceptos fundamentales de la ciberseguridad, explorando las amenazas, vulnerabilidades y técnicas de mitigación. Los estudiantes aprenderán a identificar riesgos y utilizar herramientas básicas para proteger infraestructuras y datos críticos.",
    },
    {
        id: "module-9",
        name: "Pentesting & Ethical Hacking",
        description: "Metodologías de pruebas de penetración.",
        credits: 5,
        costPerCredit: 100,
        syncHours: 35,
        asyncHours: 15,
        competencies: "PenTesting, Ethical Hacking, Vulnerability Scans",
        tools: "Kali Linux, Metasploit",
        syllabus: `
      - Metodologías de pruebas de penetración
      - Herramientas de hacking ético
      - Escaneo de vulnerabilidades
    `,
        objectives:
            "This module empowers students to think like ethical hackers. It covers penetration testing methodologies and the practical use of tools such as Kali Linux and Metasploit to identify vulnerabilities, thereby preparing students to conduct systematic and ethical security assessments.",
    },
    {
        id: "module-10",
        name: "Seguridad en Redes y Sistemas",
        description: "Arquitectura de redes, firewalls y sistemas seguros.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 25,
        asyncHours: 10,
        competencies: "Network Security, Hardening, Firewalls",
        tools: "Cisco Packet Tracer, pfSense",
        syllabus: `
      - Arquitectura de redes
      - Hardening de sistemas
      - Firewalls y seguridad perimetral
    `,
        objectives:
            "Designed to enhance understanding of secure network and system architectures, this module focuses on the implementation of firewalls and system hardening techniques. Students will learn to design robust security frameworks to protect digital assets and critical infrastructures.",
    },
    {
        id: "module-11",
        name: "Criptografía y Protocolos Seguros",
        description: "Conceptos de cifrado, SSL/TLS, PKI y mejores prácticas.",
        credits: 3,
        costPerCredit: 100,
        syncHours: 20,
        asyncHours: 0,
        competencies: "Cryptography, PKI, SSL, TLS",
        tools: "OpenSSL, GPG",
        syllabus: `
      - Conceptos de cifrado
      - SSL/TLS y PKI
      - Mejores prácticas de seguridad
    `,
        objectives:
            "This module delves into the world of cryptography and secure communications. Students will explore encryption techniques, understand the role of SSL/TLS and PKI in data security, and learn best practices for implementing robust security protocols.",
    },
    {
        id: "module-12",
        name: "Fundamentos de UX",
        description:
            "Proceso de diseño centrado en el usuario, research y prototipado rápido.",
        credits: 3,
        costPerCredit: 100,
        syncHours: 15,
        asyncHours: 10,
        competencies: "User Research, Wireframing",
        tools: "Figma, Miro",
        syllabus: `
      - Proceso de diseño centrado en el usuario
      - Investigación de usuarios
      - Prototipado rápido
    `,
        objectives:
            "En este módulo se establecen las bases del diseño de experiencia de usuario (UX). Los estudiantes aprenderán a realizar investigaciones con usuarios, crear wireframes y prototipos, y a iterar en diseños para asegurar soluciones intuitivas y centradas en el usuario.",
    },
    {
        id: "module-13",
        name: "Interfaz de Usuario (UI)",
        description:
            "Diseño visual, tipografía, color y componentes de interacción.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 20,
        asyncHours: 10,
        competencies: "Visual Design, Layout, Branding",
        tools: "Sketch, Adobe XD",
        syllabus: `
      - Diseño visual
      - Tipografía y color
      - Componentes de interacción
    `,
        objectives:
            "Focusing on the visual side of design, this module explores key aspects of UI including layout, typography, color theory, and interactive components. Students will develop the skills necessary to create aesthetically pleasing and functional interfaces that align with modern design trends.",
    },
    {
        id: "module-14",
        name: "Usabilidad y Pruebas de Usuario",
        description: "Evaluación heurística y testing con usuarios.",
        credits: 3,
        costPerCredit: 100,
        syncHours: 15,
        asyncHours: 0,
        competencies: "Usability Testing, Iteration",
        tools: "UserTesting, Maze",
        syllabus: `
      - Evaluación heurística
      - Testing con usuarios
      - Iteración y mejora continua
    `,
        objectives:
            "This module emphasizes the importance of usability in design. Students will learn how to conduct heuristic evaluations and user tests, using the insights gained to iterate and refine interfaces to maximize user satisfaction and efficiency.",
    },
    {
        id: "module-15",
        name: "Fundamentos de Análisis de Datos",
        description:
            "Introducción a la recolección, limpieza y manipulación de datos.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 25,
        asyncHours: 15,
        competencies: "Data Wrangling, Python, Excel",
        tools: "Python, Jupyter, Excel",
        syllabus: `
      - Introducción al análisis de datos
      - Recolección y limpieza de datos
      - Manipulación de datos
    `,
        objectives:
            "This module introduces the core principles of data analysis. Learners will understand how to collect, clean, and manipulate data using popular tools and programming languages, laying the groundwork for more advanced analytical techniques.",
    },
    {
        id: "module-16",
        name: "Visualización y Business Intelligence",
        description: "Técnicas de reporting y dashboards.",
        credits: 3,
        costPerCredit: 100,
        syncHours: 20,
        asyncHours: 10,
        competencies: "Data Viz, Tableau, Power BI",
        tools: "Tableau, Power BI",
        syllabus: `
      - Técnicas de reporting
      - Dashboards interactivos
      - Business Intelligence
    `,
        objectives:
            "Focusing on the transformation of data into insights, this module teaches students how to create effective data visualizations and interactive dashboards. The course covers the use of industry-standard BI tools to support decision-making processes.",
    },
    {
        id: "module-17",
        name: "Estadística y Modelos Predictivos",
        description:
            "Análisis estadístico, regresiones y algoritmos de Machine Learning básicos.",
        credits: 5,
        costPerCredit: 100,
        syncHours: 30,
        asyncHours: 20,
        competencies: "Statistics, Regression, Intro ML",
        tools: "Python, scikit-learn",
        syllabus: `
      - Análisis estadístico
      - Regresiones
      - Modelos predictivos básicos
    `,
        objectives:
            "This module covers the essentials of statistical analysis and predictive modeling. Students will learn how to apply regression techniques and basic machine learning algorithms to forecast trends, interpret data patterns, and make data-driven predictions.",
    },
    {
        id: "module-18",
        name: "Frontend Fundamentals",
        description: "HTML, CSS y JavaScript para crear interfaces de usuario.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 30,
        asyncHours: 10,
        competencies: "HTML, CSS, JavaScript",
        tools: "VSCode, Chrome DevTools",
        syllabus: `
      - HTML y CSS
      - JavaScript básico
      - DOM y eventos
    `,
        objectives:
            "This module establishes the basics of front-end web development. Students will learn to build responsive and interactive interfaces using HTML, CSS, and JavaScript, gaining an understanding of the Document Object Model (DOM) and event-driven programming.",
    },
    {
        id: "module-19",
        name: "Frontend Frameworks",
        description: "Aprender React, Vue o Angular para aplicaciones SPA.",
        credits: 3,
        costPerCredit: 100,
        syncHours: 20,
        asyncHours: 10,
        competencies: "SPA, React, Vue",
        tools: "Node, NPM",
        syllabus: `
      - React, Vue o Angular
      - Componentes y props
      - Routing y state management
    `,
        objectives:
            "Building on frontend fundamentals, this module introduces modern frameworks like React, Vue, or Angular. Students will learn about component-based architecture, state management, and routing to create dynamic single-page applications (SPAs) with ease.",
    },
    {
        id: "module-20",
        name: "Backend con Node.js",
        description: "APIs REST, bases de datos y autenticación.",
        credits: 5,
        costPerCredit: 100,
        syncHours: 35,
        asyncHours: 15,
        competencies: "Node, Express, SQL/NoSQL",
        tools: "Postman, MongoDB, MySQL",
        syllabus: `
      - APIs REST
      - Bases de datos
      - Autenticación y autorización
    `,
        objectives:
            "This module provides an in-depth look at backend development using Node.js and Express. Students will learn how to build RESTful APIs, integrate various databases (both SQL and NoSQL), and implement robust authentication mechanisms to secure their applications.",
    },
    {
        id: "module-21",
        name: "Fundamentos de IA y Machine Learning",
        description: "Historia de la IA, aprendizaje supervisado y no supervisado.",
        credits: 4,
        costPerCredit: 100,
        syncHours: 25,
        asyncHours: 15,
        competencies: "ML Basics, Classification, Clustering",
        tools: "Python, scikit-learn",
        syllabus: `
      - Historia de la IA
      - Aprendizaje supervisado
      - Aprendizaje no supervisado
    `,
        objectives:
            "Introducing the world of artificial intelligence, this module covers the historical context and fundamental concepts of AI and machine learning. Students will explore both supervised and unsupervised learning techniques, setting the stage for more advanced AI studies.",
    },
    {
        id: "module-22",
        name: "Redes Neuronales y Deep Learning",
        description: "Arquitecturas de redes, backpropagation y frameworks.",
        credits: 5,
        costPerCredit: 100,
        syncHours: 40,
        asyncHours: 20,
        competencies: "Neural Networks, CNNs, RNNs",
        tools: "TensorFlow, Keras, PyTorch",
        syllabus: `
      - Redes neuronales
      - Convolutional NNs
      - Recurrent NNs
    `,
        objectives:
            "Delving into the advanced realm of deep learning, this module covers the design and training of neural networks. Students will learn about various architectures, including CNNs and RNNs, and gain hands-on experience with frameworks such as TensorFlow, Keras, and PyTorch.",
    },
    {
        id: "module-23",
        name: "Procesamiento de Lenguaje Natural",
        description: "Text analytics, embeddings y chatbots.",
        credits: 3,
        costPerCredit: 100,
        syncHours: 15,
        asyncHours: 10,
        competencies: "NLP, Word Embeddings, Transformers",
        tools: "NLTK, SpaCy, HuggingFace",
        syllabus: `
      - Análisis de texto
      - Word embeddings
      - Chatbots y asistentes virtuales
    `,
        objectives:
            "This module explores the fundamentals of Natural Language Processing (NLP). Students will learn techniques for text analytics, understand how word embeddings and transformer models work, and develop applications like chatbots and virtual assistants using cutting-edge tools.",
    },
    {
        id: "module-24",
        name: "Visión por Computadora",
        description: "Procesamiento de imágenes y detección de objetos.",
        credits: 3,
        costPerCredit: 100,
        syncHours: 15,
        asyncHours: 5,
        competencies: "OpenCV, Image Classification",
        tools: "OpenCV, TensorFlow",
        syllabus: `
      - Procesamiento de imágenes
      - Detección de objetos
      - Clasificación de imágenes
    `,
        objectives:
            "This module introduces students to the principles of computer vision. By exploring image processing techniques and object detection methodologies, learners will be equipped to build systems that can interpret and classify visual data using tools like OpenCV and TensorFlow.",
    },
];