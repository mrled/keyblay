# keymap.click

A visual keymap explanation --
how an ErgoDox keyboard helped my RSI.

See it in action:
<https://keymap.click>

![Screenshot](docs/screenshot.png?raw=true "Screenshot")

## What is this?

My goal is to be able to show off keyboard layouts for my ErgoDox,
and provide explanations for why I made the layout decisions I made.
The ErgoDox-EZ has been a huge part of my strategy for dealing with RSI,
and I want to be able to visually explain to others how it helped me.

It's also a way for me to learn modern web development.
I've never built a web app like this before,
and I built it in about 5 months of nights and weekends.

## How it's built

- next.js
- tailwind

Other prerequisites:

- Node and NPM
- Autoprefixer (`npm install -g autoprefixer`)
- PostCSS (`npm install -g postcss-cli`)

Development mode:

```bash
npm install
npm run dev
```

I'm using `prettier` so I don't have to have a dumb code formatting opinion.

## Thanks

- Josh:
  I would still be trying to build this from scratch without a framework
  if it weren't for your kind help.
  THANK YOU so much.
- The community that built the original ErgoDox
  (see <https://www.ergodox.io/>):
  I'm not sure I would have been able to work for some weeks of 2019
  without this keyboard.
  It's made a big difference.
  Thanks for making it.
- ZSA Technology Labs, makers of the
  [ErgoDox-EZ](https://ergodox-ez.com/):
  I doubt I would have tried to build one on my own.
  Thank you for making it easier to get.
- Wikimedia Commons for the
  [Looped square on white background.svg](https://commons.wikimedia.org/wiki/File:Looped_square_on_white_background.svg)
  which I use as an icon.
- Terence Eden for making me aware of
  [the `<kbd>` element](https://shkspr.mobi/blog/2020/05/better-keyboard-buttons-in-html/)
- Xah Lee's useful
  [list of unicode computing symbols](http://xahlee.info/comp/unicode_computing_symbols.html)
- @Robin on the Tailwind Discord server, who helped me solve
  [a layout bug on initial load](docs/issues/bad-first-render-in-production/index.md)
