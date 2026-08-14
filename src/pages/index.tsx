import {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.4-5.5-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.1 4.7 18 5 18 5c.6 1.5.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const RednoteIcon = () => (
  <svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M29 .3C14 3.5 1.5 15.2 0 31c-1.6 16.3 0 33.6 0 50v102c0 18.8-4.7 44.2 7.3 60C20.4 260 44.2 256 63 256h146c5.8 0 12.3.8 18-.3 15-3.2 27.5-14.9 29-30.7 1.6-16.3 0-33.6 0-50V73c0-18.8 4.7-44.2-7.3-60C235.6-4 211.8 0 193 0H47c-5.8 0-12.3-.8-18 .3M120 91l-7 19h12l-10 24 9 1c-1 2.7-2.3 7.7-4.3 9.8-1.5 1.5-3.8 1.2-5.7 1.2-4.4 0-13.2 1.8-15.5-3-1-2.2.5-5 1.3-7 1.8-4.2 4.2-8.5 5.2-13-2.2 0-4.9.4-7-.3-7.8-2.9.9-15.4 2.7-19.7 1.3-3 2.8-9.6 5.5-11.5C110 88.8 115.9 90.7 120 91m-79 63c2.8 0 6.8.8 8.5-2 1.8-3 .5-9.6.5-13v-33c0-3.1-1.6-12.5 1.2-14.5 2.2-1.6 11.7-1.3 12.6 1.5 1.7 4.5.2 12.2.2 17v32c0 5.5.9 11.9-1.3 17-2.2 4.9-12.3 9.3-17.3 5.5-2.2-1.7-3.8-7.9-4.4-10.5M193 91v5c3.7 0 8.4-.8 12 .3 12 3.7 11 15.4 11 25.7 2 0 4-.2 6 .3 11.5 2.9 10 14.4 10 23.7 0 5-.9 10.8-2.3 15-3.6 4.6-9.5 4-14.7 4-1.6 0-4.3.5-5.7-.5-2.6-1.9-3.8-7.5-4.3-10.5 3.3 0 9.2 1.1 11.8-1.3 3.1-2.9 1.8-14.2-1.8-16.2-1.9-1-4.9-.5-7-.5h-15v29h-14v-29h-14v-14h14v-12h-9V96h9v-5h14m-32 5v14h-8v42h13v13H120l5.3-12.5L138 152v-42h-8V96h31m57 14c0-2.8-.5-6.3.3-9 3.3-10.8 19.6-2.1 11.5 6.8-.9 1-2.5 1.5-3.8 1.8-2.6.6-5.4.4-8 .4M41 110l-4.2 37L30 159l-6-16 3-33h14m46 0 3 33-6 15h-2c-5.4-8.5-6-17.3-7-27-.7-6.9-2-14-2-21h14m106 0v12h9v-12h-9m-75 42-5 13h-17l5.3-13.5L104 151.7z" />
  </svg>
);

const ModelScopeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M2.667 5.3H8v2.667H5.333v2.666H2.667V8.467H.5v2.166h2.167V13.3H0V7.967h2.667V5.3zM2.667 13.3h2.666v2.667H8v2.666H2.667V13.3zM8 10.633h2.667V13.3H8v-2.667zM13.333 13.3v2.667h-2.666V13.3h2.666zM13.333 13.3v-2.667H16V13.3h-2.667z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M21.333 13.3v-2.667h-2.666V7.967H16V5.3h5.333v2.667H24V13.3h-2.667zm0-2.667H23.5V8.467h-2.167v2.166z" />
    <path d="M21.333 13.3v5.333H16v-2.666h2.667V13.3h2.666z" />
  </svg>
);

type SocialItem = {platform: string; icon: ReactNode; link: string};

const socials: SocialItem[] = [
  {platform: 'GitHub', icon: <GithubIcon />, link: 'https://github.com/DjTaNg-404'},
  {platform: 'Gmail', icon: <MailIcon />, link: 'mailto:djtang404@gmail.com'},
  {platform: '小红书', icon: <RednoteIcon />, link: 'https://www.xiaohongshu.com/user/profile/5f06dfd90000000001001a86'},
  {platform: 'ModelScope', icon: <ModelScopeIcon />, link: 'https://www.modelscope.cn/profile/DjTaNg'},
];

type Leaf = {title: string; desc: string; to: string};

type HomepageLeavesData = {
  productLeaves?: Leaf[];
  docLeaves?: Leaf[];
  blogLeaves?: Leaf[];
};

const fallbackProductLeaves: Leaf[] = [
  {title: '阿城', desc: '我想做的不是答题机器，而是一个能陪人把学习走下去的搭子。', to: '/docs/products/acheng'},
  {title: 'Desktop-Claw', desc: '小时候想要的虚拟陪伴，我先用一个会思考的桌宠把它做出来。', to: '/docs/products/desktop-claw'},
];

const fallbackDocLeaves: Leaf[] = [
  {title: 'Agent Runtime', desc: '这篇是我把桌宠真正跑起来之后，对“怎么做内核”的一次整理。', to: '/docs/agent/runtime'},
  {title: 'Streaming 工程', desc: '我把自己理解流式输出的过程，从最底层通信重新讲了一遍。', to: '/docs/engineering/streaming'},
];

