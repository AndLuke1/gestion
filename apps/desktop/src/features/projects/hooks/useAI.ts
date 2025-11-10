import { useMemo } from 'react';
import { createAIAdapter, ProjectPlanSuggestion } from '../../../lib/ai/adapter';

interface InitPlanInput {
  goal: string;
  scope: string;
  deadline: string;
  constraints: string[];
  resources: string[];
  budget: number;
}

interface InitPlanResult extends ProjectPlanSuggestion {
  summary: string;
}

const adapterPromise = createAIAdapter({ provider: 'none' });

export function useAI() {
  return useMemo(() => ({
    async initProjectPlan(input: InitPlanInput): Promise<InitPlanResult> {
      const adapter = await adapterPromise;
      const result = await adapter.initProjectPlan(input);
      return (
        result ?? {
          title: input.goal,
          summary: `Plan inicial para ${input.goal}.`,
          projectType: 'personal',
          smartGoal: input.goal,
          milestones: [],
          kanbanColumns: [],
          initialChecklist: [],
          weeklyEstimate: 0,
          risks: [],
          stakeholders: []
        }
      );
    }
  }), []);
}
