const DEFAULT_LIMITS = {
  products: 2,
  docs: 2,
  blog: 1,
};

function parseDate(value) {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }

  return 0;
}

function parseRank(value) {
  const rank = Number(value);
  return Number.isFinite(rank) ? rank : Number.POSITIVE_INFINITY;
}

function isEnabled(value) {
  return value === true || value === 'true';
}

function getHomepageDate(frontMatter, fallbackDate) {
  return parseDate(
    frontMatter.homepage_date ??
      frontMatter.date ??
      frontMatter.last_update?.date ??
      fallbackDate,
  );
}

function toDocCandidate(doc) {
  const frontMatter = doc.frontMatter ?? {};
  const date = getHomepageDate(frontMatter, doc.lastUpdatedAt);

  return {
    id: doc.id,
    title: frontMatter.homepage_title ?? frontMatter.sidebar_label ?? doc.title,
    desc: frontMatter.homepage_description ?? doc.description,
    to: doc.permalink,
    date,
    featured: isEnabled(frontMatter.homepage_featured),
    rank: parseRank(frontMatter.homepage_rank),
    excluded: isEnabled(frontMatter.homepage_exclude),
  };
}

function toBlogCandidate(post) {
  const metadata = post.metadata ?? {};
  const frontMatter = metadata.frontMatter ?? {};

  return {
    title: frontMatter.homepage_title ?? metadata.title,
    desc: frontMatter.homepage_description ?? metadata.description,
    to: metadata.permalink,
    date: parseDate(metadata.date),
    rank: parseRank(frontMatter.homepage_rank),
    excluded: metadata.unlisted || isEnabled(frontMatter.homepage_exclude),
  };
}

function toLeaf(candidate) {
  return {
    title: candidate.title,
    desc: candidate.desc,
    to: candidate.to,
  };
}

function compareByRankThenDate(a, b) {
  if (a.rank !== b.rank) {
    return a.rank - b.rank;
  }

  if (a.date !== b.date) {
    return b.date - a.date;
  }

  return a.title.localeCompare(b.title, 'zh-Hans');
}

function compareByDateThenRank(a, b) {
  if (a.date !== b.date) {
    return b.date - a.date;
  }

  if (a.rank !== b.rank) {
    return a.rank - b.rank;
  }

  return a.title.localeCompare(b.title, 'zh-Hans');
}

function pickLeaves(candidates, limit, compare) {
  return candidates
    .filter((candidate) => !candidate.excluded && candidate.title && candidate.to)
    .sort(compare)
    .slice(0, limit)
    .map(toLeaf);
}

module.exports = function homepageLeavesPlugin(_context, options = {}) {
  const limits = {...DEFAULT_LIMITS, ...(options.limits ?? {})};

  return {
    name: 'homepage-leaves',

    allContentLoaded({allContent, actions}) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default;
      const blogContent = allContent['docusaurus-plugin-content-blog']?.default;
      const currentDocsVersion =
        docsContent?.loadedVersions?.find((version) => version.versionName === 'current') ??
        docsContent?.loadedVersions?.[0];
      const docs = currentDocsVersion?.docs ?? [];
      const blogPosts = blogContent?.blogPosts ?? [];

      const docCandidates = docs.map(toDocCandidate);
      const productCandidates = docCandidates.filter((candidate) =>
        candidate.id.startsWith('products/'),
      );
      const featuredProducts = productCandidates.filter((candidate) => candidate.featured);
      const generalDocCandidates = docCandidates.filter(
        (candidate) => !candidate.id.startsWith('products/') && candidate.id !== 'intro',
      );
      const blogCandidates = blogPosts.map(toBlogCandidate);

      actions.setGlobalData({
        productLeaves: pickLeaves(
          featuredProducts.length > 0 ? featuredProducts : productCandidates,
          limits.products,
          compareByRankThenDate,
        ),
        docLeaves: pickLeaves(generalDocCandidates, limits.docs, compareByDateThenRank),
        blogLeaves: pickLeaves(blogCandidates, limits.blog, compareByDateThenRank),
      });
    },
  };
};
