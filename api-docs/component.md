[ホーム](./index.md) > コンポーネント

# コンポーネント

Pixi Style System では、UI要素を関数コンポーネントとして定義します。各コンポーネントは、第一引数にオプション（プロパティやスタイルを含むオブジェクト）、第二引数に子要素の配列を受け取ります。

## 基本的な構造

```typescript
import { View, Text } from 'pixi-style-system';

const MyComponent = () => {
  return View({ style: { ... } }, [
    Text({ style: { ... } }, ['Some text']),
    // 他の子コンポーネント...
  ]);
};
```

## 標準コンポーネント

Pixi Style System は、基本的なUI構築のための標準コンポーネントを提供します。

*   **[View](./component/View.md)**: レイアウトの基本となるコンテナコンポーネント。
*   **[Text](./component/Text.md)**: テキストを表示するためのコンポーネント。
*   **[Button](./component/Button.md)**: クリック可能なボタンコンポーネント。
*   **[Input](./component/Input.md)**: テキスト入力を受け付けるコンポーネント。
*   **(その他)**: 将来的には `<Image>` などのコンポーネントも追加予定です。

各コンポーネントの詳細な仕様（利用可能なプロパティなど）については、上記のリンク先を参照してください。

## カスタムコンポーネント

標準コンポーネントを組み合わせて、独自のカスタムコンポーネントを作成できます。これにより、再利用可能なUI部品を効率的に構築できます。

```typescript
import { View, Text } from 'pixi-style-system';

// 例: ラベル付きの入力フィールドコンポーネント
const LabeledInput = ({ label, inputProps, style }) => {
  return View({ style: { flexDirection: 'column', ...style } }, [
    Text({ style: { marginBottom: 5 } }, [label]),
    // TextInput コンポーネント (仮)
    // TextInput({ ...inputProps })
  ]);
};
```
*(注: 上記はカスタムコンポーネントの概念を示す例であり、`TextInput` はまだ存在しません)*
