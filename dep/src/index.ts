interface Shape<T extends string> {
    hmm: T
}

const _Holder = {
    hmm: "foo"
} satisfies Shape<"foo">;

type _Holder = typeof _Holder;
export interface Holder extends _Holder { }
export const Holder = _Holder as Holder;

