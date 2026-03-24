import promptsData from '@/data/prompts.json';
import enterpriseData from '@/data/enterprise_prompts.json';
import PromptDetailClient from '@/components/PromptDetailClient';

export function generateStaticParams() {
  const allPrompts = [...promptsData, ...enterpriseData];
  return allPrompts.map((prompt) => ({
    id: prompt.id,
  }));
}

export default async function PromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PromptDetailClient id={id} />;
}
