# Development notes and to do items

At the top are active to do items.

In the second section are finished to-do items and also some general dev notes.
This section isn't well organized.

## Active to do items

Everything that I have decided to definitely do

### First load drawing bug

See [bad-first-render-in-production](issues/bad-first-render-in-production).

## Ideas

Things I might do, but that I haven't decided on yet

### Get rid of loglevel

Use advanced functionality from the console object.
It only works on recent browsers, but meh.

### Draw multiple orange lines

Sometimes it would be nice to draw two or three orange lines,
like for left/right brackets, ctrl keys, alt, etc.

Not sure that this works well for every case, though.

### Refactor code in \_app.js to hooks

- Refactor fathom stuff to a hook
- Refactor document dimension stuff to a hook

### Add a guided tour button next to the help button

Not sure if this is a good idea or not?

I am thinking of users who are linked to one specific key on the site.
They might not understand what they're seeing until they take a tour,
but if they don't start on the landing page,
there is no indication that a tour is possible.

Consider adding a button to start a tour from any key.

Is there some alternative?

### Audit when we're prop drilling and when we're using context

It's not always consistent whether I am passing props around or using context.
Some components do both, when they could just use one or the other.
It works now, but could be cleaner.

I think the nicest version of this would have each component stating in its doc string
whether I intend for it to be useful outside of my app context with `useKeymapUistate` or not.

### Use query string for setting debug level

Makes things simpler, allows me to load debug info on initial page load

### Bug: keyboardAndPanelRect, diamargLeftRect, diamargRightRect sometimes not calc correctly

When the viewport is at the top, these values seem to be correct.

When it's scrolled down a bit, the values are not correct.

It's also much weirder on iOS... not sure how to debug that.

Doesn't seem to hurt anything though?

### Allow referencing legends as `<kbd>` elements

Goes hand in hand with "Nicer looking key references".

Would be useful to be able to reference whatever the legend in the current legendMap for any key,
especially keys that don't have good Unicode glyphs like layer or volume keys.

### Nicer looking key references inside the info panel

- Make the `<kbd>` elements look like mini keys from the board above?
- For non-`<kbd>` references, put a tiny rectangular key that looks like a small key from above off to the side?

### Highlight or color change when mousing over diagram annotations

When hovering over the a key reference in the text, or a key itself that is referenced,
highlight the relevant line and both reference and referent.
This will help in complicated graphs.

### Nicer legend for the leader key

Currently this is the Material Design Send Email icon (a paper airplane).
What should I put there instead?

### Nicer legend for the app/menu key

Currently this is an SVG, but it doesn't belong with the other icons and is blurry.
What should I use instead?

I was using a Unicode hamburger glyph,
but it was not very clear what it was until you clicked there.
Microsoft keyboards tend to use something that looks like a menu,
so I'll probably have to find something like that.

### Have a per-key preview image for slack/twitter/etc

Now that I can link to individual keys, seems like I really ought to have a preview image for each one.

Also should change the page title.

## Post-1.0 ideas

These are definitely not happening now, but might be doable after 1.0.

### Allow pulling in other keymaps

Pull in keymaps and legend sets from other sources client-side.

This would let other people write a .js file and use my app to show them.

Use the getStaticPaths with a fallback for this, like
<https://static-tweet.now.sh/>

I think this is going to be harder because I moved to key info prose as JSX,
and it's no longer a raw string I parse with a function.

### Write prose in markdown

Annoying to write in HTML, honestly, especially inside a React component.

Not sure what I want is possible:

- smart quotes, apostrophes, emdashes, and so forth are handled for me automatically...
- ... but I can still use `<CustomComponents>` in my markdown.

And ideally, it would not prohibit pulling in other keymaps client-side,
so I could eventually allow someone else to use my website without forking my code.

### Move to typescript

Adding the useKeymapUiState hook was pretty tough. I think having string typing everywhere would have helped.

### Fix messy URLs

- Root always shows a default view
- Clicking anywhere puts all items in the URL.
  Currently, default values are not persisted to the URL.
- Use paths rather than query string, everything just looks nicer.
- Is there a library for query string -like paths?
  Even `/keymap:default/guide:someguide/`; I know some REST APIs work this way.

## Development notes and completed to do items

Finished tasks, and general notes that are not tasks

### Big WIP commit

This was originally added as part of a big wip commit.

I have changed a lot of the code.
Some of it is good refactored, but plenty of the refactoring was probably not helpful.
Should go back through and see what was really needed.
All my debugging / experimentation code has been since
`3e00aed009f13645131df596041a7d8fd7e49419`.
Compare against that.

✅ not going to bother with that - just move forward lol

