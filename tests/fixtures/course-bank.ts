import type {
  CourseBankCatalog,
  CourseBankCourse,
  CourseBankFile,
} from "../../src/scripts/course-bank/catalog";

export const courseBankRevision = "1".repeat(40);

const file = (
  filename: string,
  title: string,
  author: string,
  extension: string,
): CourseBankFile => ({
  filename,
  path: `polytechnical-foundations/maths1a/${filename}`,
  title,
  author,
  extension,
  mediaType:
    extension === "PDF"
      ? "application/pdf"
      : extension === "IPYNB"
        ? "application/x-ipynb+json"
        : "text/plain",
  bytes: 42,
});

const course = (
  id: string,
  name: string,
  code: string,
  root: string,
  files: CourseBankFile[] = [],
): CourseBankCourse => ({
  id,
  folder: id,
  path: `${root}/${id}`,
  code,
  name,
  description: "",
  files,
});

const foundations = [
  course("maths1a", "Mathematics 1a", "01003", "polytechnical-foundations", [
    file(
      "Lecture_notes-a-Ada_Lovelace.pdf",
      "Lecture notes",
      "Ada Lovelace",
      "PDF",
    ),
    file(
      "Exercises-a-Grace_Hopper.ipynb",
      "Exercises",
      "Grace Hopper",
      "IPYNB",
    ),
    file(
      "Safety_<img_onerror=window.injected=true>.txt",
      "Safety <img onerror=window.injected=true>",
      "Unknown",
      "TXT",
    ),
  ]),
  course("maths1b", "Mathematics 1b", "01004", "polytechnical-foundations"),
  course("chemistry", "Chemistry", "26020", "polytechnical-foundations"),
  course(
    "computer-programming",
    "Computer Programming",
    "02003",
    "polytechnical-foundations",
  ),
  course("physics1", "Physics", "10063", "polytechnical-foundations"),
  course("statistics", "Statistics", "02402", "polytechnical-foundations"),
  course(
    "interdisciplinary-bioengineering",
    "Interdisciplinary Bioengineering",
    "27020",
    "polytechnical-foundations",
  ),
  course(
    "science-technology-and-society",
    "Science, Technology and Society",
    "42620",
    "polytechnical-foundations",
  ),
  {
    ...course("maths2", "Mathematics 2", "01034", "rest-of-obligatory-courses"),
    separated: true as const,
  },
];

const namedCourses = (
  root: string,
  rows: readonly (readonly [string, string, string])[],
) => rows.map(([id, name, code]) => course(id, name, code, root));

export const courseBankCatalogFixture: CourseBankCatalog = {
  schemaVersion: 2,
  sourceRevision: courseBankRevision,
  repository: {
    rawBase: "https://raw.githubusercontent.com/GE-Union/CourseBank",
  },
  assets: { fileIcon: "res/file-icon.svg" },
  site: {
    title: "Course bank",
    tagline:
      "Find your relevant courses and notes - from students for students!",
    links: [
      {
        id: "studocu",
        heading: "See more on",
        label: "Studocu",
        url: "https://www.studocu.com/da/institution/danmarks-tekniske-universitet/2833",
      },
      {
        id: "upload",
        heading: "Upload notes",
        label: "Here",
        url: "https://docs.google.com/forms/d/e/1FAIpQLScRXlMZhGqmZ9dPn71PonKcp-LJXH2vlWVxcZ1EDnoZ1hH96Q/viewform?usp=header",
      },
    ],
  },
  categories: [
    {
      id: "foundations",
      folder: "polytechnical-foundations",
      name: "Polytechnical Foundations",
      shortName: "Foundations",
      emphasis: "Polytechnical Foundations",
      description:
        "The Polytechnical Foundations are a set of courses all at DTU are required to take. They cover a wide variety of stuffs and suck sometimes. They are still cool in general tho.",
      courses: foundations,
    },
    {
      id: "advanced",
      folder: "advanced-materials",
      name: "Advanced Materials",
      shortName: "Advanced",
      emphasis: "Advanced Materials",
      description:
        "The Advanced Materials specialization is about creating sustainable materials.",
      courses: namedCourses("advanced-materials", [
        [
          "introduction-to-advanced-materials",
          "Introduction to Advanced Materials",
          "41680",
        ],
        [
          "introduction-to-numerical-algorithms",
          "Introduction to Numerical Algorithms",
          "02601",
        ],
        ["resource-engineering", "Resource Engineering", "12139"],
        [
          "physics-for-materials-and-energy",
          "Physics for Materials and Energy",
          "10080",
        ],
        ["materials-technology", "Materials Technology", "41684"],
        [
          "materials-characterization-and-testing",
          "Materials Characterization and Testing",
          "41685",
        ],
        [
          "introduction-to-machine-learning",
          "Introduction to Machine Learning",
          "02451",
        ],
        ["image-analysis", "Image Analysis", "02503"],
        ["mathematical-modelling", "Mathematical Modelling", "02526"],
        ["introduction-to-3d-printing", "Introduction to 3D printing", "41789"],
        [
          "computer-simulations-of-materials",
          "Computer Simulation of Materials",
          "47212",
        ],
        ["Design-Build-4", "Design-Build 4", "22400"],
      ]),
    },
    {
      id: "cyber",
      folder: "cyber-systems",
      name: "Cyber Systems",
      shortName: "Cyber",
      emphasis: "Cyber Systems",
      description:
        "The Cyber Systems specialization is about integrated systems.",
      courses: namedCourses("cyber-systems", [
        [
          "introduction-to-cyber-systems",
          "Introduction to Cyber Systems",
          "02135",
        ],
        ["discrete-mathematics", "Discrete Mathematics", "01017"],
        [
          "algorithms-and-data-structures1",
          "Algorithms and Data Structures 1",
          "02105",
        ],
        ["computer-science-modelling", "Computer Science Modelling", "02141"],
        ["functional-programming", "Functional Programming", "02157"],
        [
          "agile-object-oriented-software-development",
          "Agile Object-oriented Software Development",
          "02160",
        ],
      ]),
    },
    {
      id: "living",
      folder: "living-systems",
      name: "Living Systems",
      shortName: "Living",
      emphasis: "Living Systems",
      description: "The Living Systems specialization covers bioengineering.",
      courses: namedCourses(
        "living-systems",
        Array.from({ length: 12 }, (_, index) => [
          `living-course-${index + 1}`,
          `Living course ${index + 1}`,
          `27${String(index).padStart(3, "0")}`,
        ]),
      ),
    },
    {
      id: "future",
      folder: "future-energy",
      name: "Future Energy",
      shortName: "Future",
      emphasis: "Future Energy",
      description:
        "The Future Energy specialization supports the green transition.",
      courses: namedCourses(
        "future-energy",
        Array.from({ length: 11 }, (_, index) => [
          `future-course-${index + 1}`,
          `Future course ${index + 1}`,
          `47${String(index).padStart(3, "0")}`,
        ]),
      ),
    },
  ],
};

/** Deterministic test stand-in; production continues to use the remote icon. */
export const courseBankIconFixture = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
  <path fill="#f4f4f4" stroke="#aaa" d="M7 2h15l7 7v25H7z"/>
  <path fill="none" stroke="#aaa" d="M22 2v8h7"/>
</svg>`;
