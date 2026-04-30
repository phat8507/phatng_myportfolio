import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Check, Copy, Eye, EyeOff, Lock, RotateCcw } from "lucide-react";
import { projectsData } from "../../data/projects";
import type { ProjectData } from "../../data/projects";

type AdminMode = "add" | "edit";
type ProjectCategory = "research" | "event" | "leadership";

interface ProjectLinkDraft {
  label: string;
  url: string;
}

interface ProjectDraft {
  id: string;
  category: ProjectCategory;
  type: string;
  medal: string;
  title: string;
  role: string;
  overview: string;
  responsibilities: string;
  outcomes: string;
  tags: string;
  links: ProjectLinkDraft[];
  cardTags: string;
  cardDesc: string;
}

type ProjectObject = {
  id: string;
  category: ProjectCategory;
  type: string;
  medal: string | null;
  title: string;
  role: string;
  overview: string;
  responsibilities: string[];
  outcomes: string;
  tags: string[];
  links?: ProjectLinkDraft[];
  cardTags: string[];
  cardDesc: string;
};

const initialDraft: ProjectDraft = {
  id: "",
  category: "research",
  type: "",
  medal: "",
  title: "",
  role: "",
  overview: "",
  responsibilities: "",
  outcomes: "",
  tags: "",
  links: [
    { label: "", url: "" },
    { label: "", url: "" },
  ],
  cardTags: "",
  cardDesc: "",
};

const NEW_PROJECT_DRAFT_KEY = "portfolio-admin-new-project-draft";
const EDITED_PROJECT_DRAFT_KEY = "portfolio-admin-edited-project-draft";
const ADMIN_MODE_KEY = "portfolio-project-admin-mode";
const ADMIN_UNLOCKED_KEY = "portfolio-admin-unlocked";
// This is client-side protection only. For real security, use backend authentication.
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "change-this-password";

const loadJson = <T,>(key: string): T | null => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : null;
  } catch {
    return null;
  }
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const splitComma = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const splitLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const quote = (value: string) => JSON.stringify(value);

const projectToDraft = (project: ProjectData): ProjectDraft => ({
  id: project.id ?? "",
  category: project.category ?? "research",
  type: project.type ?? "",
  medal: project.medal ?? "",
  title: project.title ?? "",
  role: project.role ?? "",
  overview: project.overview ?? "",
  responsibilities: Array.isArray(project.responsibilities)
    ? project.responsibilities.join("\n")
    : "",
  outcomes: project.outcomes ?? "",
  tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
  links: Array.isArray(project.links) && project.links.length > 0
    ? project.links.map((link: ProjectLinkDraft) => ({
        label: link.label ?? "",
        url: link.url ?? "",
      }))
    : [
        { label: "", url: "" },
        { label: "", url: "" },
      ],
  cardTags: Array.isArray(project.cardTags) ? project.cardTags.join(", ") : "",
  cardDesc: project.cardDesc ?? "",
});

const draftToProject = (draft: ProjectDraft): ProjectObject => {
  const links = draft.links
    .map((link) => ({
      label: link.label.trim(),
      url: link.url.trim(),
    }))
    .filter((link) => link.label && link.url);

  const project: ProjectObject = {
    id: draft.id.trim() || toSlug(draft.title),
    category: draft.category,
    type: draft.type.trim(),
    medal: draft.medal.trim() || null,
    title: draft.title.trim(),
    role: draft.role.trim(),
    overview: draft.overview.trim(),
    responsibilities: splitLines(draft.responsibilities),
    outcomes: draft.outcomes.trim(),
    tags: splitComma(draft.tags),
    cardTags: splitComma(draft.cardTags),
    cardDesc: draft.cardDesc.trim(),
  };

  if (links.length > 0) {
    project.links = links;
  }

  return project;
};

