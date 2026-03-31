import type { TypeOf } from "zod";
import type ClientSchema from "../http/schemas/client.schema.js";

export type CreateClientSchema = TypeOf<typeof ClientSchema.CreateClientSchema>
export type UpdateClientSchema = TypeOf<typeof ClientSchema.UpdateClientSchema>