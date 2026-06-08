# Post-Stay Questionnaire — Setup & Sharing Guide

A private, share-by-link feedback form sent to clients **after** their trip, so
Kara hears how everything went and can keep making each journey better.

## The files

| File | What it is |
|------|------------|
| `post-stay.html` | The feedback form clients fill in after their trip |
| `post-stay-success.html` | The "thank you" page shown after submitting |

Both are **hidden from search engines** (`noindex`) and are **not linked**
from the main site navigation. They're only reachable by sharing the link.

## The link to share

After deploying to Netlify:

```
https://www.heirloomholidays.co.uk/post-stay
```

Send this to clients by email, WhatsApp, etc. once they're home. There is
nothing else on the site that points to it.

## ⚠️ One-time step: turn on the email to Kara

> ✅ **Done (8 Jun 2026):** the email notification for `post-stay-questionnaire`
> → `kara@heirloomholidays.co.uk` is configured and live (Netlify hook
> `6a270d6172895d82e906730e`). The steps below are kept for reference, in case
> it ever needs to be recreated.

The form uses **Netlify Forms**. Every submission is saved in your Netlify
dashboard automatically — but to also get an **email**, you flip on a
notification once:

1. Deploy the site to Netlify (push to GitHub → Netlify builds it).
2. Open the **first** submission so Netlify registers the form
   (submit the live form once yourself as a test).
3. In Netlify: **Site configuration → Forms → Form notifications**
   (older UI: **Forms → `post-stay-questionnaire` → Settings → Notifications**).
4. Click **Add notification → Email notification**.
5. Set **Email to notify** = `kara@heirloomholidays.co.uk` and choose the
   form **`post-stay-questionnaire`**. Save.

From then on, every completed form emails Kara with all the answers, nicely
labelled (e.g. "Hotel rating: 9", "Were you upgraded: Yes").

> This is a **separate** form from the pre-trip `client-questionnaire`, so it
> needs its own notification turned on — even if you already set one up for the
> questionnaire.

> Until this notification is added, submissions are still captured safely in
> the Netlify dashboard under **Forms** — they're never lost.

## How it works (plain English)

- Client opens the link after their trip, fills in the form, presses
  **Send My Feedback**.
- Netlify receives it, saves it, emails Kara (once set up), then shows the
  thank-you page.
- **Everything is optional**, so a busy client can rate one or two things and
  still send it in seconds.

## The ratings

Hotel, breakfast, gym and spa are rated on a **slider out of 10**:

- A rating is only recorded **once the client moves the slider** — an untouched
  slider sends nothing, so you won't see misleading "5"s.
- **Breakfast** and **spa** have a **"N/A"** tick for clients who didn't use them.
- The **gym** has a cheeky opt-out tick — *"Gym?!? That's not a holiday to
  me!"* — for guests who (quite rightly) don't work out on holiday. Ticking it
  records the gym rating as "N/A".

> The sliders need JavaScript to record their number. Every other field (the
> written answers, yes/no choices, testimonial) works regardless.

## The testimonial

The last section asks for a testimonial **and** includes a tick-box where the
client gives permission to share their words (with their first name) on social
media and the website. Only treat a testimonial as publishable when that box
came back ticked ("Permission to share testimonial: Yes …").

## Editing the questions later

All questions live in `post-stay.html`. Each question is a labelled block; copy
an existing one and change the wording/options. Keep the `name="..."` attribute
meaningful — that label is exactly what appears in Kara's email.