const objectToCode = (project: ProjectObject) => {
  const lines = [
    "{",
    `  id: ${quote(project.id)},`,
    `  category: ${quote(project.category)},`,
    `  type: ${quote(project.type)},`,
    `  medal: ${project.medal ? quote(project.medal) : "null"},`,
    `  title: ${quote(project.title)},`,
    `  role: ${quote(project.role)},`,
    `  overview: ${quote(project.overview)},`,
    "  responsibilities: [",
    ...project.responsibilities.map((item) => `    ${quote(item)},`),
    "  ],",
    `  outcomes: ${quote(project.outcomes)},`,
    "  tags: [",
    ...project.tags.map((item) => `    ${quote(item)},`),
    "  ],",
  ];

  if (project.links && project.links.length > 0) {
    lines.push(
      "  links: [",
      ...project.links.map((link) => `    { label: ${quote(link.label)}, url: ${quote(link.url)} },`),
      "  ],"
    );
  }

  lines.push(
    "  cardTags: [",
    ...project.cardTags.map((item) => `    ${quote(item)},`),
    "  ],",
    `  cardDesc: ${quote(project.cardDesc)}`,
    "}"
  );

  return lines.join("\n");
};

const arrayToCode = (projects: ProjectObject[]) =>
  `export const projectsData = [\n${projects
    .map((project) =>
      objectToCode(project)
        .split("\n")
        .map((line) => `  ${line}`)
        .join("\n")
    )
    .join(",\n")}\n];`;

