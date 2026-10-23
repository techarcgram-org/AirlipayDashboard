/* eslint-disable */
import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';

const banner = '/* eslint-disable */';

async function bundle(input, file, format) {
  const build = await rollup({
    input,
    plugins: [
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          noEmit: false,
          declaration: false,
          declarationMap: false,
          sourceMap: false
        }
      })
    ]
  });
  await build.write({
    file,
    format,
    banner,
    name: format === 'iife' ? 'AirliPayBackOffice' : undefined,
    exports: 'none',
    sourcemap: false
  });
  await build.close();
}

await bundle('src/main.ts', 'plugin.js', 'iife');
await bundle('src/validate.ts', 'validate.mjs', 'esm');
