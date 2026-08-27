export const courseBankStructureFixture = {
  "polytechnical-foundations": {
    maths1a: [
      "Lecture_notes-a-Ada_Lovelace.pdf",
      "Exercises-a-Grace_Hopper.ipynb",
      "Safety_<img_onerror=window.injected=true>.txt",
    ],
    maths1b: [],
  },
  "advanced-materials": {
    "Design-Build-4": ["Should_not_render.pdf"],
  },
} as const;

/** Deterministic test stand-in; production continues to use the remote icon. */
export const courseBankIconFixture = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
  <path fill="#f4f4f4" stroke="#aaa" d="M7 2h15l7 7v25H7z"/>
  <path fill="none" stroke="#aaa" d="M22 2v8h7"/>
</svg>`;
