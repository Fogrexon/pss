[ホーム](./index.md) > アーキテクチャ

# アーキテクチャ

Pixi Style System は、React のような宣言的な UI 記述と、CSS のようなスタイリング機構を PixiJS 上で実現することを目指します。

## コアコンセプト

*   **関数コンポーネント**: UI 要素を関数として定義します。第一引数にプロパティとスタイル、第二引数に子要素の配列を受け取ります。
*   **仮想 DOM**: コンポーネントツリーから PixiJS の表示オブジェクトツリーへの変換を効率的に行うための内部表現。
*   **Flexbox ライクなレイアウト**: Yoga Layout (または同様のライブラリ) を利用して、Web 標準に近いレイアウト計算を実現します。
*   **CSS ライクなスタイリング**: JavaScript オブジェクトでスタイルを定義し、コンポーネントに適用します。

## ディレクトリ・ファイル構成 (案)

```
src/
├── components/       # 標準 UI コンポーネント
│   ├── View.ts       # View コンポーネントの実装
│   ├── Text.ts       # Text コンポーネントの実装
│   ├── Button.ts     # Button コンポーネントの実装
│   ├── Input.ts      # Input コンポーネントの実装 (HTML Input 要素のオーバーレイなどが必要になる可能性)
│   └── index.ts      # components モジュールのエントリーポイント
├── core/             # ライブラリの中核機能
│   ├── reconciler/     # リコンサイラ関連
│   │   ├── diff.ts       # 仮想DOMの差分検出 (Diffing)
│   │   ├── commit.ts     # PixiJSオブジェクトへの変更適用 (Commit Phase)
│   │   ├── component.ts  # コンポーネントインスタンス管理 (将来的な拡張用)
│   │   ├── events.ts     # イベントハンドリングの紐付け
│   │   └── index.ts      # reconciler モジュールのエントリーポイント
│   ├── renderer.ts     # PixiJS アプリケーションのセットアップとレンダリング開始
│   ├── types.ts        # コア機能で使う型定義
│   └── index.ts      # core モジュールのエントリーポイント (reconciler, renderer を集約)
├── layout/           # レイアウト計算
│   ├── yoga.ts         # Yoga Layout のラッパーまたは実装
│   └── index.ts      # layout モジュールのエントリーポイント
├── styles/           # スタイリング関連
│   ├── applyStyles.ts  # 各デコーダーを呼び出しスタイルを適用するメイン関数
│   ├── decoders/       # スタイルプロパティのデコードと適用ロジック
│   │   ├── layout.ts     # Flexbox関連のスタイル (Yogaへの適用が主)
│   │   ├── appearance.ts # backgroundColor, border, opacity など
│   │   ├── text.ts       # fontSize, color, fontFamily など (PIXI.TextStyle へ)
│   │   ├── pixi.ts       # tint, interactive, cursor など Pixi固有プロパティ
│   │   └── index.ts      # decoders モジュールのエントリーポイント
│   ├── parser.ts       # スタイル値 (数値, 文字列, 配列) の解析 (例: '10px' -> 10)
│   ├── types.ts        # スタイル関連の型定義 (StyleProps など)
│   └── index.ts      # styles モジュールのエントリーポイント
├── animation/        # アニメーション機能 (簡易)
│   ├── applyAnimation.ts # animationName に基づいてアニメーションを適用
│   ├── types.ts        # アニメーション関連の型定義
│   └── index.ts      # animation モジュールのエントリーポイント
├── types/            # グローバルな型定義
│   └── index.ts
├── utils/            # ユーティリティ関数
│   └── index.ts      # utils モジュールのエントリーポイント
└── index.ts          # ライブラリ全体のエントリーポイント (公開 API)
```

## 主要な処理フロー

1.  **コンポーネント定義**: ユーザーは関数コンポーネントを使って UI 構造を定義します。
2.  **レンダリング開始**: `renderer.ts` の `render` 関数が呼び出され、仮想 DOM ツリー構築のプロセスを開始します。
3.  **差分検出 (Diffing)**: `reconciler/diff.ts` が前回の仮想 DOM ツリーと新しい仮想 DOM ツリーを比較し、変更が必要な箇所 (Work) を特定します。
4.  **レイアウト計算**: 変更が必要なノードについて、`layout/yoga.ts` を使用してレイアウト計算を行います。
5.  **コミット (Commit)**: `reconciler/commit.ts` が特定された変更 (Work) をもとに、実際の PixiJS 表示オブジェクトツリーに対して生成、更新、削除を行います。
6.  **スタイリング適用**: `styles/applyStyles.ts` がスタイルオブジェクトを解釈し、`parser` と `decoders` を使って PixiJS オブジェクトのプロパティや Yoga Node の設定を行います。
7.  **イベントハンドリング設定**: `reconciler/events.ts` がコンポーネントに渡されたイベントハンドラ (例: `onClick`) を PixiJS のイベントリスナーに紐付けます。
8.  **アニメーション適用**: `animation/applyAnimation.ts` が指定されたアニメーションを実行します。
9.  **PixiJS レンダリング**: PixiJS が最終的な表示オブジェクトツリーを画面に描画します。
