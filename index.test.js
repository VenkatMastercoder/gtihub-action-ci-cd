const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const app = require("./index");

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          body: data,
        });
      });
    });

    req.on("error", reject);
  });
}

test("GET /health returns healthy status", async () => {
  const server = app.listen(0);

  try {
    const { port } = server.address();
    const response = await makeRequest(`http://127.0.0.1:${port}/health`);
    const payload = JSON.parse(response.body);

    assert.equal(response.statusCode, 200);
    assert.deepEqual(payload, {
      status: "ok",
      message: "Server is healthy",
    });
  } finally {
    server.close();
  }
});