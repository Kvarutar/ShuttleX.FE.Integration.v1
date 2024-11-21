export const convertBlobToImgUri = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise<string>(resolve => {
    reader.onloadend = () => resolve(reader.result as string);
  });
};
