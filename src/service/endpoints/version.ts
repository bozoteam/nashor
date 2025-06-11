import { api } from "../kyClient";

type VersionType = {
  date: string;
  unix: string;
};

export const fetchVersionNashor = async () => {
  const res = await api.get("nashor/version").json<VersionType>();
  return res;
};

export const fetchVersionRoshan = async () => {
  const res = await api.get("roshan/version").json<VersionType>();
  return res;
};
