export default defineEventHandler(async function (event) {
  const body = await readBody(event);
  console.log(body);
  return body;
});
