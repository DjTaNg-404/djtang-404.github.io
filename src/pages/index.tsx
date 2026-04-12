import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type SocialLink = {
  platform: string;
  icon: ReactNode;
  handle: string;
  link: string;
  color: string;
};

type ContentCard = {
  title: string;
  description: string;
  to: string;
  action: string;
};

const GithubIcon = () => <svg viewBox="-74.4 -120.9 644.8 725.4" width="16" height="16" fill="currentColor"><path d="M165.9 389.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2 .6-2-1.3-4.3-4.3-5.2-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 0C106.1 0 0 105.3 0 244c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5 21.3 0 42.8 2.9 62.8 8.5 0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 449.8 496 354.9 496 244 496 105.3 383.5 0 244.8 0zM97.2 344.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>;
const MailIcon = () => <svg viewBox="-13.2 -16.5 114.4 99.02" width="16" height="16" fill="currentColor"><path d="M6 66.0162h14v-34l-20-15v43c0 3.315 2.685 6 6 6z"/><path d="M68 66.0162h14c3.315 0 6-2.685 6-6v-43l-20 15z"/><path d="M68 6.0162v26l20-15v-8c0-7.415-8.465-11.65-14.4-7.2z"/><path d="M20 32.0162v-26l24 18 24-18v26l-24 18z"/><path d="M0 9.0162v8l20 15v-26l-5.6-4.2c-5.935-4.45-14.4-.215-14.4 7.2z"/></svg>;
const RednoteIcon = () => <svg viewBox="0 0 256 256" width="16" height="16" fill="currentColor"><path d="M 29,0.33332825 C 13.959937,3.4666748 1.5356731,15.204498 0,31 -1.586103,47.314209 0,64.597672 0,81 v 102 c 0,18.76035 -4.7369685,44.19888 7.3333335,60 C 20.372129,260.06897 44.156731,256 63,256 h 111 35 c 5.78276,0 12.33244,0.84741 18,-0.33333 15.0401,-3.13336 27.46432,-14.87115 29,-30.66667 1.58612,-16.31419 0,-33.59769 0,-50 V 73 C 256,54.239685 260.73697,28.801102 248.66667,13 235.62787,-4.0689697 211.84329,0 193,0 H 82 47 C 41.217228,0 34.667561,-0.84741211 29,0.33332825 M 120,91 l -7,19 h 12 l -10,24 9,1 c -0.98794,2.68155 -2.31718,7.73317 -4.33334,9.83334 C 118.18945,146.3721 115.92654,146 114,146 c -4.35942,0 -13.16798,1.80539 -15.5,-3 -1.069664,-2.20416 0.465553,-4.98451 1.333336,-7 1.813624,-4.21228 4.222554,-8.51549 5.166664,-13 -2.17548,0 -4.92464,0.42967 -7,-0.33333 -7.778526,-2.85974 0.874031,-15.36435 2.66666,-19.66667 1.25875,-3.020981 2.75652,-9.584732 5.5,-11.5 C 110.01874,88.810822 115.88325,90.674988 120,91 m -79,63 c 2.750713,0 6.837379,0.81721 8.5,-2 1.769028,-2.99753 0.5,-9.58963 0.5,-13 V 106 C 50,102.90659 48.438198,93.464493 51.166668,91.5 53.41069,89.884308 62.832935,90.226166 63.833332,93 65.47065,97.539825 64,105.16241 64,110 v 32 c 0,5.48389 0.949112,11.8645 -1.333332,17 -2.177158,4.89861 -12.303417,9.27243 -17.333336,5.5 C 43.120155,162.84012 41.545292,156.59013 41,154 M 193,91 v 5 c 3.72887,0 8.4108,-0.763367 12,0.333328 11.97635,3.659424 11,15.422502 11,25.666672 1.99706,0 4.04419,-0.15562 6,0.33333 11.49335,2.87334 10,14.36401 10,23.66667 0,4.95615 0.93086,10.82184 -2.33333,15 -3.59567,4.60246 -9.48195,4 -14.66667,4 -1.6116,0 -4.26318,0.51051 -5.66667,-0.5 -2.62326,-1.88875 -3.78159,-7.50485 -4.33333,-10.5 3.28711,0 9.2179,1.12517 11.83333,-1.33334 C 219.9164,149.76859 218.65411,138.43454 215,136.5 c -1.93661,-1.02527 -4.88672,-0.5 -7,-0.5 h -15 v 29 h -14 v -29 h -14 v -14 h 14 v -12 h -9 V 96 h 9 v -5 h 14 m -32,5 v 14 h -8 v 42 h 13 v 13 H 120 L 125.33334,152.5 138,152 v -42 h -8 V 96 h 31 m 57,14 c 0,-2.84204 -0.51608,-6.25871 0.33333,-9 3.34434,-10.793121 19.61577,-2.093994 11.5,6.83333 -0.92279,1.01507 -2.54419,1.51106 -3.83333,1.83334 C 223.43948,110.30679 220.61993,110 218,110 M 41,110 36.833332,147 30,159 24,143 27,110 h 14 m 46,0 3,33 -6,15 h -2 c -5.366936,-8.49765 -6.053299,-17.26251 -7,-27 -0.672195,-6.91406 -2,-14.04004 -2,-21 h 14 m 106,0 v 12 h 9 v -12 h -9 m -75,42 -5,13 H 91 L 96.333336,151.5 104,151.66666 Z"/></svg>;
const CubeIcon = () => <svg viewBox="0 0 24 24" fillRule="evenodd" width="16" height="16" fill="currentColor"><path d="M2.667 5.3H8v2.667H5.333v2.666H2.667V8.467H.5v2.166h2.167V13.3H0V7.967h2.667V5.3zM2.667 13.3h2.666v2.667H8v2.666H2.667V13.3zM8 10.633h2.667V13.3H8v-2.667zM13.333 13.3v2.667h-2.666V13.3h2.666zM13.333 13.3v-2.667H16V13.3h-2.667z"></path><path clipRule="evenodd" d="M21.333 13.3v-2.667h-2.666V7.967H16V5.3h5.333v2.667H24V13.3h-2.667zm0-2.667H23.5V8.467h-2.167v2.166z"></path><path d="M21.333 13.3v5.333H16v-2.666h2.667V13.3h2.666z"></path></svg>;

