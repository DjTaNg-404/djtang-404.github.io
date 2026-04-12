import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './products.module.css';

type ProductSlot = {
  name: string;
  stage: string;
  note: string;
  action?: string;
  to?: string;
};

const productSlots: ProductSlot[] = [
  {
    name: '阿城',
    stage: '产品文档已接入',
    note: '桌宠形态的 AI 学习搭子，已接入产品概述、交互截图、系统架构与使用说明。',
    action: '查看产品文档',
    to: '/docs/products/acheng',
  },
  {
    name: 'Desktop-Claw',
    stage: '产品文档已接入',
    note: '一个常驻桌面的 AI 小伙伴，已接入项目起步记录、Runtime 思路与能力边界设计。',
    action: '查看产品文档',
    to: '/docs/products/desktop-claw',
  },
];

export default function Products(): ReactNode {
  return (
    <Layout title="产品" description="DjTang 的产品实验区">
      <main className={styles.surface}>
        <div className={`container ${styles.wrap}`}>
          <section className={styles.headCard}>
            <p className={styles.kicker}>Product Lab</p>
            <Heading as="h1" className={styles.title}>
              产品实验区
            </Heading>
            <p className={styles.subtitle}>
              这里记录我正在探索和构建的产品，包含设计思路、开发进展与技术细节。
            </p>
            <Link className="button button--primary" to="/docs/products/desktop-claw">
              查看 Desktop-Claw
            </Link>
          </section>

          <section className={styles.grid}>
            {productSlots.map((slot) => (
              <article key={slot.name} className={styles.slotCard}>
                <Heading as="h2" className={styles.slotTitle}>
                  {slot.name}
                </Heading>
                <p className={styles.stage}>{slot.stage}</p>
                <p className={styles.note}>{slot.note}</p>
                {slot.to && slot.action ? (
                  <Link className={styles.slotLink} to={slot.to}>
                    {slot.action}
                  </Link>
                ) : null}
              </article>
            ))}
          </section>
        </div>
      </main>
    </Layout>
  );
}
