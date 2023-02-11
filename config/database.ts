import path from "path";

export default ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env(
        "DATABASE_FILENAME",
        path.join(__dirname, "..", "..", ".tmp/data.db")
      ),
      // filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});
