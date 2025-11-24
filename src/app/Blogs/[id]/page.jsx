"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import parse from "html-react-parser";

export default function BlogPage() {
  const params = useParams();
  const slug = params.id;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      try {
        const res = await fetch(
          `https://localhost:7282/api/article/slug/${encodeURIComponent(slug)}`
        );
        if (!res.ok) throw new Error("خطا در دریافت مقاله");
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [slug]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  if (!article) return <div>مقاله پیدا نشد</div>;

  return (
    <div className="article-container">
      <div className="article-container-div">
        <img className='header-img-article' src={`https://localhost:7282` + article.coverImageUrl} alt="" />
        <div id="pos-article-text-109716"></div>
        <div id="pos-article-display-card-109718"></div>
        <h1 id="article-title" className="mb-6 text-3xl font-bold">{article.title}</h1>
        <div className="content-of-article">
          <div>
          </div>
          <div></div>
          {article.contentJson
            ? parse(article.contentJson)
            : <p>محتوا موجود نیست</p>}
        </div>
        <br />
        <div id="pos-article-display-109712"></div>
      </div>
    </div>
  );
}
