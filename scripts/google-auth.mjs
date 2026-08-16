import http from "node:http";
import { google } from "googleapis";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const port = Number(process.env.GOOGLE_OAUTH_LOCAL_PORT || 53682);

if (!clientId || !clientSecret) {
  console.error("Defina GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET no ambiente antes de executar.");
  process.exit(1);
}

const redirectUri = `http://localhost:${port}/oauth2callback`;
const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
const scopes = [
  "https://www.googleapis.com/auth/calendar.freebusy",
  "https://www.googleapis.com/auth/calendar.events.owned",
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: scopes,
});

console.log("\n1) Adicione esta Redirect URI ao cliente OAuth no Google Cloud:");
console.log(redirectUri);
console.log("\n2) Abra esta URL no navegador:\n");
console.log(authUrl);
console.log("\n3) Após autorizar, o navegador voltará para o callback local.\n");

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", redirectUri);
    if (url.pathname !== "/oauth2callback") {
      res.writeHead(404).end("Not found");
      return;
    }

    const code = url.searchParams.get("code");
    if (!code) throw new Error("Callback sem code.");

    const { tokens } = await oauth2Client.getToken(code);
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Autorização concluída. Volte ao terminal e salve o refresh token.");

    console.log("\nGOOGLE_REFRESH_TOKEN:\n");
    console.log(tokens.refresh_token || "Nenhum refresh token retornado. Revogue o acesso do app e repita com prompt=consent.");
    console.log("\nGuarde o token em .env.local e nunca faça commit.\n");
    server.close();
  } catch (error) {
    console.error(error);
    res.writeHead(500).end("Falha na autorização. Veja o terminal.");
    server.close();
    process.exitCode = 1;
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Aguardando callback em ${redirectUri}`);
});