The latest eureka moment was the second useEffect in the Keyboard component,
the one that passes `[pressedKey]`.
Josh helped me a TON with this one, thank uuuuuu.

In there I have a big array of lines.
(Actually, a big array of 2-item arrays of coordinates.)

I think what I need to do next is set state on my canvas component.
To do that I think I will need to convert it to a class rather than functional component.
<https://reactjs.org/docs/state-and-lifecycle.html>.

Side note, Josh suggested querying the DOM for all elements that have the class name I want.
But he also said I could use contexts to accomplish the same thing,
but it would be more complicated.

> Okay. We still could use refs here, however, it would get complicated. We would need to store them in context so they could be accessed globally, and it would just be a whole thing. Because you just want the coordinates, you can just use an ID on the element.

Might be worth reading more about context?
Maybe start here?
<https://reactjs.org/docs/context.html>

I didn't really understand React hooks that well.
<https://reactjs.org/docs/hooks-rules.html>,
<https://reactjs.org/docs/hooks-reference.html>.
Might be worth reading more.
Also, might be worth understanding that the rules can be broken sometimes.
<https://inventingwithmonster.io/20190207-break-the-rules-of-react-hooks/>

I had also found this stuff on "lifting state up" that might be worth a closer look.
<https://reactjs.org/docs/lifting-state-up.html>.

I found this helpful:
<https://reactjs.org/docs/refs-and-the-dom.html>

✅ this is all solved with some state in a class component and understanding refs and hooks better

### update 20200602 - partially working

Holy shit, it's partially working.

It looks like the lines are not getting drawn in the right place.
But they ARE getting drawn at the right length and angle.
This means they look offset from where they should be.

They also don't change on scroll, which is a problem.

### update 20200606

More thoughts

#### Adjust DOMRect for scroll position

<https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect>

> If you need the bounding rectangle relative to the top-left corner of the document, just add the current scrolling position to the top and left properties (these can be obtained using window.scrollX and window.scrollY) to get a bounding rectangle which is independent from the current scrolling position.

Maybe I could do that like this?

```js
export function absolutifyBoundingClientRect(rect) {
  const abs = DOMRect.fromRect(rect);
  abs.x += window.scrollX;
  abs.y += window.scrollY;
  return abs;
}
```

✅ Done

#### I'm not redrawing the canvas based on scroll position

I think I don't need to do this - but if different parts of the page scroll differently,
like if the info panel is scrolling separately from the page,
I might need to.

#### getClientRects()

Not sure if this is going to be useful or not, but there is also this API call.

<https://developer.mozilla.org/en-US/docs/Web/API/Range/getClientRects>

Right now I'm using `.getBoundingClientRect()`,
which returns a bounding rectangle for the entire element.
In the case of text that spans more than one line,
it may start on the right side of the upper line and continues on the left side of the lower line,
meaning the upper left corner is not actually touching the textual reference.

From reading this documentation,
it looks like `.getClientRects()` will return an array of bounding rects,
where split text will get one for the upper and one for the lower line.
This would let me connect my line to the text directly.

✅ Done

#### Should connect to a different place on the key / text

Right now it's connecting to the upper left corner;
I think it would be nice to connect to lower corner, bottom middle, or something else,
especially for the text references.

✅ Done

#### getBoundingClientRect() is supposed to return post-transform values

Here's a bug from 10 years ago

<https://bugzilla.mozilla.org/show_bug.cgi?id=591718>

Seems to indicate that my expectation that `getBoundingClientRect` ought to return the _post_
transform values is correct.

✅ this does seem to work now that I've fixed my canvas size

#### Should I use transform instead of position relative?

Here's what I was doing before:

```css
.keyboard-left-thumb-cluster {
  position: relative;
  top: calc(var(--keyboard-grid-unit) * 6);
  right: calc(var(--keyboard-grid-unit) * 2);
  transform-origin: 0 calc(var(--keyboard-grid-unit) * 2);
  transform: rotate(25deg);
}
```

Here's what I'm doing now:

```css
.keyboard-left-thumb-cluster {
  transform: translateX(calc(var(--keyboard-grid-unit) * -2)) translateY(
      calc(var(--keyboard-grid-unit) * 6)
    )
    rotate(25deg);
  transform-origin: 0 calc(var(--keyboard-grid-unit) * 2);
}
```

I don't think that changed anything, but it's hard to know for sure.

Although, it did highlight that I was using `right:` before
and it would be been less confusing to use `left:`.

✅ This does work

#### Visual formatting model

It's probably worth understanding this in detail.
<https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model>

#### I think the canvas is the wrong size

<https://permadi.com/2009/04/usng-html-5-canvas-to-draw-over-my-web-page-part-2/>

