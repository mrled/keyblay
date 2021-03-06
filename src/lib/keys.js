import MrlLegends from "./keyLegends/mrlLegends";
import NoLegends from "./keyLegends/noLegends";
import TextLegends from "./keyLegends/textLegends";
import UnicodeLegends from "./keyLegends/unicodeLegends";

import DebugLayout from "./keyMaps/debugLayout";
import MrlMainLayer from "./keyMaps/mrlMainLayer";

export const keyMaps = {
  DebugLayout: DebugLayout,
  MrlMainLayer: MrlMainLayer,
};

Object.keys(keyMaps).forEach((keyMapName) => {
  const keyMap = keyMaps[keyMapName];
  if (!keyMap.guides) {
    keyMap.guides = {};
  }
  keyMap.guides["none"] = {
    fullName: "(none)",
    steps: [],
  };
  Object.keys(keyMap.guides).forEach(
    (guideKey) => (keyMap.guides[guideKey]["name"] = guideKey)
  );
  if (!keyMap.fullName) {
    keyMap["fullName"] = keyMapName;
  }
  keyMap.allKeys = [].concat(
    keyMap.leftHandKeys,
    keyMap.leftThumbKeys,
    keyMap.rightHandKeys,
    keyMap.rightThumbKeys
  );
  keyMap.allKeysById = {};
  keyMap.allKeys.forEach((keyData, keyIdx) => {
    const side = keyData.board[0] == "right" ? "r" : "l";
    const cluster = keyData.board[1] == "finger" ? "f" : "t";
    const keyId = `${side}-${cluster}-${keyData.startPos[0]}-${keyData.startPos[1]}`;
    keyData.reactKey = keyId;
    keyData.id = keyId;
    keyData.handleTop = keyIdx % 2 === 1; // If true, the handle is at or above the center line; if false, it is at or below it
    keyMap.allKeysById[keyData.id] = keyData;
  });
});

export const legendMaps = {
  MrlLegends: MrlLegends,
  NoLegends: NoLegends,
  TextLegends: TextLegends,
  UnicodeLegends: UnicodeLegends,
};

Object.keys(legendMaps).forEach((legendMapName) => {
  const legendMap = legendMaps[legendMapName];
  if (!legendMap.fullName) {
    legendMap["fullName"] = legendMapName;
  }
});

export const defaultGuideStep = {
  key: null,
  selection: [],
  guideText: "",
};
