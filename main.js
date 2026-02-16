const form = document.getElementById('waitlist-form');
const emailInput = document.getElementById('email');
const message = document.getElementById('form-message');

const loopsFormId = window.FINCH_LOOPS_FORM_ID || '';
const loopsEndpoint = loopsFormId
  ? `https://app.loops.so/api/newsletter-form/${loopsFormId}`
  : '';

function setMessage(text, status = '') {
  message.textContent = text;
  message.className = `form-message${status ? ` ${status}` : ''}`;
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!emailInput.checkValidity()) {
    setMessage('Please enter a valid email address.', 'error');
    return;
  }

  if (!loopsEndpoint) {
    setMessage('Waitlist is not configured yet. Add your Loops form ID first.', 'error');
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  setMessage('Joining waitlist…');

  try {
    const response = await fetch(loopsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput.value.trim() }),
    });

    if (!response.ok) {
      throw new Error(`Loops request failed with status ${response.status}`);
    }

    form.reset();
    setMessage('Thanks — you are on the waitlist.', 'success');
  } catch (error) {
    console.error(error);
    setMessage('Sorry, something went wrong. Please try again in a moment.', 'error');
  } finally {
    submitButton.disabled = false;
  }
});
