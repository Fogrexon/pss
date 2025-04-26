[ホーム](../index.md) > [コンポーネント](../component.md) > Text

# Text コンポーネント

`Text` は、Pixi Style System でテキストを表示するためのコンポーネントです。

## 基本的な使い方

```typescript
import { Text } from 'pixi-style-system';

const MyText = () => {
  return Text({ 
    style: { 
      fontSize: 24, 
      color: 'black', 
      fontWeight: 'bold' 
    } 
  }, [
    'Hello, Pixi Style System!' // 表示するテキストコンテンツ
  ]);
};
```

## 主なプロパティ

*   **`style`**: テキストの見た目を定義するスタイルオブジェクト。フォントサイズ (`fontSize`)、色 (`color`)、太さ (`fontWeight`)、フォントファミリー (`fontFamily`) など、テキスト固有のスタイルを指定できます。詳細は [スタイル](./../style.md) のドキュメントを参照してください。
*   **子要素**: `Text` コンポーネントの第二引数には、表示したいテキストコンテンツを文字列の配列として渡します。（通常は要素数1の配列です）

`Text` コンポーネントは、UI内に情報を表示する基本的な要素です。
