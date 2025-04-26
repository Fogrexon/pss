[ホーム](../index.md) > [スタイリング](../style.md) > レイアウト

# レイアウト (Flexbox ライク)

| プロパティ名      | デフォルト値        | 設定可能な値                                                                                                | 説明                                    |
| :---------------- | :------------------ | :---------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `display`         | `'flex'`            | `'flex'`, `'none'` (将来)                                                                                   | 表示形式                                |
| `flexDirection`   | `'row'`             | `'row'`, `'column'`, `'row-reverse'`, `'column-reverse'`                                                    | 子要素の配置方向                        |
| `justifyContent`  | `'flex-start'`      | `'flex-start'`, `'flex-end'`, `'center'`, `'space-between'`, `'space-around'`, `'space-evenly'`             | 主軸方向の揃え                          |
| `alignItems`      | `'stretch'`         | `'stretch'`, `'flex-start'`, `'flex-end'`, `'center'`, `'baseline'`                                         | 交差軸方向のアイテム揃え                |
| `alignContent`    | `'flex-start'`      | `'flex-start'`, `'flex-end'`, `'center'`, `'stretch'`, `'space-between'`, `'space-around'`             | 複数行の場合のアイテム揃え (交差軸)     |
| `alignSelf`       | `'auto'`            | `'auto'`, `'stretch'`, `'flex-start'`, `'flex-end'`, `'center'`, `'baseline'`                               | 個別アイテムの交差軸方向揃え            |
| `flexWrap`        | `'nowrap'`          | `'nowrap'`, `'wrap'`, `'wrap-reverse'`                                                                      | アイテムの折り返し                      |
| `flexGrow`        | `0`                 | 数値                                                                                                        | アイテムの伸長係数                      |
| `flexShrink`      | `1`                 | 数値                                                                                                        | アイテムの収縮係数                      |
| `flexBasis`       | `'auto'`            | 数値 (ピクセル), `'auto'`                                                                                   | アイテムの基本サイズ                    |
| `width`           | `'auto'`            | 数値 (ピクセル), 文字列 (`'50%'`, `'auto'`)                                                                 | 幅                                      |
| `height`          | `'auto'`            | 数値 (ピクセル), 文字列 (`'50%'`, `'auto'`)                                                                 | 高さ                                    |
| `minWidth`        | -                   | 数値 (ピクセル)                                                                                             | 最小幅                                  |
| `minHeight`       | -                   | 数値 (ピクセル)                                                                                             | 最小高さ                                |
| `maxWidth`        | -                   | 数値 (ピクセル)                                                                                             | 最大幅                                  |
| `maxHeight`       | -                   | 数値 (ピクセル)                                                                                             | 最大高さ                                |
| `aspectRatio`     | -                   | 数値 (例: `16 / 9`)                                                                                         | アスペクト比                            |
| `padding`         | `0`                 | 数値 (全方向), 配列 (`[v, h]`, `[t, r, b, l]`)                                                              | 内側余白                                |
| `margin`          | `0`                 | 数値 (全方向), 配列 (`[v, h]`, `[t, r, b, l]`)                                                              | 外側余白                                |
| `gap`             | `0`                 | 数値 (ピクセル)                                                                                             | 行と列の間隔                            |
| `rowGap`          | `0`                 | 数値 (ピクセル)                                                                                             | 行の間隔                                |
| `columnGap`       | `0`                 | 数値 (ピクセル)                                                                                             | 列の間隔                                |
| `position`        | `'relative'`        | `'relative'`, `'absolute'`                                                                                  | 配置方法                                |
| `top`             | -                   | 数値 (ピクセル)                                                                                             | 上からの位置 (`position: 'absolute'`) |
| `right`           | -                   | 数値 (ピクセル)                                                                                             | 右からの位置 (`position: 'absolute'`) |
| `bottom`          | -                   | 数値 (ピクセル)                                                                                             | 下からの位置 (`position: 'absolute'`) |
| `left`            | -                   | 数値 (ピクセル)                                                                                             | 左からの位置 (`position: 'absolute'`) |
