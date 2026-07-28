# Start here — Aaditya portfolio

This folder is the first working visual template for the portfolio.

## 1. Install the two programs you need

Install:

- Node.js 22 LTS
- Git for Windows

Then restart VS Code or your terminal.

## 2. Open the project

1. Unzip this folder.
2. Open VS Code.
3. Select **File → Open Folder**.
4. Choose the `aaditya-portfolio-starter` folder.
5. In VS Code, open **Terminal → New Terminal**.

## 3. Install and run

```powershell
npm install
npm run dev
```

Open the local address shown in the terminal, normally:

```text
http://localhost:3000
```

Stop the server with `Ctrl + C`.

## 4. Test the Cloudflare runtime

```powershell
npm run preview
```

This builds the project through the Cloudflare OpenNext adapter and previews it in the Workers runtime.

## 5. Replace the obvious placeholders

Before publishing, update:

- `YOUR_EMAIL_HERE`
- `YOUR_LINKEDIN`
- `YOUR_GITHUB`
- `https://example.com` in `src/app/layout.tsx`
- `https://example.com` in `src/app/sitemap.ts`

Place your résumé here:

```text
public/resume/Aaditya-Patil-Resume.pdf
```

## 6. Create the GitHub repository

Create a blank repository named `aaditya-portfolio`. Do not add a README or license on GitHub because this project already contains files.

Run these commands from the project folder:

```powershell
git init
git add .
git commit -m "Create portfolio foundation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aaditya-portfolio.git
git push -u origin main
```

## 7. First Cloudflare deployment

The easiest first deployment is from your computer:

```powershell
npm run deploy
```

Wrangler will ask you to log in to Cloudflare in your browser. After deployment, Cloudflare gives the project a `workers.dev` address.

## 8. Connect GitHub for automatic updates

In Cloudflare:

1. Open **Workers & Pages**.
2. Select your Worker.
3. Open **Settings → Builds**.
4. Select **Connect**.
5. Choose the GitHub repository.
6. Set the production branch to `main`.
7. Use `npm run deploy` as the deploy command if Cloudflare asks for one.

After this, pushes to `main` can automatically build and publish the live site.

## 9. Add a custom domain later

After buying or onboarding the domain in Cloudflare:

1. Open **Workers & Pages**.
2. Select the portfolio Worker.
3. Open **Settings → Domains & Routes**.
4. Select **Add → Custom Domain**.
5. Enter the domain.
6. Repeat for `www` if desired, then redirect one version to the other.

## 10. Normal update workflow

```powershell
git add .
git commit -m "Add wheel FEA case study"
git push
```

Cloudflare then builds and publishes the update.
