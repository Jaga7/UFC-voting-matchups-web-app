import axios from "axios";

const mode: string = "dev";
const URL: string = mode === "dev" ? "/" : "http://productionurl.com";
// mode === "dev" ? "http://localhost:4000/" : "http://productionurl.com";

export default axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});