From my testing, getBoundingClientRect() returns absolute positioning, not within some div or something.
I can verify this with the rulers in Chrome's dev tools, for example.

So what I need is what is described in that article -
a `<canvas>` that is the size of the entire screen.
Then I think my numbers will all be correct!

I tried this a few ways.

First/original attempt:

```js
const origBoundingRect = canvas.getBoundingClientRect();
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.width = origBoundingRect.width;
canvas.height = origBoundingRect.height;
```

Second attempt:

```js
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
```

Third attempt
(I also had to add a ref to div that contains the canvas element):

```js
    const container = this.refs.container
    ...
    canvas.style.width = `${container.scrollWidth}px`
    canvas.style.height = `${container.scrollHeight}px`
    canvas.width = container.scrollWidth
    canvas.height = container.scrollHeight
```

That seems to be _correct_! Holy shit.

✅ Done

#### Debug function

I used this `keybDebug()` debug function to good effect
when I was trying to figure out where all the elements were and why my lines were wrong.

I add it inside of useEffect() in the Keyboard component.
useEffect takes 2 arguments here - my arrow function and an empty array.
Passing it the empty array means it runs on every page load.

```js
useEffect(() => {
  document.keybDebug = () => {
    const r = (num) => {
      // Round to integer, append with _ if wasn't integer to begin with
      // useful bc rotate-xform'd elements have positions in very tiny fractions of pixels,
      // which I don't care about in this fucking debug function
      const rounded = Math.round(num);
      return num === rounded ? `${rounded}` : `${rounded}_`;
    };
    const gbrbi = (id) => {
      const br = document.getElementById(id).getBoundingClientRect();
      return `${id}: ${r(br.x)},${r(br.y)} (${r(br.width)}x${r(
        br.height
      )}) ([${r(br.left)}..${r(br.right)}]x[${r(br.top)}..${r(br.bottom)}])`;
    };
    console.log(gbrbi("keyblay-debug-canvas"));
    console.log(gbrbi("keyblay-debug-canvas-container"));
    console.log(gbrbi("keyblay-debug-content-wrapper-div"));
    console.log(gbrbi("keyblay-debug-outer-wrapper-div"));
    console.log(gbrbi("l-f-1-1"));
  };
}, []);
```

✅ No longer necessary

### more

#### Fix the info box covering up the keyboard

It does this, especially for long texts.

Might consider having the key info box cover the initial info section?
I don't think people need to see that all the time.
Then that could just resize properly based on the key info content,
and the close button could get it back to the intro.

I could have that section scroll independently maybe?
Actually that would probably make the canvas drawing a lot harder tho,
to only draw to key pointers that were on screen, so maybe not.
But maybe it could just resize automatically.

Decided to put it above the keyboard for now.

✅ Done

#### Improve key references in text

Right now they're text like `l-f-1-1`, but it would be nice if they looked like keys or something?
Not sure because I don't want to tie them to the legend;
what's important is their placement.

More thought is required.

Update:

I want to be able to reference key legends.
Maybe start with something like this:
<https://shkspr.mobi/blog/2020/05/better-keyboard-buttons-in-html/>

Then, add a way to tag a legend with an id.
That gets rid of ugly reference IDs, as long as I'm referencing them with a legend.

I could just say "here" with a reference, in order to point to a key without the legend.
That gets rid of the rest of the text reference IDs.

✅ Done!

#### Lines don't draw past the current view port

Lines draw just in the viewport.
If the keyInfo panel on the right is very long and goes past the view port,
the line will appear to cut off when I scroll down.

Maybe the line should be drawn past the viewport?
Or maybe I need to redraw on scroll?

Doing more research on this, I'm not sure I understood it properly.
It may not be related to the view port.

Rather, sometimes the canvas doesn't extend as far as the lines that are supposed to be drawn on it.
Not sure why - it's supposed to be the full height of the page.

Further, the height of the canvas appears to change sometimes.
I look at the canvas by mousing over the element in Chrome's dev tools,
and it always stops right where the line ends.

Figure out how to extend the canvas all the way to the end of the content,
and this problem should be fixed.

✅ Done, with Josh's help - although maybe broken again? tracking under mobile.

#### Allow selecting multiple keys at once

For instance, would be good to highlight all arrow keys when selecting any one of them.

✅ Done

### Use better name for key pointers / references

I have textual representations of key locations, like `l-f-1-1`.
I don't call them "references" because that's confusing with React refs.
I am currently calling them "pointers" but I think that's awkward
and slightly confusing because a pointer is something else in programming
(though I guess not in JavaScript)
and I don't think communicates what I mean without some explanatory text.

How can I improve this?

✅ done - see physical-key-indicators.md

### Twitter cards

https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started

