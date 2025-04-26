[ホーム](../index.md) > [コンポーネント](../component.md) > View

# View コンポーネント

`View` は、BubbleUI における最も基本的なレイアウトコンテナコンポーネントです。他のコンポーネントを子要素として含み、Flexbox ライクなレイアウトやスタイリングを適用するための基盤となります。

## 基本的な使い方

```typescript
import { View } from 'bubble-ui';

const MyLayout = () => {
  return View({ 
    style: { 
      flexDirection: 'row', // 子要素を横に並べる
      padding: 10, 
      backgroundColor: 'lightblue',
      borderRadius: 8
    } 
  }, [
    // 子コンポーネントをここに追加
  ]);
};
```

## 主なプロパティ

*   **`style`**: コンポーネントの見た目を定義するスタイルオブジェクト。Flexbox レイアウトプロパティ（`flexDirection`, `justifyContent`, `alignItems` など）や、背景色 (`backgroundColor`)、パディング (`padding`)、ボーダー (`borderWidth`, `borderColor`, `borderRadius`) など、様々なスタイルを指定できます。詳細は [スタイル](./../style.md) のドキュメントを参照してください。
*   **子要素**: `View` コンポーネントの第二引数には、子コンポーネントの配列を渡します。これにより、階層的なUI構造を構築できます。

`View` は、アプリケーションのレイアウト構造を定義する上で中心的な役割を果たします。
