import promptsData from '@/data/prompts.json';
import PromptDetailClient from '@/components/PromptDetailClient';

export function generateStaticParams() {
  return promptsData.map((prompt) => ({
    id: prompt.id,
  }));
}

export default async function PromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PromptDetailClient id={id} />;
}