I added enough so it's better than just a bare link,
but it's not showing my image and I'm not sure why.

✅ Done

Validated with
<https://cards-dev.twitter.com/validator>
but it's not showing up in my actual tweet yet -
might take a week to expire the cache?

### Transformed thumb clusters have the wrong pointer location

E.g. look at the bracket keys `[ { } ]` - it's pointing to the non-transformed location for shift. Ugh.

Update: I see what's happening now.
BoundingClientRect is the rectangle that encompasses the element post-rotation,
but BoundingClientRect doesn't itself rotate.
BoundingClientRect must always have top and bottom edges perpendicular to the X axis.

That is, if you take a square with top and bottom edges perpendicular to the X axis and rotate it 45 degrees,
the BoundingClientRect is now LARGER than it was before.

What I want to do is calculate the location pre-rotation,
then apply the rotation transformation to the calculated result.
Cool, some baby's first linear algebra.

... except why the fuck would I do math when I can just put a tiny `<div>` inside the `<Key>`
and have the existing CSS transform do the math for me.
Derp. SOEZ.

Update 20200804: For an example of what's happening, see this from the React dev tools Chrome extension:

![rotated-key-react-dev-tools.png](rotated-key-react-dev-tools.png)

✅ Done

### Add URL fragments for what key I'm referring to

Would be nice for sharing etc

✅ Done! Query string instead of URL fragments, but whatever.

Note that I tried to use dynamic routing with something like `pages/key/[keyId].js`,
but that resulted in full page reloads every time.
The URLs were nicer, but I don't think I'm too worried about it.

### Emphasize selected key more

Currently, selected key is emphasized with a darker gray background.
The green highlights for key indicators are more prominent.
Make the selected key more prominent.

✅ Done, it's a nice orange now, and the other keys in the group are a lighter orange.

### Add tracking

I'm using Fathom for other projects, and I added it today.

✅ Done

### Layout fix: selecting a different key shouldn't move view window around

This is pretty annoying in practice.

✅ This is improved by moving the KeyInfo panel back to the bottom of the screen.

### Better font for key legends

The current font is... _ok_.
Stuff like vol up/down is a hack,
and the backspace/delete/esc/tab keys are all really ugly and pixelated,
especially on non-retina.

20200729 Update:

I had to go to SVGs to fix this, but the result is MUCH better.
I'm not 100% happy with how everything looks yet...
but I'm way happier than I was before.
Some stuff like volume keys just looks like shit with emoji.
Also, Unicode glyphs for computing symbols look like shit compared to SVGs --
maybe because of the fonts I have access to?
It seems like everything might be defaulting to Menlo or GNU FreeFont Mono
because most fonts don't have the escape key symbol.

I improved text/glyph legends by using Roboto Mono,
which looks great and is freely available as a web font I can self-host.

I now differentiate between _glyph_ legends,
which are either one character (`A`) or two characters (`,<`),
_text_ legends, which are words (`Home`) or abbreviations (`Ctrl`),
and _image_ legends, which are SVGs.
Keys may have only one, two, or all three of these;
currently I prefer images, then glyphs, and finally text if nothing else is available,
which is currently the case only for PgUp/PgDn/Home/End.
This made it clear that glyphs should always be the same large size,
and text should always be the same smaller size.
Images should try to match the glyph size, more or less.

I think I'm actually going to call this done,
and add some separate issues for specific icons.

✅ hell yeah

### Nicer legend for the escape key

Currently this is an SVG from Wikimedia Commons, and it looks like shit.
What should I use instead?

I'm mad that the Microsoft Segoe UI font has such a stupid license.
It has the only escape key legend I really like,
and it's not available for this use.
What the fuck good does it do them? Ugh.

✅ Done! Got a link to thenounproject.com from Ben, found the perfect icon.

### Fix mobile view

I broke it ages ago, going to have to dive in deep there probably

Update: recent changes have improved this,
but the biggest problem is that it's not drawing lines on the canvas that extends past the view port.

20200729 Update: I think all the lines are drawing correctly now,
and when I moved the KeyInfo panel back to the bottom,
this is mostly OK?
But I'm still seeing problems with two of the green lines when I select the `[]` keys,
only on mobile.

✅ Josh fixed it! It wasn't calculating the whole document height after all, but it's doing so now.

### Set a debug global state

See commits:

- c57b65a92247d5b054481b942d6784f8d43f7e0b
- 40aa2231c82410f56300bfc1b80f21666e251273

These are consecutive.

In short:

- The _context_ passes object state and function state-setters from parents to children
- There are a few major components to doing this -
  the context object, the state, the context provider, and the provider value.
- For application global state, you have to set the provider in the root, e.g. your `App`,
  which in my case resides in `~/pages/_app.js`.

