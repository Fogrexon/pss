// filepath: c:\projects\bubble-ui\src\styles\utils.ts
/**
 * スタイル値を解析するユーティリティ関数
 */

/**
 * 数値またはパーセンテージ文字列として表されるスタイル値を解析
 * @param value 解析する値（数値またはパーセンテージ文字列）
 * @param parentSize パーセンテージ計算のための親サイズ（オプション）
 * @returns 解析された数値または undefined
 */
export function parseStyleValue(value: number | string | undefined, parentSize?: number): number | undefined {
  if (value === undefined) return undefined;
  if (value === 'auto') return undefined; // 'auto'は特定のスタイルプロセッサで処理
  
  if (typeof value === 'number') return value;
  
  if (typeof value === 'string') {
    // パーセンテージの解析
    if (value.endsWith('%') && parentSize !== undefined) {
      const percentage = parseFloat(value) / 100;
      return parentSize * percentage;
    }
    
    // 文字列から純粋な数値の解析
    return parseFloat(value);
  }
  
  return undefined;
}

/**
 * 色値をPixi互換のフォーマットに解析
 * @param color 文字列または数値としての色値
 * @returns Pixiが使用できる数値フォーマットの色
 */
export function parseColor(color: string | number | undefined): number {
  if (color === undefined) return 0x000000;
  
  if (typeof color === 'number') return color;
  
  if (typeof color === 'string') {
    // 16進数カラーの処理
    if (color.startsWith('#')) {
      return parseInt(color.substring(1), 16);
    }
    
    // 名前付きカラーの処理 - これは簡略化されたもの
    // 実際のアプリでは、より完全なカラーマッピングが必要
    const namedColors: Record<string, number> = {
      'black': 0x000000,
      'white': 0xFFFFFF, 
      'red': 0xFF0000,
      'green': 0x00FF00,
      'blue': 0x0000FF,
      'yellow': 0xFFFF00,
      'magenta': 0xFF00FF,
      'cyan': 0x00FFFF,
      'transparent': 0x000000 // 注: 透明度はalphaで処理
    };
    
    return namedColors[color.toLowerCase()] || 0x000000;
  }
  
  return 0x000000; // デフォルトのフォールバック
}
