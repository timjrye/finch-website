# Finch website landing page

Simple static landing page for Finch with Loops waitlist signup.

Live site: `https://finchmoney.co.uk`

## Local preview

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Configure Loops

1. Create a form in Loops (`https://app.loops.so/forms`).
2. Copy the form ID.
3. Edit `config.js` and set:

```js
window.FINCH_LOOPS_FORM_ID = 'your-form-id';
```

The page posts to:

- `https://app.loops.so/api/newsletter-form/<your-form-id>`

## Deployment

Deployment is handled by GitHub Pages from the `main` branch.
