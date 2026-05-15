export function requirePatchFields(schema) {
  return schema.refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });
}
