import type { PortfolioContent } from './types'
import { links } from './links'

export const ja: PortfolioContent = {
  hero: {
    name: 'へいほぅ',
    desc: 'heyhoe',
    bio: 'ソフトウェア開発者。入力インターフェースとウイスキーが好きです。',
  },
  experiences: [
    {
      date: 'April 2016 – September 2020',
      title: '京都大学',
      content: '工学部 電気電子工学科',
      link: 'https://www.s-ee.t.kyoto-u.ac.jp/',
      kind: 'academic',
    },
    {
      date: 'March 2019 – December 2019',
      title: '株式会社 シー・オー・コンヴ (アルバイト)',
      content:
        'Windows カーネルモードデバイスドライバ開発\nWindows GUIアプリケーション開発',
      link: 'https://www.co-conv.jp/',
      kind: 'temporary',
    },
    {
      date: 'April 2019 – September 2020',
      title: 'コンピュータビジョン研究室',
      content: '京都大学 工学部 電気電子工学科',
      link: 'https://vision.ist.i.kyoto-u.ac.jp',
      kind: 'academic',
    },
    {
      date: 'December 2019 – December 2021',
      title: 'アイフル株式会社 (契約社員)',
      content: 'Webフロントエンド開発\nDevOps\nエンジニアリングマネジメント',
      link: 'https://www.aiful.co.jp/',
      kind: 'temporary',
    },
    {
      date: 'August 2020',
      title: 'クックパッド株式会社 (インターン)',
      content: 'Webアプリケーション開発',
      link: 'https://info.cookpad.com/',
      kind: 'temporary',
    },
    {
      date: 'September 2020',
      title: '株式会社 VOYAGE GROUP (インターン)',
      content: 'フルサイクルデベロッパー',
      link: 'https://voyagegroup.com/',
      kind: 'temporary',
    },
    {
      date: 'October 2020 – September 2022',
      title: 'インタラクティブメディア設計学研究室',
      content: '奈良先端科学技術大学院大学\n先端科学技術研究科 情報科学領域',
      link: 'https://imdl.naist.jp/',
      kind: 'academic',
    },
    {
      date: 'August 2021',
      title: 'サイボウズ株式会社 (インターン)',
      content: '開発本部 生産性向上チーム\nインフラ',
      link: 'https://cybozu.co.jp/',
      kind: 'temporary',
    },
    {
      date: 'August 2021',
      title: '株式会社はてな (インターン)',
      content: 'サービス・システム開発本部 システムプラットフォーム部\nSRE',
      link: 'https://hatenacorp.jp/',
      kind: 'temporary',
    },
    {
      date: 'September 2021',
      title: '株式会社ミクシィ (インターン)',
      content:
        'ライブエクスペリエンス事業本部 システム部 Fansta開発G\nWebフロントエンド開発\nバックエンド開発',
      link: 'https://www.mixi.co.jp',
      kind: 'temporary',
    },
    {
      date: 'October 2021 – November 2021',
      title: '株式会社ビズリーチ (インターン)',
      content:
        'ビズリーチ事業部 プロダクト開発部 システム横断G\nバックエンド開発',
      link: 'https://www.bizreach.co.jp',
      kind: 'temporary',
    },
    {
      date: 'March 2022',
      title: '株式会社ミクシィ (インターン)',
      content: '開発本部 CTO室 たんぽぽグループ\nインフラ',
      link: 'https://www.mixi.co.jp',
      kind: 'temporary',
    },
    {
      date: 'April 2023 –',
      title: '株式会社MIXI',
      content:
        '開発本部 たんぽぽ室 たんぽぽグループ\n脳波基礎研究\n音声通信基盤開発\nゲームリレーサーバー開発\nWebアプリケーション開発\nモバイルアプリ開発',
      link: 'https://mixi.co.jp',
      kind: 'permanent',
    },
  ],
  activities: [
    {
      date: 'September 2016',
      title: 'エレクトロニクスサマーキャンプ TA賞',
      content:
        '京都大学工学部電気電子工学科主催のサマーキャンプ\nLEGO Mindstormsを使ったロボット製作',
      link: 'https://www.s-ee.t.kyoto-u.ac.jp/ja/summercamp',
    },
    {
      date: 'September 2018',
      title: 'エレクトロニクスサマーキャンプ 優勝',
      content:
        '京都大学工学部電気電子工学科主催のサマーキャンプ\n倒立振子の自動制御コンテスト',
      link: 'https://www.s-ee.t.kyoto-u.ac.jp/ja/summercamp/inv-pendulum/2018-kuee-sc3/report',
    },
    {
      date: 'August 2019',
      title: 'セキュリティ・キャンプ全国大会2019',
      content:
        '独立行政法人情報処理推進機構\nセキュリティ・キャンプ事業 メインイベント',
      link: 'https://www.ipa.go.jp/jinzai/camp/2019/zenkoku2019_index.html',
    },
    {
      date: 'January 2020 – December 2022',
      title: 'CAMPHOR- コアメンバー',
      content: '京都のIT系学生コミュニティCAMPHOR-の運営',
      link: 'https://camph.net/',
    },
  ],
  notes: [
    {
      date: '2021-03-01',
      title:
        'TSUNDERE Interaction: Behavior Modification by the Integrated Interaction of Cold and Kind Actions',
      content: 'ACM/IEEE HRI 2021 Companion（共著）',
      link: 'https://doi.org/10.1145/3434074.3447149',
    },
    {
      date: '2021-03-01',
      title: 'USB Type-Cのオモテ・ウラ',
      content: 'CAMPHOR- DAY 2021',
      link: 'https://speakerdeck.com/5ebec/double-faced-usb-type-c',
    },
    {
      date: '2022-10-01',
      title: '日常利用の拡張現実感環境におけるタッチタイピング可能な文字入力システム',
      content: '複合現実感研究会 MR2022-10',
      link: 'https://sigmr.vrsj.org/events/2022Oct.html',
    },
    {
      date: '2023-03-01',
      title: 'Nostrクライアント和訳のすゝめ',
      content: 'Nostr 勉強会 #1',
      link: 'https://speakerdeck.com/h3y6e/an-encouragement-of-translating-nostr-clients',
    },
    {
      date: '2023-07-01',
      title: 'Software Design 2023年7月号',
      content: '「新時代の分散型SNS Nostr」【1】次世代SNSを概観する',
      link: 'https://gihyo.jp/magazine/SD/archive/2023/202307',
    },
    {
      date: '2025-04-01',
      title: 'Flutter研修【MIXI 25新卒技術研修】',
      content: 'MIXI 25新卒技術研修',
      link: 'https://speakerdeck.com/mixi_engineers/2025_new_grad_training_flutter',
    },
    {
      date: '2025-08-01',
      title: '2つのフロントエンドと状態管理',
      content: 'MIXI MEETUP！ TECH & DESIGN DAY',
      link: 'https://speakerdeck.com/mixi_engineers/state-management-with-two-frontends-flutter-nextjs',
    },
    {
      date: '2025-09-01',
      title: 'Software Design 2025年9月号',
      content: '「技術選定の舞台裏」【1】mixi2（共著）',
      link: 'https://gihyo.jp/magazine/SD/archive/2025/202509',
    },
    {
      date: '2026-07-01',
      title: 'Flutter研修【MIXI 26新卒技術研修】',
      content: 'MIXI 26新卒技術研修',
      link: 'https://speakerdeck.com/mixi_engineers/2026_new_grad_training_flutter',
    },
  ],
  links,
  sectionNav: [
    { id: 'top', label: 'Top' },
    { id: 'links', label: 'Links' },
    { id: 'experience', label: 'Experience' },
    { id: 'activities', label: 'Activities' },
    { id: 'notes', label: 'Notes' },
    { id: 'languages', label: 'Languages' },
  ],
  ui: {
    sections: {
      links: 'Links',
      experience: 'Experience',
      activities: 'Activities',
      notes: 'Notes',
      languages: 'Languages',
    },
    themeTo: theme => `${theme} テーマに切替`,
    localeToJa: '日本語に切替',
    localeToEn: 'Switch to English',
    notesPrev: '新しい年へ',
    notesNext: '古い年へ',
  },
}
