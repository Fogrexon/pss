[ホーム](../index.md) > [コンポーネント](../component.md) > Input

# Input コンポーネント

`Input` は、ユーザーからのテキスト入力を受け付けるためのコンポーネントです。

## 基本的な使い方

```typescript
import { Input } from 'bubble-ui';

const MyInput = () => {
  return Input({ 
    style: { 
      borderWidth: 1,
      borderColor: 'gray',
      padding: 8,
      borderRadius: 4,
      width: 200 // 入力フィールドの幅
    },
    placeholder: 'テキストを入力...', // プレースホルダーテキスト
    onChange: (text) => console.log('Input changed:', text) // テキスト変更時の処理
  });
};
```

## 主なプロパティ

*   **`style`**: 入力フィールドの見た目を定義するスタイルオブジェクト。`View` コンポーネントと同様のスタイルプロパティ（`borderWidth`, `borderColor`, `padding`, `borderRadius`, `width`, `height` など）を指定できます。詳細は [スタイル](./../style.md) のドキュメントを参照してください。
*   **`placeholder`**: 入力フィールドが空のときに表示されるプレースホルダーテキスト。
*   **`value`**: 入力フィールドの現在の値（制御コンポーネントとして使用する場合）。
*   **`onChange`**: 入力フィールドの値が変更されたときに実行されるコールバック関数。引数として新しいテキスト値を受け取ります。
*   **`onFocus`**: 入力フィールドがフォーカスされたときに実行されるコールバック関数。
*   **`onBlur`**: 入力フィールドからフォーカスが外れたときに実行されるコールバック関数。

*(注: `Input` コンポーネントは、PixiJS でネイティブなテキスト入力を実現するために、内部的に HTML の `<input>` 要素をオーバーレイ表示するなどの工夫が必要になる可能性があります。具体的な実装は将来的な仕様です)*
