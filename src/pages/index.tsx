import {type ReactNode, useEffect} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

/* ── SVG Icons ── */
const GithubIcon = () => <svg viewBox="-74.4 -120.9 644.8 725.4" width="16" height="16" fill="currentColor"><path d="M165.9 389.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 0C106.1 0 0 105.3 0 244c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 449.8 496 354.9 496 244 496 105.3 383.5 0 244.8 0zM97.2 344.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>;
const MailIcon = () => <svg viewBox="-13.2 -16.5 114.4 99.02" width="16" height="16" fill="currentColor"><path d="M6 66h14V32L0 17v43c0 3.3 2.7 6 6 6z"/><path d="M68 66h14c3.3 0 6-2.7 6-6V17L68 32z"/><path d="M68 6v26l20-15V9c0-7.4-8.5-11.6-14.4-7.2z"/><path d="M20 32V6l24 18 24-18v26L44 50z"/><path d="M0 9v8l20 15V6L14.4 1.8C8.5-2.7 0 1.6 0 9z"/></svg>;
const RednoteIcon = () => <svg viewBox="0 0 256 256" width="16" height="16" fill="currentColor"><path d="M29 .3C14 3.5 1.5 15.2 0 31c-1.6 16.3 0 33.6 0 50v102c0 18.8-4.7 44.2 7.3 60C20.4 260 44.2 256 63 256h146c5.8 0 12.3.8 18-.3 15-3.2 27.5-14.9 29-30.7 1.6-16.3 0-33.6 0-50V73c0-18.8 4.7-44.2-7.3-60C235.6-4 211.8 0 193 0H47c-5.8 0-12.3-.8-18 .3M120 91l-7 19h12l-10 24 9 1c-1 2.7-2.3 7.7-4.3 9.8-1.5 1.5-3.8 1.2-5.7 1.2-4.4 0-13.2 1.8-15.5-3-1-2.2.5-5 1.3-7 1.8-4.2 4.2-8.5 5.2-13-2.2 0-4.9.4-7-.3-7.8-2.9.9-15.4 2.7-19.7 1.3-3 2.8-9.6 5.5-11.5C110 88.8 115.9 90.7 120 91m-79 63c2.8 0 6.8.8 8.5-2 1.8-3 .5-9.6.5-13v-33c0-3.1-1.6-12.5 1.2-14.5 2.2-1.6 11.7-1.3 12.6 1.5 1.7 4.5.2 12.2.2 17v32c0 5.5.9 11.9-1.3 17-2.2 4.9-12.3 9.3-17.3 5.5-2.2-1.7-3.8-7.9-4.4-10.5M193 91v5c3.7 0 8.4-.8 12 .3 12 3.7 11 15.4 11 25.7 2 0 4-.2 6 .3 11.5 2.9 10 14.4 10 23.7 0 5-.9 10.8-2.3 15-3.6 4.6-9.5 4-14.7 4-1.6 0-4.3.5-5.7-.5-2.6-1.9-3.8-7.5-4.3-10.5 3.3 0 9.2 1.1 11.8-1.3 3.1-2.9 1.8-14.2-1.8-16.2-1.9-1-4.9-.5-7-.5h-15v29h-14v-29h-14v-14h14v-12h-9V96h9v-5h14m-32 5v14h-8v42h13v13H120l5.3-12.5L138 152v-42h-8V96h31m57 14c0-2.8-.5-6.3.3-9 3.3-10.8 19.6-2.1 11.5 6.8-.9 1-2.5 1.5-3.8 1.8-2.6.6-5.4.4-8 .4M41 110l-4.2 37L30 159l-6-16 3-33h14m46 0 3 33-6 15h-2c-5.4-8.5-6-17.3-7-27-.7-6.9-2-14-2-21h14m106 0v12h9v-12h-9m-75 42-5 13h-17l5.3-13.5L104 151.7z"/></svg>;
const ModelScopeIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M2.667 5.3H8v2.667H5.333v2.666H2.667V8.467H.5v2.166h2.167V13.3H0V7.967h2.667V5.3zM2.667 13.3h2.666v2.667H8v2.666H2.667V13.3zM8 10.633h2.667V13.3H8v-2.667zM13.333 13.3v2.667h-2.666V13.3h2.666zM13.333 13.3v-2.667H16V13.3h-2.667z"/><path fillRule="evenodd" clipRule="evenodd" d="M21.333 13.3v-2.667h-2.666V7.967H16V5.3h5.333v2.667H24V13.3h-2.667zm0-2.667H23.5V8.467h-2.167v2.166z"/><path d="M21.333 13.3v5.333H16v-2.666h2.667V13.3h2.666z"/></svg>;

/* ── Data ── */
type SocialItem = { platform: string; icon: ReactNode; link: string };

