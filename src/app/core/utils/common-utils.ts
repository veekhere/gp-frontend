
type RGBColor = {
  r: number,
  g: number,
  b: number,
  a?: number,
};

export class CommonUtils {
  /**
   * Проверка поля на остаточное значение.
   */
  static exhaustiveCheck(target: never, className: string = null): never {
    const name = className ? className + ': ' : '';
    throw new Error(`${name}Missing implementation for case: ${target}`.trim());
  }

  /**
   * Перевод HEX-цвета в RGB-объект.
   */
  static hexToRGB(hexColor: string): RGBColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{0,2})$/i.exec(hexColor);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
      a: parseInt(result[4]?.length ? result[4] : 'ff', 16),
    } : null;
  }

  /**
   * Перевод RGB-объекта в HEX цвет.
   */
  static RGBToHex(rgbColor: RGBColor): string {
    if (!rgbColor) {
      return null;
    }
    const componentToHex = (x: number) => {
      const hex = x.toString(16);
      return hex.length == 1 ? '0' + hex : hex;
    };
    return '#'
      + componentToHex(rgbColor?.r)
      + componentToHex(rgbColor?.g)
      + componentToHex(rgbColor?.b)
      + (rgbColor?.a !== 255 ? componentToHex(rgbColor?.a) : '');
  }
}
