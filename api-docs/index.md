# BubbleUI

BubbleUI は、React のような宣言的なスタイルで Pixi.js の UI を構築するためのライブラリです。複雑なUI構造やスタイル定義をシンプルかつ直感的に記述できます。

## 特徴

*   **宣言的なUI構築**: 関数コンポーネントベースのAPIを提供します。
*   **CSS in JSライクなスタイリング**: JavaScriptオブジェクトを使用してスタイルを定義し、動的なスタイルの変更も容易に行えます。
*   **高いパフォーマンス**: Pixi.js のレンダリングパフォーマンスを最大限に活用します。
*   **拡張性**: カスタムコンポーネントやスタイルプロパティを簡単に追加できます。

## インストール

```bash
# npm
npm install bubble-ui

# yarn
yarn add bubble-ui
```
*(注: パッケージ名は仮のものです)*

## 基本的な使い方

```typescript
import { render, View, Text } from 'bubble-ui';
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ width: 800, height: 600, backgroundColor: 0x1099bb });
document.body.appendChild(app.view as unknown as Node); // Type assertion for view

// スタイル定義
const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: [10, 20], // [vertical, horizontal] or single value
    borderRadius: 5,
    cursor: 'pointer', // Add hover effects etc. later
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
};

// UIコンポーネント定義 (Function Component)
const App = () => {
  return View({ style: styles.container }, [
    Text({ style: styles.title }, ['Hello Pixi Style System!']),
    View({ style: styles.button }, [
      Text({ style: styles.buttonText }, ['Click Me'])
    ])
  ]);
};

// レンダリング
render(App(), app.stage);

```

## 詳細

*   コンポーネントの定義と使い方については [component.md](./component.md) を参照してください。
*   スタイルの指定方法については [style.md](./style.md) を参照してください。
*   ライブラリのアーキテクチャと内部構造については [archi.md](./archi.md) を参照してください。