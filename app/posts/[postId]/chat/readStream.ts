export const readStream = async (
  stream: ReadableStream,
  onChunkValue: (chunk: string) => void
) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let done = false;

  let result = "";

  while (!done) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    result += chunkValue;

    onChunkValue(result);
  }
};
