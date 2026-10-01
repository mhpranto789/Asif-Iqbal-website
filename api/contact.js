export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // use raw body
      }
    }

    const { name, email, organisation, enquiryType, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message are required.'
      });
    }

    // Basic email format check
    if (!email.includes('@') || !email.includes('.')) {
      return res.status(400).json({
        error: 'Invalid email address provided.'
      });
    }

    // Log the inquiry for serverless execution logs
    console.log(`[Contact Submission] Category: ${enquiryType || 'general'} | From: ${name} <${email}> | Org: ${organisation || 'N/A'}`);

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been received. Our team will review your message promptly.',
      receivedAt: new Date().toISOString(),
      referenceId: `INQ-${Date.now().toString(36).toUpperCase()}`
    });
  } catch (error) {
    console.error('[Contact Error]', error);
    return res.status(500).json({
      error: 'An unexpected server error occurred while processing your message.'
    });
  }
}
