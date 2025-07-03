import { useI18n, languages } from "@excalidraw/excalidraw";
import React from "react";

export const LanguageList = ({
  style,
  setLangCode,
}: {
  style?: React.CSSProperties;
  setLangCode: (langCode: string) => void;
}) => {
  const { t, langCode } = useI18n();

  return (
    <select
      className="dropdown-select dropdown-select__language"
      onChange={({ target }) => setLangCode(target.value)}
      value={langCode}
      aria-label={t("buttons.selectLanguage")}
      style={style}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
