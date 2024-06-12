# アーキテクチャの設計図

## スタイル基本記述方法

```typescript
type LayoutStyle = {}
```

## コンポーネント種別

ルートの設定
必ず一つ設定する
画面サイズはCanvasの横幅いっぱいに自動的に設定される

```typescript
const root = new PixiUIRoot({
  pixiApp,
})

root.appendChild(box1, box2, ...)
```

Box

```typescript
const box = new PixiUIBox({
  size: [100, 100],
  position: [100, 100],
  anchor: [0, 0],
  style: {
    backgroundColor: 0x000000,
    borderColor: 0xffffff,
    borderWidth: 1,
    borderRadius: 10,
    // or
    backgroundImage: new PIXI.Texture.from('path/to/image.png'),
  }
})

parent.appendChild(box)
```

Grid

```typescript
const grid = new PixiUIGrid({
  size: [100, 100],
  position: [100, 100],
  anchor: [0, 0],
  grid: {
    column: 3,
    gap: 10,
    align: 'center',
  },
  style: {
    backgroundColor: 0x000000,
    borderColor: 0xffffff,
    borderWidth: 1,
    borderRadius: 10,
    // or
    backgroundImage: new PIXI.Texture.from('path/to/image.png'),
  }
})
```

Split

```typescript
const split = new PixiUISplit({
  size: [100, 100],
  position: [100, 100],
  anchor: [0, 0],
  split: {
    direction: 'horizontal',
    // 分割されたコンポーネントの各サイズ
    itemSizes: [50, 50],
    gap: 10,
  },
  style: {
    backgroundColor: 0x000000,
    borderColor: 0xffffff,
    borderWidth: 1,
    borderRadius: 10,
    // or
    backgroundImage: new PIXI.Texture.from('path/to/image.png'),
  }
})
```

List

```typescript
const list = new PixiUIList({
  size: [100, 100],
  position: [100, 100],
  anchor: [0, 0],
  list: {
    direction: 'horizontal',
    itemSize: 30,
    gap: 10,
  },
  style: {
    backgroundColor: 0x000000,
    borderColor: 0xffffff,
    borderWidth: 1,
    borderRadius: 10,
    // or
    backgroundImage: new PIXI.Texture.from('path/to/image.png'),
  }
})
```

Custom

```typescript
const custom = new PixiUICustom({
  size: [100, 100],
  position: [100, 100],
  anchor: [0, 0],
  rootContainer: container,
  render: (bound) => {
    text.setSize(bound.width, bound.height)
  }
})
```

## 数値記述方法

対象: `size`, `position`, `gap`, `itemSizes`, `itemSize`

```typescript
// pixel
const size = [100, 100]
// pixel
const position = ['100px', '100px']
// percent of parent size (automaticaly use appropriate parameter from width or height of parent)
// use width when horizontal, use height when vertical
const gap = '50%'
// percent of root size
// vw is width of root, vh is height of root
const itemSizes = ['50vw', '50vh']
// complex calculation
const itemSize = (parentWidth, parentHeight, viewWidth, viewHeight) => parentSize / 2 - 15
```
