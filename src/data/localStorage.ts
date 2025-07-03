import type { AppState } from "@excalidraw/excalidraw/types";
import { STORAGE_KEYS } from "@/config/app_constants";

// ====== 自行實作 Excalidraw 狀態相關 helper ======

function getDefaultAppState(): Partial<AppState> {
  return {
    theme: "light",
    viewBackgroundColor: "#ffffff",
    gridSize: undefined,
    // 可依需求補充預設值
  };
}

function clearAppStateForLocalStorage(
  appState: Partial<AppState>,
): Partial<AppState> {
  // 只保留你想存的欄位
  const {
    theme,
    viewBackgroundColor,
    gridSize,
    // ...其他你想保留的欄位
  } = appState;
  return { theme, viewBackgroundColor, gridSize };
}

function clearElementsForLocalStorage(elements: any[]): any[] {
  // 過濾掉 isDeleted 的元素
  return Array.isArray(elements) ? elements.filter((el) => !el.isDeleted) : [];
}

export const importFromLocalStorage = () => {
  let savedElements = null;
  let savedState = null;
  let savedFiles = null;

  try {
    savedElements = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS);
    savedState = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_APP_STATE);
    savedFiles = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_FILES);
  } catch (error: any) {
    // Unable to access localStorage
    console.error(error);
  }

  let elements = [];
  if (savedElements) {
    try {
      elements = clearElementsForLocalStorage(JSON.parse(savedElements));
    } catch (error: any) {
      console.error(error);
      // Do nothing because elements array is already empty
    }
  }

  let appState = null;
  if (savedState) {
    try {
      appState = {
        ...getDefaultAppState(),
        ...clearAppStateForLocalStorage(
          JSON.parse(savedState) as Partial<AppState>,
        ),
      };
    } catch (error: any) {
      console.error(error);
      // Do nothing because appState is already null
    }
  }

  let files = {};
  if (savedFiles) {
    try {
      files = JSON.parse(savedFiles);
    } catch (error: any) {
      console.error(error);
      // Do nothing because files is already empty object
    }
  }

  return { elements, appState, files };
};

export const getElementsStorageSize = () => {
  try {
    const elements = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS);
    const elementsSize = elements?.length || 0;
    return elementsSize;
  } catch (error: any) {
    console.error(error);
    return 0;
  }
};

export const getTotalStorageSize = () => {
  try {
    const appState = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_APP_STATE);
    const collab = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_COLLAB);

    const appStateSize = appState?.length || 0;
    const collabSize = collab?.length || 0;

    return appStateSize + collabSize + getElementsStorageSize();
  } catch (error: any) {
    console.error(error);
    return 0;
  }
};
