# Client Questionnaire — Setup & Sharing Guide

A private, share-by-link intake form that collects a client's full travel
preferences and sends them to Kara.

## The files

| File | What it is |
|------|------------|
| `questionnaire.html` | The form clients fill in |
| `questionnaire-success.html` | The "thank you" page shown after submitting |

Both are **hidden from search engines** (`noindex`) and are **not linked**
from the main site navigation. They're only reachable by sharing the link.

## The link to share

After deploying to Netlify:

```
https://www.heirloomholidays.co.uk/questionnaire
```

Send this to clients by email, WhatsApp, etc. There is nothing else on the
site that points to it.

## ⚠️ One-time step: turn on the email to Kara

The form uses **Netlify Forms**. Every submission is saved in your Netlify
dashboard automatically — but to also get an **email**, you flip on a
notification once:

1. Deploy the site to Netlify (push to GitHub → Netlify builds it).
2. Open the **first** submission so Netlify registers the form
   (submit the live form once yourself as a test).
3. In Netlify: **Site configuration → Forms → Form notifications**
   (older UI: **Forms → `client-questionnaire` → Settings → Notifications**).
4. Click **Add notification → Email notification**.
5. Set **Email to notify** = `kara@heirloomholidays.co.uk` and choose the
   form **`client-questionnaire`**. Save.

From then on, every completed questionnaire emails Kara with all the answers,
nicely labelled (e.g. "Budget per night: Up to $750").

> Until this notification is added, submissions are still captured safely in
> the Netlify dashboard under **Forms** — they're never lost.

## How it works (plain English)

- Client opens the link, fills in the form, presses **Send My Preferences**.
- Netlify receives it, saves it, emails Kara (once set up), then shows the
  thank-you page.
- Only **Name** and **Email** are required — everything else is optional, so
  busy clients can still complete it quickly.

## Editing the questions later

All questions live in `questionnaire.html`. Each question is a labelled block;
copy an existing one and change the wording/options. Keep the `name="..."`
attribute meaningful — that label is exactly what appears in Kara's email.
