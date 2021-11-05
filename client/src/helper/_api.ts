import axios from "axios";
import { LoginInput } from "../utils/type";
import { baseUri } from "../utils/constant";

export async function useLogIn(value?: LoginInput): Promise<string | boolean> {
  const { data, status } = await axios.post(
    `${baseUri}/log-in`,
    {
      email: value?.email,
      password: value?.password,
    },
    { withCredentials: true }
  );

  if (status === 500) return false;
  return data;
}
