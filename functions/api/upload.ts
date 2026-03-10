export const onRequestPost: PagesFunction<{
  RAMEOW_BUCKET: R2Bucket;
}> = async ({ request, env }) => {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Basic filename cleanup
  const safeName = file.name.replace(/[^\w.\- ]+/g, "_");
  const key = `${Date.now()}-${safeName}`;

  await env.RAMEOW_BUCKET.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type || "application/octet-stream",
    },
  });

  return new Response(JSON.stringify({ ok: true, key }), {
    headers: { "Content-Type": "application/json" },
  });
};