Example:

#### `~/components/appDebugContext.jsx`

```
import {
  createContext,
  useState,
} from "react";

export const AppDebugContext = createContext({ debugLevel: 0 });
```

#### `~/pages/_app.js`

Originally this just returned a Component:

```
function App({ Component, pageProps }) {
  ...
  return <>
    <Component {...pageProps} />;
  </>
}
```

But now it has to manage the state, and wrap its component in a context provider:

```
import { AppDebugContext } from "~/components/appDebugContext";
function App({ Component, pageProps }) {
  const [appDebug, setAppDebug] = useState({ debugLevel: 0 });
  ...
  return <>
    <AppDebugContext.Provider value={[appDebug, setAppDebug]}>
      <Component {...pageProps} />;
    </AppDebugContext.Provider>
  </
}
```

A few things to note here:

1. The `useState` call has to be in the `App`, and it can't be inside of `appDebugContext.jsx` anywhere.
   I think this is because the `useState` call must be in a React component that is a parent component
   for everything that consumes this context.
   For a global value like my debug settings,
   the only option is `App`.

1. We are using `useState` to keep track of state (the debug level),
   and `createContext` to create a global context.
   The state is only directly usable from the component that creates it.
   You cannot export the return value of `useState` and get/set it in other components.
   (This is because of the React Rules of Hooks.)
   You can however use a context and pass the context to child components.

1. The `value={[appDebug, setAppDebug]}` in the `<AppDebugContext.Provider ...` component is important.
   This is what `useContext()` will return for all the context consumers.
   _If you don't include a setter here, consumers will not be able to set the context._
   Based on some examples on the web and/or the way `useState()` returns the state value and the state setter,
   you might think that `useContext()` always returns the context value and the context setter.
   _Wrong._
   It always returns whatever the `value` attribute of the context provider is set to in the parent element.
   If you are using React state in your context
   and have a state value/setter that you want to be accessible from other components,
   which is our case here,
   then you have to explicitly pass that state value/setter as the `value` attribute.
   (Can you tell this tripped me up for a long time?)

#### `~/components/keyboard.jsx`

To get and set the debugLevel from here, we have to make some changes.
Here's a diff:

```diff
diff --git a/components/keyboard.jsx b/components/keyboard.jsx
index bb88f64..8911aa4 100644
--- a/components/keyboard.jsx
+++ b/components/keyboard.jsx
@@ -1,4 +1,8 @@
-import { useState, useRef, useEffect } from "react";
+import {
+  useContext,
+  useEffect,
+  useState,
+} from "react";
 import { useRouter } from "next/router";

 import classnames from "classnames";
@@ -18,6 +22,8 @@ import { Diagram } from "./diagram";
 import { InfoPanel } from "./infoPanel";
 import { KeyGrid } from "./key";

+import { AppDebugContext } from "~/components/appDebugContext";
+
 export const Keyboard = ({ initialState }) => {
   const [pressedKey, setPressedKey] = useState(initialState || {});
   const [otherSelectedKeys, setOtherSelectedKeys] = useState([]);
@@ -27,6 +33,15 @@ export const Keyboard = ({ initialState }) => {
     windowSize,
   ]);
   const router = useRouter();
+  const [appDebug, setAppDebug] = useContext(AppDebugContext)
+
+  const setAppDebugWrapper = (newLevel) => {
+    return () => {
+      const newValue = { debugLevel: newLevel };
+      log.debug(`Changing appDebug from ${JSON.stringify(appDebug)} to ${JSON.stringify(newValue)}`)
+      setAppDebug(newValue);
+    }
+  };

   useEffect(() => {
     const { keyId } = router.query;
@@ -124,6 +139,10 @@ export const Keyboard = ({ initialState }) => {

           <div className="border border-gray-300 bg-gray-100 rounded-md p-2 m-2">
             <h1 className="text-xl">keyblay</h1>
+            App Debug:
+            <button className="m-2 p-2 border border-gray-300" onClick={setAppDebugWrapper(0)}>0</button>
+            <button className="m-2 p-2 border border-gray-300" onClick={setAppDebugWrapper(1)}>1</button>
+            <button className="m-2 p-2 border border-gray-300" onClick={setAppDebugWrapper(2)}>2</button>
           </div>
```

#### `~/components/diagram.jsx`

This is a consumer of the context.

It's a great example because we use the appDebug value inside of `updateCanvas()`,
which we call in an effect hook.

1. As in the previous example, we import `AppDebugContext`
   and get an `appDebug` and `setAppDebug` by calling `useContext(AppDebugContext)`.

1. We use the `appDebug.debugLevel` directly inside of our `updateCanvas()` function

