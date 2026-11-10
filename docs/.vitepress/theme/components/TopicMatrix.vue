<template>
  <div class="topic-matrix-section">
    <div class="section-heading">
      <span class="heading-icon">🍃</span>
      <h2 class="heading-title">六大核心专题 SEO / GEO 知识矩阵</h2>
    </div>

    <div class="matrix-grid">
      <div v-for="topic in topics" :key="topic.title" class="topic-card">
        <div class="card-top">
          <span class="topic-badge">{{ topic.badge }}</span>
          <h3 class="topic-title">
            <a :href="topic.link">{{ topic.title }} ➔</a>
          </h3>
        </div>
        <p class="topic-desc">{{ topic.desc }}</p>
        <div class="sub-links">
          <a :href="topic.sub1Link">{{ topic.sub1Title }}</a>
          <span class="divider">｜</span>
          <a :href="topic.sub2Link">{{ topic.sub2Title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const topics = [
  {
    badge: '专题一 · 推荐',
    title: '42 家机场精选推荐',
    link: '/recommend/',
    desc: '从 5.6 元入门到顶级企业物理专线，按预算、线路、设备与真实晚高峰需求精选分流。',
    sub1Title: '高性价比便宜机场',
    sub1Link: '/recommend/budget/',
    sub2Title: '高端物理专线稳定',
    sub2Link: '/recommend/premium/'
  },
  {
    badge: '专题二 · 评测',
    title: '42 家深度机场评测',
    link: '/reviews/',
    desc: '主推光速云（TOP 1）、暮光加速、飞猫云等 42 家服务商真实测速大图、价格与解锁实测。',
    sub1Title: '16 家实测大图矩阵',
    sub1Link: '/reviews/tested/',
    sub2Title: '42 品牌数据全景表',
    sub2Link: '/brands/'
  },
  {
    badge: '专题三 · 免费',
    title: '免费节点与每日订阅',
    link: '/free-nodes/',
    desc: '揭秘 GitHub 每日更新节点抓取机制、拆解 6 大安全风险，提供 147 永久买断等低成本替代。',
    sub1Title: '免费节点 6 大安全风险',
    sub1Link: '/free-nodes/#二、使用免费节点必须警惕的-6-大致命安全隐患',
    sub2Title: '买断永久套餐替代',
    sub2Link: '/free-nodes/#四、为什么“不限时按量套餐”才是免费用户的终极归宿？'
  },
  {
    badge: '专题四 · 问答',
    title: '机场高频 FAQ 与排障',
    link: '/faq/',
    desc: '汇聚 30+ 真实高频搜索故障：节点全红超时、关代理无法上网、ChatGPT 1020 报错自愈决策树。',
    sub1Title: '节点全红超时排障',
    sub1Link: '/faq/#第一部分：节点连通性与超时故障-connection-timeout',
    sub2Title: '晚高峰变慢拥堵分析',
    sub2Link: '/faq/#第二部分：速度与晚高峰拥堵问题-speed-stability'
  },
  {
    badge: '专题五 · 避坑',
    title: '跑路预警与安全风控',
    link: '/risk-warning/',
    desc: '识别机场跑路 5 大停服前兆、拆解 1 元 1000G 超售圈钱套路与同源换皮站群，执行月付止损法则。',
    sub1Title: '跑路前 5 大前兆信号',
    sub1Link: '/risk-warning/#一、机场跑路前的-5-大经典技术特征（警报红线）',
    sub2Title: '双机场冷备容灾法',
    sub2Link: '/risk-warning/#五、科学上网防跑路最高黄金法则：双机场冷备与月付止损'
  },
  {
    badge: '专题六 · 试用',
    title: '免费试用与退款避坑',
    link: '/free-trial/',
    desc: '真假试用套路大盘点、揭秘“不支持退款”免责黑幕，提供 30 分钟 4 步晚高峰极限压力测试法。',
    sub1Title: '真假试用套路拆解',
    sub1Link: '/free-trial/#一、真试用-vs-假试用：识别-3-大常见体验套路'
    ,
    sub2Title: '4 步压力测试实操',
    sub2Link: '/free-trial/#三、试用期-4-步极限压力测试法（如何-30-分钟验出真假专线）'
  }
]
</script>

<style scoped>
.topic-matrix-section {
  margin: 40px 0;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px dashed var(--vp-c-brand-1);
  padding-bottom: 12px;
  margin-bottom: 24px;
}

.heading-icon {
  font-size: 1.5rem;
}

.heading-title {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
}

.topic-card {
  background: #FFFFFF;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(62, 39, 35, 0.04);
}

.topic-card:hover {
  transform: translateY(-3px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 20px rgba(77, 182, 172, 0.15);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.topic-badge {
  font-size: 11px;
  font-weight: 600;
  background: rgba(77, 182, 172, 0.15);
  color: var(--vp-c-brand-3);
  padding: 2px 8px;
  border-radius: 4px;
}

.topic-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-brand-3);
  border: none;
  padding: 0;
}

.topic-title a {
  color: inherit;
  text-decoration: none;
}

.topic-title a:hover {
  color: var(--vp-c-brand-1);
}

.topic-desc {
  margin: 0 0 14px 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.sub-links {
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
}

.sub-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
}

.sub-links a:hover {
  color: var(--vp-c-brand-3);
  text-decoration: underline;
}

.divider {
  color: var(--vp-c-text-3);
}
</style>
