import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './products.module.css';

type Product = {
  name: string;
  summary: string;
  thesis: string;
  evidence: string;
  to: string;
  action: string;
  mechanism: string[];
};

const products: Product[] = [
  {
    name: '阿城',
    summary: '桌宠形态的 AI 学习搭子，把任务规划、启发式问答、阶段总结和知识沉淀放进同一条学习流。',
    thesis: '我想做的不是答题机器，而是一个能陪人把学习走下去的搭子。',
    evidence: '产品概述 · 使用说明 · 系统架构 · 核心能力',
    to: '/docs/products/acheng',
    action: '阅读阿城产品文档',
    mechanism: ['意图识别', 'Tutor · Judge · Inquiry', '计划与阶段总结', '知识图谱与笔记'],
  },
  {
    name: 'Desktop-Claw',
    summary: '一个常驻桌面的 AI 小伙伴，从桌宠交互继续深入到轻量、可控、可拓展的 Agent Runtime。',
    thesis: '小时候想要的虚拟陪伴，我先用一个会思考的桌宠把它做出来。',
    evidence: '项目起步 · Runtime 思路 · Skills · Memory 设计',
    to: '/docs/products/desktop-claw',
    action: '阅读 Desktop-Claw 产品文档',
    mechanism: ['Gateway', 'Task Coordinator', 'Agent Loop', 'Skills · Context · Memory'],
  },
];

function ProductMechanism({items, label}: {items: string[]; label: string}) {
  return (
    <div className={styles.mechanism} role="img" aria-label={`${label}：${items.join('，然后是')}`}>
      {items.map((item, index) => (
        <div className={styles.mechanismStep} key={item}>
          <span className={styles.mechanismNode}>{item}</span>
          {index < items.length - 1 ? (
            <svg className={styles.mechanismArrow} viewBox="0 0 44 16" aria-hidden="true">
              <path d="M1 8h39M35 3l5 5-5 5" />
            </svg>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function Products(): ReactNode {
  return (
    <Layout title="产品" description="DjTang 的产品实验区">
      <main className={styles.surface}>
        <div className={styles.wrap}>
          <header className={styles.header}>
            <Heading as="h1" className={styles.title}>产品实验区</Heading>
            <p className={styles.subtitle}>
              这里不是作品陈列墙，而是两条仍在生长的产品主枝。先从阿城进入学习陪伴，再沿着 Desktop-Claw 继续理解桌宠背后的 Agent Runtime。
            </p>
            <a className={styles.startLink} href="#acheng">先认识阿城&nbsp; ↓</a>
          </header>

          <div className={styles.productTree}>
            {products.map((product, index) => (
              <article
                id={index === 0 ? 'acheng' : 'desktop-claw'}
                key={product.name}
                className={`${styles.product} ${index === 0 ? styles.primaryProduct : ''}`}>
                <div className={styles.branchMark} aria-hidden="true">
                  <span>{index === 0 ? '第一主枝' : '第二主枝'}</span>
                </div>
                <div className={styles.productContent}>
                  <Heading as="h2" className={styles.productTitle}>{product.name}</Heading>
                  <p className={styles.thesis}>{product.thesis}</p>
                  <p className={styles.summary}>{product.summary}</p>

                  <ProductMechanism items={product.mechanism} label={`${product.name} 的核心链路`} />

                  <footer className={styles.productFooter}>
                    <span className={styles.evidence}>{product.evidence}</span>
                    <Link className={styles.productLink} to={product.to}>{product.action}&nbsp; ↗</Link>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
