import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import styles from './styles.module.css';

function BlogListPageMetadata({metadata}: Props): ReactNode {
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const title = permalink === '/' ? siteTitle : blogTitle;

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent({metadata, items, sidebar}: Props): ReactNode {
  const getYear = (item: Props['items'][number]) =>
    String(new Date(item.content.metadata.date).getFullYear());
  const years = Array.from(new Set(items.map(getYear)));

  return (
    <BlogLayout sidebar={sidebar}>
      <header className={styles.header}>
        <h1 className={styles.title}>{metadata.blogTitle}</h1>
        <p className={styles.description}>{metadata.blogDescription}</p>
      </header>
      <div className={styles.archive}>
        {years.map((year) => (
          <section className={styles.yearGroup} key={year} aria-labelledby={`year-${year}`}>
            <div className={styles.yearMarker}>
              <span className={styles.yearRing} aria-hidden="true" />
              <h2 id={`year-${year}`}>{year}</h2>
            </div>
            <div className={styles.yearPosts}>
              <BlogPostItems items={items.filter((item) => getYear(item) === year)} />
            </div>
          </section>
        ))}
      </div>
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
