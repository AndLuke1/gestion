import { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { useDataService } from '../../../lib/data/DataServiceProvider';
import type { Project, ProjectDocument } from '../../../lib/data/DataService';

export default function ProjectDocsPage() {
  const dataService = useDataService();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    (async () => {
      const all = await dataService.listProjects();
      setProjects(all);
      if (all.length > 0) {
        setSelectedProjectId(all[0].id);
      }
    })();
  }, [dataService]);

  useEffect(() => {
    if (!selectedProjectId) return;
    (async () => {
      const docs = await dataService.listProjectDocs(selectedProjectId);
      setDocuments(docs);
      if (docs.length > 0) {
        setSelectedDocId(docs[0].id);
        setTitle(docs[0].title);
        setContent(docs[0].contentMd);
      } else {
        setSelectedDocId(null);
        setTitle('');
        setContent('');
      }
    })();
  }, [dataService, selectedProjectId]);

  const htmlPreview = DOMPurify.sanitize(marked.parse(content ?? '') as string);

  async function handleSave() {
    if (!selectedProjectId) return;
    await dataService.createProjectDoc(selectedProjectId, { title: title || 'Nuevo documento', contentMd: content });
    const docs = await dataService.listProjectDocs(selectedProjectId);
    setDocuments(docs);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedProjectId}
          onChange={(event) => setSelectedProjectId(event.target.value)}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <select
          value={selectedDocId ?? ''}
          onChange={(event) => {
            const doc = documents.find((d) => d.id === event.target.value);
            setSelectedDocId(event.target.value);
            setTitle(doc?.title ?? '');
            setContent(doc?.contentMd ?? '');
          }}
          className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="">Nuevo documento</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.title}
            </option>
          ))}
        </select>
        <button
          onClick={handleSave}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand-600"
        >
          Guardar
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="min-h-[360px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-mono leading-relaxed dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-700 dark:bg-slate-900">
          <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
        </div>
      </div>
    </div>
  );
}