const socials: SocialItem[] = [
  { platform: 'GitHub', icon: <GithubIcon />, link: 'https://github.com/DjTaNg-404' },
  { platform: 'Gmail', icon: <MailIcon />, link: 'mailto:djtang404@gmail.com' },
  { platform: '小红书', icon: <RednoteIcon />, link: 'https://www.xiaohongshu.com/user/profile/5f06dfd90000000001001a86' },
  { platform: 'ModelScope', icon: <ModelScopeIcon />, link: 'https://www.modelscope.cn/profile/DjTaNg' },
];

type Leaf = { title: string; desc: string; to: string };

const productLeaves: Leaf[] = [
  { title: 'Desktop-Claw', desc: '探索桌面级 Agent 交互，让 AI 陪伴在屏幕角落。', to: '/docs/products/desktop-claw' },
  { title: '阿城', desc: '基于 Coze 构建的 Agent 产品，探索大模型的工程落地。', to: '/docs/products/acheng' },
];

const docLeaves: Leaf[] = [
  { title: 'Agent Runtime', desc: 'Agent 运行时设计与能力边界探索。', to: '/docs/agent/runtime' },
  { title: 'Streaming 工程', desc: '流式传输的工程实践与踩坑记录。', to: '/docs/engineering/streaming' },
];

const blogLeaves: Leaf[] = [
  { title: '如何缓解 AI 焦虑', desc: '在被重塑的时代里，重新寻找定位与价值。', to: '/blog/ai-anxiety' },
];

/* ── Component ── */
export default function Home(): ReactNode {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const renderBranches = (leaves: Leaf[]) =>
    leaves.map((leaf, i) => (
      <div
        key={leaf.title}
        className={`${styles.branch} ${i % 2 === 0 ? styles.left : styles.right} ${styles.reveal}`}
      >
        <Link to={leaf.to} className={styles.leaf}>
          <h3 className={styles.leafTitle}>{leaf.title}</h3>
          <p className={styles.leafDesc}>{leaf.desc}</p>
        </Link>
      </div>
    ));

  return (
    <Layout title="首页" description="DjTang 的产品实验与技术沉淀">
      <main className={styles.canvas}>
        {/* ===== 树冠 (Crown) ===== */}
        <section className={styles.crown}>
          <div className={styles.avatarRing}>
            <img className={styles.avatar} src="/img/logo.jpg" alt="DjTang" />
          </div>
          <h1 className={styles.heroName}>
            DjTang
            <span className={styles.subName}>子棠</span>
          </h1>
          <div className={styles.tagRow}>
            <span className={styles.tag}>AI + 个人教育</span>
            <span className={styles.tagDot}>·</span>
            <span className={styles.tag}>AI + 虚拟陪伴</span>
            <span className={styles.tagDot}>·</span>
            <span className={styles.tag}>独立开发者</span>
          </div>
          <nav className={styles.socialRow}>
            {socials.map((s) => (
              <a key={s.platform} className={styles.socialIcon} href={s.link} target="_blank" rel="noopener noreferrer" title={s.platform}>
                {s.icon}
              </a>
            ))}
          </nav>
          <div className={styles.scrollCue} aria-hidden="true">
            <span>向下探索</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
          </div>
        </section>

        {/* ===== 树干 (Trunk) ===== */}
        <div className={styles.trunk}>
          {/* 产品 */}
          <div className={`${styles.node} ${styles.reveal}`}><span>产品</span></div>
          {renderBranches(productLeaves)}
          <div className={`${styles.more} ${styles.reveal}`}><Link to="/products">查看全部产品 →</Link></div>

          {/* 技术文档 */}
          <div className={`${styles.node} ${styles.reveal}`}><span>技术文档</span></div>
          {renderBranches(docLeaves)}
          <div className={`${styles.more} ${styles.reveal}`}><Link to="/docs/intro">查看全部文档 →</Link></div>

          {/* 随笔 */}
          <div className={`${styles.node} ${styles.reveal}`}><span>随笔</span></div>
          {renderBranches(blogLeaves)}
          <div className={`${styles.more} ${styles.reveal}`}><Link to="/blog">查看全部随笔 →</Link></div>

          {/* ===== 树根 (Roots) ===== */}
          <div className={`${styles.roots} ${styles.reveal}`}>
            <svg className={styles.rootsSvg} viewBox="0 0 200 100" fill="none">
              <path d="M100 0 C100 18 95 36 85 52 C78 64 65 74 50 88" stroke="#2c2c2c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 0 C100 18 105 36 115 52 C122 64 135 74 150 88" stroke="#2c2c2c" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 0 C100 14 97 28 90 40 C86 48 80 54 72 60" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              <path d="M100 0 C100 14 103 28 110 40 C114 48 120 54 128 60" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              <path d="M100 0 C100 22 92 44 78 58" stroke="#2c2c2c" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
              <path d="M100 0 C100 22 108 44 122 58" stroke="#2c2c2c" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
            </svg>
          </div>
        </div>
      </main>
    </Layout>
  );
}
