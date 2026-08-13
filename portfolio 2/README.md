# Jinna Yu — portfolio (static rebuild)

Plain HTML/CSS, no framework, no build step. Free to host, free to run.

## Files
- `index.html` — homepage (hero, work grid, contact)
- `about.html` — standalone About page
- `work/*.html` — one page per case study, linked from the homepage grid
- `style.css` — shared design system (colors, type, layout) used by every page
- `images/` — drop your screenshots here

## Add your croissant logo + favicon
1. Save your croissant PNG into `images/` as `favicon-croissant.png`
2. In every HTML file, find this line near the top:
   `<link rel="icon" href="images/favicon-croissant.png" type="image/png">` (or `../images/...` inside `work/` pages) — this already points to the right filename, so it'll work automatically once the file is there
3. To use the croissant in the nav logo instead of the placeholder line-drawing, find this block near the top of each page and replace the `<svg>...</svg>` with:
   `<img src="images/favicon-croissant.png" alt="" style="width:22px;height:22px;">` (adjust the path to `../images/...` inside `work/` pages)

## Add case study walkthrough videos (optional)
Each case study page has a spot for a short video walkthrough, right below the hero image.

Recommended approach:
1. Record a screen recording with voiceover for that case study — 60-90 seconds covering the problem, your key decision, and the result. No camera needed.
2. Upload it to YouTube as **Unlisted** (not Public, not Private) — this keeps it out of search and off your channel, but anyone with the direct link or embed can watch it.
3. Copy the video ID from the YouTube URL — the part after `watch?v=`
4. In that case study's HTML file, find the `<div class="video-placeholder">` and replace it with:
   `<div class="video-wrap"><iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" title="Walkthrough" allowfullscreen></iframe></div>`

This is optional — case studies work fine without video too.

## Fill in the placeholder copy
Several case study pages have bracketed placeholder lines like `[Add a specific number here]` — these mark spots where a concrete result or detail will make the case study stronger. Replace with real numbers/details where you have them, or delete the line if not.

Also update `about.html`'s "Why a croissant" line with your own story.

## Swap in your images
Each case study page (inside `work/`) has a placeholder box like:
`<div class="media-placeholder">Drop image: eddie-redesign-hero.jpg</div>`

To replace one:
1. Put your image file in the `images/` folder (e.g. `images/eddie-redesign-hero.jpg`)
2. In that case study's HTML file, replace the placeholder `<div>` with:
   `<img src="../images/eddie-redesign-hero.jpg" alt="Eddie by Giddy redesigned homepage" style="width:100%;border-radius:6px;">`
   (note the `../` since case study pages live inside `work/`)

`about.html` also has one placeholder for a portrait photo — same idea, just use `images/` without `../` since `about.html` lives at the top level.

## Deploy on Cloudflare Pages (free)
1. Create a free GitHub account if you don't have one, and a new repository (e.g. `jinnayu-portfolio`)
2. Upload these files (index.html, style.css, images/) to that repo
3. Go to Cloudflare Pages (dash.cloudflare.com → Pages → Create a project → Connect to Git)
4. Select the repo. Build settings: leave "framework preset" as None, no build command needed
5. Deploy — you'll get a live preview URL like `jinnayu-portfolio.pages.dev`

## Point your domain at it
Once the preview looks right:
1. In Cloudflare Pages, go to your project → Custom domains → add your domain
2. Cloudflare will show you the DNS records to add (or, if your domain's nameservers are already on Cloudflare, it's automatic)
3. Allow a few hours for DNS to propagate, then test the live domain before deleting anything elsewhere

## Still to do
- Replace `hello@jinnayu.com` and the LinkedIn link in index.html with your real ones if different
- Add a real `resume.pdf` to this folder (the nav links to it)
- Swap in the 5 case study images
