import React from "react";

export const useClipboard = () => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (error) {
      console.error("Error copying text to clipboard:", error);
      fallbackCopyToClipboard(textToCopy);
    }
  };

  const fallbackCopyToClipboard = (textToCopy: string) => {
    const textField = document.createElement("textarea");
    textField.innerText = textToCopy;
    document.body.appendChild(textField);
    textField.select();
    textField.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(textField);
    setIsCopied(true);
  };

  const handleClick = (textToCopy: string) => {
    copyToClipboard(textToCopy);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return { isCopied, handleClick };
};
