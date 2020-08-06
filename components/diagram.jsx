import { useRef, useEffect, useState, useContext } from "react";
import log from "loglevel";

import {
  smallerRect,
  traceRect,
} from "~/lib/geometry";
import {
  useWindowSize,
} from "~/lib/hooks";
import { AppDebugContext } from "~/components/appDebugContext";

export const Diagram = ({ connections, keyboardAndPanelRect, diamargLeftRect, diamargRightRect }) => {
  const canvas = useRef();
  const container = useRef();
  const [docHeight, setDocHeight] = useState(0);
  const currentBrowserWidth = useWindowSize();
  const [appDebug, setAppDebug] = useContext(AppDebugContext);

  const updateCanvas = () => {
    if (!canvas) return;
    if (!canvas.current) return;

    const context = canvas.current.getContext("2d");

    /* Without setting the h/w here, canvas will be some arbitrary small size
     * canvas.style.{w/h} is the CSS 'style' property of the element in the DOM,
     * while canvas.{w/h} is the _internal_ dimensions for drawing on.
     * We want our canvas to cover the entire screen,
     * so this relies on the container being position: absolute in the top left
     * and width/height at 100%,
     * while the canvas should also be position: absolute and overflow: visible.
     */
    canvas.current.style.width = `${container.current.scrollWidth}px`;
    canvas.current.style.height = `${container.current.scrollHeight}px`;
    canvas.current.width = container.current.scrollWidth;
    canvas.current.height = container.current.scrollHeight;

    /* Clear the canvas completely before drawing
     * Without this, fast refresh during development will show old paths and new paths
     * until you fully reload the page (e.g. with ctrl-r)
     */
    context.clearRect(0, 0, canvas.current.width, canvas.current.height);

    /* Draw each connection
     * Now that the canvas is the size of the entire screen,
     * we can easily just draw lines connecting the bounding rectangles of the sources/targets.
     */
    log.debug(`The lines object is a ${typeof connections}, and it logs as:`);
    log.debug(connections);
    if (!connections) {
      log.debug("No connections to set");
      return;
    }

    const keyboardCenter = keyboardAndPanelRect.x + (keyboardAndPanelRect.right - keyboardAndPanelRect.x) / 2;

    if (appDebug.debugLevel > 1) {
      log.debug(`diagram: visual debugging enabled`);
      context.lineWidth = 2;

      // Draw a rectangle inset from the three KID elements.
      // Show we can track their outline as they change in size.
      // Also draw a line down the center of the keyboard.

      if (keyboardAndPanelRect) {
        context.beginPath();
        context.strokeStyle = "purple";
        context.moveTo(keyboardCenter, 0);
        context.lineTo(keyboardCenter, document.documentElement.scrollHeight);
        context.stroke();

        context.strokeStyle = "purple";
        context.beginPath();
        traceRect(smallerRect(keyboardAndPanelRect), context);
        context.stroke()
      } else {
        log.debug(`diagram: could not draw center line because there was no keyboardAndPanelRect`);
      }

      if (diamargLeftRect) {
        const diamargLeftRectInner = smallerRect(diamargLeftRect);
        context.strokeStyle = "purple";
        context.beginPath();
        traceRect(diamargLeftRectInner, context);
        context.stroke()
      } else {
        log.debug(`diagram: there is no diamargLeftRect`);
      }
      if (diamargRightRect) {
        const diamargRightRectInner = smallerRect(diamargRightRect);
        context.strokeStyle = "purple";
        context.beginPath();
        traceRect(diamargRightRectInner, context);
        context.stroke()
      } else {
        log.debug(`diagram: there is no diamargRightRect`);
      }


    }

    context.strokeStyle = "#68d391";
    context.lineWidth = 1;
    const marginInsetTickSize = 5;  // Distance between lines in margin
    context.beginPath();
    connections.forEach((connection, idx) => {
      const source = connection.sourceCoords;
      const target = connection.targetCoords;
      if (!source || !target) {
        log.debug(`Connection is not complete, skipping: ${connection}`)
        return
      }
      const rightMargin = keyboardCenter < target.x;

      const calculateMarginXCoord = (marginRect, rightMargin, connIdx, tickSize) => {
        const inset = connIdx * tickSize;
        const offsetMultiplier = rightMargin ? -1 : 1;
        const offset = inset * offsetMultiplier;
        const offsetFrom = rightMargin ? marginRect.right : marginRect.left;
        return offsetFrom + offset;
      }

      const diamargRect = rightMargin ? diamargRightRect : diamargLeftRect;
      const marginX = calculateMarginXCoord(diamargRect, rightMargin, idx, marginInsetTickSize)

      context.moveTo(source.x, source.y);
      context.lineTo(marginX, source.y);
      context.lineTo(marginX, target.y);
      context.lineTo(target.x, target.y);
    });
    context.stroke();
  };

  useEffect(() => {
    setDocHeight(document.documentElement.scrollHeight);
  }, [currentBrowserWidth]);

  useEffect(() => void updateCanvas(), []);
  useEffect(() => {
    updateCanvas();
  }, [connections, appDebug, keyboardAndPanelRect, diamargLeftRect, diamargRightRect]);

  return (
    <div
      ref={container}
      id="keyblay-debug-canvas-container"
      style={{ height: docHeight, width: "100%" }}
      className="absolute top-0 left-0 w-full pointer-events-none z-50"
    >
      <canvas
        ref={canvas}
        id="keyblay-debug-canvas"
        className="absolute overflow-visible h-full w-screen"
      />
    </div>
  );
};