1. We trigger `updateCanvas()` whenever `appDebug` changes in the effect hook.

```diff
diff --git a/components/diagram.jsx b/components/diagram.jsx
index 0628b01..bd52044 100644
--- a/components/diagram.jsx
+++ b/components/diagram.jsx
@@ -1,4 +1,4 @@
-import { useRef, useEffect, useState } from "react";
+import { useRef, useEffect, useState, useContext } from "react";
 import log from "loglevel";

 import {
@@ -7,12 +7,14 @@ import {
 import {
   documentScrollCenter,
 } from "~/lib/keyConnections";
+import { AppDebugContext } from "~/components/appDebugContext";

 export const Diagram = ({ connections }) => {
   const canvas = useRef();
   const container = useRef();
   const [docHeight, setDocHeight] = useState(0);
   const currentBrowserWidth = useWindowSize();
+  const [appDebug, setAppDebug] = useContext(AppDebugContext);

   const updateCanvas = () => {
     if (!canvas) return;
@@ -52,7 +54,8 @@ export const Diagram = ({ connections }) => {
     }

     // Should only be enabled when in debug mode
-    if (false) {
+    log.debug(`appDebug: ${JSON.stringify(appDebug)}`)
+    if (appDebug.debugLevel > 0) {
       context.strokeStyle = "purple";
       context.lineWidth = 1;
       context.beginPath();
@@ -88,7 +91,7 @@ export const Diagram = ({ connections }) => {
   useEffect(() => void updateCanvas(), []);
   useEffect(() => {
     updateCanvas();
-  }, [connections]);
+  }, [connections, appDebug]);

   return (
     <div
```

#### In conclusion

✅ This was really hard to figure out

### Controlled component example

In commit e6b91119f58f81199a5ccbc3e9078adef3e21f4e,
I implement a controlled component based on the previously implemented
React context backed by React state.

It's a simple `<select>` box that changes the debug level.

✅ Once I had the context stuff figured out, this was easy.

### Another hook example: contexts, state, hooks

See commit 2500d05745e0f63ba46a90e8a4918a09855ff1ac.

I had a function that needed to run when the debug level changed.
Prior to this commit, I did this in the component that changes the debug level.
This worked fine, but meant the debug handling was coupled to the UI,
and if I changed debugging elsewhere in the app later,
my function would not get called.

In this commit I moved the function to the root component,
and use hooks and context to update it automatically no matter where it changes.

✅ Another application of the context + state stuff I just learned

### Break out the `<Keyboard>` component from the surrounding UI

This has been bugging me for a while.

The keyboard was built in a `renderKeyboard()` function,
but I refactored it into its own component,
separate from the info panel and canvas diagram,
which were before all part of `<Keyboard>`.

✅ Easier than I thought - I didn't even need any hooks to do this

### Another hook example: Updating drawing boundaries based on element sizes

See "Diamargs" commit b3330be2bdf7988c200bdc335640176fb3873d90

I wanted `keyboardAndPanelRect` to update via `useCallback()`
whenever the elements inside it changed size,
but I struggled with it for a while.
I was trying to use refs to trigger that update,
but it wasn't triggering --
I'm not sure if I was doing something wrong, but
[How can I measure a DOM node?](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)
was not working for me.

I realized that I would only need the callback to trigger when the key information text changed,
though, which was my aha moment.
The only reason the InfoPanel would change size is if the text within it changed in length,
so I could depend just on `pressedKey` and get the behavior I wanted.

#### Triggering on resizing DOM nodes

Maybe this is not yet easy?
<https://stackoverflow.com/questions/37775020/trigger-resize-event-on-component>

#### useEffect guide

[A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)

This is an _incredible_ guide.
It should be incorporated directly and entirely into official React documentation.

Unfortunately, it didn't directly solve the problem as I conceived of it --
it couldn't tell me how to run a callback when an element changed size.

The way of thinking really helped, though.
It has a world-class explanation of why functional React is different from class-based React,
with great visuals.
It focused me on a question: "what state changes should trigger my callback?"

### Fix linting errors

Use eslint, it seems to be recommended in a lot of places

✅ Done

### Need to show other layers and layouts

- Show my function layer, just for fun(ction)
- Show the Ergodox default layout

How will I show all this info?
Won't be able to see it all at once...

✅ Done 20200807 -- decided it would be useful to have a layout for debugging the diagram lines, and here we go.

### Separate legend from layout definition

Multiple layouts might want to reuse the same set of legends.

✅ Done 20200807 -- also done as part of the debugging layer thing.

### Make keyboard unselectable

There is no value in letting users select text or images on keys.

✅ Done 20200807

### Center key in keyInfo panel

