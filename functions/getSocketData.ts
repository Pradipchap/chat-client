import { DetailsObjectInterface } from "./../interfaces/dataInterfaces";

export default async function getSocketData(data) {
  const details: DetailsObjectInterface = JSON.parse(
    await data.slice(0, 92).text()
  );
  const messageBlob = await data.slice(92);
  const message = await messageBlob.text();

  return { message, details };
}