const fallbackBlogLeaves: Leaf[] = [
  {title: '如何缓解 AI 焦虑', desc: '和老师聊完之后，我开始重新理解怎样和 AI 时代相处。', to: '/blog/ai-anxiety'},
];

function getLeaves(leaves: Leaf[] | undefined, fallback: Leaf[]) {
  return Array.isArray(leaves) && leaves.length > 0 ? leaves : fallback;
}

function sortProducts(leaves: Leaf[]) {
  const priority = new Map([
    ['阿城', 0],
    ['Desktop-Claw', 1],
  ]);

  return [...leaves].sort(
    (a, b) => (priority.get(a.title) ?? 99) - (priority.get(b.title) ?? 99),
  );
}

export default function Home(): ReactNode {
  const avatarUrl = useBaseUrl('/img/logo.jpg');
  const homepageLeaves = usePluginData('homepage-leaves') as HomepageLeavesData | undefined;
  const productLeaves = sortProducts(
    getLeaves(homepageLeaves?.productLeaves, fallbackProductLeaves),
  );
  const docLeaves = getLeaves(homepageLeaves?.docLeaves, fallbackDocLeaves);
  const blogLeaves = getLeaves(homepageLeaves?.blogLeaves, fallbackBlogLeaves);

  const renderBranches = (leaves: Leaf[], section: 'products' | 'docs' | 'blog') =>
    leaves.map((leaf, index) => {
      const isFeatured = section === 'products' && leaf.title === '阿城';

      return (
        <article
          key={leaf.to}
          className={`${styles.branch} ${index % 2 === 0 ? styles.left : styles.right} ${isFeatured ? styles.featured : ''}`}>
          <Link to={leaf.to} className={styles.leaf}>
            {isFeatured ? <span className={styles.primaryLeaf}>第一项目</span> : null}
            <h3 className={styles.leafTitle}>{leaf.title}</h3>
            <p className={styles.leafDesc}>{leaf.desc}</p>
            <span className={styles.leafAction} aria-hidden="true">继续阅读&nbsp; ↗</span>
          </Link>
        </article>
      );
    });

  return (
    <Layout title="首页" description="DjTang 的产品实验与技术沉淀">
      <main className={styles.canvas}>
        <section className={styles.crown} aria-labelledby="home-title">
          <div className={styles.crownInner}>
            <div className={styles.avatarRing}>
              <img className={styles.avatar} src={avatarUrl} alt="DjTang（子棠）" />
            </div>
            <div className={styles.intro}>
              <h1 id="home-title" className={styles.heroName}>
                DjTang <span className={styles.subName}>子棠</span>
              </h1>
              <p className={styles.identity}>AI 应用开发者 · 教育与陪伴产品探索 · SCAU / CityUHK(DG)</p>
              <p className={styles.heroStatement}>
                我在探索教育、陪伴与 AI 应用，也把产品实验和技术过程持续写下来。
              </p>
              <nav className={styles.socialRow} aria-label="社交链接">
                {socials.map((social) => (
                  <a
                    key={social.platform}
                    className={styles.socialIcon}
                    href={social.link}
                    target={social.link.startsWith('http') ? '_blank' : undefined}
                    rel={social.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.platform}
                    title={social.platform}>
                    {social.icon}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <Link className={styles.startLink} to="/docs/products/acheng">
            从阿城开始
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M5 19 19 5M10 5h9v9" />
            </svg>
          </Link>
        </section>

        <div id="journey" className={styles.trunk}>
          <section className={styles.treeSection} aria-labelledby="products-node">
            <header className={styles.node}>
              <span className={styles.nodeDot} aria-hidden="true" />
              <h2 id="products-node">代表产品</h2>
            </header>
            {renderBranches(productLeaves, 'products')}
            <div className={styles.more}><Link to="/products">查看产品全貌&nbsp; ↗</Link></div>
          </section>

          <section className={styles.treeSection} aria-labelledby="docs-node">
            <header className={styles.node}>
              <span className={styles.nodeDot} aria-hidden="true" />
              <h2 id="docs-node">技术沉淀</h2>
            </header>
            {renderBranches(docLeaves, 'docs')}
            <div className={styles.more}><Link to="/docs/intro">进入文档&nbsp; ↗</Link></div>
          </section>

          <section className={styles.treeSection} aria-labelledby="blog-node">
            <header className={styles.node}>
              <span className={styles.nodeDot} aria-hidden="true" />
              <h2 id="blog-node">随笔</h2>
            </header>
            {renderBranches(blogLeaves, 'blog')}
            <div className={styles.more}><Link to="/blog">阅读全部随笔&nbsp; ↗</Link></div>
          </section>

          <div className={styles.roots} aria-hidden="true">
            <svg className={styles.rootsSvg} viewBox="0 0 220 92" fill="none">
              <path d="M110 0c0 23-9 39-27 50L36 82" />
              <path d="M110 0c0 23 9 39 27 50l47 32" />
              <path d="M110 16c-3 20-17 33-41 39L17 67" />
              <path d="M110 16c3 20 17 33 41 39l52 12" />
              <path d="M110 37c-9 20-25 33-48 40" />
              <path d="M110 37c9 20 25 33 48 40" />
            </svg>
          </div>
        </div>
      </main>
    </Layout>
  );
}