This was bugging me ever since my debugging code could draw a vertical line down the center of the keyboard.
Now it goes through the center of the key as well.

✅ Done 20200807

### The React Chrome dev extension

- It shows you your components, not the HTML they generate. Much less messy.
- Double click on a component, and see its internal state, hooks in use, props passed to it,
  even current value of effect hooks and so forth. Wow.

✅ This thing is dope

### Improve the app title bar thing

- Take up as little vertical space as possible
- Put title on same line as debug controls
- Probably hide debug controls behind hamburger menu?
- I am thinking some kind of About panel should be accessible from there too.

Update 20200807:

- ✅ Take up as little vertical space as possible
- ✅ Put title on same line as debug controls
- ✅ Probably hide debug controls behind hamburger menu?
- 🔲 I am thinking some kind of About panel could be accessible from there too (in the future)
- 🔲 The diagram isn't redrawing when the panel opens, and I'm not sure why.

Update 20200808

- ✅ The diagram isn't redrawing when the panel opens, and I'm not sure why.

DONE :)

### Allow linking to keys in specific maps / with specific legends

Decided this was necessary because there are multiple maps now.

- ✅ done 20200809

### Improve diagram lines

Would be nice if they didn't overlap text, but instead were drawn underneath it.
Maybe hard?

20200731: Thinking more about this:

- Build an "orthogonal" diagram, where all the lines are horizontal or vertical, no slopes or curves
- On the keyboard map, I can cheat --
  all the keys on the left hand have diagram lines that are drawn vertically into the left margin,
  and then down to the key information panel;
  similarly, all the keys on the right have lines that are drawn into the right margin.
- Additionally, I can divide the vertical key space into 7 sections,
  as there are at most 7 keys that occupy the same vertical space.
  I don't need to adjust the attachment point at run time,
  it can just be static for a key in whatever position.
- If I ever reposition the keys to more precisely mirror the location of the keys on the physical ErgoDox,
  which are not in an exact grid,
  I'll have to modify the attachment point location and might have to set it manually on each key,
  but I still won't have to select it algorithmically.
- In the information panel, I have to do some calculations.
- `getClientRects()` returns a list of rects -- one for each line of text -- inside a div.
  I think I can use this to determine how many attachment points are on the same line of text.
- Then I can place the horizontal lines from the margin into the text such that they don't cover one another.
- Calculate positions for vertical lines in the margins to they don't cover one another either

Then I can iterate, perhaps:

