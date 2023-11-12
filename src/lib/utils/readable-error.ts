export const readableError = (error: any) => {
  const { data, message } = error as {
    data?: { message?: string };
    message?: string;
  };

  let actualMessage = data?.message || message || JSON.stringify(error);

  if (actualMessage.includes('(reason="execution reverted: ')) {
    actualMessage = actualMessage
      .split('(reason="execution reverted: ')[1]
      .trim();
  }
  
  actualMessage = actualMessage.split('", method')[0].split("(")[0].trim();

  return actualMessage;
};
