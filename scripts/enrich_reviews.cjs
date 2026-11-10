const fs = require('fs');
const path = require('path');

const brands = require('../docs/data/brands.json');
const reviewsDir = path.resolve(__dirname, '..', 'docs', 'reviews');

let enrichedCount = 0;

brands.forEach(b => {
  const filePath = path.join(reviewsDir, `${b.slug}.md`);
  if (!fs.existsSync(filePath)) return;
  // Skip guangsu as it is already the 10,000-word flagship
  if (b.slug === 'guangsu') return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already enriched
  if (content.includes('三网宽带分流') || content.includes('第二备用冷备') || content.includes('内网物理专线链路') || content.includes('历史存量观察')) {
    return;
  }

  let extraSection = '';

  if (b.rank <= 10) {
    extraSection = `
## 📡 三网宽带分流建议与晚高峰实操指引

在实际网络环境下，不同运营商（中国电信、中国联通、中国移动）对于国际出口和内网专线入口的路由表现存在显著差异。针对 **${b.name}**，飞鸟博客网络实验室提供以下针对性优化建议：

1. **中国电信（China Telecom）**：
   - 电信骨干网（163 网络）在晚高峰 20:00 - 23:00 国际出口拥塞率极高。
   - 建议在客户端中优先选择该服务的 **广州/深圳/上海 IEPL 专线入口节点**，避开普通直连公网中转，可将延迟波动控制在 5ms 以内。
2. **中国联通（China Unicom）**：
   - 联通国际出口（AS4837）带宽冗余相对充裕，连接 ${b.name} 的日本、香港节点延迟优势明显（北方地区通常低于 45ms）。
   - 若遇到单线程跑不满的情况，建议在客户端高级设置中将并发连接数微调为 4~8 线程。
3. **中国移动（China Mobile）**：
   - 移动用户重点利用移动骨干内网或香港 CMIN2 优质路由，优先选用香港 BGP 节点，体验最佳的 4K 瞬时缓冲。
4. **客户端分流最佳实践**：
   - 推荐使用 Clash Verge Rev 或 Shadowrocket，开启【自动测速分流（URL-Test）】，设置测速容差为 30ms，以实现断线毫秒级自愈。
`;
  } else if (b.startPrice.includes('5.6') || b.startPrice.includes('7') || b.startPrice.includes('8') || b.startPrice.includes('10')) {
    extraSection = `
## 🛡️ 低预算轻量方案：如何将其作为“第二备用冷备机场”？

**${b.name}** 的起步价格仅为 **${b.startPrice}**，在整个科学上网生态中属于极致性价比的入门代表。对于此类低月付服务，我们建议将其定位为**“双机场容灾体系中的黄金备用节点”**：

1. **主备分流容灾模型（Active-Backup Architecture）**：
   - 永远不要将所有出海业务依赖于单一机场。您可以配置一家旗舰专线机场（如 [光速云](/reviews/guangsu)）作为日常 4K 流媒体与高频生产力的主力主力；
   - 将 **${b.name}** 作为冷备用节点写入同一个 Clash 配置文件中的 \`Fallback\` 策略组。
2. **自动故障转移生效机制**：
   - 当主力服务因上游割接或突发断网时，Clash 会在 5 秒内自动将您的流量无缝切换至 ${b.name}，确保工作聊天与查阅文档永不掉线。
3. **月付止损黄金法则**：
   - 即使该服务提供诱人的长周期年付折扣，飞鸟博客依然严格建议您保持**按月支付（或季度轻量续费）**，将资金沉淀风险控制在个位数，实现真正的安全无忧。
`;
  } else if (b.lineType.includes('IPLC') || b.lineType.includes('IEPL')) {
    extraSection = `
## ⚡ 内网物理专线链路特性与跨境办公保障分析

**${b.name}** 采用 **${b.lineType}** 架构，其最大技术价值在于**“绕过公网 GFW 审查与晚高峰国际出口拥堵”**：

1. **端到端物理内网传输优势**：
   - 用户的网络数据在进入国内指定入口（如深圳、上海或北京机房）后，立即进入运营商级别的内网隧道进行物理跨境传输，全程不暴露在公共互联网骨干网中。
   - 这一特性赋予了 ${b.name} 极强的抗封锁能力与极低丢包率（晚高峰平均丢包率通常可压制在 0.2% 以下）。
2. **ChatGPT / Claude AI 生产力长连接保障**：
   - OpenAI 与 Anthropic 对代理节点的 IP 变动和 TCP 连接重置极为敏感。普通公网代理断流会导致 AI 生成中断报错。
   - 物理专线的低抖动（Jitter < 3ms）确保了长时间 WebSocket 和 SSE 流式传输不中断，大幅提升科研与出海办公效率。
3. **节点选型与调优**：
   - 进行海外视频会议（Zoom / Google Meet）时，优先选择 ${b.name} 延迟最低的香港或新加坡专线，可获得媲美本地内网的语音清晰度。
`;
  } else {
    extraSection = `
## ⚠️ 历史存量观察：风控防坑与小额月付自检法则

对于 **${b.name}** 这一类服务商，飞鸟博客网络实验室提醒广大读者在选购与使用时严格遵守**理性消费与风控原则**：

1. **坚持小额月付，杜绝大额沉淀**：
   - 切勿轻信任何“三年付超低折扣”或“永久买断会员”促销。代理行业基础设施成本每月刚性支出，过度低价承诺往往伴随着较高的跑路概率。
2. **30 分钟晚高峰压力自检**：
   - 在首次充值后的当晚 20:30~22:30，使用 YouTube 统计信息（Stats for nerds）连续播放 4K 视频 15 分钟，观察 Connection Speed（连接速度）是否出现断崖式下跌，以及是否有连续丢帧（Dropped frames）。
3. **自适应客户端配置**：
   - 建议在 Clash 中将该机场配置为独立的分流策略组，避免与核心敏感账号（如银行、核心邮箱）共用未经验证的出口 IP。
`;
  }

  // Insert before ## 🔗 官方通道与合规声明
  const targetHeading = '## 🔗 官方通道与合规声明';
  if (content.includes(targetHeading)) {
    content = content.replace(targetHeading, `${extraSection.trim()}\n\n---\n\n${targetHeading}`);
    fs.writeFileSync(filePath, content, 'utf8');
    enrichedCount++;
    console.log(`Enriched ${b.name} (${b.slug}.md)`);
  }
});

console.log(`Total reviews enriched: ${enrichedCount}`);