- Minimizing crossings
- Automatically moving horizontal lines that are close, if there is room to do so
- Perhaps that could use a "force-directed" technique?
  There's a more general document:
  [Graph Drawing Tutorial](http://cs.brown.edu/people/rtamassi/papers/gd-tutorial/gd-constraints.pdf).
  It discusses force directed techniques for graph layout,
  such that nodes might attract or repel one another;
  if nodes repelled one another but were confined to a location within their parent key,
  I could automatically lay out the horizontal lines to be far apart from each other.
- Experiment with different colors, maybe that helps if there are lines close to each other?
- Intelligently combine lines that are going to or from the same place.
  For instance, two separate places in the text might refer to the same key;
  these could share the vertical line in the margin,
  and only diverge in the info panel.
- Intelligently use the opposite margin,
  if doing so would result in shorter lines or less congested margins.

20200805 update:

- Added Diamargs
- Keyboard sometimes overlaps Diamargs, depending on window width.
  TODO: smarten up breakpoints so that this never happens at sane sizes.

20200808 update:

- 🔲 smarten up breakpoints per above
- ✅ fucking fix margin->keyboard diagram lines overlapping!!
- 🔲 fix margin->text diagram lines overlapping

20200810 update:

- ✅ smarten up breakpoints per above -- actually going to say this looks pretty ok in the non-pathological case right now
- ✅ fix margin->text diagram lines overlapping

THAT MEANS THIS IS FINALLY DONE!

### Decide on a final name

I have always hated 'keyblay'.
What should I call it instead?

Maybe something related to

- Ergonomics
- Guided tours
- RSI

✅ I got keymap.click !!
✅ 20200820 update: Eradicated the hated 'keyblay' from source code

### Release a dev preview

- Improve diagram lines
- Decide on a final name

✅ dev preview officially released, posted on my blog about it, hell yeah

### Add place for more general info

What is an ergodox, why did it help me generally, etc.

Probably will have lots of these.

Maybe an FAQ style section, if I can't think of anything better.

They should be linkable too.

✅ I have a way to add pages now

### Change the component to intraAppLink

It's an intra- not an inter- app link, oops

✅ Fixed

### Add a guide

A new user lands on this page.
What should they click on?
Why should they care?

Some kind of guided tour.

Update 20200823: This exists now, but needs refinement.

- ✅ Basic navigation works!
- 🔲 Get rid of the guide bar; navigate from the key info panel
- 🔲 Possible navigation bugs? Maybe need to re-think state to integrate both guide and pressedKey
- 🔲 Possible initial page load bugs? Make sure the app can't get confused when loading in the middle of a guided tour
- 🔲 Bug: guide in selection box on initial load sometimes wrong
- 🔲 Bug: clicking a key doesn't exit the guide
- 🔲 Add guide for main layout
- 🔲 Add guide for old layout, or maybe just remove it

Update 20200829: UI improvements and bug quashing!!

Remaining:

- 🔲 Add guide for main layout - going to break this into a separate task

Completed:

- ✅ Get rid of the guide bar; navigate from the key info panel
- ✅ Possible navigation bugs? Maybe need to re-think state to integrate both guide and pressedKey
- ✅ Possible initial page load bugs? Make sure the app can't get confused when loading in the middle of a guided tour
- ✅ Bug: guide in selection box on initial load sometimes wrong
- ✅ Bug: clicking a key doesn't exit the guide
- ✅ Add guide for old layout, or maybe just remove it

That means... I can call this item done!
I think there is still room for improvement,
especially regarding having both a menu and a help page.
I created a new task for that too.

✅ !!!! fuck yeah

### Draw orange line on the canvas to connect the selected key to the info panel

The guided tours change the selected key for you.
When they do this, I think it might be jarring for users...
I think they might get confused and not understand what I'm trying to show them.

Make it more obvious that the selected key has changed by drawing an orange line,
like the green lines to connect referenced keys, but maybe bolder and/or brighter.

This will make it obvious exactly what's changing and will draw the user's eye to the place I want.

- ✅ Done! This looks really nice and I think it helps tell what's going on especially during the tour.

### Don't parse the key info

Should just require setting the required class names as HTML in the text.
It's barely more cumbersome this way, and less code.
I'm already using HTML in the info anyway... might as well remove all this parsing crap.

- ✅ Ended up having to do this in order to get nicer key info like links and stuff --
  I actually had to just move to writing all the key info prose in JSX.

### Fix messy state crap

State is all over the place because it's hard and I learned it over the course of this project.
Clean this up.

Josh has mentioned `unstated-next` to me more than once, can that help me?

- ✅ I actually _mostly_ did this with `useKeymapUiState`, although I'd still like to go in and audit where I'm prop drilling vs where I'm using state

### Add a guide for the main layout

- ✅ Fill out all the info content.
- ✅ Edit all the content -- first pass complete solo, will solicit editing from others

### Add content for all the keys I want

- ✅ Fill out key info content with references.
- ✅ Edit all the content -- first pass complete solo, will solicit editing from others

### Add prose content

- ✅ Write about what this is, who am I, how this works, what an ErgoDox is, RSI stuff, etc etc.
- ✅ Edit all of this. -- first pass complete solo, will solicit editing from others

### Can I remove the menu?

It seems like having the help page and the menu with settings is redundant.
Should I make a setting panel that works like the help panel?

Should I instead integrate the help in the menu?

Seems like I shouldn't need both.
Feels cluttered.

- Make debugging controls invisible.
  Only accessible via the query string?
  Hidden page that sets a value to localSettings?
- Remove keyLegends and keyMaps dropdowns from the settings.
  Later, incorporate them into the keyInfo panel,
  maybe via a settings button of some kind.
- Move site navigation inline on each page,
  and on the main page use the key info panel.
  Maybe use a float on the upper right of the content area.

✅ I removed it.

Now I have a hamburger menu, and it's much better.

I removed the legends and maps dropdowns unless you're in advanced mode,
which you can set from the control panel.

### Add a control panel

Add `/controls` for features flags etc.

- ✅ Done! Currently has the following features:

- Debug dropdown moved here
- Added Advanced Mode checkbox, which enables showing keymap/legendmap controls
  on the hamburger menu for keymapUi.
- Enabling colors for experimentation

Users aren't expected to touch this, just for feature flags and other dev stuff.

### Release a version 1.0

- ✅ Add a guide
- ✅ Add / edit content for all the keys I want
- ✅ Add place for more general info / prose
- ✅ Add / edit prose content
- ✅ Draw orange line to selected key
- ✅ Solicit feedback from others

All of this is... done, holy shit.
I need to write a blog post and link it around on the web.
We can call this a 1.0.
Holy shit holy shit holy shit.

### Solicit feedback from others

I need outside eyes on this.

- Editing
- Bug hunting
- Does this even make sense for someone who hasn't stared at it for 100 hours?

✅ My editorial team liked it!
