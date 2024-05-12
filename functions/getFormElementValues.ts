import { FormEvent } from "react";

function getFormElementValues(event: FormEvent<HTMLFormElement>) {
  const formData = new FormData(event.currentTarget);
  const data: { [key: string]: string | number | File } = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  console.log(data);
  return data;
}
export default getFormElementValues;
