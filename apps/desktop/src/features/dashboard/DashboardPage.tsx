import { useEffect, useState } from 'react';
import { useDataService } from '../../lib/data/DataServiceProvider';
import type { Project, Milestone } from '../../lib/data/DataService';
import { UpcomingMilestones } from '../projects/components/UpcomingMilestones';
import { ProjectSummaryCard } from '../projects/components/ProjectSummaryCard';

export default function DashboardPage() {
  const dataService = useDataService();
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Record<string, Milestone[]>>({});

  useEffect(() => {
    (async () => {
      const activeProjects = await dataService.listProjects({ status: ['active', 'idea'] });
      setProjects(activeProjects);
      const milestoneEntries = await Promise.all(
        activeProjects.map(async (project) => {
          const items = await dataService.listMilestones(project.id);
          return [project.id, items] as const;
        })
      );
      setMilestones(Object.fromEntries(milestoneEntries));
    })();
  }, [dataService]);

  const upcoming = Object.entries(milestones)
    .flatMap(([projectId, items]) =>
      items.map((milestone) => ({ ...milestone, project: projects.find((p) => p.id === projectId)! }))
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Tus proyectos activos</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Seguimiento rápido de avance, próximos hitos y salud financiera.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectSummaryCard
              key={project.id}
              project={project}
              milestones={milestones[project.id] ?? []}
            />
          ))}
        </div>
      </section>
      <section>
        <UpcomingMilestones milestones={upcoming} />
      </section>
    </div>
  );
}
