export interface CourseDefinition {
  name: string;
  code: string;
  description: string;
  folder: string;
  separated?: boolean;
}

export interface CourseCategory {
  id: string;
  label: string;
  shortLabel: string;
  emphasis: string;
  description: string;
  courses: readonly CourseDefinition[];
}

const noDescription = "No description";

export const courseCategories = [
  {
    id: "foundations",
    label: "Polytechnical Foundations",
    shortLabel: "Foundations",
    emphasis: "Polytechnical Foundations",
    description:
      "The Polytechnical Foundations are a set of courses all at DTU are required to take. They cover a wide variety of stuffs and suck sometimes. They are still cool in general tho.",
    courses: [
      {
        name: "Mathematics 1a",
        code: "01003",
        folder: "polytechnical-foundations/maths1a",
        description:
          "Covers logic, complex numbers, polynomials, linear algebra, and differential equations, combining theory with computation. Strengthens problem-solving through reasoning, thematic exercises, and computer-based methods.",
      },
      {
        name: "Mathematics 1b",
        code: "01004",
        folder: "polytechnical-foundations/maths1b",
        description:
          "Focuses on multivariable calculus, including gradients, Jacobians, Taylor expansions, optimization, and vector fields. Combines theory and computation with integrals, parameterizations, and the spectral theorem. Develops skills through thematic exercises, group projects, and computer-based methods.",
      },
      {
        name: "Chemistry",
        code: "26020",
        folder: "polytechnical-foundations/chemistry",
        description:
          "Covers atomic structure, bonding, thermodynamics, equilibrium, kinetics, acids/bases, and redox reactions. Connects chemistry to materials, catalysis, and element cycles with focus on technology and sustainability.",
      },
      {
        name: "Computer Programming",
        code: "02003",
        folder: "polytechnical-foundations/computer-programming",
        description:
          "Learn the basics of Python programming while solving real problems with code. You’ll practice everything from loops and functions to working with data, and even try out simple projects. A hands-on way to build the coding skills every engineer needs.",
      },
      {
        name: "Physics",
        code: "10063",
        folder: "polytechnical-foundations/physics1",
        description:
          "Covers the big three of engineering physics: mechanics, thermodynamics, and electromagnetism: plus  experiments. You’ll learn to model real systems, crunch data in Python, and see how physics explains (almost) everything around you.",
      },
      {
        name: "Statistics",
        code: "02402",
        folder: "polytechnical-foundations/statistics",
        description:
          "Learn how to make sense of data with graphs, probability, and statistical models. You’ll try out tools like Python to test ideas, run regressions, and check if results actually make sense.",
      },
      {
        name: "Interdisciplinary Bioengineering",
        code: "27020",
        folder: "polytechnical-foundations/interdisciplinary-bioengineering",
        description:
          "Get an intro to biology and biotechnology and see how they connect to engineering. From DNA and proteins to ecosystems and data science, you’ll explore how biology can inspire tech. Finish with a group project solving a real-world problem.",
      },
      {
        name: "Science, Technology and Society",
        code: "42620",
        folder: "polytechnical-foundations/science-technology-and-society",
        description:
          "Explore how technology shapes society and sustainability from ethics and the SDGs to public debates about innovation. You’ll analyze real cases, tackle dilemmas, and learn tools to think critically about the role of engineers in the world.",
      },
      {
        name: "Mathematics 2",
        code: "01034",
        folder: "rest-of-obligatory-courses/maths2",
        description:
          "Takes math to the next level with differential equations, infinite series, and Fourier series. You’ll learn how to solve complex systems, test stability, and approximate functions.",
        separated: true,
      },
    ],
  },
  {
    id: "advanced",
    label: "Advanced Systems",
    shortLabel: "Advanced",
    emphasis: "Advanced Materials",
    description:
      "The Advanced Materials specialization is about creating sustainable and functional materials for the future. From nanotechnology and modeling to acoustics, physics, and manufacturing, it opens doors across cutting-edge engineering fields.",
    courses: [
      [
        "Introduction to Advanced Materials",
        "41680",
        "introduction-to-advanced-materials",
      ],
      [
        "Introduction to Numerical Algorithms",
        "02601",
        "introduction-to-numerical-algorithms",
      ],
      ["Resource Engineering", "12139", "resource-engineering"],
      [
        "Physics for Materials and Energy",
        "10080",
        "physics-for-materials-and-energy",
      ],
      ["Materials Technology", "41684", "materials-technology"],
      [
        "Materials Characterization and Testing",
        "41685",
        "materials-characterization-and-testing",
      ],
      [
        "Introduction to Machine Learning",
        "02451",
        "introduction-to-machine-learning",
      ],
      ["Image Analysis", "02503", "image-analysis"],
      ["Mathematical Modelling", "02526", "mathematical-modelling"],
      ["Introduction to 3D printing", "41789", "introduction-to-3d-printing"],
      [
        "Computer Simulation of Materials",
        "47212",
        "computer-simulations-of-materials",
      ],
    ].map(([name, code, folder]) => ({
      name,
      code,
      folder: `advanced-materials/${folder}`,
      description: noDescription,
    })),
  },
  {
    id: "cyber",
    label: "Cyber Systems",
    shortLabel: "Cyber",
    emphasis: "Cyber Systems",
    description:
      "The Cyber Systems specialization is about computers and integrated systems. It is objectively the best specialization for the best people.",
    courses: [
      [
        "Introduction to Cyber Systems",
        "02135",
        "introduction-to-cyber-systems",
      ],
      ["Discrete Mathematics", "01017", "discrete-mathematics"],
      [
        "Algorithms and Data Structures 1",
        "26020",
        "algorithms-and-data-structures1",
      ],
      ["Computer Science Modelling", "02141", "computer-science-modelling"],
      ["Functional Programming", "02157", "functional-programming"],
      [
        "Agile Object-oriented Software Development",
        "02160",
        "agile-object-oriented-software-development",
      ],
    ].map(([name, code, folder]) => ({
      name,
      code,
      folder: `cyber-systems/${folder}`,
      description: noDescription,
    })),
  },
  {
    id: "living",
    label: "Living Systems",
    shortLabel: "Living",
    emphasis: "Living Systems",
    description:
      "The Living Systems specialization covers everything from food and aquatic engineering to healthcare, medicine, and chemicals. It’s a gateway to Denmark’s world-leading biotech and pharma scene, with strong links to companies like Novo Nordisk.",
    courses: [
      [
        "Introduction to Living Systems",
        "12701",
        "introduction-to-living-systems",
      ],
      [
        "Introduction to Genetic Methods in Engineering",
        "25106",
        "introduction-to-genetic-methods-in-engineering",
      ],
      ["Biochemistry", "27022", "biochemistry"],
      [
        "Experimental Molecular Microbiology",
        "27027",
        "experimental-molecular-microbiology",
      ],
      [
        "Introduction to Bioinformatics",
        "22111",
        "introduction-to-bioinformatics",
      ],
      ["Ecology", "25105", "ecology"],
      ["Fisheries and Aquaculture", "25107", "fisheries-and-aquaculture"],
      ["Applied Molecular Techniques", "25108", "applied-molecular-techniques"],
      [
        "Biophysics and Biophysical Chemistry",
        "26211",
        "biophysics-and-biophysical-chemistry",
      ],
      ["Molecular Biology", "27026", "molecular-biology"],
      ["Fermentation Technology", "27034", "fermentation-technology"],
      ["Bio Process Technology", "28025", "bio-process-technology"],
    ].map(([name, code, folder]) => ({
      name,
      code,
      folder: `living-systems/${folder}`,
      description: noDescription,
    })),
  },
  {
    id: "future",
    label: "Future Energy",
    shortLabel: "Future",
    emphasis: "Future Energy",
    description:
      "The Future Energy specialization focuses on the green transition, from wind and solar power to electrolysis, applied chemistry, and sustainable entrepreneurship. It opens doors to careers in Denmark’s energy sector, with leading companies like Vestas driving innovation worldwide.",
    courses: [
      [
        "Introduction to Future Energy",
        "47202",
        "introduction-to-future-energy",
      ],
      [
        "Introduction to Numerical Algorithms",
        "02601",
        "introduction-to-numerical-algorithms",
      ],
      [
        "Physics for Materials and Energy",
        "10080",
        "physics-for-materials-and-energy",
      ],
      [
        "General Electrical Engineering",
        "46055",
        "general-electrical-engineering",
      ],
      ["Engineering Thermodynamics", "47201", "engineering-thermodynamics"],
      [
        "Physics of Solar Energy and Energy Storage",
        "10260",
        "physics-of-solar-energy-and-energy-storage",
      ],
      ["Climate Change", "12205", "climate-change"],
      ["Introduction to Wind Energy", "46000", "introduction-to-wind-energy"],
      [
        "Introduction to Energy Analytics",
        "46040",
        "introduction-to-energy-analytics",
      ],
      [
        "Electrochemical Energy Technologies",
        "47205",
        "electrochemical-energy-technologies",
      ],
      [
        "Electrochemical Energy Storage and Power2X",
        "47211",
        "electrochemical-energy-storage-and-power2x",
      ],
    ].map(([name, code, folder]) => ({
      name,
      code,
      folder: `future-energy/${folder}`,
      description: noDescription,
    })),
  },
] as const satisfies readonly CourseCategory[];

export const courseBankLinks = {
  studocu:
    "https://www.studocu.com/da/institution/danmarks-tekniske-universitet/2833",
  upload:
    "https://docs.google.com/forms/d/e/1FAIpQLScRXlMZhGqmZ9dPn71PonKcp-LJXH2vlWVxcZ1EDnoZ1hH96Q/viewform?usp=header",
} as const;
