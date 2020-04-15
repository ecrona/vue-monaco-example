import * as monaco from "monaco-editor";

export const insertText = (
  instance: monaco.editor.IStandaloneCodeEditor,
  text: string,
  coords: [number, number] = [0, 0],
  placeCursor = false
) => {
  const range = new monaco.Range(coords[0], coords[1], coords[0], coords[1]);

  if (placeCursor) {
    const selection = new monaco.Selection(
      coords[0],
      coords[1],
      coords[0],
      coords[1]
    );
    instance.executeEdits(
      "insert",
      [{ range, text, forceMoveMarkers: true }],
      [selection]
    );
    instance.focus();
  } else {
    instance.executeEdits("insert", [{ range, text, forceMoveMarkers: true }]);
  }

  instance.pushUndoStop();
};
