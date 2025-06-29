This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# 🛠️ Contributing to P1 (Next.js SaaS Project)

Welcome! 👋 We're excited to have you contribute to `p1`. Please follow this guide to contribute effectively and avoid common issues.

---

## 🔧 Development Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/sameerbiradar200/p1.git
   cd p1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**  
   [http://localhost:3000](http://localhost:3000)

---

## 🌱 Creating a Feature or Fix Branch

> ⚠️ Do NOT push directly to `main`. Use a feature branch.

1. **Pull latest main**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## ✅ Making a Pull Request (PR)

1. After committing your changes:
   ```bash
   git push origin feat/your-feature-name
   ```

2. Go to GitHub → [Pull Requests](https://github.com/sameerbiradar200/p1/pulls)

3. Click **"New Pull Request"**:
    - **Base branch:** `main`
    - **Compare:** `feat/your-feature-name`

4. Fill in:
    - Title
    - Description
    - Screenshots (if UI-related)

---

## 🔒 PR Rules (Because of Branch Protection)

Your PR will require:

- ✅ At least **2 approvals**
- ✅ Clean commit history (linear preferred)
- ❌ No direct push or merge to `main`

---

## 🔁 Keeping Your Branch Updated with `main`

Before merging, sync your branch:
```bash
git checkout feat/your-feature-name
git pull origin main --rebase
```

---

## 🧨 Merge Conflicts

If you see:
> "This branch has conflicts that must be resolved"

### Solve via GitHub:
1. Click **"Resolve conflicts"**
2. Manually choose what to keep
3. Click **Mark as resolved**
4. Commit the merge

### Solve via Git CLI:
```bash
git pull origin main --rebase
# OR
git merge main
```
Then:
- Edit conflicted files
- Remove conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
- Save the correct version
- Then:
  ```bash
  git add .
  git commit -m "Resolved conflict"
  git push origin feat/your-feature-name
  ```

---

## 🧪 CI/CD Issues (Build Failing)

> If your PR has a failed check (e.g., Vercel deployment fails):

1. Click on the failed check in the PR to see logs
2. Fix code (like invalid JSX, linting, etc.)
3. Push a new commit:
   ```bash
   git commit -am "Fix: broken layout"
   git push
   ```

---

## 👥 Code Reviews

- Tag @sameerbiradar200 or another contributor if you need a review.
- Try to keep PRs **small** and focused.
- Add comments or TODOs if something's still pending.

---

## 📦 Deployment

> 🚀 Once PR is approved and merged into `main`, Vercel will auto-deploy to production (if connected).

---

## 🙏 Thanks for contributing!

We appreciate your help in making this SaaS platform better. Feel free to open issues, suggest improvements, or just ask questions.