export function AdminPage() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(ADMIN_UNLOCKED_KEY) === "true");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [mode, setMode] = useState<AdminMode>(() => {
    const saved = localStorage.getItem(ADMIN_MODE_KEY);
    return saved === "edit" ? "edit" : "add";
  });
  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    const savedEdit = loadJson<{ selectedProjectId?: string }>(EDITED_PROJECT_DRAFT_KEY);
    return savedEdit?.selectedProjectId || projectsData[0]?.id || "";
  });
  const [draft, setDraft] = useState<ProjectDraft>(() => {
    const savedMode = localStorage.getItem(ADMIN_MODE_KEY);

    if (savedMode === "edit") {
      const savedEdit = loadJson<{ draft?: ProjectDraft }>(EDITED_PROJECT_DRAFT_KEY);
      if (savedEdit?.draft) {
        return { ...initialDraft, ...savedEdit.draft };
      }
    }

    const savedNew = loadJson<ProjectDraft>(NEW_PROJECT_DRAFT_KEY);
    return savedNew ? { ...initialDraft, ...savedNew } : initialDraft;
  });
  const [copiedTarget, setCopiedTarget] = useState<"object" | "array" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [showFullArray, setShowFullArray] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(projectsData.map((project) => project.category))) as ProjectCategory[],
    []
  );

  const selectedProject = useMemo(
    () => projectsData.find((project) => project.id === selectedProjectId) ?? projectsData[0],
    [selectedProjectId]
  );

  useEffect(() => {
    localStorage.setItem(ADMIN_MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    if (mode === "edit" && selectedProject) {
      const savedEdit = loadJson<{ selectedProjectId?: string; draft?: ProjectDraft }>(EDITED_PROJECT_DRAFT_KEY);
      const nextDraft = savedEdit?.selectedProjectId === selectedProject.id && savedEdit.draft
        ? { ...initialDraft, ...savedEdit.draft }
        : projectToDraft(selectedProject);

      window.setTimeout(() => setDraft(nextDraft), 0);
    }
  }, [mode, selectedProject]);

  const generatedProject = useMemo(() => draftToProject(draft), [draft]);

  const generatedObjectCode = useMemo(
    () => objectToCode(generatedProject),
    [generatedProject]
  );

  const generatedArrayCode = useMemo(() => {
    const existingProjects = projectsData.map((project) => draftToProject(projectToDraft(project)));

    if (mode === "edit") {
      const selectedIndex = existingProjects.findIndex((project) => project.id === selectedProjectId);
      if (selectedIndex >= 0) {
        return arrayToCode(
          existingProjects.map((project, index) =>
            index === selectedIndex ? generatedProject : project
          )
        );
      }
    }

    return arrayToCode([...existingProjects, generatedProject]);
  }, [generatedProject, mode, selectedProjectId]);

  const errors = {
    title: !draft.title.trim(),
    category: !draft.category,
    description: !draft.cardDesc.trim() && !draft.overview.trim(),
  };

  const hasValidationErrors = errors.title || errors.category || errors.description;

  const updateField = <K extends keyof ProjectDraft>(field: K, value: ProjectDraft[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const updateLink = (index: number, field: keyof ProjectLinkDraft, value: string) => {
    setDraft((current) => ({
      ...current,
      links: current.links.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const addLink = () => {
    setDraft((current) => ({
      ...current,
      links: [...current.links, { label: "", url: "" }],
    }));
  };

  const resetForm = () => {
    setDraft(initialDraft);
    localStorage.removeItem(NEW_PROJECT_DRAFT_KEY);
    setCopiedTarget(null);
    setStatusMessage("");
    setShowValidation(false);
  };

  const resetSelectedProject = () => {
    if (selectedProject) {
      setDraft(projectToDraft(selectedProject));
      localStorage.removeItem(EDITED_PROJECT_DRAFT_KEY);
      setCopiedTarget(null);
      setStatusMessage("");
      setShowValidation(false);
    }
  };

  const switchMode = (nextMode: AdminMode) => {
    setMode(nextMode);
    setCopiedTarget(null);
    setStatusMessage("");
    setShowValidation(false);
    if (nextMode === "add") {
      const savedNew = loadJson<ProjectDraft>(NEW_PROJECT_DRAFT_KEY);
      setDraft(savedNew ? { ...initialDraft, ...savedNew } : initialDraft);
    } else if (selectedProject) {
      const savedEdit = loadJson<{ selectedProjectId?: string; draft?: ProjectDraft }>(EDITED_PROJECT_DRAFT_KEY);
      if (savedEdit?.selectedProjectId === selectedProject.id && savedEdit.draft) {
        setDraft({ ...initialDraft, ...savedEdit.draft });
      } else {
        setDraft(projectToDraft(selectedProject));
      }
    }
  };

  const copyText = async (target: "object" | "array", text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedTarget(target);
    setStatusMessage(target === "object" ? "Project object copied." : "Full project array copied.");
    window.setTimeout(() => setCopiedTarget(null), 1800);
  };

  const saveDraft = () => {
    setShowValidation(true);

    if (hasValidationErrors) {
      setStatusMessage("Please fill in the required fields before saving.");
      return;
    }

    if (mode === "edit") {
      localStorage.setItem(
        EDITED_PROJECT_DRAFT_KEY,
        JSON.stringify({ selectedProjectId, draft })
      );
      setStatusMessage("Edited draft saved locally. Replace the matching project object in the data file to publish.");
    } else {
      localStorage.setItem(NEW_PROJECT_DRAFT_KEY, JSON.stringify(draft));
      setStatusMessage("Draft saved locally. Copy the generated object and paste it into the project data file to publish.");
    }
  };

  const unlockAdmin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_UNLOCKED_KEY, "true");
      setUnlocked(true);
      setPassword("");
      setPasswordError("");
      return;
    }

    setPasswordError("Incorrect password. Please try again.");
  };

  const lockAdmin = () => {
    sessionStorage.removeItem(ADMIN_UNLOCKED_KEY);
    setUnlocked(false);
    setPassword("");
    setPasswordError("");
  };

  if (!unlocked) {
    return (
      <main className="admin-page admin-access-page">
        <section className="admin-access-card">
          <span className="admin-eyebrow">Protected Area</span>
          <h1>Admin Access</h1>
          <p>Enter password to manage project entries.</p>

          <form className="admin-access-form" onSubmit={unlockAdmin}>
            <label className="admin-field">
              <span>Password</span>
              <div className="admin-password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {passwordError && (
              <div className="admin-access-error" role="alert">
                {passwordError}
              </div>
            )}

            <div className="admin-access-actions">
              <button type="submit" className="admin-save-button">
                Unlock
              </button>
              <a href="/" className="admin-home-link">
                Back to portfolio
              </a>
            </div>
          </form>

        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <span className="admin-eyebrow">Static Helper</span>
            <h1>Project Admin</h1>
            <p>Add and generate new portfolio project entries.</p>
          </div>
          <div className="admin-header-actions">
            <button type="button" className="admin-reset-button" onClick={lockAdmin}>
              <Lock size={14} />
              Lock Admin
            </button>
            <a href="/" className="admin-home-link">Back to portfolio</a>
          </div>
        </header>

        <div className="admin-note">
          Static helper only. To publish changes, copy the generated object and replace the matching entry in the project data file, then commit and redeploy.
        </div>

        <div className="admin-grid">
          <section className="admin-card admin-form-card">
            <div className="admin-mode-tabs" role="tablist" aria-label="Project admin mode">
              <button
                type="button"
                className={mode === "add" ? "is-active" : ""}
                onClick={() => switchMode("add")}
              >
                Add New Project
              </button>
              <button
                type="button"
                className={mode === "edit" ? "is-active" : ""}
                onClick={() => switchMode("edit")}
              >
                Edit Existing Project
              </button>
            </div>

            {mode === "edit" && (
              <label className="admin-field admin-project-select">
                <span>Select project</span>
                <select
                  value={selectedProjectId}
                  onChange={(event) => setSelectedProjectId(event.target.value)}
                >
                  {projectsData.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="admin-card-heading">
              <h2>{mode === "edit" ? "Edit Project Details" : "Project Details"}</h2>
              <div className="admin-action-group">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="admin-save-button"
                >
                  {mode === "edit" ? "Save Edited Draft" : "Save Draft"}
                </button>
                <button
                  type="button"
                  onClick={mode === "edit" ? resetSelectedProject : resetForm}
                  className="admin-reset-button"
                >
                  <RotateCcw size={14} />
                  {mode === "edit" ? "Reset to original" : "Reset"}
                </button>
              </div>
            </div>

            <div className="admin-save-note">
              Save Draft stores this only in your browser. To publish, copy the generated object into the project data file, commit, and redeploy.
            </div>

            {statusMessage && (
              <div className="admin-status-message" role="status">
                {statusMessage}
              </div>
            )}

            <div className="admin-form-grid">
              <label className="admin-field">
                <span>Title *</span>
                <input
                  value={draft.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="Project title"
                />
                {showValidation && errors.title && <small>Title is required.</small>}
              </label>

              <label className="admin-field">
                <span>ID</span>
                <input
                  value={draft.id}
                  onChange={(event) => updateField("id", event.target.value)}
                  placeholder="Auto-generated from title if empty"
                />
              </label>

              <label className="admin-field">
                <span>Category *</span>
                <select
                  value={draft.category}
                  onChange={(event) => updateField("category", event.target.value as ProjectCategory)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="admin-field">
                <span>Type</span>
                <input
                  value={draft.type}
                  onChange={(event) => updateField("type", event.target.value)}
                  placeholder="Academic Research"
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Role</span>
                <input
                  value={draft.role}
                  onChange={(event) => updateField("role", event.target.value)}
                  placeholder="Team Lead · Scrum Master"
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Medal / badge</span>
                <input
                  value={draft.medal}
                  onChange={(event) => updateField("medal", event.target.value)}
                  placeholder="Optional"
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Overview *</span>
                <textarea
                  value={draft.overview}
                  onChange={(event) => updateField("overview", event.target.value)}
                  placeholder="Full project overview for the modal"
                  rows={4}
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Responsibilities</span>
                <textarea
                  value={draft.responsibilities}
                  onChange={(event) => updateField("responsibilities", event.target.value)}
                  placeholder="One responsibility per line"
                  rows={5}
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Outcomes</span>
                <textarea
                  value={draft.outcomes}
                  onChange={(event) => updateField("outcomes", event.target.value)}
                  placeholder="Project outcomes"
                  rows={3}
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Tags / skills</span>
                <input
                  value={draft.tags}
                  onChange={(event) => updateField("tags", event.target.value)}
                  placeholder="Comma-separated modal tags"
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Card tags</span>
                <input
                  value={draft.cardTags}
                  onChange={(event) => updateField("cardTags", event.target.value)}
                  placeholder="Comma-separated card tags"
                />
              </label>

              <label className="admin-field admin-field-wide">
                <span>Card description *</span>
                <textarea
                  value={draft.cardDesc}
                  onChange={(event) => updateField("cardDesc", event.target.value)}
                  placeholder="Short description shown on the project card"
                  rows={3}
                />
                {showValidation && errors.description && <small>Description is required.</small>}
              </label>
            </div>

            <div className="admin-links-block">
              <div className="admin-subheading">
                <span>Links</span>
                <button type="button" onClick={addLink}>Add link</button>
              </div>
              {draft.links.map((link, index) => (
                <div className="admin-link-row" key={index}>
                  <input
                    value={link.label}
                    onChange={(event) => updateLink(index, "label", event.target.value)}
                    placeholder="Label"
                  />
                  <input
                    value={link.url}
                    onChange={(event) => updateLink(index, "url", event.target.value)}
                    placeholder="https://..."
                  />
                </div>
              ))}
            </div>

            <div className="admin-form-footer">
              <button
                type="button"
                onClick={saveDraft}
                className="admin-save-button"
              >
                {mode === "edit" ? "Save Edited Draft" : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={() => copyText("object", generatedObjectCode)}
                className="admin-copy-button"
              >
                {copiedTarget === "object" ? <Check size={14} /> : <Copy size={14} />}
                Copy Generated Object
              </button>
            </div>
          </section>

          <aside className="admin-side">
            <section className="admin-card">
              <div className="admin-card-heading">
                <h2>Live Preview</h2>
              </div>
              <div className="admin-preview-card">
                <div className="admin-preview-top">
                  <span>{generatedProject.type || "Project Type"}</span>
                  {generatedProject.medal && <strong>{generatedProject.medal}</strong>}
                </div>
                <div className="admin-preview-role">{generatedProject.role || "Project role"}</div>
                <h3>{generatedProject.title || "Project title"}</h3>
                <p>{generatedProject.cardDesc || "Short project description will appear here."}</p>
                <div className="admin-preview-tags">
                  {(generatedProject.cardTags.length ? generatedProject.cardTags : ["Tag", "Skill"]).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className="admin-card">
              <div className="admin-card-heading">
                <h2>Generated Project Object</h2>
                <button
                  type="button"
                  onClick={() => copyText("object", generatedObjectCode)}
                  className="admin-copy-button"
                >
                  {copiedTarget === "object" ? <Check size={14} /> : <Copy size={14} />}
                  {copiedTarget === "object"
                    ? "Copied"
                    : mode === "edit"
                      ? "Copy updated object"
                      : "Copy code"}
                </button>
              </div>
              <p className="admin-helper-text">
                {mode === "edit"
                  ? "Copy this object and replace the matching entry in the projects data array."
                  : "Copy this object and paste it into the projects data array."}
              </p>
              <pre className="admin-code-block"><code>{generatedObjectCode}</code></pre>
            </section>

            <section className="admin-card">
              <div className="admin-card-heading">
                <h2>{mode === "edit" ? "Full Updated Array" : "Full Array With New Project"}</h2>
                <div className="admin-action-group">
                  <button
                    type="button"
                    onClick={() => setShowFullArray((current) => !current)}
                    className="admin-reset-button"
                    aria-expanded={showFullArray}
                  >
                    {showFullArray ? "Hide full array" : "Show full array"}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyText("array", generatedArrayCode)}
                    className="admin-copy-button"
                  >
                    {copiedTarget === "array" ? <Check size={14} /> : <Copy size={14} />}
                    {copiedTarget === "array" ? "Copied" : "Copy full array"}
                  </button>
                </div>
              </div>
              <p className="admin-helper-text">
                Copy this block if you prefer replacing the entire projects data file export.
              </p>
              {showFullArray && (
                <pre className="admin-code-block admin-code-block--compact"><code>{generatedArrayCode}</code></pre>
              )}
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
