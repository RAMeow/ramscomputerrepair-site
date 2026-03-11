export const onRequestPost: PagesFunction<{
  RAMEOW_BUCKET: R2Bucket;
}> = async ({ request, env }) => {
  const body = await request.json().catch(() => null);

  const oldKey = body?.oldKey;
  const newKey = body?.newKey;

  if (!oldKey || !newKey || typeof oldKey !== "string" || typeof newKey !== "string") {
    return new Response(JSON.stringify({ error: "Missing oldKey or newKey" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const sourceObject = await env.RAMEOW_BUCKET.get(oldKey);

  if (!sourceObject) {
    return new Response(JSON.stringify({ error: "Original file not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  await env.RAMEOW_BUCKET.put(newKey, sourceObject.body, {
    httpMetadata: sourceObject.httpMetadata,
    customMetadata: sourceObject.customMetadata,
  });

  await env.RAMEOW_BUCKET.delete(oldKey);

  return new Response(JSON.stringify({ ok: true, oldKey, newKey }), {
    headers: { "Content-Type": "application/json" },
  });
};
