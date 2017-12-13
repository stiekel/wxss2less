# wxss2less

`wepy` project must import `less` file, but `weui-wsss` only provide `wxss` files, `wxss2less` can rename file name to `less`, and replace the `.wxss` to `.less` in `@import`.

## Install

```sh
npm install -g wxss2less
```

## Usage

Go to wxss style file folder, and run:

```sh
wxss2less
```

or you can give the wxss folder as a argument like this:

```sh
wxss2less src/style
```

it's done!
