[ホーム](../index.md) > [コンポーネント](../component.md) > Button

# Button コンポーネント

`Button` は、ユーザーのクリック操作を受け付けるためのインタラクティブなコンポーネントです。

## 基本的な使い方

```typescript
import { Button, Text } from 'pixi-style-system';

const MyButton = () => {
  return Button({ 
    style: { 
      backgroundColor: 'blue', 
      padding: 10, 
      borderRadius: 5 
    },
    onClick: () => console.log('Button clicked!') // クリック時の処理
  }, [
    Text({ style: { color: 'white' } }, ['Click Me']) // ボタンのラベル
  ]);
};
```

## 主なプロパティ

*   **`style`**: ボタンの見た目を定義するスタイルオブジェクト。`View` コンポーネントと同様のスタイルプロパティ（`backgroundColor`, `padding`, `borderRadius` など）を指定できます。詳細は [スタイル](./../style.md) のドキュメントを参照してください。
*   **`onClick`**: ボタンがクリックされたときに実行されるコールバック関数。
*   **子要素**: ボタン内に表示される要素（通常は `Text` コンポーネント）を配列で渡します。

*(注: `onClick` などのイベント関連プロパティは、PixiJS のイベントシステム (`interactive`, `pointertap` など) を内部的に利用することを想定していますが、具体的な実装は将来的な仕様です)*
