[ホーム](../index.md) > スタイリング

# スタイリング

Pixi Style System では、コンポーネントの `style` プロパティに JavaScript オブジェクトを渡すことでスタイルを適用します。CSS のプロパティ名に似たキーを使用しますが、これらは内部的に Pixi.js のプロパティやレイアウト計算にマッピングされます。

## 基本的な使い方

```typescript
import { View, Text } from 'pixi-style-system';

const styles = {
  container: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 8,
  },
  text: {
    color: 'blue',
    fontSize: 20,
  }
};

const MyStyledComponent = () => {
  return View({ style: styles.container }, [
    Text({ style: styles.text }, ['Styled Text'])
  ]);
};
```

## スタイルプロパティ

スタイルプロパティは以下のカテゴリに分類されます。詳細は各ページを参照してください。

*   [レイアウト (Flexbox ライク)](./style/layout.md)
*   [外観](./style/appearance.md)
*   [テキスト](./style/text.md)
*   [Pixi.js 固有プロパティ](./style/pixi.md)
*   [アニメーション](./style/animation.md)

## 値の指定

*   **数値**: 主にピクセル単位として解釈されます。
*   **文字列**: パーセンテージ (`'50%'`) や特定のキーワード (`'auto'`, `'flex-start'`) を指定できます。色指定 (`'#ff0000'`, `'blue'`) も可能です。
*   **配列**: `padding` や `margin` などで、複数の値を一度に指定する場合に使用します。

*(注: 上記リストは初期の提案であり、実装状況によって変更される可能性があります)*
