# ts55-beta-regression

## Problem

Generating types simply by upgrading tsc to the beta causes previously working code to fail:

```
src/index.ts:3:8 - error TS2339: Property 'hmm' does not exist on type 'Holder'.

3 Holder.hmm;
         ~~~
```


### Sources

`dep/src/index.ts`:
```ts
interface Shape<T extends string> {
    hmm: T
}

const _Holder = {
    hmm: "foo"
} satisfies Shape<"foo">;

type _Holder = typeof _Holder;
export interface Holder extends _Holder { }
export const Holder = _Holder as Holder;
```

`main/src/index.ts`:
```ts
import { Holder } from "dep";
Holder.hmm;
```

## Generating types for "dep"

### TS 5.4

```ts
declare const _Holder: {
    hmm: "foo";
};
type _Holder = typeof _Holder;
export interface Holder extends _Holder {
}
export declare const Holder: Holder;
export {};
```

### TS 5.5-beta

```ts
declare const _Holder: typeof _Holder;
type _Holder = typeof _Holder;
export interface Holder extends _Holder {
}
export declare const Holder: Holder;
export {};
```