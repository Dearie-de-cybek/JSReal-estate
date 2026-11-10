import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ArticleForm } from "../article-form";

export default async function EditArticle({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const a = await db.article.findUnique({ where: { id } });
  if (!a) notFound();
  return <ArticleForm a={a} saved={!!saved} />;
}
