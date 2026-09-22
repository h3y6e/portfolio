declare module 'opentype.js' {
  interface LocalizedName {
    [lang: string]: string
  }

  interface NameTable {
    [nameId: string]: LocalizedName
  }

  interface FontNames {
    unicode?: NameTable
    macintosh?: NameTable
    windows?: NameTable
  }

  interface Font {
    names: FontNames
    getEnglishName: (name: string) => string
    toArrayBuffer: () => ArrayBuffer
  }

  function parse(buffer: ArrayBufferLike): Font

  export { Font, FontNames, LocalizedName, NameTable, parse }
}