const socialLinks: SocialLink[] = [
  { platform: 'GitHub', icon: <GithubIcon />, handle: 'DjTaNg-404', link: 'https://github.com/DjTaNg-404', color: '#181717' },
  { platform: 'Gmail', icon: <MailIcon />, handle: 'djtang404@gmail.com', link: 'mailto:djtang404@gmail.com', color: '#EA4335' },
  { platform: '小红书', icon: <RednoteIcon />, handle: 'DjTaNg', link: 'https://www.xiaohongshu.com/user/profile/5f06dfd90000000001001a86', color: '#FF2442' },
  { platform: 'ModelScope', icon: <CubeIcon />, handle: 'DjTaNg', link: 'https://www.modelscope.cn/profile/DjTaNg', color: '#624AFF' },
];

const contentCards: ContentCard[] = [
  {
    title: 'Desktop-Claw (AI桌宠)',
    description: '探索桌面级 Agent 交互，让 AI 真正陪伴在你的屏幕角落。',
    to: '/docs/products/desktop-claw',
    action: '查看开发记录',
  },
  {
    title: '关于 AI 时代的焦虑',
    description: '在被重塑的时代里，重新寻找开发者的定位与价值。',
    to: '/blog/ai-anxiety',
    action: '阅读随笔',
  },
  {
    title: '阿城 (智能体产品)',
    description: '基于 Coze 构建的 Agent 产品，探索大语言模型的工程落地。',
    to: '/docs/products/acheng',
    action: '阅读产品文档',
  },
];

export default function Home(): ReactNode {
  return (
    <Layout title="首页" description="DjTang 的产品实验与技术沉淀">
      <main className={styles.surface}>
        <div className={`container ${styles.shell}`}>
          <aside className={`${styles.glassCard} ${styles.profileCard}`}>
            <div className={styles.profileTop}>
              <img className={styles.avatarImage} src="/img/logo.jpg" alt="DjTang" />
              <div>
                <p className={styles.profileName}>DjTang (子棠)</p>
                <p className={styles.profileMeta}>Personal Builder</p>
              </div>
            </div>

            <div className={styles.socialNav}>
              {socialLinks.map((item) => (
                <a key={item.platform} className={styles.socialBadge} href={item.link} target="_blank" rel="noopener noreferrer" title={item.platform}>
                  <span className={styles.badgeLabel}>{item.icon}</span>
                  <span className={styles.badgeValue} style={{ backgroundColor: item.color }}>{item.handle}</span>
                </a>
              ))}
            </div>
          </aside>

          <section className={`${styles.glassCard} ${styles.heroCard}`}>
            <p className={styles.kicker}>Minimal Interface</p>
            <Heading as="h1" className={styles.heroTitle}>
              DjTang 的产品实验与技术沉淀
            </Heading>
            <p className={styles.heroSubtitle}>
              个人开发者。长期记录独立开发过程，探索并构建以 AI 为核心的创新产品。
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/products/desktop-claw">
                查看最新产品进展 ↗
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/intro">
                探索知识库 📚
              </Link>
            </div>
            <div className={styles.metricGrid}>
              <div className={styles.metricCard}>
                <p className={styles.metricLabel}>当前核心项目</p>
                <p className={styles.metricValue}>Desktop-Claw</p>
              </div>
              <div className={styles.metricCard}>
                <p className={styles.metricLabel}>近期关注点</p>
                <p className={styles.metricValue}>桌面级 AI 交互</p>
              </div>
            </div>
          </section>

          <section className={`${styles.glassCard} ${styles.streamCard}`}>
            <Heading as="h2" className={styles.streamTitle}>
              最新沉淀
            </Heading>
            <div className={styles.streamGrid}>
              {contentCards.map((item) => (
                <article key={item.title} className={styles.streamItem}>
                  <Heading as="h3" className={styles.streamItemTitle}>
                    {item.title}
                  </Heading>
                  <p className={styles.streamItemDescription}>{item.description}</p>
                  <Link className={styles.streamItemLink} to={item.to}>
                    {item.action}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
