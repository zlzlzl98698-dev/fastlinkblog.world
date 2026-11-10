---
layout: doc
title: 移动端与软路由生态：Shadowrocket小火箭、v2rayNG与OpenClash全景指南
description: 2026 手机与路由器科学上网配置指南。涵盖 iPhone/iPad 小火箭 (Shadowrocket) 下载与扫码、Android v2rayNG/FlClash 配置、OpenClash 与 PassWall 软路由家庭全局透明代理。
---

# 移动端与软路由生态：Shadowrocket小火箭、v2rayNG与OpenClash全景指南

> 所属专题：客户端教程 ｜ 二级专题定位：移动设备与家庭路由器 ｜ 数据核实：2026-11-10

移动设备（手机、平板）与路由器是日常使用频率最高的科学上网载体。配置要点在于：**低耗电、快速重连、锁屏不掉线以及家庭设备全局覆盖**。

<AffNotice />

---

## 📱 10 大三级长尾实操集群规划

### 集群 1：iOS 小火箭 (Shadowrocket) 购买与下载全流程
- **核心指南**：Shadowrocket 无法在大陆 App Store 上架，必须使用海外地区（美区、港区等）的 Apple ID 进行下载（官方售价通常为 $2.99）。支持直接扫描机场用户中心的二维码一秒导入全部节点。

### 集群 2：Stash 与 Quantumult X (圈X) 进阶分流
- 适合对重定向脚本、去除广告以及细颗粒度分流规则有高要求的进阶 iOS 用户。

### 集群 3：Android 平台 v2rayNG 极速上手
- 开源免费、轻量且稳定，支持一键通过剪贴板导入 VLESS / Shadowsocks 订阅，并支持分应用代理设置（如仅代理 Telegram 与 Chrome，微信国内直连）。

### 集群 4：Android 平台 FlClash 与 CMFA 体验
- 高颜值 Material You 设计风格，与桌面端 Clash Verge Rev 配置文件无缝同步。

### 集群 5：Karing 免费全平台客户端评测
- sing-box 内核驱动，可在 App Store 直接搜索下载，无需繁琐的转区操作。

### 集群 6：OpenClash 软路由家庭全局透明代理
- 在软路由（iStoreOS / OpenWrt）中安装 OpenClash，实现 Apple TV、Switch 游戏机、智能家居免客户端全局自由上网。

### 集群 7：PassWall2 与 Nikki 路由器前沿配置
- 支持多核心分流与节点故障自动检测切换，对弱算力路由器更友好。

### 集群 8：手机代理耗电异常深度排查
- 检查是否开启了频繁的后台延迟测速与过度的日志记录；合理调整路由规则缓存。

### 集群 9：Wi-Fi 与蜂窝移动网络切换掉线排查
- 开启常驻后台守护服务与系统电池优化白名单，防止系统在锁屏时杀死代理进程。

### 集群 10：Apple TV 与 Android TV 电视端 4K 观影代理
- 通过软路由旁路网关或电视端直接安装 Clash 客户端，实现大屏 Netflix 4K 杜比视界秒开。
