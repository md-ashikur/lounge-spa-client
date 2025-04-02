

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Only allow POST requests
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { name, sureName, country, postalCode, laneNumber, address, email, phone, note } = req.body;

  // Validate the required fields
  if (!name || !sureName || !country || !postalCode || !laneNumber || !address || !email || !phone) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  try {
    // Send data to Brevo
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name,
          LASTNAME: sureName,
          COUNTRY: country,
          POSTALCODE: postalCode,
          LANENUMBER: laneNumber,
          ADDRESS: address,
          PHONE: phone,
          NOTE: note,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send data to Brevo');
    }

    res.status(200).json({ message: 'Data sent to Brevo successfully' });
  } catch (error) {
    console.error('Error sending data to Brevo:', error);
    res.status(500).json({ message: 'Failed to send data to Brevo' });
  }
}